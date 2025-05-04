using ArrayToExcel;
using ExcelDataReader;
using FirmaCrawler.Models.Snovio;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using OpenQA.Selenium.DevTools.V102.Page;
using OpenQA.Selenium.Support.UI;
using HtmlAgilityPack;

namespace FuarCrawler.Controllers
{
    public class SnovIoController : Controller
    {
        // GET: SnovIo
        public void SnovIo()
        {
            var db = new Db();
            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var firmaUrl = new List<string>();
            var firmaList = new List<Firma>();
            //Login Oluyoruz
            driver.Navigate().GoToUrl("https://app.snov.io/login");
            IWebElement txtEposta = driver.FindElementSafe(By.Id("email"));
            txtEposta.Clear();
            txtEposta.SendKeys("raif.yaman@fikayazilim.com");
            Thread.Sleep(500);

            IWebElement txtSifre = driver.FindElementSafe(By.Id("password"));
            txtSifre.Clear();
            txtSifre.SendKeys("1343006Aa!");
            Thread.Sleep(500);

            IWebElement btnlogin = driver.FindElementSafe(By.Id("buttonFormLogin"));
            btnlogin.Click();
            Thread.Sleep(500);

            driver.Navigate().GoToUrl("https://app.snov.io/companies/list/6735002");

            for (int i = 1; i < 3; i++)
            {
                if (i != 1)
                {
                    js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    Thread.Sleep(1000);
                    try
                    {
                        //IWebElement btnSayfa = driver.FindElementSafe(By.XPath($"//*[@id='app-layout']/div[2]/div/div/div[3]/div/div[1]/ul/li[last()]/a"));

                        IWebElement btnSayfa = driver.FindElement(By.XPath(String.Format("//*[@href = '{0}']", "https://app.snov.io/companies/list/6821440?page=" + i)));
                        btnSayfa.Click();
                        Thread.Sleep(1000);
                    }
                    catch (Exception ex)
                    {

                        IWebElement btnSayfa = driver.FindElement(By.XPath(String.Format("//*[@href = '{0}']", "https://app.snov.io/companies/list/6821440?page=" + i)));
                        btnSayfa.Click();
                        Thread.Sleep(500);
                    }
                }

                IWebElement body = driver.FindElementSafe(By.TagName("body"));
                string bodyString = body.GetAttribute("innerHTML");

                document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var firmaSayfalari = document.DocumentNode.SelectNodes("//a").Where(s => s.Attributes["href"] != null && s.Attributes["style"] == null && s.Attributes["href"].Value.Contains("app.snov.io/companies/view")).Select(s => s.Attributes["href"].Value).ToList();
                firmaUrl.AddRange(firmaSayfalari);
                Thread.Sleep(1000);

            }
            var c = 0;
            foreach (var item in firmaUrl)
            {
                c++;
                driver.Navigate().GoToUrl(item);
                //driver.Navigate().GoToUrl("https://app.snov.io/companies/view/178678/6735002");
                Thread.Sleep(1000);
                IWebElement tabEposta = driver.FindElementSafe(By.XPath("//span[.='All Domain Emails']"));
                try
                {
                    tabEposta.Click();
                }
                catch (Exception)
                {

                    continue;
                }
                //*[@id='companies-info']/div/div[3]/div[2]/div[text() = 'Second']

                js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                Thread.Sleep(1000);
                IWebElement btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));

                var counter = 1;


                while (btnShowMpre != null)
                {
                    try
                    {
                        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                        Thread.Sleep(3000);
                        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                        Thread.Sleep(1000);
                        btnShowMpre.Click();
                        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                        counter++;
                        if (counter > 20)
                        {
                            break;
                        }
                    }
                    catch (Exception ex)
                    {
                        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                        continue;
                    }
                }

                IWebElement body = driver.FindElementSafe(By.TagName("body"));
                string bodyString = body.GetAttribute("innerHTML");

                document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var emails = document.DocumentNode.SelectNodes("//div").Where(i => i.InnerText.Contains("@") && !i.InnerText.Contains("raif.yaman") && i.ParentNode.Name == "td").ToList();
                var unvan = document.DocumentNode.SelectSingleNode("//*[@id='companies-info']/div/div[2]/div[1]/div[1]/div[1]").InnerText;
                var ilNode = document.DocumentNode.SelectSingleNode("//div[.='City:']");
                var il = ilNode != null ? ilNode.NextSibling.NextSibling.InnerText : "";
                var websiteNode = document.DocumentNode.SelectSingleNode("//div[.='Website:']");
                var website = websiteNode != null ? websiteNode.NextSibling.NextSibling.InnerText.Replace("www.", "").Replace("http://", "").Replace("https://", "").Trim() : "";
                var faaliyetAlaniNode = document.DocumentNode.SelectSingleNode("//div[.='Industry:']");
                var faaliyetAlani = faaliyetAlaniNode != null ? faaliyetAlaniNode.NextSibling.NextSibling.InnerText : "";

                if (emails.Count > 0)
                {
                    foreach (var email in emails)
                    {
                        var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == website && f.Eposta == email.InnerText);
                        if (fromDb != null)
                        {
                            if (fromDb.Kaynak != null && !fromDb.Kaynak.Contains("SNOVIO MACHINERY"))
                            {
                                fromDb.Kaynak = fromDb.Kaynak + ",SNOVIO MACHINERY";
                                fromDb.KaynakTip = fromDb.KaynakTip + ",SNOVIO";
                            }
                        }
                        else
                        {
                            var firma = new Firma();
                            firma.Unvan = unvan;
                            firma.Il = il;
                            firma.WebSitesi = website;
                            firma.WebSitesiMevcutKontrol = false;
                            firma.Eposta = email.InnerText.Trim();
                            firma.Kaynak = "SNOVIO MACHINERY";
                            firma.KaynakTip = "SNOVIO";
                            firma.Sektor = faaliyetAlani;
                            firma.KayıtTarihi = DateTime.Now;
                            firmaList.Add(firma);

                        }
                    }
                }
                else
                {
                    var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == website);
                    if (fromDb != null)
                    {
                        if (fromDb.Kaynak != null && !fromDb.Kaynak.Contains("SNOVIO MACHINERY"))
                        {
                            fromDb.Kaynak = fromDb.Kaynak + ",SNOVIO MACHINERY";
                            fromDb.KaynakTip = fromDb.KaynakTip + ",SNOVIO";
                        }
                    }
                    else
                    {
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Il = il;
                        firma.WebSitesi = website;
                        firma.WebSitesiMevcutKontrol = false;
                        firma.Kaynak = "SNOVIO MACHINERY";
                        firma.KaynakTip = "SNOVIO";
                        firma.Sektor = faaliyetAlani;
                        firma.KayıtTarihi = DateTime.Now;
                        firmaList.Add(firma);

                    }
                }

            }

            db.Firma.AddRange(firmaList);
            db.SaveChanges();

            driver.Close();
        }
        public void SnovIoBanka()
        {

            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var firmaUrl = new List<string>();

            //Login Oluyoruz
            driver.Navigate().GoToUrl("https://app.snov.io/login");
            IWebElement txtEposta = driver.FindElementSafe(By.XPath("//*[@id='login']/div/div[2]/div[1]/div/div/div[2]/form/div[1]/input"));
            txtEposta.Clear();
            txtEposta.SendKeys("raif.yaman@fikayazilim.com");
            Thread.Sleep(500);

            IWebElement txtSifre = driver.FindElementSafe(By.XPath("//*[@id='login']/div/div[2]/div[1]/div/div/div[2]/form/div[2]/input"));
            txtSifre.Clear();
            txtSifre.SendKeys("1343006Aa!");
            Thread.Sleep(500);

            IWebElement btnlogin = driver.FindElementSafe(By.XPath("//*[@id='login']/div/div[2]/div[1]/div/div/div[2]/form/button"));
            btnlogin.Click();
            Thread.Sleep(500);

            //Banka Listesi


            for (int i = 1; i < 16; i++)
            {
                driver.Navigate().GoToUrl("https://app.snov.io/companies#/list/11257929?limit=200&sort%5BaddDate%5D=desc&page=" + i);


                //if (i != 1)
                //{
                //    js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                //    Thread.Sleep(1000);
                //    try
                //    {
                //        //IWebElement btnSayfa = driver.FindElementSafe(By.XPath($"//*[@id='app-layout']/div[2]/div/div/div[3]/div/div[1]/ul/li[last()]/a"));

                //        IWebElement btnSayfa = driver.FindElement(By.XPath(String.Format("//*[@href = '{0}']", "https://app.snov.io/companies/list/6821440?page=" + i)));
                //        btnSayfa.Click();
                //        Thread.Sleep(1000);
                //    }
                //    catch (Exception ex)
                //    {

                //        IWebElement btnSayfa = driver.FindElement(By.XPath(String.Format("//*[@href = '{0}']", "https://app.snov.io/companies/list/6821440?page=" + i)));
                //        btnSayfa.Click();
                //        Thread.Sleep(500);
                //    }
                //}

                IWebElement body = driver.FindElementSafe(By.TagName("body"));
                string bodyString = body.GetAttribute("innerHTML");

                document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var firmaSayfalari = document.DocumentNode.SelectNodes("//a")
                    .Where(s =>
                    s.Attributes["href"] != null &&
                    s.Attributes["href"].Value.Contains("#/view/"))
                    .Select(s => s.Attributes["href"].Value)
                    .ToList();
                firmaUrl.AddRange(firmaSayfalari);
                Thread.Sleep(1000);

            }
            var c = 0;
            foreach (var item in firmaUrl)
            {

                c++;
                driver.Navigate().GoToUrl("https://app.snov.io/companies/" + item);
                //driver.Navigate().GoToUrl("https://app.snov.io/companies/view/178678/6735002");
                Thread.Sleep(1000);
                IWebElement tabEposta = driver.FindElementSafe(By.XPath("//span[.='All Domain Emails']"));
                try
                {
                    tabEposta.Click();
                }
                catch (Exception)
                {

                    continue;
                }
                //*[@id='companies-info']/div/div[3]/div[2]/div[text() = 'Second']

                js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                Thread.Sleep(1000);
                IWebElement btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));

                var counter = 1;


                while (btnShowMpre != null)
                {
                    try
                    {
                        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                        Thread.Sleep(3000);
                        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                        Thread.Sleep(1000);
                        btnShowMpre.Click();
                        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                        counter++;
                        if (counter > 1000)
                        {
                            break;
                        }
                    }
                    catch (Exception ex)
                    {
                        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                        continue;
                    }
                }

                IWebElement body = driver.FindElementSafe(By.TagName("body"));
                string bodyString = body.GetAttribute("innerHTML");

                document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var emails = document.DocumentNode.SelectNodes("//div").Where(i => i.InnerText.Contains("@") && !i.InnerText.Contains("raif.yaman") && i.ParentNode.Name == "td").ToList();
                var unvan = document.DocumentNode.SelectSingleNode("//*[@id='companies-info']/div/div[2]/div[1]/div[1]/div[1]").InnerText;
                var ilNode = document.DocumentNode.SelectSingleNode("//div[.='City:']");
                var il = ilNode != null ? ilNode.NextSibling.NextSibling.InnerText : "";
                var websiteNode = document.DocumentNode.SelectSingleNode("//div[.='Website:']");
                var website = websiteNode != null ? websiteNode.NextSibling.NextSibling.InnerText.Replace("www.", "").Replace("http://", "").Replace("https://", "").Trim() : "";
                var faaliyetAlaniNode = document.DocumentNode.SelectSingleNode("//div[.='Industry:']");
                var faaliyetAlani = faaliyetAlaniNode != null ? faaliyetAlaniNode.NextSibling.NextSibling.InnerText : "";

                var firmaList = new List<Firma>();
                foreach (var email in emails)
                {
                    //var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == website && f.Eposta == email.InnerText);
                    //if (fromDb != null)
                    //{
                    //    if (fromDb.Kaynak != null && !fromDb.Kaynak.Contains("SNOVIO BANKA"))
                    //    {
                    //        fromDb.Kaynak = fromDb.Kaynak + ",SNOVIO BANKA";
                    //        fromDb.KaynakTip = fromDb.KaynakTip + ",BANKA";
                    //    }
                    //}
                    //else
                    //{
                    //}
                    var firma = new Firma();
                    firma.Unvan = unvan;
                    firma.Il = il;
                    firma.WebSitesi = website;
                    firma.WebSitesiMevcutKontrol = false;
                    firma.Eposta = email.InnerText.Trim();
                    firma.Kaynak = "SNOVIO BANKA";
                    firma.KaynakTip = "BANKA";
                    firma.Sektor = faaliyetAlani;
                    firma.KayıtTarihi = DateTime.Now;
                    firmaList.Add(firma);


                }


            }



            driver.Close();
        }
        public void FirmaListeEpostaKaydet()
        {

            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers\111");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.


            //Login Oluyoruz
            driver.Navigate().GoToUrl("https://app.snov.io/login");
            IWebElement txtEposta = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/div[1]/input"));
            txtEposta.Clear();
            txtEposta.SendKeys("raif.yaman@fikayazilim.com");
            Thread.Sleep(500);

            IWebElement txtSifre = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/div[2]/input"));
            txtSifre.Clear();
            txtSifre.SendKeys("1343006Aa!");
            Thread.Sleep(500);

            IWebElement btnlogin = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/button"));
            btnlogin.Click();
            Thread.Sleep(500);

            //Banka Listesi
            var firmaUrl = new List<string>();

            for (int i = 1; i < 2; i++)
            {
                driver.Navigate().GoToUrl("https://app.snov.io/companies#/list/16407927?limit=200&sort%5BaddDate%5D=desc&page=" + i);


                Thread.Sleep(5000);
                IWebElement body = driver.FindElementSafe(By.TagName("body"));
                string bodyString = body.GetAttribute("innerHTML");

                document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var firmaSayfalari = document.DocumentNode.SelectNodes("//a")
                    .Where(s =>
                    s.Attributes["href"] != null &&
                    s.Attributes["href"].Value.Contains("#/view/"))
                    .Select(s => s.Attributes["href"].Value)
                    .ToList();
                firmaUrl.AddRange(firmaSayfalari);
                Thread.Sleep(2000);

                i++;

            }

            var c = 0;
            var epostaList = new List<EmailData>();
            foreach (var item in firmaUrl)
            {
                try
                {
                    var counter = 1;
                    c++;
                    driver.Navigate().GoToUrl("https://app.snov.io/companies/" + item);
                    IWebElement body = driver.FindElementSafe(By.TagName("body"));
                    string bodyString = body.GetAttribute("innerHTML");
                    var emails = new List<HtmlNode>();

                    #region All Domain Emails
                    //Thread.Sleep(1000);
                    //IWebElement tabEposta = driver.FindElementSafe(By.XPath("//span[.='All Domain Emails']"));
                    //try
                    //{
                    //    tabEposta.Click();
                    //}
                    //catch (Exception ex)
                    //{
                    //    var a = ex;
                    //}

                    ////*[@id='companies-info']/div/div[3]/div[2]/div[text() = 'Second']

                    //js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    //Thread.Sleep(1000);
                    //IWebElement btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));



                    //while (btnShowMpre != null)
                    //{
                    //    try
                    //    {
                    //        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    //        Thread.Sleep(3000);
                    //        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    //        Thread.Sleep(1000);
                    //        btnShowMpre.Click();
                    //        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                    //        counter++;
                    //        if (counter > 1000)
                    //        {
                    //            break;
                    //        }
                    //    }
                    //    catch (Exception ex)
                    //    {
                    //        btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                    //        continue;
                    //    }
                    //}



                    //document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    //emails = document.DocumentNode.SelectNodes("//div").Where(i => i.InnerText.Contains("@") && !i.InnerText.Contains("raif.yaman") && i.ParentNode.Name == "td").ToList();


                    //foreach (var email in emails)
                    //{
                    //    var eData = new EmailData();
                    //    eData.email = email.InnerText;
                    //    eData.domain = eData.email.Split('@')[1];
                    //    eData.type = "All";
                    //    epostaList.Add(eData);

                    //}
                    #endregion

                    #region Generic
                    //Thread.Sleep(1000);
                    //IWebElement tabGeneric = driver.FindElementSafe(By.XPath("//span[.='Generic Contacts']"));

                    //try
                    //{
                    //    tabGeneric.Click();
                    //    Thread.Sleep(3000);
                    //}
                    //catch (Exception ex)
                    //{
                    //    var a = ex;
                    //}


                    //body = driver.FindElementSafe(By.TagName("body"));
                    //bodyString = body.GetAttribute("innerHTML");

                    //document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    //emails = document.DocumentNode.SelectNodes("//div").Where(i => i.InnerText.Contains("@") && i.HasClass("row__cell-text")).ToList();

                    //foreach (var email in emails)
                    //{
                    //    var eData = new EmailData();
                    //    eData.email = email.InnerText;
                    //    eData.domain = eData.email.Split('@')[1];
                    //    eData.type = "generic";
                    //    epostaList.Add(eData);
                    //}
                    #endregion


                    #region Prospects
                    Thread.Sleep(3000);
                    IWebElement tabProspects = driver.FindElementSafe(By.XPath("//span[.='Prospects']"));
                    if (tabProspects != null)
                    {
                        try
                        {
                            tabProspects.Click();
                        }
                        catch (Exception ex)
                        {

                            var a = ex;
                        }
                        //*[@id='companies-info']/div/div[3]/div[2]/div[text() = 'Second']

                        js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                        Thread.Sleep(1000);
                        IWebElement btnLoadMore = driver.FindElementSafe(By.XPath("//div[contains(text(), 'Load')]"));

                        counter = 1;


                        while (btnLoadMore != null)
                        {
                            try
                            {
                                js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                                Thread.Sleep(3000);
                                js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                                Thread.Sleep(1000);
                                btnLoadMore.Click();
                                btnLoadMore = driver.FindElementSafe(By.XPath("//div[contains(text(), 'Load')]"));
                                counter++;
                                if (counter > 1000)
                                {
                                    break;
                                }
                            }
                            catch (Exception ex)
                            {
                                btnLoadMore = driver.FindElementSafe(By.XPath("//div[contains(text(), 'Load')]"));
                                continue;
                            }
                        }

                        body = driver.FindElementSafe(By.TagName("body"));
                        bodyString = body.GetAttribute("innerHTML");

                        document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var prospectList = document.DocumentNode.SelectNodes("//tr").Where(i => i.ParentNode.ParentNode.HasClass("table__inner") && i.ParentNode.Name == "tbody").ToList();
                        var webSiteTitle = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i=>i.InnerText=="Website:");
                        var webSite = webSiteTitle != null ? webSiteTitle.NextSibling.NextSibling.InnerText : "";

                        foreach (var email in prospectList)
                        {
                            try
                            {
                                var eData = new EmailData();
                                eData.firstName = email.ChildNodes[2].InnerText.Trim();
                                eData.sourcePage = email.ChildNodes[2].ChildNodes[0].Attributes["href"].Value;
                                eData.position = email.ChildNodes[6].InnerText.Trim();
                                eData.domain = webSite;
                                eData.type = "prospect";
                                epostaList.Add(eData);
                            }
                            catch (Exception ex)
                            {
                                var a = ex;
                            }

                        }
                    }
                    #endregion




                }
                catch (Exception ex)
                {

                }

            }


            var items = epostaList.Select(x => new
            {
                firstName = x.firstName,
                position = x.position,
                domain = x.domain,
                email = x.email,
                type = x.type,
                source=x.sourcePage
            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes($@"C:\Users\raify\Downloads\SalesCon.xlsx", excel);

            driver.Close();
        }
        //Listeye Firma Kaydeder
        public void FirmaListeyeKaydet()
        {
            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Downloads\SalesConFirmaListesi.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var domainRows = crawlerDataset.Tables[0].Rows;

            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers\111");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var firmaUrl = new List<string>();

            //Login Oluyoruz
            driver.Navigate().GoToUrl("https://app.snov.io/login");
            IWebElement txtEposta = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/div[1]/input"));
            txtEposta.Clear();
            txtEposta.SendKeys("raif.yaman@fikayazilim.com");
            Thread.Sleep(500);

            IWebElement txtSifre = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/div[2]/input"));
            txtSifre.Clear();
            txtSifre.SendKeys("1343006Aa!");
            Thread.Sleep(500);

            IWebElement btnlogin = driver.FindElementSafe(By.XPath("/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/form/button"));
            btnlogin.Click();
            Thread.Sleep(500);

            var alldomains = new List<Firma>();

            foreach (DataRow dr in domainRows)
            {
                var domain = dr.ItemArray[0].ToString();
                //var unvan = dr.ItemArray[0].ToString();
                if (string.IsNullOrEmpty(domain))
                {
                    continue;
                }
                alldomains.Add(new Firma
                {
                    WebSitesi = domain
                 });
            }



            var firmaList = new List<Firma>();

            foreach (var dr in alldomains.Skip(1).ToList())
            {


                driver.Navigate().GoToUrl("https://app.snov.io/domain-search?name=" + dr.WebSitesi);

                var a = js.ExecuteScript("return document.getElementsByClassName('preloader-global')[0].style.display").ToString();


                for (int i = 0; i < 30; i++)
                {
                    Thread.Sleep(10000);
                    var state = js.ExecuteScript("return document.readyState").ToString();
                    var display = js.ExecuteScript("return document.getElementsByClassName('preloader-global')[0].style.display").ToString();
                    if (state == "complete" && display == "none")
                    {
                        break;
                    }
                }


                var isCompany = driver.FindElementSafe(By.XPath("//*[@id=\"box\"]/main/div/div[2]/div[3]/div[1]/div[1]/div[2]"));
                if (isCompany == null)
                {
                    Thread.Sleep(1000);
                    IWebElement tabEposta = driver.FindElementSafe(By.XPath("//span[.='All Domain Emails']"));
                    try
                    {
                        tabEposta.Click();
                    }
                    catch (Exception)
                    {

                        continue;
                    }
                    //*[@id='companies-info']/div/div[3]/div[2]/div[text() = 'Second']

                    js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    Thread.Sleep(1000);
                    IWebElement btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));

                    var counter = 1;


                    while (btnShowMpre != null)
                    {
                        try
                        {
                            js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                            Thread.Sleep(3000);
                            js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                            Thread.Sleep(1000);
                            btnShowMpre.Click();
                            btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                            counter++;
                            if (counter > 1000)
                            {
                                break;
                            }
                        }
                        catch (Exception ex)
                        {
                            btnShowMpre = driver.FindElementSafe(By.XPath("//button[contains(text(), 'Show more')]"));
                            continue;
                        }
                    }

                    IWebElement body = driver.FindElementSafe(By.TagName("body"));
                    string bodyString = body.GetAttribute("innerHTML");

                    document.LoadHtml(bodyString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    var emails = document.DocumentNode.SelectNodes("//div").Where(i => i.InnerText.Contains("@") && !i.InnerText.Contains("raif.yaman") && i.ParentNode.Name == "td").ToList();





                    foreach (var email in emails)
                    {
                        //var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == website && f.Eposta == email.InnerText);
                        //if (fromDb != null)
                        //{
                        //    if (fromDb.Kaynak != null && !fromDb.Kaynak.Contains("SNOVIO BANKA"))
                        //    {
                        //        fromDb.Kaynak = fromDb.Kaynak + ",SNOVIO BANKA";
                        //        fromDb.KaynakTip = fromDb.KaynakTip + ",BANKA";
                        //    }
                        //}
                        //else
                        //{
                        //}
                        var firma = new Firma();

                        firma.WebSitesi = dr.WebSitesi;

                        firma.Eposta = email.InnerText.Trim();

                        firmaList.Add(firma);


                    }


                }
                else
                {
                    var dropdownButton = driver.FindElementSafe(By.XPath("//*[@id=\"box\"]/main/div/div[2]/div[3]/div[1]/div[2]/span"));
                    dropdownButton.Click();
                    System.Threading.Thread.Sleep(500);


                    var mksButton = driver.FindElementSafe(By.XPath("//*[@id=\"box\"]/main/div/div[2]/div[3]/div[1]/div[2]/div/ul[2]/li[1]"));
                    mksButton.Click();
                    System.Threading.Thread.Sleep(500);
                }
            }

            var items = firmaList.Select(x => new
            {
                WebSitesi = x.WebSitesi,
                Eposta = x.Eposta
            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes($@"C:\Users\raify\Downloads\eec-balikesir-prospect", excel);


            driver.Close();
        }
        public void DataBirlestir()
        {
            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\Data.xls", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }



            var alldomains = new List<Firma>();

            for (int i = 0; i < 2; i++)
            {
                foreach (DataRow dr in crawlerDataset.Tables[i].Rows)
                {
                    for (int j = 0; j < 5; j++)
                    {
                        var eposta = dr.ItemArray[j] != null ? dr.ItemArray[j].ToString().Trim() : "";

                        if (string.IsNullOrEmpty(eposta))
                        {
                            continue;
                        }
                        var emailFraction = eposta.Split('@');
                        var domain = emailFraction.Count() > 1 ? emailFraction[1] : "";
                        alldomains.Add(new Firma
                        {
                            Eposta = eposta,
                            WebSitesi = domain
                        });
                    }
                }
            }

            var items = alldomains.Select(x => new
            {
                Eposta = x.Eposta,
                WebSitesi = x.WebSitesi
            });

            var excel = items.ToExcel();
            //C:\Users\raify\Desktop
            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\EmailDataToplu-1.xlsx", excel);

        }
        public void ExcelBirlestir()
        {
            var db = new Db();
            var webSiteler = db.Firma.Select(s => s.WebSitesi.Replace("https://", "").Replace("http://", "").Replace("www.", "")).Distinct().ToList();
            var folderPath = @"C:\Users\raify\Desktop\Desktop\Fika Exporter\Snovio-Kategori";
            DirectoryInfo d = new DirectoryInfo(folderPath);
            var firmalar = new List<Firma>();
            var files = d.GetFiles();
            foreach (var file in files)
            {
                var crawlerDataset = new DataSet();

                using (var stream = System.IO.File.Open(file.FullName, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        crawlerDataset = reader.AsDataSet();
                    }
                }

                var domainRows = crawlerDataset.Tables[0].Rows;
                var counter = 0;
                foreach (DataRow row in domainRows)
                {
                    if (counter == 0)
                    {
                        counter++;
                        continue;
                    };

                    var guid = row.ItemArray[0].ToString();
                    var unvan = row.ItemArray[1].ToString();
                    var websitesi = row.ItemArray[2].ToString();
                    var ulke = row.ItemArray[3].ToString();
                    var endustri = row.ItemArray[4].ToString();

                    firmalar.Add(new Firma
                    {
                        Kaynak = "Snovio",
                        KaynakGuid = guid,
                        WebSitesi = websitesi.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                        Sektor = endustri,
                        KayitTarihi = DateTime.Now,
                        YeniTipKayit = true,
                        FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = 204 } }

                    });
                    counter++;
                }
            }
            var insert = firmalar.Where(w => !webSiteler.Contains(w.WebSitesi)).ToList();
            db.Firma.AddRange(insert);
            db.BulkSaveChanges();
        }
        public void HazırDataBirlestir()
        {
            var db = new Db();
            var webSiteler = db.Firma.Select(s => s.WebSitesi.Replace("https://", "").Replace("http://", "").Replace("www.", "")).Distinct().ToList();
            var folderPath = @"C:\Users\raify\Desktop\Desktop\Hazır Data";
            DirectoryInfo d = new DirectoryInfo(folderPath);
            var firmalar = new List<Firma>();
            var files = d.GetFiles();

            string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
            Regex myRegex = new Regex(strRegex, RegexOptions.None);

            foreach (var file in files)
            {
                var crawlerDataset = new DataSet();

                using (var stream = System.IO.File.Open(file.FullName, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        crawlerDataset = reader.AsDataSet();
                    }
                }

                var domainRows = crawlerDataset.Tables[0].Rows;
                var counter = 0;

                foreach (DataRow row in domainRows)
                {
                    if (counter == 0)
                    {
                        counter++;
                        continue;
                    };

                    var rowEmails = new List<string>();

                    for (int i = 0; i < row.ItemArray.Count(); i++)
                    {
                        foreach (Match myMatch in myRegex.Matches(row.ItemArray[i].ToString()))
                        {
                            rowEmails.Add(myMatch.Value);
                        }
                    }

                    var unvan = row.ItemArray[0].ToString();
                    var ilce = row.ItemArray[4].ToString();
                    var il = row.ItemArray[5].ToString();
                    var cep = row.ItemArray[11].ToString();
                    var websitesi = !string.IsNullOrEmpty(row.ItemArray[12].ToString()) ? IsDomain(row.ItemArray[12].ToString()).domain : "";
                    var yetkili = row.ItemArray[13].ToString();
                    var nace = row.ItemArray[14].ToString();
                    var meslekgrup = row.ItemArray[15].ToString();
                    var urun = row.ItemArray[16].ToString();
                    var sektor = row.ItemArray[17].ToString();
                    var altsektor = row.ItemArray[18].ToString();
                    var vergino = row.ItemArray[23].ToString();


                    firmalar.Add(new Firma
                    {
                        Kaynak = "Hazır Data",
                        Unvan = unvan,
                        WebSitesi = websitesi.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                        Sektor = sektor + "," + altsektor,
                        KayitTarihi = DateTime.Now,
                        YeniTipKayit = true,
                        FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = 205 } },
                        FirmaEposta = rowEmails.Select(s => new FirmaEposta { Eposta = s }).ToList(),
                        VergiNo = vergino,
                        Il = il,
                        Ilce = ilce,
                        CepTelefon = cep,
                        Yetkili = yetkili

                    }); ;
                    counter++;
                }
            }
            var insert = new List<Firma>();
            foreach (var item in firmalar.GroupBy(x => new { x.Unvan, x.WebSitesi }))
            {

                var f = item.FirstOrDefault();
                var emails = item.SelectMany(s => s.FirmaEposta).Select(s => s.Eposta).Distinct().ToList();
                f.FirmaEposta = emails.Select(s => new FirmaEposta { Eposta = s }).ToList();
                insert.Add(f);
            }
            var ins = insert.Where(i => i.WebSitesi != "" || i.FirmaEposta.Any()).ToList();
            db.Firma.AddRange(ins);
            db.BulkSaveChanges();
        }
        public static By SelectorByAttributeValue(string p_strAttributeName, string p_strAttributeValue)
        {
            return (By.XPath(String.Format("//*[@{0} = '{1}']", p_strAttributeName, p_strAttributeValue)));
        }
        public class IsDomainResult
        {
            public bool isDomain { get; set; }
            public string domain { get; set; }
            public string domainTLD { get; set; }
        }
        public IsDomainResult IsDomain(string url)
        {
            if (!string.IsNullOrEmpty(url))
            {
                Regex regexTwo =
                new Regex(
                    @"([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*",
                    RegexOptions.Compiled);
                bool isValid = regexTwo.IsMatch(url);

                string dom = "";
                string DomainTLD = "";

                if (isValid)
                {
                    Match match = regexTwo.Match(url);
                    dom = match.Value.Replace("www.", "");
                    string[] splitedDomain = dom.Trim().Split('.');
                    int splitedDomainLength = splitedDomain.Length;
                    int TLD = splitedDomainLength - 1;
                    DomainTLD = splitedDomain[TLD];
                }
                return new IsDomainResult { isDomain = regexTwo.IsMatch(url), domain = dom, domainTLD = DomainTLD };
            }
            else
            {
                return new IsDomainResult { isDomain = false, domain = "", domainTLD = "" };
            }
        }
    }
}