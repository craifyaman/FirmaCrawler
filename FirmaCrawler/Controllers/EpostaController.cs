using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class EpostaController : Controller
    {
        // GET: Eposta
        public void OtomasyonPazari()
        {

            var db = new Db();
            var counter = 0;
            var emails = db.Firma.Where(i => !string.IsNullOrEmpty(i.Eposta)).Select(i => i.Eposta.Trim()).Distinct().Skip(1200).Take(50000).ToList();
            foreach (var email in emails)
            {
                
                String FROM = "satis@otomasyonpazari.com";
                String FROMNAME = "OtomasyonPazari.com";
                String TO = email.Trim();
                String SMTP_USERNAME = "AKIAZKY7NGVY66RN6DD7";
                String SMTP_PASSWORD = "BPCKCs5ob9YRbdoQYbsuR2zwCrlLGHVBfq8du/79o9t+";
                String HOST = "email-smtp.us-east-2.amazonaws.com";
                int PORT = 587;

               
                String SUBJECT = "İnverterlerde Büyük İndirim";
                String BODY =
                    "<body><table><tr>" +
                    "<td style='width:% 10'></td>" +
                    "<td style='width:% 80'>" +
                    "<a href='https://www.otomasyonpazari.com'>" +
                    "<img src='https://www.otomasyonpazari.com/sites/ecommerce/otomasyonpazari/uploads/Mailing_inverter.jpg'  width='750' height='938' />" +
                    "</a>" +
                    "</td>" +
                    "<td style='width:% 10'></td>" +
                    "</tr></table></body>";

                // Create and build a new MailMessage object
                MailMessage message = new MailMessage();
                message.IsBodyHtml = true;
                message.From = new MailAddress(FROM, FROMNAME);
                message.To.Add(new MailAddress(TO));
                message.Subject = SUBJECT;
                message.Body = BODY;
                // Comment or delete the next line if you are not using a configuration set
                message.Headers.Add("X-SES-CONFIGURATION-SET", "CONFIGSET");
                //message.Headers.Add("CONFIGSET", CONFIGSET);

                using (var client = new System.Net.Mail.SmtpClient(HOST, PORT))
                {
                    // Pass SMTP credentials
                    client.Credentials =
                        new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);

                    // Enable SSL encryption
                    client.EnableSsl = true;

                    // Try to send the message. Show status in console.
                    try
                    {
                        client.Send(message);
                    }
                    catch (Exception ex)
                    {
                        var a = 1;
                    }
                }

                counter++;
            }
        }
    }
}