 
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class IhracatController : Controller
    {
        public void IMMIB()
        {
            var l = new List<Ihrc>
            {
                //new Ihrc {BirlikNo=24,Sayfa=15,Kaynak="ÇELİK İHRACATÇILAR BİRLİĞİ"}
                new Ihrc {BirlikNo=10,Sayfa=187,Kaynak="ELEKTRİK VE ELEKTRONİK İHRACATÇILAR BİRLİĞİ"},
                new Ihrc {BirlikNo=28,Sayfa=46,Kaynak="HİZMET İHRACATÇILAR BİRLİĞİ"},
                new Ihrc {BirlikNo=11,Sayfa=211,Kaynak="İSTANBUL DEMİR VE DEMİR SIŞI METALLER İHRACATÇILAR BİRLİĞİ"},
                new Ihrc {BirlikNo=12,Sayfa=110,Kaynak="İSTANBUL KİMYEVİ MADDELER VE MAMULLERİ İHRACATÇILAR BİRLİĞİ"},
                new Ihrc {BirlikNo=23,Sayfa=22,Kaynak="MÜCEVHER İHRACATÇILAR BİRLİĞİ"},
            };

            foreach (var birlik in l.OrderBy(i => i.Sayfa))
            {
                var db = new Db();
                var list = new List<Firma>();
                for (int i = 0; i < birlik.Sayfa; i++)
                {

                    object reqData = new
                    {
                        __RequestVerificationToken = "ZJx5y60LeYkvfa_makSa_e2PEIgB0af4qmk34cmm0X-NdEu8P_02Tqw5nHAf302eW7FgmybpyouMeDsy1CfeCCM66tpTpwlJoUHSkA9Xmuc1",
                        birlik = birlik.BirlikNo,
                        malGrubu = 0,
                        countryFilter = 0,
                        ulkegrubu = "",
                        ulke = "",
                        sehir = "",
                        page = i

                    };
                    var html = Req("https://www.immib.org.tr/tr/online-islemler-firma-arama.html", reqData);

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var firmaRows = document.DocumentNode.SelectNodes("//*[@id='page-content']/article/div/div/div/div[1]/div[1]/div[1]/div[2]/table/tbody/tr").ToList();
                    foreach (var firmaRow in firmaRows)
                    {
                        try
                        {
                            var firma = new Firma();
                            var bilgiler = firmaRow.ChildNodes[3];
                            var unvan = bilgiler.ChildNodes[1].InnerText;
                            var adres = bilgiler.ChildNodes[3].InnerText;
                            var il = adres.Split(' ')[adres.Split(' ').Count() - 1];
                            var ilce = adres.Split(' ')[adres.Split(' ').Count() - 2];
                            var websitesi =bilgiler.ChildNodes.Count==9? bilgiler.ChildNodes[7].InnerText.Trim().Replace("www.", "").Replace("http://", "").Replace("https://", ""):"";

                            var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == websitesi);
                            if (!string.IsNullOrEmpty(websitesi) && fromDb != null)
                            {
                                if (!fromDb.Kaynak.Contains(birlik.Kaynak))
                                {
                                    fromDb.Kaynak = fromDb.Kaynak + "," + birlik.Kaynak;
                                    fromDb.KaynakTip = fromDb.KaynakTip + ",İHRACATÇILAR BİRLİĞİ";
                                    fromDb.IhracatDurumu = "EVET";
                                }
                            }
                            else
                            {
                                firma.Unvan = unvan;
                                firma.Adres = adres;
                                firma.Il = il;
                                firma.Ilce = ilce;
                                firma.WebSitesi = websitesi;
                                firma.WebSitesiMevcutKontrol = false;
                                firma.Kaynak = birlik.Kaynak;
                                firma.KaynakTip = "İHRACATÇILAR BİRLİĞİ";
                                firma.IhracatDurumu = "EVET";
                                firma.KayıtTarihi = DateTime.Now;
                                list.Add(firma);
                            }
                        }
                        catch (Exception ex)
                        {
                            continue;
                        }
                    }
                }
                db.Firma.AddRange(list);
                db.SaveChanges();
            }

        }

        public void EGEIB()
        {
            var l = new List<Ihrc>
            {
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=BB42D78602&160C170E0A01=777474",Sayfa=15,Kaynak="EGE DEMİR VE DEMİR DIŞI METALLER  İHRACATÇILARI BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=47540F5030&160C170E0A01=777576",Sayfa=15,Kaynak="EGE DERİ VE DERİ MAMÜLLERİ İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=C955CDB915&160C170E0A01=777574",Sayfa=15,Kaynak="EGE HAZIR GİYİM KONFEKSİYON İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=1EF7CC428C&160C170E0A01=777573",Sayfa=15,Kaynak="EGE HUBUBAT BAKLİYAT, YAĞLI TOHUMLAR VE MAMÜLLERİ İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=28255002A7&160C170E0A01=777470",Sayfa=15,Kaynak="EGE KURU MEYVE İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=48BC710211&160C170E0A01=77757C",Sayfa=15,Kaynak="EGE MADEN İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=97DE522299&160C170E0A01=77757D",Sayfa=15,Kaynak="EGE MOBİLYA, KAĞIT VE ORMAN ÜRÜNLERİ İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=E52117E4B5&160C170E0A01=777572",Sayfa=15,Kaynak="EGE SU ÜRÜNLERİ VE HAYVANSAL MAMÜLLER İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=B30B3EAB70&160C170E0A01=777577",Sayfa=15,Kaynak="EGE TEKSTİL VE HAMMADDELERİ İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=6255461BC6&160C170E0A01=777472",Sayfa=15,Kaynak="EGE TÜTÜN İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=377A9AADC1&160C170E0A01=777570",Sayfa=15,Kaynak="EGE YAŞ SEBZE VE MEYVE İHRACATCILAR BİRLİĞİ"},
                new Ihrc {Url="https://www.eib.org.tr/tr/Uyelerimiz_01.Asp?SI_Id=676C611B3B&160C170E0A01=777570",Sayfa=15,Kaynak="EGE ZEYTİN VE ZEYTİNYAĞI İHRACATCILAR BİRLİĞİ"},

            };

            foreach (var birlik in l.OrderBy(i => i.Sayfa))
            {
                var db = new Db();
                var list = new List<Firma>();
                for (int i = 1; i <= birlik.Sayfa; i++)
                {

                    string link = birlik.Url + "&Page=" + i;  //link değişkenine çekeceğimiz web sayafasının linkini yazıyoruz.

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.

                    WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                    client.Encoding = Encoding.GetEncoding("windows-1254"); //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var firmaRows = document.DocumentNode.SelectNodes("//*[@class='feature-center']").ToList();
                    foreach (var firmaRow in firmaRows)
                    {
                        try
                        {
                            var firma = new Firma();
                            
                            var unvan = firmaRow.ChildNodes[1].ChildNodes[3].ChildNodes[1].InnerText;
                            var adres = firmaRow.ChildNodes[1].ChildNodes[3].ChildNodes[3].InnerText;
                            //var il = adres.Split(' ')[adres.Split(' ').Count() ];
                            //var ilce = adres.Split(' ')[adres.Split(' ').Count() - 1];
                            var websitesi = firmaRow.ChildNodes[1].ChildNodes[3].ChildNodes[5].InnerText.Trim().Replace("www.", "").Replace("http://", "").Replace("https://", "");

                            var fromDb = db.Firma.FirstOrDefault(f => f.WebSitesi == websitesi);
                            if (fromDb != null)
                            {
                                fromDb.Kaynak = fromDb.Kaynak + "," + birlik.Kaynak;
                                fromDb.KaynakTip = fromDb.KaynakTip + ",İHRACATÇILAR BİRLİĞİ";
                                fromDb.IhracatDurumu = "EVET";
                            }
                            else
                            {
                                firma.Unvan = unvan;
                                firma.Adres = adres;
                                firma.Il = "İZMİR";
                                //firma.Ilce = ilce;
                                firma.WebSitesi = websitesi;
                                firma.WebSitesiMevcutKontrol = false;
                                firma.Kaynak = birlik.Kaynak;
                                firma.KaynakTip = "İHRACATÇILAR BİRLİĞİ";
                                firma.IhracatDurumu = "EVET";
                                list.Add(firma);

                            }
                        }
                        catch (Exception ex)
                        {
                            continue;
                        }
                    }
                }
                db.Firma.AddRange(list);
                db.SaveChanges();
            }

        }

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
                myHttpWebRequest.Headers.Add("Cookie", "__RequestVerificationToken=xa6nwPvhQZ82AnaiQc--oM1ak8l_AP5iL52H17Mx6vo2Jpf7ByrG6jCJkERJFAg_l78BXdMPFqnGbov_TVmoyp8XjCA0GG2O1mqA8Cl0rw01;");

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
    }


    public class Ihrc
    {
        public int Sayfa { get; set; }
        public int BirlikNo { get; set; }
        public string Kaynak { get; set; }
        public string Url { get; set; }
    }
}