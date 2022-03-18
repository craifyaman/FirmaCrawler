using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using RandomSolutions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class OdaController : Controller
    {
        // GET: Dernek
        public void GaziantepTicaret()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 829;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://e.gto.org.tr/Members?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var a = document.DocumentNode.SelectNodes("//a").Where(j => j.Attributes["href"].Value.Contains("MemberProfile/View")).ToList();
                firmaDetaySayfaları.AddRange(a.Select(j => j.Attributes["href"].Value));
            }

            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    string link = "https://e.gto.org.tr" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var basliklar = document.DocumentNode.SelectNodes("//h3").ToList();

                    var unvan = basliklar[0].InnerHtml.Trim();
                    var nace = basliklar[3].NextSibling.NextSibling.InnerText.Substring(0, 8);
                    var meslekGrubu = basliklar[1].NextSibling.NextSibling.InnerText.Split(' ')[0];
                    var adresEposta = document.DocumentNode.SelectNodes("//strong").Where(j => j.InnerText.Contains("Adres") || j.InnerText.Contains("E-posta")).ToList();
                    var adres = adresEposta.Count() >= 1 ? adresEposta[0].NextSibling.NextSibling.InnerText : "GAZİANTEP";
                    var eposta = adresEposta.Count() == 2 ? adresEposta[1].NextSibling.NextSibling.InnerText : "";
                    var firma = new Firma();
                    firma.Unvan = unvan;
                    firma.Nace = nace;
                    firma.Eposta = eposta;
                    firma.MeslekGrubu = meslekGrubu;
                    firma.Il = "GAZİANTEP";
                    firma.Adres = adres.Replace("GAZİANTEP", "");
                    firma.Ilce = adres.Split(' ')[adres.Split(' ').Count() - 2];
                    firma.Kaynak = "GAZİANTEP TİCARET ODASI";
                    firma.KaynakTip = "SANAYİ ODALARI";
                    firma.KaynakGuid = item.Split('/').LastOrDefault();
                    firmalar.Add(firma);
                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            var excel = firmalar.ToExcel(scheme => scheme
           .AddColumn("Ünvan", x => x.Unvan)
           .AddColumn("Nace", x => x.Nace)
           .AddColumn("Eposta", x => x.Eposta)
           .AddColumn("MeslekGrubu", x => x.MeslekGrubu)
           .AddColumn("Il", x => x.Il)
           .AddColumn("Adres", x => x.Adres)
           .AddColumn("Ilce", x => x.Ilce)
           .AddColumn("Kaynak", x => x.Kaynak)
           .AddColumn("KaynakTip", x => x.KaynakTip));

            System.IO.File.WriteAllBytes(@"D:\Gaziantep Ticaret Odası.xlsx", excel);

        }

        public void IzmirTicaret()
        {
            var db = new Db();

            IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.

            // navigate to URL  


            for (int i = 1; i <= 79; i++)
            {
                var firmaListe = new List<Firma>();
                driver.Navigate().GoToUrl("https://eoda.izto.org.tr/web/uye_firmalar_yeni.aspx");
                try
                {
                    {

                        IWebElement meslekGrup = driver.FindElementSafe(By.Id("cbMeslekGrup_I"));
                        meslekGrup.Click();

                        //IWebElement option = driver.FindElement(By.XPath("//td[text()='01-YAŞ SEBZE MEYVE GRUBU']"));
                        IWebElement option = driver.FindElement(By.XPath($"//td[starts-with(text(),'{i}')]"));
                        option.Click();


                        IWebElement ara = driver.FindElementSafe(By.Id("btnsorgula_BImg"));
                        ara.Click();

                        while (driver.FindElementSafe(By.Id("GrdUye_DXDataRow0")) == null)
                        {
                            System.Threading.Thread.Sleep(1000);
                        }

                        IWebElement liste = driver.FindElementSafe(By.Id("GrdUye_DXMainTable"));
                        string listeHtml = liste.GetAttribute("innerHTML");

                        document.LoadHtml(listeHtml);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var rows = document.DocumentNode.SelectNodes("//tr").Where(j => j.HasClass("dxgvDataRow_Office2003Blue")).ToList();
                        foreach (var row in rows)
                        {
                            var cols = row.Descendants("td").Where(j => j.HasClass("dxgv")).ToList();
                            var firma = new Firma();
                            firma.OdaSicilNo = cols[0].InnerText;
                            firma.TicaretSicilNo = cols[1].InnerText;
                            firma.MeslekGrubu = cols[3].InnerText;
                            firma.Nace = cols[4].InnerText.Substring(0, 8);
                            firma.Unvan = cols[6].InnerText;
                            firma.Adres = cols[7].InnerText;
                            firma.Telefon = cols[8].InnerText;
                            firma.WebSitesi = cols[10].InnerText;
                            firma.Yetkili = cols[11].InnerText;
                            firma.Kaynak = "İZMİR TİCARET ODASI";
                            firma.KaynakTip = "STO";
                            firma.Il = "İZMİR";
                            firma.Ilce = Regex.Replace(firma.Adres, @"\s+", " ").Replace("/ İZMİR", "").Trim().Split(' ').LastOrDefault();
                            firmaListe.Add(firma);
                        }


                    }

                }
                catch (Exception ex)
                {
                    var a = 1;
                    continue;
                }

                db.Firma.AddRange(firmaListe);
                db.BulkSaveChanges();
            }



            driver.Close();
        }

        public void IzmirSanayi()
        {
            var db = new Db();


            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.

            // navigate to URL  


            for (int i = 1; i <= 64; i++)
            {
                IWebDriver driver = new ChromeDriver(@"C:\WebDrivers");
                var firmaListe = new List<Firma>();
                driver.Navigate().GoToUrl("http://uye.ebso.org.tr/");
                try
                {
                    {


                        IWebElement meslekGrup = driver.FindElementSafe(By.Id("ContentPlaceHolder1_Drp_MeslekKomitesi"));
                        var selectElement = new SelectElement(meslekGrup);
                        var selectvalue = i.ToString().PadLeft(2, '0');
                        selectElement.SelectByValue(selectvalue);


                        IWebElement ara = driver.FindElementSafe(By.Id("ContentPlaceHolder1_Kayit"));
                        ara.Click();

                        IWebElement option = driver.FindElement(By.XPath("//*[@id='s2id_autogen1']/a"));
                        option.Click();


                        //IWebElement sayfalama = driver.FindElementSafe(By.Id("s2id_autogen2_search"));
                        //sayfalama.SendKeys("HEPSİ");

                        IWebElement hepsi = driver.FindElement(By.XPath("//*[@id='select2-results-2']/li[5]"));
                        hepsi.Click();



                        IWebElement liste = driver.FindElementSafe(By.Id("sample_2"));
                        string listeHtml = liste.GetAttribute("innerHTML");

                        document.LoadHtml(listeHtml);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var rows = document.DocumentNode.SelectNodes("//tr").Skip(1).ToList();
                        foreach (var row in rows)
                        {
                            var cols = row.Descendants("td").ToList();
                            var firma = new Firma();
                            firma.OdaSicilNo = cols[0].InnerText;
                            firma.Unvan = cols[1].InnerText;
                            firma.Adres = cols[3].InnerText;
                            firma.Telefon = cols[4].InnerText;
                            firma.MeslekGrubu = Regex.Replace(cols[6].InnerText.Trim(), @"\s+", " ");
                            firma.Nace = cols[7].InnerText.Substring(1, 8);
                            firma.WebSitesi = cols[8].InnerText.Contains("ebso.org") ? "" : cols[8].InnerText;
                            firma.TicaretSicilNo = cols[9].InnerText;
                            firma.Yetkili = cols[10].InnerText;
                            firma.Kaynak = "İZMİR SANAYİ ODASI";
                            firma.KaynakTip = "STO";
                            firma.Il = "İZMİR";
                            firmaListe.Add(firma);
                        }


                    }

                }
                catch (Exception ex)
                {
                    var a = 1;
                    continue;
                }

                db.Firma.AddRange(firmaListe);
                db.BulkSaveChanges();
                driver.Close();
            }




        }

        public void BursaTicaret()
        {
            var db = new Db();
            var sayfaSayisi = 64;

            for (int i = 39; i < sayfaSayisi; i++)
            {
                var firmalar = new List<Firma>();
                var firmaDetaySayfaları = new List<string>();
                for (int j = 1; j < 50; j++)
                {
                    try
                    {
                        string link = $"https://www.btso.org.tr/?page=members/members.asp&qpage={j}&meslekgruptanimi={i.ToString().PadLeft(2, '0')}.%20GRUP&qorder=";

                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                        WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                        client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var a = document.DocumentNode.SelectNodes("//a").Where(x => x.Attributes["href"].Value.Contains("members/membersopen") && x.InnerText.Trim() == "FAAL").ToList();
                        firmaDetaySayfaları.AddRange(a.Select(x => x.Attributes["href"].Value));
                    }
                    catch (Exception)
                    {

                        break;
                    }

                }


                foreach (var item in firmaDetaySayfaları)
                {
                    try
                    {
                        string link = $"https://www.btso.org.tr/{item}";

                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                        WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                        client.Encoding = Encoding.GetEncoding("iso-8859-9"); //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var rows = document.DocumentNode.SelectNodes("//tr").ToList();

                        var firma = new Firma();
                        firma.Unvan = rows[1].InnerText.Trim();
                        firma.Nace = rows[4].InnerText.Trim().Split(' ').LastOrDefault();
                        firma.MeslekGrubu = i.ToString().PadLeft(2, '0');
                        firma.Adres = Regex.Replace(rows[8].InnerText.Trim(), @"\s+", " ").Replace("Adres : ", "");
                        firma.Telefon = Regex.Replace(rows[9].InnerText.Trim(), @"\s+", " ").Replace("Telefon :", "");
                        firma.Eposta = Regex.Replace(rows[11].InnerText.Trim(), @"\s+", " ").Replace("E-mail :", "");
                        firma.WebSitesi = Regex.Replace(rows[12].InnerText.Trim(), @"\s+", " ").Replace("Web :", "");
                        firma.Kaynak = "BURSA SANAYİ VE TİCARET ODASI";
                        firma.KaynakTip = "STO";
                        firma.KaynakGuid = item.Split('?').LastOrDefault();
                        firma.Il = "BURSA";
                        firma.Ilce = Regex.Replace(rows[8].InnerText.Trim(), @"\s+", " ").Replace("Adres : ", "").Replace(" BURSA", "").Split(' ').LastOrDefault();

                        firmalar.Add(firma);
                    }
                    catch (Exception)
                    {
                        continue;
                    }
                }

                db.Firma.AddRange(firmalar);
                db.BulkSaveChanges();



            }



        }

        public void DenizliTicaret()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 513;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://e.dto.org.tr/Members?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var a = document.DocumentNode.SelectNodes("//a").Where(j => j.Attributes["href"].Value.Contains("MemberProfile/View")).ToList();
                firmaDetaySayfaları.AddRange(a.Select(j => j.Attributes["href"].Value));
            }

            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    string link = "https://e.dto.org.tr" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var basliklar = document.DocumentNode.SelectNodes("//h3").ToList();

                    var unvan = basliklar[0].InnerHtml.Trim();
                    var nace = basliklar[2].NextSibling.NextSibling.InnerText.Substring(0, 8);

                    var adresEposta = document.DocumentNode.SelectNodes("//strong").Where(j => j.InnerText.Contains("Adres") || j.InnerText.Contains("E-posta") || j.InnerText.Contains("Telefon")).ToList();
                    var adres = adresEposta.Count(j => j.InnerText == "Adres") == 1 ? adresEposta.FirstOrDefault(j => j.InnerText == "Adres").NextSibling.NextSibling.InnerText : "DENİZLİ";
                    var eposta = adresEposta.Count(j => j.InnerText == "E-posta") == 1 ? adresEposta.FirstOrDefault(j => j.InnerText == "E-posta").NextSibling.NextSibling.InnerText : "";
                    var telefon = adresEposta.Count(j => j.InnerText == "Telefon") == 1 ? adresEposta.FirstOrDefault(j => j.InnerText == "Telefon").NextSibling.NextSibling.InnerText : "";
                    var firma = new Firma();
                    firma.Unvan = unvan;
                    firma.Nace = nace;
                    firma.Eposta = eposta;
                    firma.Il = "DENİZLİ";
                    firma.Adres = adres.Replace("DENİZLİ", "");
                    firma.Ilce = adres.Split(' ')[adres.Split(' ').Count() - 2];
                    firma.Kaynak = "DENİZLİ TİCARET ODASI";
                    firma.KaynakTip = "TSO";
                    firma.KaynakGuid = item.Split('/').LastOrDefault();
                    firmalar.Add(firma);
                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(firmalar);
            db.BulkSaveChanges();


        }

        public void KonyaTicaret()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            //var sayfaSayisi = 2724;
            var sayfaSayisi = 2724;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = $"http://www.kto.org.tr/c_search_member.php?page={i}&BOLGEKODU=4200";  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.
                client.Headers.Add("Cookie", "PHPSESSID=i04fuc0ncpp8ebo11j2akjq713");

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var a = document.DocumentNode.SelectNodes("//a").Where(j => j.Attributes["href"].Value.Contains("c_member_detail.php")).ToList();
                firmaDetaySayfaları.AddRange(a.Where(x => !x.ParentNode.ParentNode.InnerText.Contains("Faal Değil")).Select(j => j.Attributes["href"].Value));
            }

            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    string link = "http://www.kto.org.tr/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var tablolar = document.DocumentNode.SelectNodes("//table").Where(i => i.HasClass("c_info")).ToList();

                    var satirlar = document.DocumentNode.SelectNodes("//tr").ToList();
                    var unvan = satirlar[0].InnerText.Replace("Ticaret Unvanı", "");
                    var meslekGrubu = satirlar[2].InnerText.Replace("Meslek Grubu", "");
                    var nace = satirlar[3].InnerText.Replace("NACE Kodu", "").Substring(0, 8);
                    var adres = satirlar[4].InnerText.Replace("Adres", "");
                    var websitesi = satirlar[5].ChildNodes[3].InnerText;
                    var tel = satirlar[6].InnerText.Replace("Telefon", "");
                    var odaSicil = satirlar[7].ChildNodes[1].InnerText;
                    var ticaretSicl = satirlar[7].ChildNodes[3].InnerText;
                    var vergiDairesi = satirlar[9].ChildNodes[1].InnerText;
                    var vergiNo = satirlar[9].ChildNodes[3].InnerText;
                    var sirketTipi = satirlar[10].ChildNodes[1].InnerText;

                    var firma = new Firma();
                    firma.Unvan = unvan;
                    firma.MeslekGrubu = meslekGrubu;
                    firma.Nace = nace;
                    firma.Adres = adres;
                    firma.Il = "KONYA";
                    firma.WebSitesi = websitesi;
                    firma.Telefon = tel;
                    firma.OdaSicilNo = odaSicil;
                    firma.TicaretSicilNo = ticaretSicl;
                    firma.VergiDairesi = vergiDairesi;
                    firma.VergiNo = vergiNo;
                    firma.Kaynak = "KONYA TİCARET ODASI";
                    firma.KaynakTip = "TSO";
                    firma.KaynakGuid = item.Split('=').LastOrDefault();

                    if (tablolar.Count() == 3)
                    {
                        var yetkiliTablosu = tablolar[2];
                        var yetkiliRow = yetkiliTablosu.ChildNodes.Where(i => i.Name == "tr").Skip(1).ToList();
                        var yetkililer = yetkiliRow.Select(i => i.ChildNodes[0].InnerText).Aggregate((a, b) => a + "," + b);
                        firma.Yetkili = yetkililer;
                    }


                    firmalar.Add(firma);



                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(firmalar);
            db.BulkSaveChanges();


        }

        public void KonyaSanayi()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            //var sayfaSayisi = 2724;
            var sayfaSayisi = 79;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 6; i <= sayfaSayisi; i++)
            {
                string link = "https://www.kso.org.tr/uyeler?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.


                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var uyeDivs = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("post-content")).ToList();
                foreach (var uyeDiv in uyeDivs)
                {
                    try
                    {
                        var unvan = uyeDiv.Descendants("a").FirstOrDefault().InnerText;
                        var spans = uyeDiv.Descendants("span").ToList();
                        var eposta = "";
                        var webSitesi = "";
                        if (spans.Count == 2)
                        {
                            eposta = spans[1].InnerText.Trim();
                            if (eposta != ""
                                && !eposta.Contains("hotmail")
                                && !eposta.Contains("gmail")
                                && !eposta.Contains("yahoo")
                                && !eposta.Contains("msn.com")
                                && !eposta.Contains("yandex")
                                && !eposta.Contains("ttnet.net.tr")
                                && eposta.Contains("@")
                                )
                            {
                                webSitesi = eposta.Split('@')[1].Trim();
                            }

                        }

                        firmalar.Add(new Firma
                        {
                            Unvan = unvan,
                            Eposta = eposta,
                            WebSitesi = webSitesi
                        });
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }
                }
            }
            var insertlist = new List<Firma>();
            foreach (var item in firmalar)
            {
                try
                {
                    if (db.Firma.FirstOrDefault(a => a.WebSitesi != "" && a.WebSitesi == item.WebSitesi) != null)
                    {
                        var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);

                        if (f.Kaynak != null && !f.Kaynak.Contains("KONYA SANAYİ ODASI"))
                        {
                            f.Kaynak = f.Kaynak + ",KONYA SANAYİ ODASI";
                        }
                        else
                        {
                            f.Kaynak = "KONYA SANAYİ ODASI";
                        }

                        if (f.Eposta == "")
                        {
                            f.Eposta = item.Eposta;
                        }
                        else if (f.Eposta != "" && f.Eposta != item.Eposta)
                        {
                            var _f = new Firma();
                            foreach (var prop in item.GetType().GetProperties())
                            {
                                _f.GetType().GetProperty(prop.Name).SetValue(_f, prop.GetValue(item, null), null);
                            };
                            _f.Eposta = item.Eposta;
                            _f.KayıtTarihi = DateTime.Now;
                            insertlist.Add(_f);
                        }

                        if (f.KaynakTip != null && !f.KaynakTip.Contains("TSO"))
                        {
                            f.KaynakTip = f.KaynakTip + ",TSO";
                        }
                        else
                        {
                            f.KaynakTip = "TSO";
                        }
                    }
                    else
                    {
                        item.Kaynak = "KONYA SANAYİ ODASI";
                        item.KaynakTip = "TSO";
                        item.KayıtTarihi = DateTime.Now;
                        insertlist.Add(item);

                    }
                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            try
            {
                insertlist.ForEach(f => f.Il = "KONYA");
                db.Firma.AddRange(insertlist);
                db.BulkSaveChanges();
            }
            catch (Exception ex)
            {
                var a = 1;
            }



        }

        public void EskiSehirSanayi()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            //var sayfaSayisi = 2724;
            var sayfaSayisi = 2724;
            var firmaDetaySayfaları = new List<string>();

            string link = $"https://www.eso.org.tr/firma-liste";  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.


            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            firmaDetaySayfaları = document.DocumentNode.SelectNodes("//a").Where(j => j.Attributes["href"].Value.Contains("firma-detay")).Select(i => i.Attributes["href"].Value).ToList();


            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    link = "https://www.eso.org.tr/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz




                    var firma = new Firma();

                    var tablolar = document.DocumentNode.SelectNodes("//table").Where(i => i.HasClass("c_info")).ToList();

                    firmalar.Add(firma);



                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(firmalar);
            db.BulkSaveChanges();


        }

        public void TOBB()
        {
            var naceler = new List<int>
            {
                30370,
            30380,
            30385,
            30390,
            30590,
            30790,
            30830,
            30840,
            30850,
            30860,
            30870,
            30880,
            30890,
            30900,
            30910,
            30920,
            30930,
            30940,
            30950,
            30960,
            30970,
            30980,
            30990,
            31000,
            31010,
            31020,
            31030,
            31040,
            31050,
            31060,
            31070,
            31080,
            31090,
            31100,
            31110,
            31120,
            31130,
            31140,
            31150,
            31160,
            31170,
            31180,
            31190,
            31200,
            31210,
            31220,
            31230,
            31240,
            31250,
            31260,
            31270,
            31280,
            31290,
            31300,
            31310,
            31320,
            31330,
            31340,
            31350,
            31360,
            31370,
            31380,
            31390,
            31400,
            31410,
            31420,
            31430,
            31440,
            31450,
            31460,
            31470,
            31480,
            31490,
            31500,
            31510,
            31520,
            31530,
            31540,
            31550,
            31560,
            31570,
            31580,
            31590,
            31600,
            31610,
            31620,
            31630,
            31640,
            31650,
            31660,
            31670,
            31680,
            31690,
            31700,
            31710,
            31720,
            31730,
            31740,
            31750,
            31760,
            31770,
            31780,
            31790,
            31800,
            31810,
            31820,
            31830,
            31840,
            31850,
            31860,
            31870,
            31880,
            31890,
            31900,
            31910,
            31920,
            31930,
            31940,
            31950,
            31960,
            31970,
            31980,
            31990,
            32000,
            32010,
            32020,
            32030,
            32040,
            32050,
            32060,
            32080,
            32090,
            32100,
            32110,
            32120,
            32130,
            32140,
            32150,
            32160,
            32170,
            32175,
            32180,
            32190,
            32200,
            32210,
            32220,
            32230,
            32240,
            32250,
            32260,
            32270,
            32280,
            32290,
            32300,
            32310,
            32320,
            32360,
            32370,
            32380,
            32390,
            32400,
            32410,
            32420,
            32430,
            32444,
            32446,
            32448,
            32460,
            32480,
            32490,
            32500,
            32510,
            32520,
            32530,
            32540,
            32550,
            32560,
            32570,
            32580,
            32590,
            32600,
            32610,
            32620,
            32630,
            32640,
            32650,
            32660,
            32670,
            32680,
            32690,
            32700,
            32710,
            32720,
            32730,
            32740,
            32760,
            32770,
            32780,
            32790,
            32800,
            32810,
            32820,
            32830,
            32840,
            32850,
            32855,
            32860,
            32870,
            32880,
            32890,
            32900,
            32910,
            32920,
            32930,
            32940,
            32950,
            32960,
            32970,
            32980,
            32990,
            33000,
            33010,
            33020,
            33030,
            33040,
            33050,
            33060,
            33070,
            33080,
            33090,
            33100,
            33110,
            33120,
            33130,
            33135,
            33140,
            33150,
            33160,
            33170,
            33180,
            33190,
            33200,
            33210,
            33220,
            33230,
            33240,
            33250,
            33260,
            33270,
            33280,
            33290,
            33300,
            33310,
            33320,
            33330,
            33350,
            33360,
            33370,
            33380,
            33390,
            33400,
            33410,
            33420,
            33430,
            33440,
            33455,
            33460,
            33470,
            33480,
            33490,
            33500,
            33510,
            33520,
            33530,
            33540,
            33550,
            33560,
            33570,
            33580,
            33590,
            33600,
            33610,
            33620,
            33630,
            33640,
            33650,
            33660,
            33670,
            33680,
            33690,
            33700,
            33710,
            33720,
            33730,
            33740,
            33750,
            33760,
            33780,
            33790,
            33800,
            33810,
            33820,
            33840,
            33850,
            33860,
            33870,
            33880,
            33890,
            33895,
            33900,
            33910,
            33920,
            33930,
            33940,
            33950,
            33960,
            33970,
            33980,
            33990,
            34000,
            34010,
            34020,
            34030,
            34040,
            34050,
            34060,
            34070,
            34080,
            34090,
            34100,
            34110,
            34120,
            34130,
            34135,
            34136,
            34137,
            34138,
            34140,
            34160,
            34170,
            34180,
            34190,
            34200,
            34210,
            34220,
            34230,
            34240,
            34250,
            34260,
            34280,
            34290,
            34300,
            34310,
            34320,
            34330,
            34340,
            34350,
            34360,
            34370,
            34380,
            34390,
            34400,
            34410,
            34420,
            34430,
            34440,
            34450,
            34460,
            34470,
            34480,
            34490,
            34500,
            34510,
            34520,
            34530,
            34540,
            34550,
            34560,
            34570,
            34580,
            34590,
            34600,
            34610,
            34620,
            34630,
            34640,
            34650,
            34660,
            34670,
            34680,
            34690,
            34700,
            34710,
            34720,
            34730,
            34740,
            34750,
            34760,
            34770,
            34780,
            34790,
            34800,
            34810,
            34820,
            34830,
            34840,
            34850,
            34860,
            34870,
            34880,
            34890,
            34900,
            34910,
            34920,
            34930,
            34940,
            34950,
            34960,
            34970,
            34980,
            34990,
            35000,
            35010,
            35020,
            35030,
            35040,
            35050,
            35060,
            35070,
            35080,
            35090,
            35100,
            35110,
            35120,
            35130,
            35140,
            35150,
            35160,
            35170,
            35180,
            35190,
            35200,
            35210,
            35220,
            35230,
            35250,
            35260,
            35270,
            35280,
            35290,
            35300,
            35305,
            35310,
            35320,
            35330,
            35340,
            35350,
            35360,
            35370,
            35380,
            35390,
            35400,
            35410,
            35420,
            35430,
            35440,
            35450,
            35460,
            35470,
            35480,
            35490,
            35495,
            35500,
            35510,
            35520,
            35530,
            35540,
            35550,
            35560,
            35570,
            35580,
            35590,
            35600,
            35620,
            35630,
            35640,
            35650,
            35660,
            35670,
            35680,
            35690,
            35700,
            35710,
            35730,
            35740,
            35750,
            35760,
            35770,
            35780,
            35790,
            35800,
            35810,
            35820,
            35830,
            35840,
            35850,
            35860,
            35870,
            35880,
            35890,
            35900,
            35905,
            35910,
            35920,
            35930,
            35940,
            35950,
            35960,
            35970,
            35980,
            35990,
            36000,
            36010,
            36020,
            36030,
            36040,
            36050,
            36055,
            36060,
            36070,
            36080,
            36090,
            36100,
            36110,
            36130,
            36140,
            36150,
            36160,
            36170,
            36180,
            36190,
            36200,
            36210,
            36220,
            36230,
            36240,
            36250,
            36260,
            36270,
            36280,
            36290,
            36300,
            36310,
            36320,
            36330,
            36340,
            36350,
            36360,
            36370,
            36380,
            36390,
            36400,
            36410,
            36420,
            36430,
            36440,
            36450,
            36460,
            36470,
            36490,
            36500,
            36510,
            36520,
            36530,
            36540,
            36550,
            36560,
            36580,
            36590,
            36610,
            36620,
            36630,
            36635,
            36660,
            36670,
            36680,
            36690,
            36700,
            36705,
            36710,
            36720,
            36730,
            36740,
            36750,
            36760,
            36770,
            36780,
            36790,
            36800,
            36810,
            36820,
            36830,
            36840,
            36850,
            36870,
            36880,
            36890,
            36900,
            36910,
            36920,
            36930,
            36940,
            36950,
            36960,
            36970,
            36975,
            36980,
            36990,
            37000,
            37010,
            37020,
            37030,
            37040,
            37050,
            37055,
            37060,
            37070,
            37080,
            37090,
            37100,
            37110,
            37120,
            37130,
            37140,
            37150,
            37160,
            37170,
            37180,
            37190,
            37200,
            37210,
            37220,
            37230,
            37240,
            37250,
            37260,
            37270,
            37280,
            37290,
            37300,
            37310,
            37320,
            37330,
            37340,
            37350,
            37360,
            37370,
            37375,
            37380,
            37390,
            37400,
            37410,
            37420,
            37430,
            37435,
            37440,
            37450,
            37460,
            37470,
            37480,
            37490,
            37500,
            37510,
            37520,
            37525,
            37530,
            37540,
            37550,
            37560,
            37570,
            37580,
            37590,
            37600,
            37610,
            37620,
            37630,
            37640,
            37650,
            37660,
            37670,
            37680,
            37690,
            37700,
            37710,
            37720,
            37730,
            37740,
            37750,
            37760,
            37770,
            37780,
            37790,
            37800,
            37810,
            37820,
            37830,
            37840,
            37850,
            37860,
            37870,
            37880,
            37890,
            37900,
            37910,
            37920,
            37930,
            37940,
            37950,
            37960,
            37970,
            37980,
            37990,
            38000,
            38010,
            38020,
            38030,
            38035,
            38040,
            38050,
            38060,
            38070,
            38080,
            38090,
            38100,
            38110,
            38120,
            38130,
            38140,
            38150,
            38160,
            38170,
            38180,
            38190,
            38200,
            38210,
            38220,
            38230,
            38240,
            38250,
            38260,
            38270,
            38280,
            38290,
            38300,
            38310,
            38320,
            38330,
            38340,
            38350,
            38360,
            38380,
            38390,
            38400,
            38410,
            38420,
            38430,
            38440,
            38450,
            38460,
            38465,
            38470,
            38480,
            38490,
            38500,
            38510,
            38520,
            38530,
            38540,
            38550,
            38560,
            38570,
            38580,
            38585,
            38590,
            38600,
            38610,
            38620,
            38630,
            38640,
            38650,
            38660,
            38670,
            38680,
            38690,
            38700,
            38710,
            38720,
            38730,
            38740,
            38750,
            38760,
            38770,
            38780,
            38790,
            38800,
            38810,
            38820,
            38830,
            38840,
            38850,
            38860,
            38870,
            38880,
            38890,
            38900,
            38910,
            38920,
            38930,
            38940,
            38950,
            38960,
            38970,
            38980,
            38990,
            39000,
            39005,
            39010,
            39020,
            39030,
            39040,
            39050,
            39060,
            39070,
            39080,
            39090,
            39100,
            39110,
            39120,
            39130,
            39140,
            39145,
            39150,
            39160,
            39170,
            39180,
            39190,
            39200,
            39210,
            39220,
            39230,
            39240,
            39250,
            39260,
            39270,
            39280,
            39290,
            39300,
            39310,
            39320,
            39330,
            39340,
            39350,
            39360,
            39370,
            39380,
            39390,
            39400,
            39410,
            39420,
            39430,
            39440,
            39450,
            39460,
            39470,
            39475,
            39480,
            39490,
            39500,
            39510,
            39520,
            39530,
            39540,
            39550,
            39560,
            39570,
            39580,
            39590,
            39595,
            39600,
            39610,
            39620,
            39625,
            39630,
            39640,
            39650,
            39660,
            39670,
            39680,
            39690,
            39700,
            39710,
            39720,
            39740,
            39750,
            39760,
            39770,
            39780,
            39790,
            39800,
            39810,
            39820,
            39830,
            39840,
            39850,
            39860,
            39870,
            39880,
            39890,
            39900,
            39910,
            39920,
            39930,
            39940,
            39950,
            39960,
            39970,
            39980,
            39990,
            40000,
            40010,
            40020,
            40030,
            40040,
            40050,
            40060,
            40070,
            40080,
            40090,
            40100,
            40110,
            40120,
            40130,
            40140,
            40150,
            40160,
            40170,
            40180,
            40190,
            40200,
            40210,
            40220,
            40230,
            40240,
            40250,
            40260,
            40270,
            40280,
            40290,
            40300,
            40310,
            40320,
            40330,
            40340,
            40350,
            40360,
            40370,
            40380,
            40390,
            40400,
            40410,
            40420,
            40430,
            40440,
            40450,
            40460,
            40470,
            40480,
            40490,
            40500,
            40510,
            40520,
            40530,
            40540,
            40545,
            40550,
            40560,
            40570,
            40580,
            40590,
            40600,
            40610,
            40620,
            40630,
            40640,
            40650,
            40660,
            40670,
            40680,
            40690,
            40700,
            40710,
            40720,
            40730,
            40740,
            40750,
            40760,
            40770,
            40780,
            40790,
            40795,
            40800,
            40810,
            40820,
            40830,
            40835,
            40840,
            40850,
            40860,
            40870,
            40880,
            40890,
            40900,
            40910,
            40920,
            40930,
            40940,
            40950,
            40960,
            40970,
            40975,
            40976,
            40980,
            40990,
            41000,
            41010,
            41020,
            41030,
            41040,
            41050,
            41060,
            41070,
            41080,
            41090,
            41100,
            41110,
            41120,
            41130,
            41140,
            41150,
            41160,
            41170,
            41180,
            41190,
            41200,
            41210,
            41220,
            41230,
            41240,
            41250,
            41260,
            41270,
            41280,
            41290,
            41300,
            41310,
            41320,
            41330,
            41340,
            41350,
            41360,
            41370,
            41380,
            41390,
            41400,
            41410,
            41420,
            41430,
            41440,
            41510,
            41520,
            41530,
            41540,
            41550,
            41560,
            41570,
            41580,
            47470,
            51691,
            51692
            };
            var db = new Db();
            var firmalar = new List<Firma>();
            
            var ck = "JSESSIONID=24jphFdJ1hQXjdcyT9LzMg3ybv6W3wY7JpDVpdj5zNqG6rxH2RQv!1404508573";

            var request = (HttpWebRequest)WebRequest.Create("http://uygulama.tobb.net/UyeBilgiSorgulama/fw_uyeBilgiServisi.do");
            var sayac = 0;
            

            request.Method = "GET";
            request.Headers.Add(HttpRequestHeader.Cookie, ck);

            WebResponse webResponse = request.GetResponse();

            StreamReader reader = new StreamReader(webResponse.GetResponseStream(), Encoding.GetEncoding("ISO-8859-9"));

            string responseText = reader.ReadToEnd();


            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(responseText);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var options = document.DocumentNode.SelectNodes("//select[@name='naceFaaliyetSiraNo']/option").Select(i=>i.Attributes["value"]).Select(i=>i.Value).ToList();

            foreach (var nace in options)
            {
                sayac++;
                try
                {
                    request = (HttpWebRequest)WebRequest.Create("http://uygulama.tobb.net/UyeBilgiSorgulama/selectFirmaListesi.do?mode=find");

                    var postData = "kurumUnvani=" + Uri.EscapeDataString("");
                    postData += "&naceFaaliyetSiraNo=" + Uri.EscapeDataString(nace.ToString());
                    var data = Encoding.ASCII.GetBytes(postData);

                    request.Method = "POST";
                    request.Headers.Add(HttpRequestHeader.Cookie, ck);
                    request.ContentType = "application/x-www-form-urlencoded";
                    request.ContentLength = data.Length;

                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(data, 0, data.Length);
                    }

                    var response = (HttpWebResponse)request.GetResponse();

                    var responseString = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("ISO-8859-9")).ReadToEnd();

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(responseString);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var kayitSayısıNode = document.DocumentNode.SelectNodes("//*[@align='right']");
                    var kayitSayisi = 0;
                    if (kayitSayısıNode != null)
                    {
                        kayitSayisi = Convert.ToInt32(kayitSayısıNode.FirstOrDefault().InnerText.Split('/').LastOrDefault());
                    }
                    for (int i = 0; i < kayitSayisi; i++)
                    {
                        try
                        {
                            var firma = new Firma();
                            request = (HttpWebRequest)WebRequest.Create($"http://uygulama.tobb.net/UyeBilgiSorgulama/selectFirmaListesi.do?mode=getDetail&index={i}");


                            request.Method = "GET";
                            request.Headers.Add(HttpRequestHeader.Cookie, ck);

                             webResponse = request.GetResponse();

                             reader = new StreamReader(webResponse.GetResponseStream(), Encoding.GetEncoding("ISO-8859-9"));

                             responseText = reader.ReadToEnd();

                            document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                            document.LoadHtml(responseText);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                            firma.Unvan = document.DocumentNode.SelectSingleNode("//*[@class='tableHeader']").InnerText.Trim();
                            firma.TicaretSicilNo = document.DocumentNode.SelectSingleNode("//th[contains(text(),'Sicil No')]").NextSibling.NextSibling.InnerText.Trim();
                            firma.Nace = document.DocumentNode.SelectSingleNode("//th[contains(text(),'Nace Faaliyet Kodu')]").NextSibling.NextSibling.InnerText.Trim().Split('-').FirstOrDefault();
                            firma.Eposta = document.DocumentNode.SelectSingleNode("//th[contains(text(),'E-Posta')]").NextSibling.NextSibling.InnerText.Trim();
                            firma.WebSitesi = document.DocumentNode.SelectSingleNode("//th[contains(text(),'Web Adresi')]").NextSibling.NextSibling.InnerText.Trim();
                            var adresNode = document.DocumentNode.SelectSingleNode("//td[contains(text(),'TESCİL ADRESİ')]");
                            firma.Adres = adresNode != null ? adresNode.NextSibling.NextSibling.InnerText.Trim() : "";
                            firma.Il = "AYDIN";
                            firma.Kaynak = "AYDIN SANAYİ ODASI";
                            firma.KaynakTip = "AYDIN ODASI";
                            firma.KayıtTarihi = DateTime.Now;
                            firmalar.Add(firma);
                        }
                        catch (Exception ex)
                        {

                            continue;
                        }


                    }
                }
                catch (Exception ex)
                {
                    continue;
                }

            }


            db.Firma.AddRange(firmalar);
            db.BulkSaveChanges();

        }




    }
}