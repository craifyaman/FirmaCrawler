using ArrayToExcel;
using ExcelDataReader;
using FirmaCrawler.Models.YapiRadar;
using HtmlAgilityPack;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class YapiRadarController : Controller
    {
        //GET:Avukat
        public async Task Proje()
        {
            var list = new List<Proje>();

            for (int i = 1; i < 69; i++)
            {
                var options = new RestClientOptions("https://app.yapiradar.com")
                {
                    MaxTimeout = -1,
                };

                var client = new RestClient(options);
                var request = new RestRequest($"/Projeler/DetayliAramaSonuc?SayfaNo={i}&bolge=8", Method.Get);
                request.AddHeader("Cookie", "cerez=cerezonay=true; yapiradar=%7B%22userid%22%3A%22aZEbBYGrFF0%3D%22%2C%22token%22%3A%22AB9wkxfd6nOfjem9JksyDw%3D%3D%22%7D; ASP.NET_SessionId=qtd2g40kwa3nidtz1fzj3qyq; twk_uuid_5f5a4bbcf0e7167d000f3027=%7B%22uuid%22%3A%221.1vXAtEexr7qwfNDS6bN6TNHgWkd8k2SYQ6lQZXCPTh6Rc43jmLDbsakpUTh4IU5LkreeLO1ERucnOmnIhcYtx2Z9PyCTEfjgQeCcBuX6R7QqdK8MORDwkvD%22%2C%22version%22%3A3%2C%22domain%22%3A%22yapiradar.com%22%2C%22ts%22%3A1721937614811%7D; _ym_visorc=w; _gcl_aw=GCL.1721939892.CjwKCAjw74e1BhBnEiwAbqOAjCToBYi9Zk3lCE8KDX7AWIfrj_AzomybFeGmOWUUzJl9GU87qkXxdxoCN5cQAvD_BwE; _gcl_gs=2.1.k1$i1721939890; _ga_P2ZT4WLF53=GS1.1.1721939891.8.0.1721939895.56.0.0; _ga_E4SR61ELTM=GS1.1.1721939523.3.1.1721940183.0.0.0");
                //request.AddHeader("Content-Type", "text/html; charset=utf-8");
                RestResponse response = await client.ExecuteAsync(request);
                var html = response.Content;
                HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz

                var projeSatirlari = document.DocumentNode.SelectNodes("//div").Where(j => j.HasClass("table-inside-item")).ToList();
                if (projeSatirlari.Count > 0)
                {
                    foreach (var projeSatir in projeSatirlari)
                    {
                        try
                        {
                            var projeNoNod = projeSatir.ChildNodes.FirstOrDefault(j => j.HasClass("projeNo"));
                            var projeAdiNod = projeSatir.ChildNodes.FirstOrDefault(j => j.HasClass("projeAdi"));
                            var projeAsamaNod = projeSatir.ChildNodes.FirstOrDefault(j => j.HasClass("projeAsamasi"));
                            var projeLokasyonNod = projeSatir.ChildNodes.FirstOrDefault(j => j.HasClass("projeLokasyonu"));
                            HtmlNode projeIlNod = null;
                            HtmlNode projeIlceNod = null;
                            if (projeLokasyonNod.ChildNodes.Count >= 3)
                            {
                                projeIlNod = projeLokasyonNod.ChildNodes[0];
                                projeIlceNod = projeLokasyonNod.ChildNodes[2];
                            }
                            var projeMahalleNod = projeLokasyonNod.ChildNodes.FirstOrDefault(j => j.HasClass("d-block") && j.Name == "span");
                            var projeBedelNod = projeLokasyonNod.NextSibling.NextSibling;
                            var projeBitisZamaniNod = projeSatir.ChildNodes.FirstOrDefault(j => j.HasClass("projeBitisZamani"));
                            HtmlNode projeBitisZamaniYilNod = null;
                            HtmlNode projeBitisZamaniCeyrekNod = null;
                            if (projeBitisZamaniNod.ChildNodes.Count >= 3)
                            {
                                projeBitisZamaniYilNod = projeBitisZamaniNod.ChildNodes[0];
                                projeBitisZamaniCeyrekNod = projeBitisZamaniNod.ChildNodes[2];
                            }

                            var p = new Proje();
                            p.No = projeNoNod != null ? projeNoNod.InnerText.Trim() : "";
                            p.Adi = projeAdiNod != null ? projeAdiNod.InnerText.Trim() : "";
                            p.Asama = projeAsamaNod != null ? projeAsamaNod.InnerText.Trim() : "";
                            p.Lokasyon = projeLokasyonNod != null ? projeLokasyonNod.InnerText.Trim() : "";
                            p.Il = projeIlNod != null ? projeIlNod.InnerText.Trim() : "";
                            p.Ilce = projeIlceNod != null ? projeIlceNod.InnerText.Trim() : "";
                            p.Mahalle = projeMahalleNod != null ? projeMahalleNod.InnerText.Trim() : "";
                            p.Bedel = projeBedelNod != null ? projeBedelNod.InnerText.Trim() : "";
                            p.BitisZamani = projeBitisZamaniNod != null ? projeBitisZamaniNod.InnerText.Trim() : "";
                            p.Yil = projeBitisZamaniYilNod != null ? projeBitisZamaniYilNod.InnerText.Trim() : "";
                            p.Ceyrek = projeBitisZamaniCeyrekNod != null ? projeBitisZamaniCeyrekNod.InnerText.Trim() : "";
                            list.Add(p);
                        }
                        catch (Exception ex)
                        {
                            continue;

                        }

                    }
                }
                else
                {
                    var a = 1;
                }

            }





            var excel = list.ToExcel();

            System.IO.File.WriteAllBytes(@"C:\Users\raify\OneDrive\Desktop\projeyapi-yurt-disi.xlsx", excel);


        }


        public async Task Firma()
        {
            var firmaDetaySayfalari = new List<string>();
            var list = new List<FirmaCrawler.Models.YapiRadar.Firma>();
            var list2 = new List<FirmaCrawler.Models.YapiRadar.Firma>();
            var firmaUrl = new List<FirmaUrl>();
            var options = new RestClientOptions("https://app.yapiradar.com")
            {
                MaxTimeout = -1,
            };
            for (int i = 222; i < 340; i++)
            {
                try
                {
                    var client = new RestClient(options);
                    var request = new RestRequest($"/Firmalar/FirmaRehberiJson", Method.Post);
                    request.AddHeader("Cookie", "cerez=cerezonay=true; _ym_isad=1; _gcl_aw=GCL.1722336705.CjwKCAjwnqK1BhBvEiwAi7o0X3driaYPvE4tbTO9qsohk3pDT-KFQQQOOQ-L38EFjkBzKWVMj8tIyBoCUikQAvD_BwE; _gcl_gs=2.1.k1$i1722336705; _ym_visorc=w; twk_uuid_5f5a4bbcf0e7167d000f3027=%7B%22uuid%22%3A%221.1vXAtEexr7qwfNDS6bN6TNHgWkd8k2SYQ6lQZXCPTh6Rc43jmLDbsakpUTh4IU5LkreeLO1ERucnOmnIhcYtx2Z9PyCTEfjgQeCcBuX6R7QqdK8MORDwkvD%22%2C%22version%22%3A3%2C%22domain%22%3A%22yapiradar.com%22%2C%22ts%22%3A1722339197038%7D; yapiradar=%7B%22userid%22%3A%22aZEbBYGrFF0%3D%22%2C%22token%22%3A%221bHLSn7kOQIFrIXV8Hedhg%3D%3D%22%7D; ASP.NET_SessionId=outy4r1pufli2md2kccgthf0; _ga_P2ZT4WLF53=GS1.1.1722339182.16.1.1722339201.41.0.0; _ga_E4SR61ELTM=GS1.1.1722336710.19.1.1722339215.0.0.0");
                    request.AlwaysMultipartFormData = true;
                    request.AddParameter("start", ((i - 1) * 100).ToString());
                    request.AddParameter("length", "100");
                    RestResponse response = await client.ExecuteAsync(request);
                    var jsonString = response.Content;
                    var data = JsonConvert.DeserializeObject<dynamic>(jsonString);

                    foreach (var item in data.data)
                    {
                        var link = item.SeoLink.ToString();
                        var devamedenproje = Convert.ToInt32(item.devamedenproje.ToString());
                        var tamamlananproje = Convert.ToInt32(item.tamamlananproje.ToString());
                        if (devamedenproje > 0 && tamamlananproje > 0)
                        {
                            var f = new FirmaCrawler.Models.YapiRadar.Firma();
                            f.No = item.id.ToString();
                            f.Adi = HttpUtility.HtmlDecode(item.firmaadi.ToString());
                            f.Il = HttpUtility.HtmlDecode(item.sehir.ToString());
                            f.Ilce = HttpUtility.HtmlDecode(item.ilce.ToString());
                            f.DevamEdenProjeSayisi = HttpUtility.HtmlDecode(item.devamedenproje.ToString());
                            f.TamamlananProjeSayisi = HttpUtility.HtmlDecode(item.tamamlananproje.ToString());


                            list2.Add(f);
                        }
                        firmaDetaySayfalari.Add(link);
                        firmaUrl.Add(new FirmaUrl { Url = link });
                    }
                }
                catch (Exception ex)
                {
                    var a = ex;
                    continue;
                }

            }

            var firmaExcell = list2.ToExcel();

            System.IO.File.WriteAllBytes(@"C:\Users\raify\OneDrive\Desktop\aktif-firma-1.xlsx", firmaExcell);

            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\OneDrive\Desktop\firma-url.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var rows = crawlerDataset.Tables[0].Rows;
            var counter = 1;
            foreach (DataRow row in rows)
            {
                var detaySayfa = row.ItemArray[0].ToString().Replace("\n", "").Replace("\t", "").Trim();

                try
                {
                    var client = new RestClient(options);
                    var request = new RestRequest(detaySayfa, Method.Get);
                    request.AddHeader("Cookie", "cerez=cerezonay=true; _ym_isad=1; _gcl_aw=GCL.1721997275.CjwKCAjwko21BhAPEiwAwfaQCMnI83wFmUdfQMaD5Smy57aEJmSI29X2QQ-eStGv2k_VXMLjmaMdNRoC9hEQAvD_BwE; _gcl_gs=2.1.k1$i1721997274; twk_uuid_5f5a4bbcf0e7167d000f3027=%7B%22uuid%22%3A%221.1vXAtEexr7qwfNDS6bN6TNHgWkd8k2SYQ6lQZXCPTh6Rc43jmLDbsakpUTh4IU5LkreeLO1ERucnOmnIhcYtx2Z9PyCTEfjgQeCcBuX6R7QqdK8MORDwkvD%22%2C%22version%22%3A3%2C%22domain%22%3A%22yapiradar.com%22%2C%22ts%22%3A1721997280192%7D; yapiradar=%7B%22userid%22%3A%22aZEbBYGrFF0%3D%22%2C%22token%22%3A%228LioO5kzo8%2BrrsGlqnxLBw%3D%3D%22%7D; ASP.NET_SessionId=azrbaxky1ddjngufdvpq5u3s; _ga_P2ZT4WLF53=GS1.1.1721997273.10.1.1721997285.48.0.0; _ga_E4SR61ELTM=GS1.1.1722005610.7.1.1722006298.0.0.0");
                    //request.AddHeader("Content-Type", "text/html; charset=utf-8");
                    RestResponse response = await client.ExecuteAsync(request);
                    var html = response.Content;
                    HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                    document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz


                    var no = document.DocumentNode.SelectSingleNode("//*[@id='fDetay']/div/div[2]/div[2]/div/div[1]/span[1]")?.InnerText.Trim();

                    var adi = document.DocumentNode.SelectSingleNode("//*[@id='fDetay']/div/div[2]/div[2]/div/div[1]/h1")?.InnerText.Trim();
                    adi = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(adi))));

                    var guncellemeTarihi = document.DocumentNode.SelectSingleNode("//*[@id='fDetay']/div/div[2]/div[2]/div/div[1]/span[2]/strong")?.InnerText.Trim();

                    var hizmet = document.DocumentNode.SelectSingleNode("//*[@id='fDetay']/div/div[2]/div[2]/div/div[1]/span[3]/strong")?.InnerText.Trim();
                    hizmet = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(hizmet))));


                    var adresNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim() == "Adres")?.NextSibling.NextSibling;
                    var adres = adresNode != null ? adresNode.InnerText.Trim() : "";
                    adres = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(adres))));

                    var mahalleNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim() == "Mahalle")?.NextSibling.NextSibling;
                    var mahalle = mahalleNode != null ? mahalleNode.InnerText.Trim() : "";
                    mahalle = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(mahalle))));

                    var ilIlceNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim().Contains("İl / İl&#231;e"))?.NextSibling.NextSibling;
                    var ilIlce = ilIlceNode != null ? ilIlceNode.InnerText.Trim() : "";
                    ilIlce = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(ilIlce))));

                    var ilIlceSplit = ilIlce.Split('/').ToList();
                    var il = ilIlceSplit[0];
                    il = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(il.Trim()))));

                    var ilce = ilIlceSplit.Count == 2 ? ilIlceSplit[1] : "";
                    ilce = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(ilce))));

                    var ulkeNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim().Contains("&#220;lke"))?.NextSibling.NextSibling;
                    var ulke = ulkeNode != null ? ulkeNode.InnerText.Trim() : "";
                    ulke = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(ulke))));

                    var telefonNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim() == "Telefon")?.NextSibling.NextSibling;
                    var telefon = telefonNode != null ? telefonNode.InnerText.Trim() : "";

                     
                    var eposta = "";
                    if (html.Contains("__cf_email__"))
                    {
                        var epostaDom = document.DocumentNode.SelectSingleNode(@"//*[contains(@class, '__cf_email__')]");
                        if (epostaDom != null)
                        {
                            var email = cfDecodeEmail(epostaDom.Attributes["data-cfemail"].Value);
                            if (!string.IsNullOrEmpty(email)) eposta= UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(email))));
                        }
                    }


                    var webNode = document.DocumentNode.SelectNodes("//span").FirstOrDefault(i => i.InnerText.Trim() == "Web")?.NextSibling.NextSibling;
                    var web = webNode != null ? webNode.InnerText.Trim() : "";
                    web = UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(HttpUtility.HtmlDecode(web))));

                    var firmaYetlisi = "";
                    var firmaYetkiliNodes = document.DocumentNode.SelectNodes("//div")?
                        .FirstOrDefault(i => i.Attributes["id"] != null && i.Attributes["id"].Value == "projeComments")?
                        .DescendantNodes().FirstOrDefault(i => i.Name == "tbody")?
                        .DescendantNodes().Where(i => i.Name == "tr")?
                        .ToList();

                    if (firmaYetkiliNodes != null)
                    {
                        foreach (var firmaYetkiliNode in firmaYetkiliNodes)
                        {
                            firmaYetlisi += "[";
                            firmaYetlisi += UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(firmaYetkiliNode.ChildNodes[1].InnerText)));
                            firmaYetlisi += "," + UTF8Encoding.UTF8.GetString(Encoding.Convert(Encoding.Unicode, Encoding.UTF8, UTF8Encoding.Unicode.GetBytes(firmaYetkiliNode.ChildNodes[3].InnerText)));
                            firmaYetlisi += "]";
                            if (firmaYetkiliNodes.LastIndexOf(firmaYetkiliNode) != firmaYetkiliNodes.Count - 1)
                            {
                                firmaYetlisi += ";";
                            }

                        }
                    }
                    var devamProje = "";
                    var devamProjelerNodes = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i => i.HasClass("devamEdenProjeler"))?
                        .DescendantNodes()
                        .Where(i => i.Attributes["href"] != null && i.Attributes["href"].Value.Contains("/projedetay/proje/"))?.ToList();

                    if (devamProjelerNodes != null)
                    {
                        foreach (var projelerNode in devamProjelerNodes)
                        {
                            try
                            {
                                var pNo = projelerNode.ChildNodes[1]?.ChildNodes[1]?.InnerText.Trim();
                                var pAdi = projelerNode.ChildNodes[1]?.ChildNodes[3]?.InnerText.Trim();
                                var pTur = projelerNode.ChildNodes[1]?.ChildNodes[7]?.InnerText.Trim();
                                devamProje += "[";
                                devamProje += HttpUtility.HtmlDecode(pNo) + ",";
                                devamProje += HttpUtility.HtmlDecode(pAdi) + ",";
                                devamProje += HttpUtility.HtmlDecode(pTur);
                                devamProje += "]";
                                if (devamProjelerNodes.LastIndexOf(projelerNode) != devamProjelerNodes.Count - 1)
                                {
                                    devamProje += ";";
                                }
                            }
                            catch (Exception ex)
                            {
                                continue;
                            }
                        }
                    }
                    var tamamProje = "";
                    var tamamProjelerNodes = document.DocumentNode.SelectNodes("//div").FirstOrDefault(i => i.HasClass("tamamlananProjeler"))?
                        .DescendantNodes()
                        .Where(i => i.Attributes["href"] != null && i.Attributes["href"].Value.Contains("/projedetay/proje/"))?.ToList();

                    if (tamamProjelerNodes != null)
                    {
                        foreach (var projelerNode in tamamProjelerNodes)
                        {
                            try
                            {
                                var pNo = projelerNode.ChildNodes[1]?.InnerText.Trim();
                                var pAdi = projelerNode.ChildNodes[3]?.InnerText.Trim();
                                var pTur = projelerNode.ChildNodes[5]?.InnerText.Trim();
                                tamamProje += "[";
                                tamamProje += HttpUtility.HtmlDecode(pNo) + ",";
                                tamamProje += HttpUtility.HtmlDecode(pAdi) + ",";
                                tamamProje += HttpUtility.HtmlDecode(pTur);
                                tamamProje += "]";
                                if (tamamProjelerNodes.LastIndexOf(projelerNode) != devamProjelerNodes.Count - 1)
                                {
                                    tamamProje += ";";
                                }
                            }
                            catch (Exception ex)
                            {
                                continue;
                            }
                        }
                    }

                    var f = new FirmaCrawler.Models.YapiRadar.Firma();
                    f.No = no;
                    f.Adi = adi;
                    f.GuncellemeTarihi = guncellemeTarihi;
                    f.Hizmet = hizmet;
                    f.Adres = adres;
                    f.Mahalle = mahalle;
                    f.Ilce = ilce;
                    f.Il = il;
                    f.Ulke = ulke;
                    f.Telefon = telefon;
                    f.Eposta = eposta;
                    f.Web = web;
                    f.FirmaYetkili = firmaYetlisi;
                    f.DevamEdenProje = devamProje;
                    f.TamamlananProjeSayisi = tamamProje;
                    list.Add(f);
                    counter++;
                }
                catch (Exception ex)
                {
                    var f = new FirmaCrawler.Models.YapiRadar.Firma();
                    f.Hata = detaySayfa;
                    f.HataIndex = counter.ToString();
                    list.Add(f);
                    counter++;
                    continue;
                }


            }


            var excel = list.ToExcel();

            System.IO.File.WriteAllBytes(@"C:\Users\raify\OneDrive\Desktop\projeyapi-firmalar.xlsx", excel);


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

    }

    public class FirmaUrl
    {
        public string Url { get; set; }
    }
}