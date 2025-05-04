using ArrayToExcel;
using DocumentFormat.OpenXml.Office2013.Drawing.Chart;
using FuarCrawler.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class DernekController : Controller
    {
        // GET: Dernek
        public void Index()
        {
            var list = new List<Dernek>();
            for (int i = 1; i <= 81; i++)
            {
                object jp = new { secilenTeskilatPk = i.ToString(), secilenIlcePk = "999999999", neviler = "0", altneviler = "0" };

                var jString = JsonConvert.SerializeObject(jp);
                object reqData = new
                {
                    sort = "",
                    page = 1,
                    pageSize = 50,
                    group = "",
                    filter = "",
                    serializedData = jString

                };
                var r = Req("https://derbis.dernekler.gov.tr/IstatistikDerneklerWeb/GetIlFaaliyetDernek", reqData);

                dynamic rp = JsonConvert.DeserializeObject(r);
                decimal totalRecord = Convert.ToInt32(rp.Total.ToString());
                int totalPage = (int)Math.Ceiling((double)totalRecord / 1000);

                for (int j = 1; j <= totalPage; j++)
                {
                    jp = new { secilenTeskilatPk = i.ToString(), secilenIlcePk = "999999999", neviler = "0", altneviler = "0" };

                    jString = JsonConvert.SerializeObject(jp);
                    reqData = new
                    {
                        sort = "",
                        page = j,
                        pageSize = 1000,
                        group = "",
                        filter = "",
                        serializedData = jString

                    };
                    r = Req("https://derbis.dernekler.gov.tr/IstatistikDerneklerWeb/GetIlFaaliyetDernek", reqData);

                    rp = JsonConvert.DeserializeObject(r);

                    foreach (var item in rp.Data)
                    {
                        try
                        {
                            var dernek = new Dernek();
                            dernek.Adi = item.KurumAd;
                            dernek.Adres = item.KurumAdres;
                            dernek.DetayliFaaliyetAlani = item.AltNevisString;
                            dernek.FaaliyetAlani = item.AnaNevisi;
                            dernek.IlKodu = i;
                            dernek.Telefon = item.telNo;
                            dernek.WebSitesi = item.WebSitesi;

                            //if (string.IsNullOrEmpty(dernek.WebSitesi)) continue;

                            list.Add(dernek);
                        }
                        catch (Exception ex)
                        {
                            continue;
                        }

                    }
                }
            }

            var excel = list.ToExcel(scheme => scheme
            .AddColumn("Adi", x => x.Adi)
            .AddColumn("Adres", x => x.Adres)
            .AddColumn("FaaliyetAlani", x => x.FaaliyetAlani)
            .AddColumn("DetayliFaaliyetAlani", x => x.DetayliFaaliyetAlani)
            .AddColumn("IlKodu", x => x.IlKodu)
            .AddColumn("Telefon", x => x.Telefon)
            .AddColumn("WebSitesi", x => x.WebSitesi));

            System.IO.File.WriteAllBytes(@"D:\Dernekler.xlsx", excel);



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

        public void AimsadOrg()
        {
            var pages = 5;

            var db = new Db();
            var firmaListesi = new List<Firma>();
            var insert = new List<Firma>();
            var tümSayfalar = new List<string>();


            Kaynak kaynak;
            if (db.Kaynak.FirstOrDefault(i=>i.Adi=="AimsadOrg")==null)
            {
                kaynak= new Kaynak();
                kaynak.Adi = "AimsadOrg";
                kaynak.KaynakTipId = 148;
                db.Kaynak.Add(kaynak);
                db.SaveChanges();


            }
            else
            {
                kaynak = db.Kaynak.FirstOrDefault(i => i.Adi == "AimsadOrg");
            }

            var firmaEposta = db.FirmaEposta.ToList();
            var firmalar = db.Firma.ToList();



            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            for (int i = 1; i <= pages; i++)
            {
                try
                {

                    var link = $"https://www.aimsad.org/firmalar/yurtici/{i}";

                    Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var firmaUrls = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("/firmalar/")).Select(s => s.Attributes["href"].Value).ToList();
                    tümSayfalar.AddRange(firmaUrls);
                }
                catch (Exception ex)
                {

                    continue;
                }

            }

            tümSayfalar = tümSayfalar.Distinct().Where(i => !i.Contains("yurtici")).ToList();
            
            foreach (var i in tümSayfalar)
            {

                try
                {
                    Uri url = new Uri(i); //Uri tipinde değişeken linkimizi veriyoruz.
                    string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                    var unvan = document.DocumentNode.SelectNodes("//span").Where(w => w.HasClass("old-president--underline")).FirstOrDefault().InnerText.Replace("&nbsp;", "").Trim();
                    var adres = document.DocumentNode.SelectNodes("//p").Where(w => w.HasClass("sub-search__address--txt")).Select(s => s.InnerText.Trim()).Aggregate((a, b) => a + " " + b);
                    var tel = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("tel:"))?.FirstOrDefault().Attributes["href"].Value.Replace("tel:", "");
                    var eposta = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("mailto:"))?.FirstOrDefault().Attributes["href"].Value.Replace("mailto:", "");
                    var web = document.DocumentNode.SelectNodes("//svg").Where(w => w.HasClass("icon-web")).FirstOrDefault().ParentNode.NextSibling.NextSibling.InnerText.Replace("Web Sitesi :", "").Trim();

                    var etiket = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("&kategori=")).Select(s => s.InnerText.Trim()).Aggregate((a, b) => a + "," + b);
                    var ihracat = document.DocumentNode.SelectNodes("//a").Where(w => w.Attributes["href"].Value.Contains("&faaliyet=")).Select(s => s.InnerText.Trim()).Aggregate((a, b) => a + "," + b).Contains("İHRACAT");

                    firmaListesi.Add(new Firma
                    {
                        Unvan = unvan,
                        WebSitesi = web.Replace("https://", "").Replace("http://", "").Replace("www.", ""),
                        Eposta = eposta,
                        Telefon = tel,
                        Adres = adres,
                        IhracatDurumu = ihracat ? "VAR" : ""
                    });
                }
                catch (Exception ex)
                {
                    continue;
                }

            }

            foreach (var f in firmaListesi)
            {
                var fEposta = firmaEposta.FirstOrDefault(i => i.Eposta == f.Eposta);
                var firma = firmalar.FirstOrDefault(i => i.WebSitesi == f.WebSitesi);
                if (firma==null && fEposta==null)
                {
                    f.FirmaEposta = new List<FirmaEposta> { new FirmaEposta { Eposta = f.Eposta } };
                    f.FirmaKaynakRelation = new List<FirmaKaynakRelation> { new FirmaKaynakRelation { KaynakId = kaynak.KaynakId } };
                    insert.Add(f);
                }else if(firma!=null && fEposta == null)
                {
                    db.FirmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = firma.FirmaId, KaynakId=kaynak.KaynakId });
                    db.FirmaEposta.Add(new FirmaEposta { FirmaId = firma.FirmaId, Eposta = f.Eposta });
                }
                 
            }

            db.Firma.AddRange(insert);
            db.SaveChanges();


        }
    }
}