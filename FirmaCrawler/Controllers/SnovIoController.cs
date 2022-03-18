using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

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
            db.BulkSaveChanges();

            driver.Close();
        }

        public void SnovIoBanka()
        {
            var db = new Db();
            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var firmaUrl = new List<string>();
            
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

            //Banka Listesi
            driver.Navigate().GoToUrl("https://app.snov.io/companies/list/6735002");

            for (int i = 1; i < 2; i++)
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

                db.Firma.AddRange(firmaList);
                db.BulkSaveChanges();
            }

            

            driver.Close();
        }

        public static By SelectorByAttributeValue(string p_strAttributeName, string p_strAttributeValue)
        {
            return (By.XPath(String.Format("//*[@{0} = '{1}']", p_strAttributeName, p_strAttributeValue)));
        }
    }
}