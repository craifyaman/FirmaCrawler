using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.ComponentModel.DataAnnotations;

using System.Web.Mvc;
using ArrayToExcel;
using System.Web.Caching;
using OpenQA.Selenium.DevTools.V102.LayerTree;

namespace FuarCrawler.Controllers
{
    public class EditController : Controller
    {
        // GET: Edit
        public void TekrarliWebSiteleriniSil()
        {
            var db = new Db();
            var silinecekKayitlar = new List<int>();
            var tekrarlananWebSiteleri = db.Firma.Where(i => !string.IsNullOrEmpty(i.WebSitesi)).GroupBy(i => i.WebSitesi).Where(i => i.Count() > 1).ToList();

            foreach (var item in tekrarlananWebSiteleri)
            {

                for (int i = 1; i < item.Count(); i++)
                {
                    var id = item.ElementAt(i).FirmaId;
                    silinecekKayitlar.Add(id);
                }
            }

            var sil = db.Firma.Where(i => silinecekKayitlar.Contains(i.FirmaId)).ToList();
            db.Firma.RemoveRange(sil);
            db.SaveChanges();
        }
        public void TekrarEdenEpostaAdresleriniDuzelt()
        {
            var db = new Db();
            var silinecekKayitlar = new List<int>();

            var tekrarlananWebSiteleri = db.Firma.Where(i => !string.IsNullOrEmpty(i.Eposta) && i.Il == "GAZİANTEP").GroupBy(i => new { i.Eposta, i.IhracatDurumu });

            foreach (var item in tekrarlananWebSiteleri)
            {
                if (item.Count() == 2)
                {
                    var id = item.FirstOrDefault(i => i.IhracatDurumu != "EVET").FirmaId;
                    silinecekKayitlar.Add(id);
                }
                else
                {
                    var a = 1;
                }
            }
            var sil = db.Firma.Where(i => silinecekKayitlar.Contains(i.FirmaId)).ToList();
            db.Firma.RemoveRange(sil);
            db.SaveChanges();

        }
        public string EmailTopla(int kaynakId = 209, int sayi = 10)
        {
            var sb = new StringBuilder();
            var firmaEposta = new List<FirmaEposta>();
            var sonuc = "";
            try
            {
                var db = new Db();
                var model = db.FirmaKaynakRelation
                    .Include("Firma")
                    .Include("Firma.FirmaEposta")
                    .Where(i => i.KaynakId == kaynakId && i.Firma.YeniTipKayit & !i.Firma.WebSitesindenMail && i.Firma.WebSitesi != "").Select(s => s.Firma);

                var toplamSayi = model.Count();

                sb.Append("KaynakId:" + kaynakId + " Toplam Sayi:" + toplamSayi);

                var firma = model.Take(sayi).ToList();
                firma.ForEach(f => f.WebSitesindenMail = true);
                db.SaveChanges();

                var list = new List<Firma>();
                var timer = 0;
                var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml", "js", "css" };


                foreach (var item in firma)
                {
                    var s = "";
                    timer++;
                    try
                    {
                        s += item.WebSitesi + "-->";

                        item.WebSitesindenMail = true;
                        item.WebSitesindenMailHata = "iletişim sayfası kontrol edildi";

                        string link = item.WebSitesi.Replace("www.", "").Replace("http://", "").Replace("https://", ""); //Uri tipinde değişeken linkimizi veriyoruz.
                        var html = "";

                        if (!UrlExist(link))
                        {
                            item.WebSitesiMevcut = false;
                            db.SaveChanges();
                            s += item.WebSitesi + "--> web sitesi mevcut değil";
                            sb.AppendLine(s);
                            continue;
                        }

                        //Anasayfadan Mail Topla
                        WebClient client = new WebClient();
                        html = client.DownloadString("http://" + link);

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var innerText = document.DocumentNode.InnerText;

                        string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
                        Regex myRegex = new Regex(strRegex, RegexOptions.None);
                        //string strTargetString = @"wjeqklejqwek myEmail@hotmail.com a;lekqlwe anothermail@mail.ru";

                        var emails = new List<string>();

                        if (html.Contains("__cf_email__"))
                        {
                            var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                            if (epostaDom != null)
                            {
                                var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                                if (!string.IsNullOrEmpty(email)) emails.Add(email);
                            }
                        }

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }

                        //İç Sayfalardan Mail Topla

                        var tumSayfalar = new List<string>();

                        var hrefs = document.DocumentNode.SelectNodes("//html/body//a/@href").Select(i => i.Attributes["href"]).ToList();
                        var sayfaUrls = hrefs.Select(i => i.Value).ToList();
                        var iletisimUrl = "";
                        //Contact
                        var iltsm = sayfaUrls.FirstOrDefault(i =>
                        i.ToLower().Contains("iletisim") ||
                        i.ToLower().Contains("Iletisim") ||
                         i.ToLower().Contains("contact") ||
                         i.ToLower().Contains("ulasin")
                         );

                        if (iltsm != null)
                        {
                            iletisimUrl = iltsm;

                            if (iletisimUrl.StartsWith("http"))
                            {
                                html = client.DownloadString(iletisimUrl);
                            }
                            else if (iletisimUrl.StartsWith("/"))
                            {
                                html = client.DownloadString("http://" + link + iletisimUrl);
                            }
                            else
                            {
                                html = client.DownloadString("http://" + link + "/" + iletisimUrl);
                            }


                            document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                            innerText = document.DocumentNode.InnerText;


                            //email protection var mı bak

                            if (html.Contains("__cf_email__"))
                            {
                                var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                                if (epostaDom != null && epostaDom.Attributes["data-cfemail"] != null)
                                {
                                    var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                                    if (!string.IsNullOrEmpty(email)) emails.Add(email);
                                }
                            }

                            foreach (Match myMatch in myRegex.Matches(innerText))
                            {
                                emails.Add(myMatch.Value);
                            }

                            //Anasayfa
                            html = client.DownloadString("http://" + link);

                            document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                            innerText = document.DocumentNode.InnerText;

                            foreach (Match myMatch in myRegex.Matches(innerText))
                            {
                                emails.Add(myMatch.Value);
                            }
                        }

                        emails = emails.Distinct().ToList();

                        if (emails.Count > 0)
                        {
                            foreach (var email in emails)
                            {
                                var kayitliEposta = item.FirmaEposta.Select(ss => ss.Eposta).ToList();
                                if (!kayitliEposta.Contains(email))
                                {
                                    firmaEposta.Add(new FirmaEposta { FirmaId = item.FirmaId, Eposta = email, KayitTarihi = DateTime.Now });
                                }
                            }
                        }
                        s += emails.Count.ToString();
                        sb.AppendLine(s);

                    }
                    catch (Exception ex)
                    {
                        s += ex.Message;
                        sb.AppendLine(s);

                        item.WebSitesindenMailHata = ex.Message;
                        continue;
                    }

                }
                db.FirmaEposta.AddRange(firmaEposta);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                sonuc = ex.Message;
            }

            return sb.ToString();
        }
        public string EmailToplaUrl(string url)
        {
            var sb = new StringBuilder();
            var firmaEposta = new List<FirmaEposta>();
            var sonuc = "";
            try
            {
                var list = new List<Firma>();
                var timer = 0;
                var updated = 0;
                var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml", "js", "css" };
                var s = "";
                timer++;
                try
                {
                    //Anasayfadan Mail Topla
                    WebClient client = new WebClient();
                    var html = client.DownloadString("http://" + url);

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    var innerText = document.DocumentNode.InnerText;

                    string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
                    Regex myRegex = new Regex(strRegex, RegexOptions.None);
                    //string strTargetString = @"wjeqklejqwek myEmail@hotmail.com a;lekqlwe anothermail@mail.ru";

                    var emails = new List<string>();

                    if (html.Contains("__cf_email__"))
                    {
                        var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                        if (epostaDom != null)
                        {
                            var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                            if (!string.IsNullOrEmpty(email)) emails.Add(email);
                        }
                    }

                    foreach (Match myMatch in myRegex.Matches(innerText))
                    {
                        emails.Add(myMatch.Value);
                    }

                    //İç Sayfalardan Mail Topla

                    var tumSayfalar = new List<string>();

                    var hrefs = document.DocumentNode.SelectNodes("//html/body//a/@href").Select(i => i.Attributes["href"]).ToList();
                    var sayfaUrls = hrefs.Select(i => i.Value).ToList();
                    var iletisimUrl = "";
                    //Contact
                    var iltsm = sayfaUrls.FirstOrDefault(i =>
                    i.ToLower().Contains("iletisim") ||
                    i.ToLower().Contains("Iletisim") ||
                    i.Contains("Iletisim") ||
                     i.ToLower().Contains("contact") ||
                     i.ToLower().Contains("ulasin")
                     );

                    if (iltsm != null)
                    {
                        iletisimUrl = iltsm;

                        if (iletisimUrl.StartsWith("http"))
                        {
                            html = client.DownloadString(iletisimUrl);
                        }
                        else if (iletisimUrl.StartsWith("/"))
                        {
                            html = client.DownloadString("http://" + url + iletisimUrl);
                        }
                        else
                        {
                            html = client.DownloadString("http://" + url + "/" + iletisimUrl);
                        }


                        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        innerText = document.DocumentNode.InnerText;


                        //email protection var mı bak

                        if (html.Contains("__cf_email__"))
                        {
                            var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                            if (epostaDom != null && epostaDom.Attributes["data-cfemail"] != null)
                            {
                                var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                                if (string.IsNullOrEmpty(email)) emails.Add(email);
                            }
                        }

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }

                        //Anasayfa
                        html = client.DownloadString("http://" + url);

                        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        innerText = document.DocumentNode.InnerText;

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }
                    }

                    emails = emails.Distinct().ToList();
                    s += emails.Count.ToString();
                    sb.AppendLine(s);

                }
                catch (Exception ex)
                {
                    s += ex.Message;
                    sb.AppendLine(s);


                }


            }
            catch (Exception ex)
            {
                sonuc = ex.Message;
            }

            return sb.ToString();
        }
        public string WebSitesiAnasayfaEmailTopla()
        {
            var sb = new StringBuilder();
            var sonuc = "";
            try
            {
                var db = new Db();
                var firma = db.Firma.Where(i => string.IsNullOrEmpty(i.Eposta) && !string.IsNullOrEmpty(i.WebSitesi) && !i.WebSitesindenMail).Take(50).ToList();
                //var firma = db.Firma.Where(i => i.FirmaId== 28477);

                var list = new List<Firma>();
                var timer = 0;
                var updated = 0;

                foreach (var item in firma)
                {
                    var s = "";
                    timer++;
                    try
                    {
                        s += item.WebSitesi + "-->";

                        item.WebSitesindenMail = true;
                        string link = item.WebSitesi.Replace("www.", "").Replace("http://", "").Replace("https://", ""); //Uri tipinde değişeken linkimizi veriyoruz.
                        var html = "";

                        WebClient client = new WebClient();
                        html = client.DownloadString("http://" + link);

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var innerText = document.DocumentNode.InnerText;

                        string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
                        Regex myRegex = new Regex(strRegex, RegexOptions.None);
                        //string strTargetString = @"wjeqklejqwek myEmail@hotmail.com a;lekqlwe anothermail@mail.ru";

                        var emails = new List<string>();

                        if (html.Contains("__cf_email__"))
                        {
                            var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                            if (epostaDom != null)
                            {
                                var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                                if (string.IsNullOrEmpty(email)) emails.Add(email);
                            }
                        }

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }

                        emails = emails.Distinct().ToList();
                        if (emails.Count == 1)
                        {
                            item.Eposta = emails.FirstOrDefault();
                            item.KayıtTarihi = DateTime.Now;
                            updated++;
                        }
                        else if (emails.Count > 1)
                        {
                            foreach (var email in emails)
                            {
                                var f = new Firma();
                                foreach (var prop in item.GetType().GetProperties())
                                {
                                    f.GetType().GetProperty(prop.Name).SetValue(f, prop.GetValue(item, null), null);
                                };
                                f.Eposta = email;
                                f.KayıtTarihi = DateTime.Now;
                                list.Add(f);
                            }
                        }
                        s += emails.Count.ToString();
                        sb.AppendLine(s);
                    }
                    catch (Exception ex)
                    {
                        s += ex.Message;
                        item.WebSitesindenMailHata = ex.Message;
                        sb.AppendLine(s);
                        continue;
                    }

                }

                db.Firma.AddRange(list);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                sonuc = ex.Message;
            }

            return sb.ToString(); ;
        }
        public string WebSitesiIletisimSayfasiEmailTopla()
        {
            var sb = new StringBuilder();
            var sonuc = "";
            try
            {
                var db = new Db();
                var firma = db.Firma.Where(i => i.WebSitesindenMail && string.IsNullOrEmpty(i.WebSitesindenMailHata) && string.IsNullOrEmpty(i.Eposta)).Take(50).ToList();
                //var firma = db.Firma.Where(i => i.FirmaId== 28477);

                var list = new List<Firma>();
                var timer = 0;
                var updated = 0;
                var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml" };


                foreach (var item in firma)
                {
                    var s = "";
                    timer++;
                    try
                    {
                        s += item.WebSitesi + "-->";

                        item.WebSitesindenMail = true;
                        item.WebSitesindenMailHata = "iletişim sayfası kontrol edildi";

                        string link = item.WebSitesi.Replace("www.", "").Replace("http://", "").Replace("https://", ""); //Uri tipinde değişeken linkimizi veriyoruz.
                        var html = "";

                        //Anasayfadan Mail Topla
                        WebClient client = new WebClient();
                        html = client.DownloadString("http://" + link);

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        var innerText = document.DocumentNode.InnerText;

                        string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
                        Regex myRegex = new Regex(strRegex, RegexOptions.None);
                        //string strTargetString = @"wjeqklejqwek myEmail@hotmail.com a;lekqlwe anothermail@mail.ru";

                        var emails = new List<string>();

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }

                        //İç Sayfalardan Mail Topla

                        var tumSayfalar = new List<string>();

                        var hrefs = document.DocumentNode.SelectNodes("//html/body//a/@href").Select(i => i.Attributes["href"]).ToList();
                        var sayfaUrls = hrefs.Select(i => i.Value).ToList();
                        var iletisimUrl = "";
                        //Contact
                        var iltsm = sayfaUrls.FirstOrDefault(i =>
                        i.ToLower().Contains("iletisim") ||
                        i.ToLower().Contains("Iletisim") ||
                         i.ToLower().Contains("contact") ||
                         i.ToLower().Contains("ulasin")
                         );
                        if (iltsm != null)
                        {
                            iletisimUrl = iltsm;

                            if (iletisimUrl.StartsWith("http"))
                            {
                                html = client.DownloadString(iletisimUrl);
                            }
                            else if (iletisimUrl.StartsWith("/"))
                            {
                                html = client.DownloadString("http://" + link + iletisimUrl);
                            }
                            else
                            {
                                html = client.DownloadString("http://" + link + "/" + iletisimUrl);
                            }

                            document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                            innerText = document.DocumentNode.InnerText;

                            if (html.Contains("__cf_email__"))
                            {
                                var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                                if (epostaDom != null)
                                {
                                    var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                                    if (string.IsNullOrEmpty(email)) emails.Add(email);
                                }
                            }

                            foreach (Match myMatch in myRegex.Matches(innerText))
                            {
                                emails.Add(myMatch.Value);
                            }
                        }


                        emails = emails.Distinct().ToList();
                        if (emails.Count == 1)
                        {
                            item.Eposta = emails.FirstOrDefault();
                            item.KayıtTarihi = DateTime.Now;
                            item.WebSitesiIletisimSayfasi = iletisimUrl;

                            updated++;
                        }
                        else if (emails.Count > 1)
                        {
                            foreach (var email in emails)
                            {
                                var f = new Firma();
                                foreach (var prop in item.GetType().GetProperties())
                                {
                                    f.GetType().GetProperty(prop.Name).SetValue(f, prop.GetValue(item, null), null);
                                };
                                f.Eposta = email;
                                f.KayıtTarihi = DateTime.Now;
                                item.WebSitesiIletisimSayfasi = iletisimUrl;


                                list.Add(f);
                            }
                        }
                        s += emails.Count.ToString();
                        sb.AppendLine(s);

                    }
                    catch (Exception ex)
                    {
                        s += ex.Message;
                        sb.AppendLine(s);

                        item.WebSitesindenMailHata = ex.Message;
                        continue;
                    }

                }
                list.ForEach(i => i.WebSitesindenMailHata = "iletişim sayfası kontrol edildi");
                db.Firma.AddRange(list);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                sonuc = ex.Message;
            }

            return sb.ToString();
        }
        public string WebSitesiMevcut()
        {
            var sb = new StringBuilder();

            try
            {
                var db = new Db();
                var firma = db.Firma.Where(i => !string.IsNullOrEmpty(i.WebSitesi) && !i.WebSitesiMevcutKontrol).Take(50).ToList();
                foreach (var item in firma)
                {
                    var s = "";
                    try
                    {
                        s += item.WebSitesi + "-->";
                        item.WebSitesiMevcut = UrlExist(item.WebSitesi);
                        s += item.WebSitesiMevcut.ToString();
                        item.WebSitesiMevcutKontrol = true;

                        sb.AppendLine(s);
                    }
                    catch (Exception ex)
                    {
                        s += ex.Message;
                        sb.AppendLine(s);
                        continue;
                    }
                }
                db.SaveChanges();
                return sb.ToString();
            }
            catch (Exception ex)
            {
                return "Hata: " + ex.Message;
            }
        }
        public bool UrlExist(string url)
        {
            try
            {
                HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("http://" + url);
                webRequest.Method = "GET";

                string responseData = string.Empty;
                HttpWebResponse httpResponse = (HttpWebResponse)webRequest.GetResponse();

                using (StreamReader responseReader = new StreamReader(httpResponse.GetResponseStream()))
                {
                    responseData = responseReader.ReadToEnd();
                }
                return true;
            }
            catch (WebException ex)
            {
                return false;
            }
        }
        public void CokluEpostaDüzelt()
        {

            var db = new Db();
            var firmalar = db.Firma.Where(i => i.Eposta.Contains(",")).ToList();
            var insertlist = new List<Firma>();

            foreach (var item in firmalar)
            {
                var epostaadresleri = item.Eposta.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();
                try
                {
                    item.Eposta = epostaadresleri[0];
                    foreach (var eposta in epostaadresleri.Skip(1))
                    {
                        var _f = new Firma();
                        foreach (var prop in item.GetType().GetProperties())
                        {
                            _f.GetType().GetProperty(prop.Name).SetValue(_f, prop.GetValue(item, null), null);
                        };
                        _f.Eposta = eposta;
                        _f.KayıtTarihi = DateTime.Now;
                        insertlist.Add(_f);
                    }
                }
                catch (Exception ex)
                {

                    continue;
                }


            }
            db.Firma.AddRange(insertlist);
            db.SaveChanges();

        }
        public void KücükHarfYap()
        {

            var db = new Db();
            var firmalar = db.Firma.Where(i => !string.IsNullOrEmpty(i.Eposta)).ToList();
            var insertlist = new List<Firma>();

            foreach (var item in firmalar)
            {
                var epostaadresleri = item.Eposta.Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries).ToList();
                try
                {
                    item.Eposta = epostaadresleri[0];
                    foreach (var eposta in epostaadresleri.Skip(1))
                    {
                        var _f = new Firma();
                        foreach (var prop in item.GetType().GetProperties())
                        {
                            _f.GetType().GetProperty(prop.Name).SetValue(_f, prop.GetValue(item, null), null);
                        };
                        _f.Eposta = eposta;
                        _f.KayıtTarihi = DateTime.Now;
                        insertlist.Add(_f);
                    }
                }
                catch (Exception ex)
                {

                    continue;
                }


            }
            db.Firma.AddRange(insertlist);
            db.SaveChanges();

        }
        public string cfDecodeEmail(string encodedString)
        {
            string email = "";
            int r = Convert.ToInt32(encodedString.Substring(0, 2), 16), n, i;
            for (n = 2; encodedString.Length - n > 0; n += 2)
            {
                i = Convert.ToInt32(encodedString.Substring(n, 2), 16) ^ r;
                char character = (char)i;
                email += Convert.ToString(character);
            }

            return email;
        }
        public void KaynakTipKaydet()
        {
            var db = new Db();
            var kaynakTipler = db.Firma.Select(i => i.KaynakTip).Distinct().ToList();
            var kaynakTip = new List<string>();
            foreach (var item in kaynakTipler.Where(i => !string.IsNullOrEmpty(i)))
            {
                var list = item.Split(',').Where(i => !string.IsNullOrEmpty(i));
                kaynakTip.AddRange(list);

            }
            var tipler = kaynakTip.Distinct().ToList();
            db.KaynakTip.AddRange(tipler.Select(i => new Models.KaynakTip { Adi = i.Trim() }));
            db.SaveChanges();
        }
        public void KaynakKaydet()
        {
            var db = new Db();
            var kaynakTipler = db.Firma.Select(i => i.Kaynak).Distinct().ToList();
            var kaynakTip = new List<string>();

            foreach (var item in kaynakTipler.Where(i => !string.IsNullOrEmpty(i)))
            {
                var list = item.Split(',').Where(i => !string.IsNullOrEmpty(i));
                kaynakTip.AddRange(list);

            }

            var tipler = kaynakTip.Distinct().ToList();
            db.Kaynak.AddRange(tipler.Select(i => new Models.Kaynak { Adi = i.Trim() }));
            db.SaveChanges();
        }
        public void FirmaKaynakEkle()
        {
            var db = new Db();
            var firmalar = db.Firma.Include("FirmaKaynakRelation").Where(i => !string.IsNullOrEmpty(i.Kaynak) && i.FirmaKaynakRelation.Count == 0).Take(100);
            var kaynaklar = db.Kaynak.ToList();
            var relation = new List<FirmaKaynakRelation>();

            foreach (var firma in firmalar)
            {
                var firmaKaynaklar = firma.Kaynak.Split(',').Where(i => !string.IsNullOrEmpty(i)).Distinct().ToList();
                if (firmaKaynaklar != null && firmaKaynaklar.Count() > 0)
                {
                    foreach (var firmaKaynak in firmaKaynaklar)
                    {
                        int kaynakId = kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak) != null ? kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak).KaynakId : 0;
                        if (kaynakId > 0)
                        {
                            relation.Add(new FirmaKaynakRelation { FirmaId = firma.FirmaId, KaynakId = kaynakId });
                        }
                    }
                }


            }

            db.FirmaKaynakRelation.AddRange(relation);
            db.SaveChanges();
        }
        public void FirmaGrupla()
        {
            var db = new Db();
            var kaynaklar = db.Kaynak.ToList();
            var sirketTurleri = db.SirketTur.ToList();
            var relation = new List<FirmaKaynakRelation>();
            var firmaEposta = new List<FirmaEposta>();
            var firmaGrup = db.Firma.Where(i => !string.IsNullOrEmpty(i.Unvan) && !i.Aktarim).GroupBy(x => new { x.Unvan, x.WebSitesi }, (key, group) => new
            {
                Unvan = key.Unvan,
                WebSitesi = key.WebSitesi,
                Miktar = group.Count(),
                Liste = group.ToList()
            }).OrderByDescending(i => i.Miktar).Take(5000);

            foreach (var item in firmaGrup)
            {
                var sayac = 1;
                foreach (var firma in item.Liste)
                {
                    if (sayac == 1)
                    {
                        var firmaKaynaklar = firma.Kaynak?.Split(',').Where(i => !string.IsNullOrEmpty(i)).Distinct().ToList();
                        if (firmaKaynaklar != null && firmaKaynaklar.Count() > 0)
                        {
                            foreach (var firmaKaynak in firmaKaynaklar)
                            {
                                int kaynakId = kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak) != null ? kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak).KaynakId : 0;
                                if (kaynakId > 0)
                                {
                                    relation.Add(new FirmaKaynakRelation { FirmaId = firma.FirmaId, KaynakId = kaynakId });
                                }
                            }
                        }

                        var sirketTur = sirketTurleri.FirstOrDefault(f => f.Adi == firma.SirketTuru);
                        if (sirketTur != null) firma.SirketTurId = sirketTur.SirketTurId;

                        var emails = item.Liste.Select(i => i.Eposta).Distinct().Where(i => !string.IsNullOrEmpty(i)).ToList();
                        if (emails != null && emails.Count > 0) firmaEposta.AddRange(emails.Select(s => new FirmaEposta { FirmaId = firma.FirmaId, Eposta = s }));


                        firma.YeniTipKayit = true;
                        firma.KayitTarihi = DateTime.Now;
                    }
                    firma.Aktarim = true;
                    sayac++;

                }
            }

            db.FirmaEposta.AddRange(firmaEposta);
            db.FirmaKaynakRelation.AddRange(relation);
            db.SaveChanges();

        }
        public void EpostaKontrol()
        {
            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\Data\List.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var validList = new List<Firma>();
            var invalidList = new List<Firma>();


            foreach (DataRow dr in crawlerDataset.Tables[0].Rows)
            {

                var eposta = dr.ItemArray[0] != null ? dr.ItemArray[0].ToString().Trim() : "";

                if (string.IsNullOrEmpty(eposta))
                {
                    continue;
                }

                if (eposta.EndsWith("."))
                {
                    eposta = eposta.Replace("com.", ".");
                }


                if (IsValidEmail(eposta))
                {
                    validList.Add(new Firma
                    {
                        Eposta = eposta,
                        WebSitesi = eposta.Split('@')[1].ToString()
                    });
                }
                else
                {
                    invalidList.Add(new Firma
                    {
                        Eposta = eposta,
                    });

                }


            }

            var validItems = validList.Select(x => new
            {
                Eposta = x.Eposta,
                WebSitesi = x.WebSitesi

            });

            var excel = validItems.ToExcel();
            //C:\Users\raify\Desktop
            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\Data\\ValidList-1.xlsx", excel);

            var invalidItems = invalidList.Select(x => new
            {
                Eposta = x.Eposta

            });

            excel = invalidItems.ToExcel();
            //C:\Users\raify\Desktop
            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\Data\\InValidList-1.xlsx", excel);

        }
        public bool IsValidEmail(string source)
        {
            String theEmailPattern = @"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z";
            return Regex.IsMatch(source, theEmailPattern);
        }

        public void ExcelFirmaAktarGoogleMaps()
        {
            var db = new Db();
            var firmaList = new List<Firma>();
            var epostaList = db.FirmaEposta.Select(i => i.Eposta).ToList();
            var distinctList = new List<Firma>();
            var insert = new List<Firma>();

            var crawlerDataset = new DataSet();


            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\crawler\Unvan\3\3.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }


            foreach (DataRow dr in crawlerDataset.Tables[0].Rows)
            {
                var eposta = dr.ItemArray[0].ToString();
                var unvan = dr.ItemArray[1].ToString();



                firmaList.Add(new Firma
                {
                    Unvan = unvan,
                    Eposta = eposta,
                    KayitTarihi = DateTime.Now


                });

            }

            var l = firmaList.Where(i => !epostaList.Contains(i.Eposta)).ToList();
            foreach (var item in l)
            {

                item.YeniTipKayit = true;
                item.KayitTarihi = DateTime.Now;
                item.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = 203 } };

                item.FirmaEposta = new List<FirmaEposta> {
                        new FirmaEposta
                        {
                            Eposta=item.Eposta,
                            KayitTarihi= DateTime.Now
                        }
                    };

                insert.Add(item);

            }

            db.Firma.AddRange(insert);
            db.BulkSaveChanges();

        }

        public void ExcelFirmaAktar()
        {
            var firmaList = new List<Firma>();
            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\mks.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            foreach (DataRow dr in crawlerDataset.Tables[0].Rows)
            {
                var url = dr.ItemArray[0].ToString();
                var list = EmailLisUrtFromUrl(url);
                if (list.Count > 0)
                {
                    firmaList.AddRange(list.Select(s => new Firma { WebSitesi = url, Eposta = s }));
                }
            }


            var items = firmaList.Select(x => new
            {
                Eposta = x.Eposta,
                WebSitesi = x.WebSitesi
            });

            var excel = items.ToExcel();
            //C:\Users\raify\Desktop
            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\mks-son.xlsx", excel);


        }


        public void BounceEmail()
        {
            var firmaList = new List<Firma>();
            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\bounce\20-22 11\Bounce Listesi.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }
            //1827
            var counter = 0;
            foreach (DataRow dr in crawlerDataset.Tables[0].Rows)
            {
                if (counter == 0)
                {
                    counter++;
                    continue;
                }

                var email = dr.ItemArray[0].ToString();
                var url = dr.ItemArray[2].ToString();
                var list = EmailLisUrtFromUrl(url).Where(i => email != i).ToList();
                if (list.Count > 0)
                {
                    firmaList.AddRange(list.Select(s => new Firma { WebSitesi = url, Eposta = s }));
                }
                counter++;
            }

            var items = firmaList.Select(x => new
            {
                Eposta = x.Eposta,
                WebSitesi = x.WebSitesi
            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\bounce\\20-22 11\\bounce-kontrol.xlsx", excel);


        }

        public List<string> EmailLisUrtFromUrl(string url)
        {

            var firmaEposta = new List<string>();
            var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml", "js", "css" };

            try
            {

                var html = "";

                if (!UrlExist(url))
                {
                    return new List<string>();
                }

                //Anasayfadan Mail Topla
                WebClient client = new WebClient();
                html = client.DownloadString("http://" + url);

                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                var innerText = document.DocumentNode.InnerText;

                string strRegex = @"[A-Za-z0-9_\-\+]+@[A-Za-z0-9\-]+\.([A-Za-z]{2,3})(?:\.[a-z]{2})?";
                Regex myRegex = new Regex(strRegex, RegexOptions.None);
                //string strTargetString = @"wjeqklejqwek myEmail@hotmail.com a;lekqlwe anothermail@mail.ru";

                var emails = new List<string>();

                if (html.Contains("__cf_email__"))
                {
                    var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                    if (epostaDom != null)
                    {
                        var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                        if (!string.IsNullOrEmpty(email)) emails.Add(email);
                    }
                }

                foreach (Match myMatch in myRegex.Matches(innerText))
                {
                    emails.Add(myMatch.Value);
                }

                //İç Sayfalardan Mail Topla

                var tumSayfalar = new List<string>();

                var hrefs = document.DocumentNode.SelectNodes("//html/body//a/@href").Select(i => i.Attributes["href"]).ToList();
                var sayfaUrls = hrefs.Select(i => i.Value).ToList();
                var iletisimUrl = "";
                //Contact
                var iltsm = sayfaUrls.FirstOrDefault(i =>
                i.ToLower().Contains("iletisim") ||
                i.ToLower().Contains("Iletisim") ||
                 i.ToLower().Contains("contact") ||
                 i.ToLower().Contains("ulasin")
                 );

                if (iltsm != null)
                {
                    iletisimUrl = iltsm;

                    if (iletisimUrl.StartsWith("http"))
                    {
                        html = client.DownloadString(iletisimUrl);
                    }
                    else if (iletisimUrl.StartsWith("/"))
                    {
                        html = client.DownloadString("http://" + url + iletisimUrl);
                    }
                    else
                    {
                        html = client.DownloadString("http://" + url + "/" + iletisimUrl);
                    }


                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    innerText = document.DocumentNode.InnerText;


                    //email protection var mı bak

                    if (html.Contains("__cf_email__"))
                    {
                        var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                        if (epostaDom != null && epostaDom.Attributes["data-cfemail"] != null)
                        {
                            var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                            if (!string.IsNullOrEmpty(email)) emails.Add(email);
                        }
                    }

                    foreach (Match myMatch in myRegex.Matches(innerText))
                    {
                        emails.Add(myMatch.Value);
                    }

                    //Anasayfa
                    html = client.DownloadString("http://" + url);

                    document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                    innerText = document.DocumentNode.InnerText;

                    foreach (Match myMatch in myRegex.Matches(innerText))
                    {
                        emails.Add(myMatch.Value);
                    }
                }

                emails = emails.Distinct().ToList();

                if (emails.Count > 0)
                {
                    foreach (var email in emails)
                    {
                        firmaEposta.Add(email);

                    }
                }

            }
            catch (Exception ex)
            {
                return new List<string>();
            }



            return firmaEposta;
        }
    }

}