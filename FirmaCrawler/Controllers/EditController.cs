using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

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
            db.BulkSaveChanges();
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
            db.BulkSaveChanges();

        }
        public string EmailTopla(int kaynakId)
        {
            var sb = new StringBuilder();
            var firmaEposta = new List<FirmaEposta>();
            var sonuc = "";
            try
            {
                var db = new Db();
                var firma = db.FirmaKaynakRelation
                    .Include("Firma")
                    .Include("Firma.FirmaEposta")
                    .Where(i => i.KaynakId==kaynakId && i.Firma.YeniTipKayit).Select(s=>s.Firma).ToList();

                var list = new List<Firma>();
                var timer = 0;
                var updated = 0;
                var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml","js","css" };


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
                                if (string.IsNullOrEmpty(email)) emails.Add(email);
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
                                if (epostaDom!=null && epostaDom.Attributes["data-cfemail"]!=null)
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
                            html= client.DownloadString("http://"+link);

                            document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                            document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                            innerText = document.DocumentNode.InnerText;

                            foreach (Match myMatch in myRegex.Matches(innerText))
                            {
                                emails.Add(myMatch.Value);
                            }
                        }

                        emails = emails.Distinct().ToList();
                         
                        if (emails.Count > 1)
                        {
                            foreach (var email in emails)
                            {
                                var kayitliEposta = item.FirmaEposta.Select(ss =>ss.Eposta).ToList();
                                if (!kayitliEposta.Contains(email))
                                {
                                    firmaEposta.Add(new FirmaEposta { FirmaId = item.FirmaId, Eposta = email });
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
            foreach (var item in kaynakTipler.Where(i=>!string.IsNullOrEmpty(i)))
            {
                var list = item.Split(',').Where(i=> !string.IsNullOrEmpty(i));
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
                if (firmaKaynaklar!=null && firmaKaynaklar.Count()>0)
                {
                    foreach (var firmaKaynak in firmaKaynaklar)
                    {
                        int kaynakId = kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak)!= null ? kaynaklar.FirstOrDefault(f => f.Adi == firmaKaynak).KaynakId :0;
                        if (kaynakId>0)
                        {
                            relation.Add(new FirmaKaynakRelation { FirmaId = firma.FirmaId, KaynakId = kaynakId });
                        }
                    }
                }


            }

            db.FirmaKaynakRelation.AddRange(relation);
            db.BulkSaveChanges();
        }


        public void FirmaGrupla()
        {
            var db = new Db();
            var kaynaklar = db.Kaynak.ToList();
            var sirketTurleri = db.SirketTur.ToList();
            var relation = new List<FirmaKaynakRelation>();
            var firmaEposta = new List<FirmaEposta>();
            var firmaGrup = db.Firma.Where(i=>!string.IsNullOrEmpty(i.Unvan) && !i.Aktarim).GroupBy(x => new { x.Unvan, x.WebSitesi }, (key, group) => new
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
                    if (sayac==1)
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

                        var emails = item.Liste.Select(i => i.Eposta).Distinct().Where(i=>!string.IsNullOrEmpty(i)).ToList();
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
            db.BulkSaveChanges();
            
        }
    }
}