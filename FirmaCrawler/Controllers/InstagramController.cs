using ExcelDataReader;
using FirmaCrawler.Models;
using FuarCrawler.Models;
using Newtonsoft.Json.Linq;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using RandomSolutions;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class InstagramController : Controller
    {
        // GET: SnovIo
        public class InstaPost
        {
            public string url { get; set; }
            public string hashTag { get; set; }
        }

        public void GetPostListFromHashTag()
        {
            // sayfalayarak 
            var db = new Db();
            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var list = new List<InstaPost>();
            var result = new List<InstaCrawlResult>();
            var postList = new List<string>();
            var firmaList = new List<DisHekimi>();

            //Login Oluyoruz

            var listeAdi = "a";

            var hashTagList = new List<string> {

              "çocukdiş",
              "çocukdişhekimi",
              "çocukdişhekimliği",
              "cocukdishekimi",
              "çocukdişdokturu",
              "çocukdişhekimiuzmanı",
              "implantoloji",

            };

            var ayni = 0;
            var toplamPostSayisi = 0;
            foreach (var hashTag in hashTagList)
            {
                driver.Navigate().GoToUrl($"https://www.instagram.com/explore/tags/{hashTag}/");
                Thread.Sleep(10000);
                var i = 0;
                while (i < 100000)
                {

                    Thread.Sleep(3000);
                    js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight);");
                    Thread.Sleep(2000);
                    IWebElement body = driver.FindElementSafe(By.TagName("body"));
                    string bodyString = body.GetAttribute("innerHTML");
                    document.LoadHtml(bodyString);
                    toplamPostSayisi = driver.FindElements(By.ClassName("v1Nh3")).Count();
                    var posts = document.DocumentNode.SelectNodes("//a")
                        .Where(f => f.Attributes["href"].Value.Contains("/p/"))
                        .Select(s => s.Attributes["href"].Value)
                        .Where(s => !postList.Contains(s))
                        .ToList();
                    if (posts.Count == 0)
                    {
                        ayni++;
                    }
                    else
                    {
                        ayni = 0;
                    }
                    if (ayni == 20) break;

                    postList.AddRange(posts);
                    i++;
                    js.ExecuteScript("window.scrollTo(0, document.body.scrollHeight*0.90);");
                }

                list.AddRange(postList.Select(s => new InstaPost { hashTag = hashTag, url = s }));


            }

            var excel = list.ToExcel(scheme => scheme
               .AddColumn("Url", x => x.url)
               .AddColumn("HashTag", x => x.hashTag));

            System.IO.File.WriteAllBytes(@"C:\Users\Kullanıcı\source\repos\firmacrawler\FirmaCrawler\InstaCrawlerExcells\" + listeAdi + ".xlsx", excel);

            driver.Close();
        }

        public void AddPostListFromExcell()
        {
            var db = new Db();
            var postList = new List<InstaCrawlPost>();
            var hesapListesi = new List<string>();

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.

            var filePath = HostingEnvironment.MapPath("~/InstaCrawlerExcells/bursaçocukdişhekimliği.xlsx");
            var dataset = new DataSet();
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
            {
                // Auto-detect format, supports:
                //  - Binary Excel files (2.0-2003 format; *.xls)
                //  - OpenXml Excel files (2007 format; *.xlsx, *.xlsb)
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    // Choose one of either 1 or 2:

                    // 1. Use the reader methods
                    do
                    {
                        while (reader.Read())
                        {
                            var postUrl = reader.GetString(0);
                            var hashtag = reader.GetString(1);
                            postList.Add(new InstaCrawlPost { hashtag = hashtag, url = postUrl, process = false });
                        }
                    } while (reader.NextResult());

                    // 2. Use the AsDataSet extension method
                    //var result = reader.AsDataSet();

                    // The result of each spreadsheet is in result.Tables
                }
            }

            db.InstaCrawlPost.AddRange(postList);
            db.BulkSaveChanges();
        }
        public string GetAccountInfoFromPostList(int id)
        {
            var s = "";
            var db = new Db();
            var result = new List<InstaCrawlResult>();

            var lastCrawl = db.InstaCrawlPost.Where(i => i.lastCrawl)==null? db.InstaCrawlPost.FirstOrDefault(): db.InstaCrawlPost.Where(i => i.lastCrawl).ToList().LastOrDefault();
            var lastCrawlId = lastCrawl.InstaCrawlPostId;
            var lastRecordId = db.InstaCrawlPost.Max(i => i.InstaCrawlPostId);

            if (lastCrawlId == lastRecordId) return "Yeni Kayıt Yok";
            

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.

            var liste = db.InstaCrawlPost.Where(i => i.InstaCrawlPostId > lastCrawlId).Take(id).ToList();

            lastCrawl.lastCrawl = false;
            liste.LastOrDefault().lastCrawl = true;
            db.BulkSaveChanges();

            foreach (var item in liste)
            {
                s += "," + item.InstaCrawlPostId;
                try
                {
                    //var client = new WebClient();
                    //client.Encoding = Encoding.UTF8;
                    //client.Proxy = new WebProxy("zproxy.lum-superproxy.io:22225");
                    //client.Proxy.Credentials = new NetworkCredential("lum-customer-c_106dea10-zone-zone1", "31m4tmxnrysd");
                    //var url = $"http://instagram.com{item.url}";
                    //string html =client.DownloadString(url);

                    string link = $"http://api.scrape.do/?token=65b53271fcb348c1b070597861dbedb4b750cdce1ef&url=https://www.instagram.com{item.url}"; //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var content = document.DocumentNode.SelectNodes("//script").FirstOrDefault(f => f.Attributes["type"].Value == "application/ld+json").InnerHtml;

                    var json = content;
                    var doc = JObject.Parse(json);
                    var hesap = doc["author"]["alternateName"].ToString();

                    item.account = hesap;

                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            #region Tasşı
            //db.BulkSaveChanges();

            //foreach (var item in hesapListesi)
            //{
            //    try
            //    {
            //        string link = $"http://api.scrape.do/?token=65b53271fcb348c1b070597861dbedb4b750cdce1ef&url=https://www.instagram.com/{item.Replace("@", "")}"; //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

            //        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

            //        WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            //                                            //client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.
            //        client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            //        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            //        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            //        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            //        var content = document.DocumentNode.SelectNodes("//script").FirstOrDefault(f => f.Attributes["type"].Value == "application/ld+json")?.InnerHtml;
            //        var sharedData = document.DocumentNode.SelectNodes("//script").FirstOrDefault(f => f.InnerText.Contains("window._sharedData ="))?.InnerHtml;
            //        //var json = "{'@context':{'test':'http://www.test.com/'},'test:hello':'world'}";
            //        var json = content;

            //        if (!string.IsNullOrEmpty(json))
            //        {
            //            var doc = JObject.Parse(json);
            //            var type = doc["@type"]?.ToString();
            //            var name = doc["name"]?.ToString();
            //            var desc = doc["description"]?.ToString();
            //            var website = doc["url"]?.ToString();

            //            result.Add(new InstaCrawlResult
            //            {
            //                account = item,
            //                description = desc,
            //                name = name,
            //                type = type,
            //                hashTag = "",
            //                JsonContent = content,
            //                Aciklama = "BURSA",
            //                Firma = "Medya Fuarcılık",
            //                url= website
            //            });

            //        }

            //    }
            //    catch (Exception ex)
            //    {
            //        continue;
            //    }
            //}


            // var r = result.ToExcel(scheme => scheme
            //     .AddColumn("account", x => x.account)
            //     .AddColumn("description", x => x.description)
            //     .AddColumn("name", x => x.name)
            //     .AddColumn("type", x => x.type)
            //     .AddColumn("hashTag", x => x.hashTag)
            //);

            // System.IO.File.WriteAllBytes(@"C:\Users\Kullanıcı\Desktop\result\result.xlsx", r);
            #endregion

            db.BulkSaveChanges();

            return s;
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