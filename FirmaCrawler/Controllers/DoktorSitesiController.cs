using ArrayToExcel;
using ExcelDataReader;
using FirmaCrawler.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;


namespace FuarCrawler.Controllers
{
    public class DoktorSitesiController : Controller
    {
        // GET: SnovIo

        public void Doktorlar()
        {
            var numberNames = new Dictionary<string, int>();
            //numberNames.Add("A", 922);
            //numberNames.Add("B", 408);
            //numberNames.Add("C", 219);
            //numberNames.Add("Ç", 55);
            //numberNames.Add("D", 203);
            //numberNames.Add("E", 601);
            //numberNames.Add("F", 352);
            //numberNames.Add("G", 319);
            //numberNames.Add("H", 541);
            //numberNames.Add("I", 23);
            //numberNames.Add("İ", 260);
            //numberNames.Add("J", 8);
            //numberNames.Add("K", 180);
            //numberNames.Add("L", 69);
            //numberNames.Add("M", 937);
            numberNames.Add("N", 406);
            numberNames.Add("O", 163);
            numberNames.Add("Ö", 231);
            numberNames.Add("P", 154);
            numberNames.Add("R", 154);
            numberNames.Add("S", 729);
            numberNames.Add("Ş", 163);
            numberNames.Add("T", 255);
            numberNames.Add("U", 65);
            numberNames.Add("Ü", 58);
            numberNames.Add("V", 66);
            numberNames.Add("Y", 220);
            numberNames.Add("Z", 162);



            foreach (var item in numberNames)
            {
                var hekimler = new List<DisHekimi>();
                var tümSayfalar = new List<string>();
                var harf = item.Key;
                var sayfa = item.Value;

                WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
                client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

                for (int i = 1; i <= sayfa; i++)
                {
                    try
                    {
                        var link = $"https://www.doktorsitesi.com/tumuzmanlar/{harf}?sayfa={i}";


                        Uri url = new Uri(link); //Uri tipinde değişeken linkimizi veriyoruz.
                        string html = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

                        HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                        var doktorUrl = document.DocumentNode.SelectNodes("//a").Where(w => w.ParentNode.HasClass("az-main-content")).Select(s => s.Attributes["href"].Value).ToList();
                        tümSayfalar.AddRange(doktorUrl);
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



                        var unvan = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("expert-title")).FirstOrDefault().InnerText;
                        var bransIl = document.DocumentNode.SelectNodes("//div").Where(w => w.HasClass("exp-b-title")).FirstOrDefault().InnerText;
                        var sosyal = document.DocumentNode.SelectNodes("//a").Where(w => w.HasClass("experience-title")).Select(s => s.Attributes["href"].Value).ToList();
                        hekimler.Add(new DisHekimi
                        {
                            AdSoyad = unvan,
                            Brans = bransIl,
                            Web = sosyal.Count > 0 ? sosyal.Aggregate((a, b) => a + "," + b) : ""
                        });
                    }
                    catch (Exception ex)
                    {
                        continue;
                    }


                }

                var items = hekimler.Select(x => new
                {
                    AdSoyad = x.AdSoyad,
                    Brans = x.Brans,
                    Web = x.Web
                });

                var excel = items.ToExcel();

                System.IO.File.WriteAllBytes($"C:\\Users\\raify\\OneDrive\\Desktop\\DoktorlarSitesi\\{harf}-doktolarsitesi.xlsx", excel);
            }


        }

        public void Aktar()
        {
            var db = new Db();

            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\OneDrive\Desktop\DoktorlarSitesi\GeneListe.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var rows = crawlerDataset.Tables[0].Rows;
            var dListe = db.Doktor.ToList();
            var dsHamListe = new List<Doktor>();
            var unvanList = new List<string> { "Psk.", "Dr.", "Op.", "Prof.", "Dt.", "Uzm.", "Doç.", "Öğr.", "Dyt.", "Kl.", "Fzt.", "Dan.", "Üyesi", "Yrd.", "Ass.", "Vet." };


            foreach (DataRow row in rows)
            {
                try
                {
                    var d = new Doktor();
                    var unvanAd = row.ItemArray[1].ToString().Replace("\n", "").Replace("\t", "");
                    var bransIl = row.ItemArray[2].ToString().Replace("\n", "").Replace("\t", "");
                    var unvan = new List<string>();

                    foreach (var u in unvanList)
                    {
                        if (unvanAd.StartsWith(u))
                        {
                            unvan = unvan.Prepend(u).ToList();
                            unvanAd = unvanAd.Replace(u, "");
                        }
                        if (unvanAd.Contains(u))
                        {
                            unvan = unvan.Append(u).ToList();
                            unvanAd = unvanAd.Replace(u, "");
                        }
                    }

                    d.Unvan = unvan.Aggregate((a, b) => a + " " + b);
                    d.AdSoyad = unvanAd.Trim();
                    d.Brans = bransIl.Split('-')[0].ToString();
                    d.Il = bransIl.Split('-')[1].ToString();
                    dsHamListe.Add(d);
                }
                catch (Exception ex)
                {
                    var a = ex;
                    continue;
                    throw;
                }
            }


            //var items = dsHamListe.Select(x => new
            //{
            //    Unvan = x.Unvan,
            //    AdSoyad = x.AdSoyad,
            //    Brans = x.Brans,
            //    Il = x.Il
            //});
            //var excel = items.ToExcel();
            //System.IO.File.WriteAllBytes($"C:\\Users\\raify\\OneDrive\\Desktop\\DoktorlarSitesi\\Tüm.xlsx", excel);



            foreach (var d in dsHamListe.OrderBy(o => o.AdSoyad))
            {
                var adSoyad = d.AdSoyad.Split(' ').Select(s => s.ToLower());

                var kayitliDoktor = dListe.Where(i => i.AdSoyad.ToLower().Contains(d.AdSoyad.ToLower())).ToList();

                if (kayitliDoktor.Count() > 1)
                {
                    kayitliDoktor.ForEach(i => i.Brans = d.Brans);
                    kayitliDoktor.ForEach(i => i.Unvan = d.Unvan);
                    kayitliDoktor.ForEach(i => i.Il = d.Il);
                    

                }
            }
            db.SaveChanges();

        }
    }
}