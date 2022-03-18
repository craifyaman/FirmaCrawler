using Newtonsoft.Json;
using RandomSolutions;
using System;
using System.Collections.Generic;
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


    }
}