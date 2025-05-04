using FuarCrawler.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class ExporterController:Controller
    {
        Db Db;
        public ExporterController()
        {
            Db = new Db();
        }
        public void ExporterKategori()
        {

            var kategoriler = Db.Kategori.ToList();

            var katList = new List<Kategori>();

            var subheading = new List<string>();
            string link = "https://www.turkishexporter.net/tr/home";  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

            Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

            var kategoriAdlari = document.DocumentNode.SelectNodes("//span").Where(j => j.HasClass("cat_name")).ToList();

            foreach (var item in kategoriAdlari)
            {
                var adi = item.InnerText;
                var parent = item.ParentNode;
                var kod = parent.Attributes["href"].Value.Split('=')[1];
                var kategori = kategoriler.FirstOrDefault(i => i.Kod == kod);
                if (kategori != null) continue;
                katList.Add(new Kategori { Adi = adi,Kod=kod });
            }

            Db.Kategori.AddRange(katList);
            Db.SaveChanges();

        }
        //public void ExporterAltKategori()
        //{

        //    var kategoriler = Db.Kategori.ToList();
        //    var altKategoriler = Db.AltKategori.Include("Kategori").ToList();

        //    foreach (var kt in kategoriler)
        //    {
        //        var altKategoriInsert = new List<AltKategori>();
        //        var altKatCeviriler = new List<AltKategoriCeviri>();

        //        var subheading = new List<string>();
        //        string link = "https://www.turkishexporter.net/en/companies?category=" + kt.Kod;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

        //        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

        //        WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
        //        client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

        //        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

        //        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
        //        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

        //        var altkategoriAdlari = document.DocumentNode.SelectNodes("//span").Where(j => j.HasClass("cat_name")).ToList();

        //        foreach (var altKat in altkategoriAdlari)
        //        {
        //            var adi = altKat.InnerText;
        //            var parent = altKat.ParentNode;
        //            var href = parent.Attributes["href"].Value;
        //            if (!href.Contains("subcategory")) continue;
        //            var kod = parent.Attributes["href"].Value.Split('=')[2];
        //            var altKategori = altKategoriler.FirstOrDefault(i => i.Kod == kod && i.Kategori.Kod == kt.Kod);

        //            if (altKategori == null)
        //            {
        //                altKategori = new AltKategori { KategoriId = kt.KategoriId, Kod = kod };
        //                altKategori.AltKategoriCeviri = new List<AltKategoriCeviri> { new AltKategoriCeviri { DilId = 2, Adi = adi } };
        //                altKategoriInsert.Add(altKategori);
        //            }
        //            else
        //            {
        //                altKatCeviriler.Add(new AltKategoriCeviri { DilId = 2, Adi = adi, AltKategoriId = altKategori.AltKategoriId });

        //            }
        //        }

        //        Db.AltKategori.AddRange(altKategoriInsert);
        //        Db.AltKategoriCeviri.AddRange(altKatCeviriler);
        //        Db.SaveChanges();

        //    }


        //}

        public void ExporterAltKategori()
        {
            var kategoriler = Db.Kategori.ToList();
            var altKategorilerKod = Db.AltKategori.Include("Kategori").Select(i => i.Kod).Distinct().ToList();

            foreach (var kt in kategoriler)
            {
                var altKategoriInsert = new List<AltKategori>();
                var altKatCeviriler = new List<AltKategoriCeviri>();

                string link = "https://www.turkishexporter.net/tr/companies?category=" + kt.Kod;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var altKatSayfalar = document.DocumentNode.SelectNodes("//a").Where(j => j.Attributes["href"].Value.Contains("subcategory")).ToList();

                foreach (var altKatSayfa in altKatSayfalar)
                {
                    var qString = altKatSayfa.Attributes["href"].Value;

                    link = "https://www.turkishexporter.net" + qString;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var breadCrump = document.DocumentNode.SelectNodes("//ul").Where(j => j.HasClass("breadcrumb")).FirstOrDefault();
                    if (breadCrump != null && breadCrump.ChildNodes.Where(i => i.Name == "li").ToList().Count() == 4)
                    {
                        var sonBreadCrump = breadCrump.ChildNodes.Where(i => i.Name == "li").LastOrDefault();
                       
                        altKategoriInsert.Add(new AltKategori { KategoriId = kt.KategoriId, Kod = qString.Split('=').LastOrDefault(),Adi= sonBreadCrump.InnerText });
                    }
                }

                Db.AltKategori.AddRange(altKategoriInsert);
                Db.SaveChanges();
            }
        }

        public void ExporterAltKategoriCeviri()
        {
            var kategoriler = Db.Kategori.ToList();
            var altKategoriler = Db.AltKategori.Include("Kategori").ToList();
            var altKatCeviriler = new List<AltKategoriCeviri>();

            foreach (var altkat in altKategoriler)
            {
                string link = "https://www.turkishexporter.net/en/companies?category=" + altkat.Kategori.Kod + "&subcategory=" + altkat.Kod;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var breadCrump = document.DocumentNode.SelectNodes("//ul").Where(j => j.HasClass("breadcrumb")).FirstOrDefault();
                if (breadCrump != null && breadCrump.ChildNodes.Where(i => i.Name == "li").ToList().Count() == 4)
                {
                    var sonBreadCrump = breadCrump.ChildNodes.Where(i => i.Name == "li").LastOrDefault();
                    var altKatCeviri = new AltKategoriCeviri();
                    altKatCeviri.Adi = sonBreadCrump.InnerText;
                    altKatCeviri.AltKategoriId = altkat.AltKategoriId;
                    altKatCeviri.DilId = 2;
                    altKatCeviriler.Add(altKatCeviri);
                }
            }
            Db.AltKategoriCeviri.AddRange(altKatCeviriler);
            Db.SaveChanges();
        }

        public void ExporterFirmaId()
        {
            var firmaKodlari = Db.ExporterFirma.Select(i => i.Kod).ToList();

            var kategoriler = Db.Kategori.ToList();
            var firma = new List<ExporterFirma>();

            foreach (var kat in kategoriler)
            {
                for (int i = 1; i <= 1000; i++)
                {
                    string link = "https://www.turkishexporter.net/tr/companies?category=" + kat.Kod + "&page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.
                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var checkBoxes = document.DocumentNode.SelectNodes("//input").Where(j => j.HasClass("selectCompany")).ToList();
                    if (checkBoxes.Count() > 0)
                    {

                        foreach (var chk in checkBoxes)
                        {
                            var id = chk.Attributes["value"].Value;
                            var adi = chk.ParentNode.ChildNodes.FirstOrDefault(j => j.Name == "h3").InnerText.Trim();

                            firma.Add(new ExporterFirma { Kod = id, Unvan = adi });
                        }

                    }
                    else
                    {
                        break;
                    }
                }


            }
            var insert = firma.Where(i => !firmaKodlari.Contains(i.Kod)).ToList();
            Db.ExporterFirma.AddRange(insert);
            Db.SaveChanges();
        }

        public string ExporterFirmaDetay()
        {
            var firmalar = Db.ExporterFirma.Where(i => !i.FirmaBilgisiAlindi.Value).Take(250);

            var diller = new List<string> {  "tr" };

            var etiket = new List<Etiket>();
            var etk = Db.Etiket.Select(i => i.Adi);
            var kodlar = new List<string>();
            var altKategoriler = Db.AltKategori.Include("Kategori").ToList();

            foreach (var firma in firmalar)
            {
                bool firmaDetayAlindi = false;
                foreach (var dil in diller)
                {
                    var dilId = dil == "tr" ? 1 : 2;
                    string link = "https://www.turkishexporter.net/" + dil + "/companies/F_N" + firma.Kod;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.
                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    //sayfa var mı yok mu kontrol et
                    if (document.DocumentNode.InnerText.Contains("Aradığınız Sayfa Bulunamadı") || document.DocumentNode.InnerText.Contains("Page Not Found"))
                    {
                        continue;
                    }
                    var keywordList = document.DocumentNode.SelectNodes("//ul").Where(j => j.HasClass("keyword-list")).FirstOrDefault();
                    if (keywordList != null)
                    {
                        var keywords = keywordList.ChildNodes.Where(i => i.Name == "li").Select(i => i.InnerText).ToList();
                        etiket.AddRange(keywords.Select(i => new Etiket { Adi = i, DilId = dilId }));
                    }

                    //firma detaylarını al
                    if (!firmaDetayAlindi)
                    {
                        var vergiNode = document.DocumentNode.SelectNodes("//h3").FirstOrDefault(f => f.InnerText.Contains("Tax Administration") || f.InnerText.Contains("Vergi Dairesi"));
                        firma.VergiDairesi = vergiNode != null ? RemoveWhitespace(vergiNode.NextSibling.NextSibling.InnerText.Trim().Replace(Environment.NewLine, "")) : "-/-";

                        var kategori = document.DocumentNode.SelectNodes("//a").Where(i => i.Attributes["href"].Value.Contains("subcategory")).ToList();
                        var altKatIds = new List<string>();
                        if (kategori.Count != 0)
                        {
                            foreach (var item in kategori)
                            {
                                var qs = item.Attributes["href"].Value;
                                var parsed = HttpUtility.ParseQueryString(qs);
                                var katKodu = parsed["/tr/companies?category"].ToString();
                                var altKatAdi = item.InnerText.Trim();

                                var altKat = altKategoriler.FirstOrDefault(f => f.Kategori.Kod == katKodu && f.Adi == altKatAdi);
                                if (altKat != null) altKatIds.Add(altKat.AltKategoriId.ToString());

                            }
                        }
                        //firma.Kategori = kategori.Count != 0 ? kategori.Select(i => i.Attributes["href"].Value.Split('=').LastOrDefault()).Aggregate((a, b) => a + "," + b) : "";
                        firma.Kategori = altKatIds.Count>=1? altKatIds.Aggregate((a, b) => a + "," + b):"";

                        var sertifikaNode = document.DocumentNode.SelectNodes("//h3").FirstOrDefault(f => f.InnerText.Contains("Sertifikaları") || f.InnerText.Contains("Certificates"));
                        firma.Sertifika = sertifikaNode != null ? sertifikaNode.NextSibling.NextSibling.InnerText.Trim().Replace(Environment.NewLine, "") : "";

                        var kurulusNode = document.DocumentNode.SelectNodes("//h3").FirstOrDefault(f => f.InnerText.Contains("Establishment Date") || f.InnerText.Contains("Kuruluş Tarihi"));
                        firma.KurulusYili = kurulusNode != null ? RemoveWhitespace(kurulusNode.NextSibling.NextSibling.InnerText.Trim().Replace(Environment.NewLine, "")) : "";

                        var yetkiliNode = document.DocumentNode.SelectSingleNode("//*[@id='cntIcerik_pnlForm']/div[1]/div/label");
                        firma.Yetkili = yetkiliNode != null ? yetkiliNode.InnerText.Trim() : "";

                        var adresNode = document.DocumentNode.SelectSingleNode("//*[@id='div_contact']");

                        if (adresNode != null)
                        {
                            var adres = adresNode.ChildNodes.FirstOrDefault(i => i.Name == "b" && (i.InnerText == "Address" || i.InnerText == "Adres"));
                            firma.Adres = adres != null ? adres.NextSibling.InnerText : "";
                        }


                        firma.FirmaBilgisiAlindi = true;

                        var uyelikNode = document.DocumentNode.SelectSingleNode("//*[@class='company-badge']").ChildNodes.FirstOrDefault(i => i.Name == "div").InnerText;
                        firma.UyelikTipi = uyelikNode;

                        firmaDetayAlindi = true;

                        kodlar.Add(firma.Kod);

                    }


                }
            }

            var etkInsert = etiket.Where(i => !etk.Contains(i.Adi)).ToList();
            Db.Etiket.AddRange(etkInsert);
            Db.SaveChanges();

            var k = kodlar.Aggregate((a, b) => a + "," + b).ToString();
            return k;



        }

        public string RemoveWhitespace(string str)
        {
            return string.Join("", str.Split(default(string[]), StringSplitOptions.RemoveEmptyEntries));
        }

    }
}