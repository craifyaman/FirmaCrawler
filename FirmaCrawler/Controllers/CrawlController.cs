using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using ArrayToExcel;
using ExcelDataReader;
using FuarCrawler.Models;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace FirmaCrawler.Controllers
{
    public class CrawlController : Controller
    {
        // GET: Crawl
        //Tamamlandı 18:02:2022
        public void FirmaSayfasiCom()
        {
            var numberNames = new Dictionary<string, int>();
            numberNames.Add("istanbul", 1839);
            numberNames.Add("ankara", 551);
            numberNames.Add("izmir", 421);
            numberNames.Add("BURSA", 246);
            numberNames.Add("KONYA", 231);
            numberNames.Add("ANTALYA", 159);
            numberNames.Add("kocaeli", 140);
            numberNames.Add("kayseri", 97);
            numberNames.Add("gaziantep", 78);
            numberNames.Add("ADANA", 77);
            numberNames.Add("mersin", 74);
            numberNames.Add("denizli", 52);
            numberNames.Add("mugla", 48);
            numberNames.Add("tekirdag", 45);
            numberNames.Add("SAMSUN", 39);
            numberNames.Add("eskisehir", 37);
            numberNames.Add("aydin", 36);
            numberNames.Add("balikesir", 36);
            numberNames.Add("manisa", 34);
            numberNames.Add("SAKARYA", 33);
            numberNames.Add("HATAY", 31);
            numberNames.Add("diyarbakir", 22);
            numberNames.Add("afyon", 20);
            numberNames.Add("ZONGULDAK", 20);
            numberNames.Add("MALATYA", 19);
            numberNames.Add("sanliurfa", 18);
            numberNames.Add("KAHRAMANMARAS", 17);
            numberNames.Add("TRABZON", 16);
            numberNames.Add("CANAKKALE", 14);
            numberNames.Add("CORUM", 14);
            numberNames.Add("ERZURUM", 13);
            numberNames.Add("sivas", 13);
            numberNames.Add("kutahya", 12);
            numberNames.Add("mardin", 12);
            numberNames.Add("yalova", 12);
            numberNames.Add("elazig", 11);
            numberNames.Add("isparta", 11);
            numberNames.Add("nevsehir", 10);
            numberNames.Add("usak", 10);
            numberNames.Add("duzce", 10);
            numberNames.Add("KiRKLARELi", 9);
            numberNames.Add("ORDU", 9);
            numberNames.Add("AKSARAY", 8);
            numberNames.Add("AMASYA", 7);
            numberNames.Add("BOLU", 7);
            numberNames.Add("BURDUR", 7);
            numberNames.Add("EDiRNE", 7);
            numberNames.Add("KASTAMONU", 7);
            numberNames.Add("RiZE", 7);
            numberNames.Add("TOKAT", 7);
            numberNames.Add("KARAMAN", 7);
            numberNames.Add("BATMAN", 7);
            numberNames.Add("OSMANiYE", 7);
            numberNames.Add("ADiYAMAN", 6);
            numberNames.Add("agri", 6);
            numberNames.Add("VAN", 6);
            numberNames.Add("YOZGAT", 6);
            numberNames.Add("GiRESUN", 5);
            numberNames.Add("NigDE", 5);
            numberNames.Add("KiRiKKALE", 5);
            numberNames.Add("KARABuK", 5);
            numberNames.Add("SiNOP", 4);
            numberNames.Add("ARTViN", 3);
            numberNames.Add("BiLECiK", 3);
            numberNames.Add("ÇANKiRi", 3);
            numberNames.Add("ERZİNCAN", 3);
            numberNames.Add("KARS", 3);
            numberNames.Add("KiRsEHiR", 3);
            numberNames.Add("SiiRT", 3);
            numberNames.Add("BARTiN", 3);
            numberNames.Add("BiNGoL", 2);
            numberNames.Add("MUS", 2);
            numberNames.Add("siRNAK", 2);
            numberNames.Add("kilis", 2);
            numberNames.Add("bitlis", 1);
            numberNames.Add("gumushane", 1);
            numberNames.Add("hakkari", 1);
            numberNames.Add("tunceli", 1);
            numberNames.Add("bayburt", 1);
            numberNames.Add("ardahan", 1);
            numberNames.Add("igdir", 1);




            foreach (var item in numberNames)
            {
                var firma = new List<Firma>();
                var tümSayfalar = new List<string>();

                var harf = item.Key;
                var sayfa = item.Value;

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                for (int i = 1; i <= sayfa; i++)
                {
                    try
                    {

                        var link = $"http://www.firmasayfasi.com/iller/{harf}_{i}/";


                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var firmaUrls = document.DocumentNode.SelectNodes("//a").Where(w => w.HasClass("title") && w.ParentNode.ParentNode.ParentNode.ParentNode.ParentNode.HasClass("sol")).Select(s => s.Attributes["href"].Value).ToList();
                        tümSayfalar.AddRange(firmaUrls);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }

                foreach (var i in tümSayfalar)
                {

                    try
                    {
                        Uri url = new Uri(i); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz



                        var unvan = document.DocumentNode.SelectNodes("//h1").FirstOrDefault().InnerText;
                        var firmaYetkilisi = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_yetkili")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var telefon = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_tel")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var cepTel = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_gsm")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var web = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_web")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var sektor = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_sektor")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var adres = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_adres")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var etiket = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("etiket"))?.Select(s => s.InnerText.Trim())?.ToList().Aggregate((a, b) => a + "," + b);

                        var il = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("region")).FirstOrDefault().InnerText;
                        var ilce = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("locality")).FirstOrDefault().InnerText;

                        firma.Add(new Firma
                        {
                            Unvan = unvan,
                            Yetkili = firmaYetkilisi,
                            CepTelefon = cepTel,
                            WebSitesi = web.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                            Telefon = telefon.Replace(" ", ""),
                            Sektor = sektor,
                            Adres = adres,
                            Il = il,
                            Ilce = ilce,
                            Etiket = etiket,

                        });
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }


                }

                var items = firma.Select(x => new
                {
                    Unvan = x.Unvan,
                    Yetkili = x.Yetkili,
                    CepTelefon = x.CepTelefon,
                    WebSitesi = x.WebSitesi,
                    Telefon = x.Telefon,
                    Sektor = x.Sektor,
                    Adres = x.Adres,
                    Il = x.Il,
                    Ilce = x.Ilce,
                    Etiket = x.Etiket

                });

                var excel = items.ToExcel();

                System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\crawler\\FirmaSayfasiCom-{harf}.xlsx", excel);

            }


        }
        public void TurkiyeFirmaRehberiCom()
        {
            var numberNames = new Dictionary<int, int>();

            numberNames.Add(128, 10);
            numberNames.Add(161, 132);
            numberNames.Add(169, 56);
            numberNames.Add(133, 51);
            numberNames.Add(162, 16);
            numberNames.Add(143, 11);
            numberNames.Add(134, 9);
            numberNames.Add(165, 7);
            numberNames.Add(168, 6);
            numberNames.Add(154, 4);
            numberNames.Add(153, 3);
            numberNames.Add(160, 3);
            numberNames.Add(175, 3);
            numberNames.Add(202, 3);
            numberNames.Add(136, 2);
            numberNames.Add(137, 2);
            numberNames.Add(147, 2);
            numberNames.Add(148, 2);
            numberNames.Add(158, 2);
            numberNames.Add(171, 2);
            numberNames.Add(172, 2);
            numberNames.Add(181, 2);
            numberNames.Add(182, 2);
            numberNames.Add(186, 2);
            numberNames.Add(190, 2);
            numberNames.Add(129, 1);
            numberNames.Add(130, 1);
            numberNames.Add(131, 1);
            numberNames.Add(132, 1);
            numberNames.Add(135, 1);
            numberNames.Add(138, 1);
            numberNames.Add(139, 1);
            numberNames.Add(140, 1);
            numberNames.Add(141, 1);
            numberNames.Add(142, 1);
            numberNames.Add(144, 1);
            numberNames.Add(145, 1);
            numberNames.Add(146, 1);
            numberNames.Add(149, 1);
            numberNames.Add(150, 1);
            numberNames.Add(151, 1);
            numberNames.Add(152, 1);
            numberNames.Add(155, 1);
            numberNames.Add(156, 1);
            numberNames.Add(157, 1);
            numberNames.Add(159, 1);
            numberNames.Add(163, 1);
            numberNames.Add(164, 1);
            numberNames.Add(166, 1);
            numberNames.Add(167, 1);
            numberNames.Add(170, 1);
            numberNames.Add(173, 1);
            numberNames.Add(174, 1);
            numberNames.Add(176, 1);
            numberNames.Add(177, 1);
            numberNames.Add(178, 1);
            numberNames.Add(179, 1);
            numberNames.Add(180, 1);
            numberNames.Add(183, 1);
            numberNames.Add(184, 1);
            numberNames.Add(185, 1);
            numberNames.Add(187, 1);
            numberNames.Add(188, 1);
            numberNames.Add(189, 1);
            numberNames.Add(191, 1);
            numberNames.Add(192, 1);
            numberNames.Add(193, 1);
            numberNames.Add(194, 1);
            numberNames.Add(195, 1);
            numberNames.Add(196, 1);
            numberNames.Add(197, 1);
            numberNames.Add(198, 1);
            numberNames.Add(199, 1);
            numberNames.Add(200, 1);
            numberNames.Add(201, 1);
            numberNames.Add(203, 1);
            numberNames.Add(204, 1);
            numberNames.Add(205, 1);
            numberNames.Add(206, 1);
            numberNames.Add(207, 1);
            numberNames.Add(208, 1);



            foreach (var item in numberNames)
            {
                var firma = new List<Firma>();
                var tümSayfalar = new List<string>();

                var harf = item.Key;
                var sayfa = item.Value;

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                for (int i = 1; i <= sayfa; i++)
                {
                    try
                    {
                        var link = $"http://www.turkiyefirmarehberi.com/sehir-sayfa/{harf}-{i}-a.html";
                        //var link = $"http://www.turkiyefirmarehberi.com/sehir-sayfa/161-1-istanbul_firma_rehberi.html";

                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var firmaDivs = document.DocumentNode.SelectNodes("//div").Where(w => w.Attributes["id"].Value == "firma_katalog_index").ToList();
                        foreach (var firmaDiv in firmaDivs)
                        {
                            var firmaUrl = firmaDiv.SelectSingleNode("//div[2]/a");
                        }

                        var firmaUrls = document.DocumentNode.SelectNodes("//a").Where(w => w.HasClass("title") && w.ParentNode.ParentNode.ParentNode.ParentNode.ParentNode.HasClass("sol")).Select(s => s.Attributes["href"].Value).ToList();
                        tümSayfalar.AddRange(firmaUrls);
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }

                }

                foreach (var i in tümSayfalar)
                {

                    try
                    {
                        Uri url = new Uri(i); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); //siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz



                        var unvan = document.DocumentNode.SelectNodes("//h1").FirstOrDefault().InnerText;
                        var firmaYetkilisi = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_yetkili")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var telefon = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_tel")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var cepTel = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_gsm")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var web = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_web")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var sektor = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_sektor")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var adres = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("s_adres")).FirstOrDefault().NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.NextSibling.InnerText;
                        var etiket = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("etiket"))?.Select(s => s.InnerText.Trim())?.ToList().Aggregate((a, b) => a + "," + b);

                        var il = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("region")).FirstOrDefault().InnerText;
                        var ilce = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("locality")).FirstOrDefault().InnerText;

                        firma.Add(new Firma
                        {
                            Unvan = unvan,
                            Yetkili = firmaYetkilisi,
                            CepTelefon = cepTel,
                            WebSitesi = web.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                            Telefon = telefon.Replace(" ", ""),
                            Sektor = sektor,
                            Adres = adres,
                            Il = il,
                            Ilce = ilce,
                            Etiket = etiket
                        });
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }


                }

                var items = firma.Select(x => new
                {
                    Unvan = x.Unvan,
                    Yetkili = x.Yetkili,
                    CepTelefon = x.CepTelefon,
                    WebSitesi = x.WebSitesi,
                    Telefon = x.Telefon,
                    Sektor = x.Sektor,
                    Adres = x.Adres,
                    Il = x.Il,
                    Ilce = x.Ilce,
                    Etiket = x.Etiket

                });

                var excel = items.ToExcel();

                System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\crawler\\TurkiyeFirmaRehberiCom-{harf}.xlsx", excel);

            }


        }
        public void TurkMakinesanayiCom()
        {
            var letters = new List<string> { "A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "Q", "R", "S", "Ş", "T", "U", "Ü", "V", "W", "X", "Y", "Z" };

            foreach (var item in letters)
            {
                var firma = new List<Firma>();
                var tümSayfalar = new List<string>();

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                foreach (var letter in letters)
                {
                    try
                    {

                        var link = $"http://www.turkmakinesanayi.com/dernek-ve-uye-arama?q={letter}&type=association";

                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var firmaUrls = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("/profil/")).Select(s => s.Attributes["href"].Value).ToList();
                        tümSayfalar.AddRange(firmaUrls);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }

                tümSayfalar = tümSayfalar.Distinct().ToList();
                foreach (var i in tümSayfalar)
                {

                    try
                    {
                        Uri url = new Uri(i); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz



                        var unvan = document.DocumentNode.SelectNodes("//h1").FirstOrDefault().InnerText;
                        //var firmaYetkilisi = document.DocumentNode.SelectNodes("//th").Where(w => w.InnerText == "İhracat Yetkilisi").FirstOrDefault().NextSibling.NextSibling.InnerText;
                        var adres = document.DocumentNode.SelectNodes("//th").Where(w => w.InnerText == "Adres").FirstOrDefault().NextSibling.NextSibling.InnerText;
                        var web = document.DocumentNode.SelectNodes("//th").Where(w => w.InnerText == "Web Adresi").FirstOrDefault().NextSibling.NextSibling.InnerText;
                        var eposta = document.DocumentNode.SelectNodes("//th").Where(w => w.InnerText == "E-Posta").FirstOrDefault().NextSibling.NextSibling.InnerText;


                        firma.Add(new Firma
                        {
                            Unvan = unvan,
                            //Yetkili = firmaYetkilisi.Trim(),
                            WebSitesi = web.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                            Eposta = eposta,
                            Adres = adres
                            //IhracatDurumu = firmaYetkilisi.Trim() != "" ? "VAR" : ""
                        });
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }


                }

                var items = firma.Select(x => new
                {
                    Unvan = x.Unvan,
                    Yetkili = x.Yetkili,
                    WebSitesi = x.WebSitesi,
                    Adres = x.Adres,
                    Eposta = x.Eposta,
                    IhracatDurumu = x.IhracatDurumu


                });

                var excel = items.ToExcel();

                System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\crawler\\TurkMakinesanayiCom\\TurkMakinesanayiComDernek.xlsx", excel);

            }


        }
        public void TurkIndexCom()
        {
            var firma = new List<Firma>();
            var tümSayfalar = new List<string>();
            var detaySayfalari = new List<string>();

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.GetEncoding("windows-1254"); //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.



            var link = $"http://www.turkindex.com/index.asp";

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var anakategoriler = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("CID") && w.Attributes["href"].Value.Contains("CADI")).Select(s => s.Attributes["href"].Value).ToList();

            //tümSayfalar.AddRange(firmaUrls);
            foreach (var i in anakategoriler)
            {

                try
                {
                    url = new Uri("http://www.turkindex.com/" + i); //Uri tipinde değişeken linkimizi veriyoruz.
                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var altkategoriler = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("CID") && w.Attributes["href"].Value.Contains("CADI")).Select(s => s.Attributes["href"].Value).ToList(); ;

                    foreach (var altKat in altkategoriler)
                    {
                        url = new Uri("http://www.turkindex.com/" + altKat); //Uri tipinde değişeken linkimizi veriyoruz.
                        html = client.DownloadString(url); //siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html); //documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var sayfa = document.DocumentNode.SelectNodes("//a").FirstOrDefault(w => w.Attributes["href"].Value.Contains("tr_adres_liste.asp?UID")).Attributes["href"].Value;
                        tümSayfalar.Add(sayfa);
                    }



                }
                catch (Exception ex)
                {
                    continue;
                }


            }


            tümSayfalar = tümSayfalar.Distinct().ToList();
            foreach (var i in tümSayfalar)
            {

                try
                {
                    url = new Uri("http://www.turkindex.com/" + i); //Uri tipinde değişeken linkimizi veriyoruz.
                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz


                    var sayfalama = document.DocumentNode.SelectNodes("//b").FirstOrDefault(f => f.InnerText.Contains("Firma bulundu.")).InnerText.Trim().Replace(" Firma bulundu.", "");


                    var kayitSayisi = Convert.ToInt32(sayfalama);

                    var sayfaSayisi = kayitSayisi % 50 == 0 ? kayitSayisi / 50 : (kayitSayisi / 50) + 1;

                    for (int j = 1; j <= sayfaSayisi; j++)
                    {
                        url = new Uri("http://www.turkindex.com/" + i + "&pg=" + j); //Uri tipinde değişeken linkimizi veriyoruz.
                        html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        detaySayfalari.AddRange(document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("firma_ayrinti.asp?fid=")).Select(s => s.Attributes["href"].Value).ToList());

                    }


                }
                catch (Exception ex)
                {
                    continue;
                }


            }

            detaySayfalari = detaySayfalari.Distinct().ToList();

            foreach (var i in detaySayfalari)
            {
                try
                {
                    url = new Uri("http://www.turkindex.com/" + i); //Uri tipinde değişeken linkimizi veriyoruz.
                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var sektor = document.DocumentNode.SelectNodes("/html/body/center/center[1]/font").FirstOrDefault().InnerText.Trim().Replace("&nbsp;", "");
                    var unvan = document.DocumentNode.SelectNodes("//td").Where(f => f.InnerHtml.Contains("bayraklar")).ToList()[2].InnerText.Trim().Replace("&nbsp;", "");
                    var adresTd = document.DocumentNode.SelectNodes("//td").FirstOrDefault(f => f.InnerText.Contains("Tel :"));
                    var adres = adresTd.ChildNodes[1].ChildNodes[0].InnerText.Trim().Replace("&nbsp;", "").Replace(@"\r", "").Replace(@"\n", "");
                    var il = adresTd.ChildNodes[1].ChildNodes[1].InnerText.Trim().Replace("&nbsp;", "").Replace(@"\r", "").Replace(@"\n", "");
                    var webTd = document.DocumentNode.SelectNodes("//td").FirstOrDefault(f => f.InnerText.Contains("Url :"));
                    var webSitesi = webTd.ChildNodes.FirstOrDefault(w => w.InnerText.Contains("www."))?.InnerText.Trim().Replace("https://www.", "").Replace("http://www.", "");


                    firma.Add(new Firma
                    {
                        Unvan = unvan,
                        WebSitesi = webSitesi,
                        Adres = adres,
                        Il = il
                    });

                }
                catch (Exception ex)
                {
                    continue;
                }


            }

            var items = firma.Select(x => new
            {
                Unvan = x.Unvan,
                WebSitesi = x.WebSitesi,
                Adres = x.Adres,
                Il = x.Il


            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\TurkMakinesanayiCom.xlsx", excel);



        }
        public string FirmaTurkiyeCom()
        {
            var db = new Db();

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            var firma = new List<Firma>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();

            var model = db.CrawlUrl.Where(i => !i.İslem && i.Kaynak == "FirmaTurkiyeCom").ToList();
            var kayitSayisi = model.Count();

            var detaySayfalari = model.Take(10).ToList();
            detaySayfalari.ForEach(i => i.İslem = true);
            db.SaveChanges();

            foreach (var sayfa in detaySayfalari)
            {
                try
                {
                    var link = sayfa.Url;

                    var url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                    var html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    var document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var unvan = document.DocumentNode.SelectSingleNode("//*[@id=\"companyTitle\"]").ChildNodes[1].InnerText;
                    var etiket = document.DocumentNode.SelectSingleNode("//*[@id=\"companyTitle\"]").ChildNodes[3].ChildNodes.Where(f => f.Name == "h2").Select(s => s.InnerText).ToList().Aggregate((a, b) => a + "," + b);

                    var adressDiv = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i => i.HasClass("ft-free-address"));
                    var adres = adressDiv != null ? adressDiv.InnerText.Replace("Adres:", "").Trim() : "";

                    var ilIlceDiv = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i => i.HasClass("ft-contacts"));
                    var il = "";
                    var ilce = "";
                    if (ilIlceDiv != null)
                    {
                        if (ilIlceDiv.ChildNodes.Where(f => f.Name == "a").ToList().Count() == 2)
                        {
                            ilce = ilIlceDiv != null ? ilIlceDiv.ChildNodes.Where(f => f.Name == "a").Select(s => s.InnerText).ToList()[0].Trim() : "";
                            il = ilIlceDiv != null ? ilIlceDiv.ChildNodes.Where(f => f.Name == "a").Select(s => s.InnerText).ToList()[1].Trim() : "";
                        }
                        else if (ilIlceDiv.ChildNodes.Where(f => f.Name == "a").ToList().Count() == 3)
                        {
                            ilce = ilIlceDiv != null ? ilIlceDiv.ChildNodes.Where(f => f.Name == "a").Select(s => s.InnerText).ToList()[1].Trim() : "";
                            il = ilIlceDiv != null ? ilIlceDiv.ChildNodes.Where(f => f.Name == "a").Select(s => s.InnerText).ToList()[2].Trim() : "";
                        }
                    }

                    var sektorDiv = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i => i.HasClass("paid-free-categories"));
                    var sektor = "";
                    if (sektorDiv != null)
                    {
                        sektor = sektorDiv.InnerText.Trim();
                    }

                    var webSitesiDiv = document.DocumentNode.SelectSingleNode("//*[@id=\"website\"]");
                    var webSitesi = webSitesiDiv != null ? webSitesiDiv.ChildNodes.FirstOrDefault(i => i.Name == "a").Attributes["href"].Value.Replace("https://", "").Replace("http://", "").Replace("www.", "") : "";

                    if (webSitesi == "" )
                    {
                        if (!db.Firma.Any(i => i.Unvan == unvan))
                        {
                            firma.Add(new Firma
                            {
                                Unvan = unvan,
                                WebSitesi = webSitesi,
                                Etiket = etiket,
                                Adres = adres,
                                Il = il,
                                Ilce = ilce,
                                KayitTarihi = DateTime.Now,
                                YeniTipKayit = true,
                                Sektor = sektor,
                                Kaynak = "FirmaTurkiyeCom",
                                FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = 209 } }
                            });
                        }
                        else
                        {
                            var firmaId = db.Firma.FirstOrDefault(i => i.Unvan == unvan).FirmaId;
                            firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = firmaId, KaynakId = 209 });
                        }

                    }
                    else
                    {
                        if (!db.Firma.Any(i => i.WebSitesi == webSitesi))
                        {
                            firma.Add(new Firma
                            {
                                Unvan = unvan,
                                WebSitesi = webSitesi,
                                Etiket = etiket,
                                Adres = adres,
                                Il = il,
                                Ilce = ilce,
                                KayitTarihi = DateTime.Now,
                                YeniTipKayit = true,
                                Sektor = sektor,
                                Kaynak = "FirmaTurkiyeCom",
                                FirmaKaynakRelation= new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId=209 } }
                                
                            });
                        }
                        else
                        {
                            var firmaId = db.Firma.FirstOrDefault(i => i.WebSitesi == webSitesi).FirmaId;
                            firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = firmaId, KaynakId = 209 });
                        }
                    }
                }
                catch (Exception)
                {
                    continue;
                }

            }

            db.Firma.AddRange(firma);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.SaveChanges();

            var sonuc = $"Toplam Kayıt: {kayitSayisi} Eklenen : {firma.Count} Güncellenen: {firmaKaynakRelation.Count}";
            return sonuc;

        }
        public void FirmaRehberiTvTr()
        {

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.GetEncoding("windows-1254"); //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.



            var link = $"https://www.firmarehberi.tv.tr/";

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var iller = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("indir")).ToList();

            //tümSayfalar.AddRange(firmaUrls);
            foreach (var i in iller)
            {
                var detaySayfalari = new List<string>();
                var tid = Convert.ToInt32(i.Attributes["tid"].Value.ToString());
                var nacemes = Convert.ToInt32(i.Attributes["nacemes"].Value.ToString());
                var il = i.InnerText.Trim().Replace("Firma Rehberi", "");

                object reqData = new
                {
                    tid = tid,
                    nacemes = nacemes,
                };
                var r = Req(link + "Home/GetSubMenuDepth1", reqData);
                dynamic rp = JsonConvert.DeserializeObject(r);

                foreach (var item in rp)
                {
                    object dataObj = new
                    {
                        mesid = item.id.ToString()
                    };

                    var href = "";

                    if (nacemes < 3)
                    {
                        var r2 = Req(link + "Home/GetSubMenuDepth2", dataObj);
                        dynamic rp2 = JsonConvert.DeserializeObject(r2);
                        foreach (var j in rp2)
                        {

                            if (item.ticaretOdasiId.ToString() == "115")
                            {
                                href = link + j.naceKodAdiUrl + "/firmalari-sirketleri/1.aspx";
                                detaySayfalari.Add(href);
                            }
                            else
                            {
                                href = link + j.ilIlceAdiUrl + "/" + j.naceKodAdiUrl + "/sirketleri-firmalari/1.aspx";
                                detaySayfalari.Add(href);
                            }
                        }

                    }
                    else if (nacemes == 3)
                    {
                        href = link + "/" + item.meslekGrupAdiUrl + "/firmalari-sirketleri-rehberi/1.aspx";
                        detaySayfalari.Add(href);
                    }
                    else if (nacemes == 5)
                    {
                        href = link + "/" + item.ilIlceAdiUrl + "/" + item.meslekGrupAdiUrl + "/firmalari-sirketleri-rehberi/1.aspx";
                        detaySayfalari.Add(href);
                    }

                }

                var items = detaySayfalari.Select(x => new
                {
                    Url = x,
                    İslem = 0,
                    Kaynak= "FirmaRehberiTvTr"

                });

                var excel = items.ToExcel();

                System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\Crawler\\FirmaRehberiTvTr\\FirmaRehberiTvTr-{il}.xlsx", excel);

            }


             

            



        }

        //public void TurkiyeIsRehberiOrg()
        //{

        //    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
        //    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.


        //    //tüm sektorler
        //    var link = $"https://www.turkiyeisrehberi.org/index.php?pg=butunsektorler";

        //    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
        //    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

        //    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
        //    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

        //    var sektorler = document.DocumentNode.SelectNodes("//*[@id='liste']/ul/li/a").Select(i => i.Attributes["href"].Value).ToList();
        //    //*[@id="liste"]/ul/li/a

        //    foreach (var s in sektorler)
        //    {
        //        var detaySayfalari = new List<string>();
        //        link = $"https://www.turkiyeisrehberi.org/" + s;

        //        url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
        //        html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

        //        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
        //        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
        //        var sayfaSayisi = 1;
        //        var sonSayfa=document.DocumentNode.SelectNodes("//a").FirstOrDefault(i=>i.InnerText.Contains("Son Sayfa"));
        //        if (sonSayfa!=null)
        //        {
        //            var sayfaSayisiStr= sonSayfa.Attributes["href"].Value.Split(new [] { "sayfa=" }).Length[1]
        //            sayfaSayisi = ;
        //        }

        //        detaySayfalari = document.DocumentNode.SelectNodes("//*[@id='liste']/ul/li/a").Select(i => i.Attributes["href"].Value).ToList();

        //        var items = detaySayfalari.Select(x => new
        //        {
        //            Url = x,
        //            İslem = 0,
        //            Kaynak = "FirmaRehberiTvTr"

        //        });

        //        var excel = items.ToExcel();

        //        System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\Crawler\\FirmaRehberiTvTr\\FirmaRehberiTvTr-{s}.xlsx", excel);

        //    }








        //}
        public string Req(string url, object form)
        {
            try
            {
                var properties = from p in form.GetType().GetProperties()
                                 where p.GetValue(form, null) != null
                                 select p.Name + "=" + HttpUtility.UrlEncode(p.GetValue(form, null).ToString());

                byte[] data = Encoding.ASCII.GetBytes(String.Join("&", properties.ToArray()));

                HttpWebRequest myHttpWebRequest = (HttpWebRequest)HttpWebRequest.Create(url);
                myHttpWebRequest.Method = "POST";
                myHttpWebRequest.ContentType = "application/x-www-form-urlencoded";
                myHttpWebRequest.ContentLength = data.Length;

                Stream requestStream = myHttpWebRequest.GetRequestStream();
                requestStream.Write(data, 0, data.Length);
                requestStream.Close();

                HttpWebResponse myHttpWebResponse = (HttpWebResponse)myHttpWebRequest.GetResponse();
                Stream responseStream = myHttpWebResponse.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(responseStream, Encoding.UTF8);
                string pageContent = myStreamReader.ReadToEnd();
                myStreamReader.Close();
                responseStream.Close();
                myHttpWebResponse.Close();

                return pageContent;
            }
            catch (System.Exception ex)
            {
                var a = ex;
                return "";
            }
        }
        public void ExcelToDb()
        {
            var db = new Db();
            var kaynak = db.Kaynak.ToList();
            var webSiteler = db.Firma.Select(s => s.WebSitesi.Replace("https://", "").Replace("http://", "").Replace("www.", "")).Distinct().ToList();
            var folderPath = @"C:\Users\raify\Desktop\crawler\FirmaTurkiyeCom";
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

                    var unvan = row.ItemArray[0].ToString();
                    var websitesi = row.ItemArray[1].ToString().Trim();
                    var adres = row.ItemArray[2].ToString();


                    firmalar.Add(new Firma
                    {
                        Unvan = unvan,
                        WebSitesi = websitesi != "-" ? websitesi.Replace("https://", "").Replace("http://", "").Replace("www.", "") : "",
                        Adres = adres,
                        YeniTipKayit = true,
                        KayitTarihi = DateTime.Now,
                        FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = 209 } }

                    });
                    counter++;
                }
            }
            var insert = firmalar.Where(w => !webSiteler.Contains(w.WebSitesi)).ToList();
            db.Firma.AddRange(insert);
            db.BulkSaveChanges();
        }

    }
}