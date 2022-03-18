
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class FuarController : Controller
    {
        List<Fuar> fuarList = new List<Fuar>();
        public FuarController()
        {
            fuarList = new List<Fuar>
            {
                new Fuar 
                {
                    BaseUrl="https://www.hardwareeurasia.com/",
                    PaginationUrl="katilimci-listesi?page=",
                    PageCount=8,
                    KaynakId=200,
                    Tip=1,
                    TipAciklama="Listeleme Sayfasından Bilgi Çekiliyor" 
                },
                new Fuar
                {
                    BaseUrl="https://www.hardwareeurasia.com/",
                    PaginationUrl="katilimci-listesi?page=",
                    PageCount=8,
                    KaynakId=200,
                    Tip=1,
                    TipAciklama="Listeleme Sayfasından Bilgi Çekiliyor"
                }
            };
        }
        // GET: Fuar
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void AvrasyaKapi()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 7;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.avrasyakapifuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca[adresParca.Length - 2];

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "AVRASYA KAPI FUARI";
                        firma.KaynakTip = "TUYAP";
                        firma.Urun = urunGruplari;

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                        f.Kaynak = f.Kaynak + ",AVRASYA KAPI FUARI";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();
        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void AvrasyaPencere()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 24;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.avrasyapencerefuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca[adresParca.Length - 2];

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", ""); ;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "AVRASYA PENCERE FUARI";
                        firma.KaynakTip = "TUYAP";
                        firma.Urun = urunGruplari;

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.Kaynak.Contains("AVRASYA PENCERE FUARI"))
                    {
                        f.Kaynak = f.Kaynak + ",AVRASYA PENCERE FUARI";
                    }

                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void AvrasyaCam()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 10;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.avrasyacamfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca[adresParca.Length - 2];

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "AVRASYA CAM FUARI";
                        firma.KaynakTip = "TUYAP";
                        firma.Urun = urunGruplari;
                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.Kaynak.Contains("AVRASYA CAM FUARI"))
                    {
                        f.Kaynak = f.Kaynak + ",AVRASYA CAM FUARI";
                    }

                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void KırtasiyeOfis()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 12;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://kirtasiyeofisfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca[adresParca.Length - 2];

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "İSTANBUL KİTAP VE OFİS FUARI";
                        firma.KaynakTip = "TUYAP";
                        firma.Urun = urunGruplari;

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.Kaynak.Contains("İSTANBUL KİTAP VE OFİS FUARI"))
                    {
                        f.Kaynak = f.Kaynak + ",İSTANBUL KİTAP VE OFİS FUARI";
                    }

                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void PlastEurasia()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 26;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.plasteurasia.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", ""); ;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "PLAST EURASIA";
                        firma.KaynakTip = "TUYAP";
                        firma.Urun = urunGruplari;

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    if (string.IsNullOrEmpty(item.WebSitesi))
                    {

                        continue;
                    }
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.Kaynak.Contains("PLAST EURASIA"))
                    {
                        f.Kaynak = f.Kaynak + ",PLAST EURASIA";
                    }

                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }

        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void BursaMakine()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 21;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://bursamakinefuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "BURSA MAKİNE FUARI";
                        firma.Kaynak = "TUYAP";
                        firma.Urun = urunGruplari;

                        firmalar.Add(firma);
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
                    if (!string.IsNullOrEmpty(item.WebSitesi) && db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                    {

                        var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                        if (!f.Kaynak.Contains("BURSA MAKİNE FUARI"))
                        {
                            f.Kaynak = f.Kaynak + ",BURSA MAKİNE FUARI";
                        }

                        if (!f.KaynakTip.Contains("TUYAP"))
                        {
                            f.KaynakTip = f.KaynakTip + ",TUYAP";
                        }
                        f.Urun = f.Urun + "," + item.Urun;
                    }
                    else
                    {
                        insertlist.Add(item);

                    }
                }
                catch (Exception ex)
                {

                    continue;
                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void WoodTech()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 6;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://woodtechistanbul.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", ""); ;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "WOOD TECH ISTANBUL";
                        firma.KaynakTip = "TUYAP";

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    if (string.IsNullOrEmpty(item.WebSitesi))
                    {

                        continue;
                    }
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (!f.Kaynak.Contains("WOOD TECH ISTANBUL"))
                    {
                        f.Kaynak = f.Kaynak + ",WOOD TECH ISTANBUL";
                    }

                    if (!f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();

        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        public void Maktek()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 17;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "http://www.izmirmaktekfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "İZMİT MAKTEK";
                        firma.KaynakTip = "TUYAP";

                        firmalar.Add(firma);
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
                if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
                {
                    if (string.IsNullOrEmpty(item.WebSitesi))
                    {

                        continue;
                    }
                    var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
                    if (f.Kaynak != null && !f.Kaynak.Contains("İZMİT MAKTEK"))
                    {
                        f.Kaynak = f.Kaynak + ",İZMİT MAKTEK";
                    }

                    if (f.KaynakTip != null && !f.KaynakTip.Contains("TUYAP"))
                    {
                        f.KaynakTip = f.KaynakTip + ",TUYAP";
                    }
                    f.Urun = f.Urun + "," + item.Urun;
                }
                else
                {
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.BulkSaveChanges();
        }
        /// <summary>
        /// 31.07.2021 TARİHİNDE AKTARILDI
        /// </summary>
        //public void ExpoMed()
        //{
        //    var db = new Db();
        //    var firmalar = new List<Firma>();
        //    var sayfaSayisi = 43;
        //    var firmaDetaySayfaları = new List<string>();
        //    for (int i = 1; i <= sayfaSayisi; i++)
        //    {
        //        string link = "https://www.expomedistanbul.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

        //        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

        //        WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
        //        client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

        //        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

        //        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
        //        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

        //        var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
        //        foreach (var firmaRow in firmaDiv)
        //        {
        //            try
        //            {
        //                var tdList = firmaRow.Descendants("td").ToList();
        //                var unvanAdres = tdList[0].Descendants("div").ToList();
        //                var unvan = unvanAdres[0].InnerText;
        //                var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
        //                var il = adres.Split('/').LastOrDefault();
        //                var adresParca = adres.Split('/');
        //                var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

        //                var iletisimWeb = tdList[1].Descendants("div").ToList();
        //                var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
        //                var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
        //                var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
        //                var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
        //                var firma = new Firma();
        //                firma.Unvan = unvan;
        //                firma.Adres = adres;
        //                firma.Il = il;
        //                firma.Ilce = ilce;
        //                firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "");
        //                firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
        //                firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
        //                firma.Kaynak = "ExpoMed İstanbul";

        //                firmalar.Add(firma);
        //            }
        //            catch (Exception ex)
        //            {

        //                continue;
        //            }

        //        }
        //    }

        //    var insertlist = new List<Firma>();
        //    foreach (var item in firmalar)
        //    {
        //        if (item.WebSitesi == "")
        //        {
        //            continue;
        //        }
        //        if (db.Firma.FirstOrDefault(a => a.WebSitesi == item.WebSitesi) != null)
        //        {
        //            if (string.IsNullOrEmpty(item.WebSitesi))
        //            {

        //                continue;
        //            }
        //            var f = db.Firma.FirstOrDefault(j => j.WebSitesi == item.WebSitesi);
        //            if (f.Kaynak != null && !f.Kaynak.Contains("EXPOMED"))
        //            {
        //                f.Kaynak = f.Kaynak + ",EXPOMED";
        //            }

        //            if (f.KaynakTip != null && !f.KaynakTip.Contains("TUYAP"))
        //            {
        //                f.KaynakTip = f.KaynakTip + ",TUYAP";
        //            }
        //            f.Urun = f.Urun + "," + item.Urun;
        //        }
        //        else
        //        {
        //            insertlist.Add(item);

        //        }
        //    }

        //    db.Firma.AddRange(insertlist);
        //    db.BulkSaveChanges();

        //}
        public void ExpoMed()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 43;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEtiketRelation = new List<FirmaEtiketRelation>();
            var kaynakId = 198;

            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.expomedistanbul.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var etiketList = urunGruplariList.Select(s => s.InnerText.ToLower(System.Globalization.CultureInfo.GetCultureInfo("tr-TR")).Trim()).ToList();
                        var firma = new Firma();
                        firma.EtiketListesi = etiketList;
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Urun = urunGruplari;
                        firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };


                        firmalar.Add(firma);
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
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.BulkSaveChanges();

        }
        public void BoatAntalya()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 3;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "http://boatantalya.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "Boat Antalya";

                        firmalar.Add(firma);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }
            }

        }
        public void IplikFuari()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 22;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.iplikfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "İplik Fuarı";

                        firmalar.Add(firma);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }
            }

        }
        public void IstanbulMobilyaFuari()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 39;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "http://istanbulmobilyafuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "İstanbul Mobilya Fuarı";

                        firmalar.Add(firma);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }
            }

        }
        public void OyuncakFuari()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 10;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEtiketRelation = new List<FirmaEtiketRelation>();
            var kaynakId = 199;
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://istanbuloyuncakfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var etiketList = urunGruplariList.Select(s => s.InnerText.ToLower(System.Globalization.CultureInfo.GetCultureInfo("tr-TR")).Trim()).ToList();
                        var firma = new Firma();
                        firma.EtiketListesi = etiketList;
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Urun = urunGruplari;
                        firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };


                        firmalar.Add(firma);
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
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.BulkSaveChanges();

        }
        public void MadenTurkiye()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 10;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.madenturkiyefuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var firma = new Firma();
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web;
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Kaynak = "Maden Türkiye";

                        firmalar.Add(firma);
                    }
                    catch (Exception ex)
                    {

                        continue;
                    }

                }
            }

        }
        public void Zuchex()
        {
            var firmalar = new List<Firma>();
            var sayfaSayisi = 30;
            var firmaDetaySayfaları = new List<string>();
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.zuchex.com/katilimci-listesi.html?p=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var href = document.DocumentNode.SelectNodes("//a").Where(j => j.ParentNode.ParentNode.ParentNode.ParentNode.HasClass("katilimciListesiBlok")).ToList().Select(j => j.Attributes["href"].Value).ToList();
                firmaDetaySayfaları.AddRange(href);
            }
            foreach (var item in firmaDetaySayfaları)
            {
                string link = "https://www.zuchex.com/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var unvan = document.DocumentNode.SelectSingleNode("/html/body/div/section/div/h1").InnerText;
                var detayCol = document.DocumentNode.SelectNodes("//div").Where(i => i.ParentNode.HasClass("ekbilgiler")).ToList();

                var urunGrup = detayCol[0].ChildNodes.Where(i => i.Name == "#text").Select(i => i.InnerText).ToList();
                var iletisimCol = detayCol.LastOrDefault();
                var adres = iletisimCol.ChildNodes.FirstOrDefault(i => i.Name == "p").InnerText.Replace(@"\t", "").Split(' ');
            }
        }
        public void KonyaTarim()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 30;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEtiketRelation = new List<FirmaEtiketRelation>();
            var kaynakId = 195; //Konya Tarim Fuari 2022
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.konyatarimfuari.com/katilimci-listesi?page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var etiketList = urunGruplariList.Select(s => s.InnerText.ToLower(System.Globalization.CultureInfo.GetCultureInfo("tr-TR")).Trim()).ToList();
                        var firma = new Firma();
                        firma.EtiketListesi = etiketList;
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Urun = urunGruplari;
                        firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };


                        firmalar.Add(firma);
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
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.BulkSaveChanges();

        }
        public void HostIstanbul()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 25;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEposta = new List<FirmaEposta>();
            var kaynakId = 196; //Konya Tarim Fuari 2022

            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.hostistanbulfair.com/2022-katilimci-listesi.html?p=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var href = document.DocumentNode.SelectNodes("//a").Where(j => j.ParentNode.ParentNode.ParentNode.ParentNode.HasClass("katilimciListesiBlok")).ToList().Select(j => j.Attributes["href"].Value).ToList();
                firmaDetaySayfaları.AddRange(href);
            }
            foreach (var item in firmaDetaySayfaları)
            {
                string link = "https://www.hostistanbulfair.com/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var unvan = document.DocumentNode.SelectSingleNode("/html/body/div/section/div/h1").InnerText;
                var detayCol = document.DocumentNode.SelectNodes("//div").Where(i => i.ParentNode.HasClass("ekbilgiler")).ToList();

                var urunGrup = detayCol[0].ChildNodes.Where(i => i.Name == "#text").Select(i => i.InnerText.Replace("\n", "").Replace("\t", "")).Where(i => !string.IsNullOrEmpty(i)).ToList();
                var iletisimCol = detayCol.LastOrDefault();
                var adres = iletisimCol.ChildNodes[3].InnerText.Replace("Turkey", "").Replace("\n", " ").Replace("\t", "");
                var adresArray = adres.Split(' ', (char)StringSplitOptions.RemoveEmptyEntries).Where(i => !string.IsNullOrEmpty(i)).ToArray();
                var firma = new Firma();

                firma.Unvan = unvan;
                firma.Adres = adres;
                firma.Il = adresArray.Length >= 2 ? adresArray[adresArray.Length - 1] : "";
                firma.Ilce = adresArray.Length >= 2 ? adresArray[adresArray.Length - 2].ToUpper() : "";
                firma.WebSitesi = iletisimCol.ChildNodes[5].ChildNodes[5].InnerText.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                firma.Eposta = iletisimCol.ChildNodes[5].ChildNodes[8].InnerText.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                //firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                //firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                firma.Urun = urunGrup.Count >= 1 ? urunGrup.Aggregate((a, b) => a + "," + b) : "";
                firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };
                if (!string.IsNullOrEmpty(firma.Eposta))
                {
                    firma.FirmaEposta = new List<FirmaEposta> { new FirmaEposta { Eposta = firma.Eposta } };
                }


                firmalar.Add(firma);
            }

            var insertlist = new List<Firma>();

            foreach (var item in firmalar)
            {
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                    if (!string.IsNullOrEmpty(item.Eposta) && !fromDb.FirmaEposta.Any(i => i.Eposta == item.Eposta))
                    {
                        firmaEposta.Add(new FirmaEposta { FirmaId = fromDb.FirmaId, Eposta = item.Eposta });
                    }


                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.FirmaEposta.AddRange(firmaEposta);
            db.BulkSaveChanges();
        }
        public void AsansorIstanbul()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 29;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEposta = new List<FirmaEposta>();
            var kaynakId = 197;

            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = "https://www.asansoristanbul.com/2022-katilimci-listesi.html?p=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var href = document.DocumentNode.SelectNodes("//a").Where(j => j.ParentNode.ParentNode.ParentNode.ParentNode.HasClass("katilimciListesiBlok")).ToList().Select(j => j.Attributes["href"].Value).ToList();
                firmaDetaySayfaları.AddRange(href);
            }
            foreach (var item in firmaDetaySayfaları)
            {
                try
                {
                    string link = "https://www.asansoristanbul.com/" + item;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    var unvan = document.DocumentNode.SelectSingleNode("/html/body/div/section/div/h1").InnerText;
                    var detayCol = document.DocumentNode.SelectNodes("//div").Where(i => i.ParentNode.HasClass("ekbilgiler")).ToList();

                    var urunGrup = detayCol[0].ChildNodes.Where(i => i.Name == "#text").Select(i => i.InnerText.Replace("\n", "").Replace("\t", "")).Where(i => !string.IsNullOrEmpty(i)).ToList();
                    var iletisimCol = detayCol.LastOrDefault();
                    var adres = iletisimCol.ChildNodes[3].InnerText.Replace("Turkey", "").Replace("\n", " ").Replace("\t", "");
                    var adresArray = adres.Split(' ', (char)StringSplitOptions.RemoveEmptyEntries).Where(i => !string.IsNullOrEmpty(i)).ToArray();
                    var firma = new Firma();

                    firma.Unvan = unvan;
                    firma.Adres = adres;
                    firma.Il = adresArray.Length >= 2 ? adresArray[adresArray.Length - 1] : "";
                    firma.Ilce = adresArray.Length >= 2 ? adresArray[adresArray.Length - 2].ToUpper() : "";
                    firma.WebSitesi = iletisimCol.ChildNodes[5].ChildNodes[5].InnerText.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                    firma.Eposta = iletisimCol.ChildNodes[5].ChildNodes[8].InnerText.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                    //firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                    //firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                    firma.Urun = urunGrup.Count >= 1 ? urunGrup.Aggregate((a, b) => a + "," + b) : "";
                    firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };
                    if (!string.IsNullOrEmpty(firma.Eposta))
                    {
                        firma.FirmaEposta = new List<FirmaEposta> { new FirmaEposta { Eposta = firma.Eposta } };
                    }


                    firmalar.Add(firma);
                }
                catch (Exception ex)
                {
                    continue;
                }
            }

            var insertlist = new List<Firma>();

            foreach (var item in firmalar)
            {
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                    if (!string.IsNullOrEmpty(item.Eposta) && !fromDb.FirmaEposta.Any(i => i.Eposta == item.Eposta))
                    {
                        firmaEposta.Add(new FirmaEposta { FirmaId = fromDb.FirmaId, Eposta = item.Eposta });
                    }


                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.FirmaEposta.AddRange(firmaEposta);
            db.BulkSaveChanges();
        }
        public void TuyapDetaysiz()
        {
            var baseUrl = "http://www.eskisehirmobilyafuari.com/";
            var pagination = "katilimci-listesi?page=";

            var db = new Db();
            var firmalar = new List<Firma>();
            var sayfaSayisi = 3;
            var firmaDetaySayfaları = new List<string>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();
            var firmaEtiketRelation = new List<FirmaEtiketRelation>();
            var kaynakId = 200; //Konya Tarim Fuari 2022
            for (int i = 1; i <= sayfaSayisi; i++)
            {
                string link = baseUrl + pagination + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var firmaDiv = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("filter-list__item")).ToList();
                foreach (var firmaRow in firmaDiv)
                {
                    try
                    {
                        var tdList = firmaRow.Descendants("td").ToList();
                        var unvanAdres = tdList[0].Descendants("div").ToList();
                        var unvan = unvanAdres[0].InnerText;
                        var adres = unvanAdres[1].InnerText.Replace("/ TÜRKİYE", "");
                        var il = adres.Split('/').LastOrDefault();
                        var adresParca = adres.Split('/');
                        var ilce = adresParca.Length > 2 ? adresParca[adresParca.Length - 2] : "";

                        var iletisimWeb = tdList[1].Descendants("div").ToList();
                        var iletisim = iletisimWeb[0].InnerText.Replace("İletişim: +90 ", "").Trim();
                        var web = tdList[1].Descendants("dic").ToList()[0].InnerText.Replace("Web: ", "").Trim();
                        var urunGruplariList = tdList[5].Descendants("li").Where(j => j.HasClass("table-detail-wrapper__list-item")).ToList();
                        var urunGruplari = urunGruplariList.Count() > 0 ? urunGruplariList.Select(j => j.InnerText).Aggregate((a, b) => a + "," + b) : "";
                        var etiketList = urunGruplariList.Select(s => s.InnerText.ToLower(System.Globalization.CultureInfo.GetCultureInfo("tr-TR")).Trim()).ToList();
                        var firma = new Firma();
                        firma.EtiketListesi = etiketList;
                        firma.Unvan = unvan;
                        firma.Adres = adres;
                        firma.Il = il;
                        firma.Ilce = ilce;
                        firma.WebSitesi = web.Replace("http://", "").Replace("https://", "").Replace("www.", "").Replace("/", "");
                        firma.CepTelefon = iletisim.StartsWith("5") ? iletisim : "";
                        firma.Telefon = !iletisim.StartsWith("5") ? iletisim : "";
                        firma.Urun = urunGruplari;
                        firma.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynakId } };


                        firmalar.Add(firma);
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
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == kaynakId))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = kaynakId });
                    }

                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            db.BulkSaveChanges();
        }


    }
}