using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class OSBController : Controller
    {
        // GET: Dernek
        public void OSTIM()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 405;
            var firmaDetaySayfaları = new List<string>();
            var db = new Db();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.ostim.org.tr/firmalar?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var divs = document.DocumentNode.SelectNodes("/html/body/div[6]/div[1]/div").Where(j => j.HasClass("col-md-6") && j.ParentNode.ParentNode.HasClass("container")).ToList();
                firmaDetaySayfaları.AddRange(divs.Select(j => j.ChildNodes.FirstOrDefault(f => f.Name == "a").Attributes["href"].Value).Where(f => f.StartsWith("/")));
            }

            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    string link = "https://www.ostim.org.tr" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var basliklar = document.DocumentNode.SelectNodes("//h3").ToList();

                    var unvan = document.DocumentNode.SelectSingleNode("/html/body/div[5]/div/div[5]/div[1]/div/div/div[1]/h3").InnerText.Trim();
                    var epostadiv = document.DocumentNode.SelectNodes("//p").FirstOrDefault(f => f.InnerText.Contains("Email 1:"));
                    var eposta = epostadiv != null ? document.DocumentNode.SelectNodes("//p").FirstOrDefault(f => f.InnerText.Contains("Email 1:")).InnerText.Trim().Split(':')[1].Trim() : "";
                    var websitesi = document.DocumentNode.SelectNodes("//p")
                        .FirstOrDefault(f => f.InnerText.Contains("Web:"))
                        .InnerText
                        .Replace("http://", "")
                        .Replace("https://", "")
                        .Trim().Split(':')[1].Trim();
                    var urundiv = document.DocumentNode.SelectNodes("/html/body/div[5]/div/div[4]/div/div/a");
                    var urun = urundiv != null ? urundiv.ToList().Select(s => s.InnerText.Trim()).Aggregate((a, b) => a + "," + b) : "";

                    var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == websitesi);
                    if (!string.IsNullOrEmpty(websitesi) && fromDb != null)
                    {
                        if (!fromDb.Kaynak.Contains("OSTİM"))
                        {
                            fromDb.Kaynak = fromDb.Kaynak + ",OSTİM";
                            fromDb.KaynakTip = fromDb.KaynakTip + ",OSB";
                            fromDb.Urun = fromDb.Urun + "," + urun;
                        }
                    }
                    else
                    {
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.WebSitesi = websitesi;
                        firma.Eposta = eposta;
                        firma.Il = "ANKARA";
                        firma.Urun = urun;
                        firma.Kaynak = "OSTİM";
                        firma.KaynakTip = "OSB";
                        firma.KayıtTarihi = DateTime.Now;
                        firmalar.Add(firma);
                    }


                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(firmalar);
            db.SaveChanges();

        }
        public void KayseriOsb()
        {
            var firmalar = new List<Firma>();
            var firmaDetaySayfaları = new List<string>();
            var db = new Db();

            string link = "https://www.kayseriosb.org/tr/Home/Search/?firma=2&ara=";  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var divs = document.DocumentNode.SelectNodes("//a").Where(j => j.ParentNode.HasClass("entry-title")).ToList();
            firmaDetaySayfaları.AddRange(divs.Select(j => j.Attributes["href"].Value).Where(f => f.StartsWith("/")));


            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    link = "https://www.kayseriosb.org/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    

                    var unvan = document.DocumentNode.SelectSingleNode("//*[@id='main']/div/div/article/div[2]/div/div[2]/div/h2").InnerText.Trim();
                    
                    var sektorNode = document.DocumentNode.SelectNodes("//li").FirstOrDefault(f => f.InnerText.Contains("Sekt&#246;r:"));
                    var sektor = sektorNode != null ? sektorNode.InnerText.Split(':')[1].Trim():"";

                    var adresNode = document.DocumentNode.SelectNodes("//li").FirstOrDefault(f => f.InnerText.Contains("Adres:"));
                    var adres = adresNode != null ? adresNode.InnerText.Split(':')[1].Trim() : "";

                    var epostaNode = document.DocumentNode.SelectNodes("//li").FirstOrDefault(f => f.InnerText.Contains("E-Posta:"));
                    var eposta = epostaNode != null ? epostaNode.InnerText.Split(':')[1].Trim() : "";
                    
                    var websitesiNode = document.DocumentNode.SelectNodes("//li").FirstOrDefault(f => f.InnerText.Contains("Web:"));
                    var websitesi = websitesiNode != null ? websitesiNode.InnerText.Split(':')[1].Trim()
                        .Replace("www.","")
                        .Replace("http://","")
                        .Replace("https://", "")
                        : "";
                     

                    var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == websitesi);
                    if (!string.IsNullOrEmpty(websitesi) && fromDb != null)
                    {
                        if (!fromDb.Kaynak.Contains("KAYSERİ OSB"))
                        {
                            fromDb.Kaynak = fromDb.Kaynak + ",KAYSERİ OSB";
                            fromDb.KaynakTip = fromDb.KaynakTip + ",OSB";
                            fromDb.Sektor = sektor;
                        }
                    }
                    else
                    {
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.WebSitesi = websitesi;
                        firma.Eposta = eposta;
                        firma.Sektor = sektor;
                        firma.Il = "KAYSERİ";
                        firma.Kaynak = "KAYSERİ OSB";
                        firma.KaynakTip = "OSB";
                        firma.KayıtTarihi = DateTime.Now;
                        firmalar.Add(firma);
                    }


                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(firmalar);
            db.SaveChanges();

        }
    }
}