using FirmaCrawler.Models;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using RandomSolutions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class DisHekimiController : Controller
    {
        //GET:Avukat
        public void DisHekimiNet()
        {
            var doktorDetaySayfalari = new List<string>();
            var list = new List<DisHekimi>();

            string link = "https://www.dishekimi.net/dishekimibul/default.asp?q1=ADANA&zone=il"; //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            //client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.
            client.Encoding = Encoding.GetEncoding("windows-1254"); //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var ilLink = document
                .DocumentNode
                .SelectNodes("//a")
                .Where(j => j
                .Attributes["href"].Value.Contains("default.asp?q1="))
                .ToList().Select(i => i.Attributes["href"])
                .ToList();



            foreach (var item in ilLink)
            {
                link = "https://www.dishekimi.net/dishekimibul/" + item.Value;
                url = new Uri(link);
                html = client.DownloadString(url);
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var doktorLinkleri = document
                    .DocumentNode
                    .SelectNodes("//a")
                    .Where(j => j
                    .Attributes["href"].Value.Contains("default.asp?page=detail&dtid"))
                    .ToList().Select(i => i.Attributes["href"])
                    .ToList();
                doktorDetaySayfalari.AddRange(doktorLinkleri.Select(i => i.Value));
            }

            var a = 1;
            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            foreach (var item in doktorDetaySayfalari)
            {
                try
                {
                    link = "https://www.dishekimi.net/dishekimibul/" + item;
                    url = new Uri(link);
                    html = client.DownloadString(url);
                    document.LoadHtml(html);
                    driver.Navigate().GoToUrl(link);

                    IWebElement ad = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[1]/td/div/font/b/table/tbody/tr/td"));
                    var adNode = document.DocumentNode.SelectNodes("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[1]/td/div/font/b/table/tbody/tr/td");
                    IWebElement adres = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td[2]"));
                    IWebElement ilce = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td[2]"));
                    IWebElement il = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[5]/td[2]"));
                    IWebElement tel1 = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[6]/td[2]"));
                    IWebElement tel2 = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[7]/td[2]"));
                    IWebElement fax = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[8]/td[2]"));
                    IWebElement cep = driver.FindElementSafe(By.XPath("/html/body/table/tbody/tr[1]/td[1]/table/tbody/tr/td[1]/table/tbody/tr[2]/td/table/tbody/tr/td[1]/table/tbody/tr[1]/td[2]/table/tbody/tr/td/table/tbody/tr[9]/td[2]"));

                    var hekim = new DisHekimi();

                    hekim.AdSoyad = ad?.Text;
                    hekim.Adres = adres?.Text;
                    hekim.Ilce = ilce?.Text;
                    hekim.Il = il?.Text;
                    hekim.Telefon = tel1?.Text;
                    hekim.Telefon2 = tel2?.Text;
                    hekim.Cep = cep?.Text;

                    list.Add(hekim);
                }
                catch (Exception ex)
                {
                    continue;
                }

            }

            var excel = list.ToExcel(scheme => scheme
            .AddColumn("AdSoyad", x => x.AdSoyad)
            .AddColumn("Adres", x => x.Adres)
            .AddColumn("Ilce", x => x.Ilce)
            .AddColumn("Telefon", x => x.Telefon)
            .AddColumn("Telefon2", x => x.Telefon2)
            .AddColumn("Cep", x => x.Cep));

            System.IO.File.WriteAllBytes(@"C:\Users\raify\OneDrive\Desktop\Desktop\DisHekimiNet.xlsx", excel);


        }


    }
}