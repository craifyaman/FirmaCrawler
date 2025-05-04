using ExcelDataReader;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class EmailSenderController : Controller
    {
        //GET:Avukat
        public ActionResult Index()
        {

            var client = new RestClient("https://api.mailbaby.net/mail/send");
            string body = System.IO.File.ReadAllText(@"C:\Users\raify\Desktop\Mailing\Template.html");



            var crawlerDataset = new DataSet();

            using (var stream = System.IO.File.Open("C:\\Users\\raify\\Desktop\\Mailing\\Split List\\1.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var domainRows = crawlerDataset.Tables[0].AsEnumerable().ToList();
            var counter = 0;

            foreach (DataRow row in domainRows)
            {
                var to = row.ItemArray[0].ToString();
                var request = new RestRequest();
                request.Method = Method.Post;
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddHeader("X-API-KEY", "LsgJLV7UaVv2FbDysIPkHZ4hkHPPU9QzHNWTjF1NTYQSyamhjP8944odSkmCZtIb1REkF77GlHzjlEpMSOiWs2v3Z3P1vtBuGEdwZx4VV87J9HjhPiZkc45gFjXaPM2k");
                request.AddParameter("to", to);
                request.AddParameter("from", "figen.ozveren@fikayazilim.com");
                request.AddParameter("subject", "Web Siteniz Hakkında");
                request.AddParameter("body", body);
                RestResponse response = client.Execute(request);
            }


            //yeni ekledim
            return View();
        } 
        
        public void Send()
        {

            var client = new RestClient("https://api.mailbaby.net/mail/send");
            string body = System.IO.File.ReadAllText(@"C:\Users\raify\Desktop\Mailing\Template.html");




            var request = new RestRequest();
            request.Method = Method.Post;
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddHeader("X-API-KEY", "LsgJLV7UaVv2FbDysIPkHZ4hkHPPU9QzHNWTjF1NTYQSyamhjP8944odSkmCZtIb1REkF77GlHzjlEpMSOiWs2v3Z3P1vtBuGEdwZx4VV87J9HjhPiZkc45gFjXaPM2k");
            request.AddParameter("to", "info@fikayazilim.com");
            request.AddParameter("from", "raif.yaman@fikayazilim.com");
            request.AddParameter("subject", "Web Siteniz Hakkında");
            request.AddParameter("body", "<h1>Web Siteniz Hakkında</h1>");
            var response = client.Execute(request);
             

             
         }

    }
}