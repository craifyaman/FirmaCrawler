using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WhatsAppSender
{
    public partial class Form1 : Form
    {
        IWebDriver driver;
        public class Mesaj
        {
            public string Tel { get; set; }
            public string Icerik { get; set; }
        }
        public class Kisi
        {
            public int KisiId { get; set; }
            public string Telefon { get; set; }
            public string Telefon2 { get; set; }
        }
        public class SelectListItem
        {
            public string Value { get; set; }
            public string Text { get; set; }
        }
        public Form1()
        {
            InitializeComponent();

            var personelListesi = JsonConvert.DeserializeObject<List<SelectListItem>>(Request("https://localhost:44365/whatsapp/PersonelListesi"));

            cmbPersonel.DataSource = personelListesi;
            cmbPersonel.DisplayMember = "Text";
            cmbPersonel.ValueMember = "Value";

            var gonderimListesi = JsonConvert.DeserializeObject<List<SelectListItem>>(Request("https://localhost:44365/whatsapp/GonderimListesi"));

            cmbGonderimListesi.DataSource = gonderimListesi;
            cmbGonderimListesi.DisplayMember = "Text";
            cmbGonderimListesi.ValueMember = "Value";


        }
        public void MesajYolla(Mesaj m)
        {
            driver.Navigate().GoToUrl("https://web.whatsapp.com");

            while (true)
            {
                if (CheckLoggedIn())
                    break;
            }
            SendMessage(m.Tel, m.Icerik); //*** Replace here ***//
        }
        private bool CheckLoggedIn()
        {
            try
            {
                return driver.FindElement(By.ClassName("_1lPgH")).Displayed;
            }
            catch (Exception e)
            {

                return false;
            }
        }
        private bool ErrorExist()
        {
            try
            {
                return driver.FindElement(By.XPath("//*[@id='app']/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div/div/div")).Displayed;
            }
            catch (Exception e)
            {

                return false;
            }
        }
        private void SendMessage(string number, string message)
        {
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10); //Wait for maximun of 10 seconds if any element is not found
            driver.Navigate().GoToUrl("https://api.whatsapp.com/send?phone=" + number + "&text=" + Uri.EscapeDataString(message));
            driver.FindElement(By.Id("action-button")).Click(); // Click SEND Buton

            var whatsappWebKullanButon = driver.FindElementSafe(By.XPath("//*[@id='fallback_block']/div/div/a"));

            whatsappWebKullanButon.Click();

            while (true)
            {
                if (CheckLoggedIn())
                    break;
            }

            if (!ErrorExist())
            {
                var gonderButton = driver.FindElementSafe(By.CssSelector("button._4sWnG"));//Click SEND Arrow Button

                gonderButton.Click();
            }
            else
            {
                var hataDevamButon = driver.FindElement(By.XPath("//*[@id='app']/div[1]/span[2]/div[1]/span/div[1]/div/div/div/div/div[2]/div/div/div"));

                hataDevamButon.Click();
            }
        }
        public string Request(string url)
        {

            WebClient client = new WebClient(); // webclient nesnesini kullanıyoruz bağlanmak için.
            client.Encoding = Encoding.UTF8; //türkçe karakter sorunu yapmaması için encoding utf8 yapıyoruz.

            string req = client.DownloadString(url); // siteye bağlanıp tüm sayfanın html içeriğini çekiyoruz.

            return req;
        }
        private void btnMesajGonderClick(object sender, EventArgs e)
        {
            driver = driver = new ChromeDriver(@"C:\WebDrivers");

            for (int i = 0; i < Convert.ToInt32(txtGonderimAdeti.Text); i++)
            {
                var kisi = JsonConvert.DeserializeObject<Kisi>(Request($"https://localhost:44365/whatsapp/numaraal/{cmbGonderimListesi.SelectedValue}"));

                MesajYolla(new Mesaj { Tel = kisi.Telefon, Icerik = txtMesaj.Text });
                System.Threading.Thread.Sleep(5000);
                var url= $"https://localhost:44365/whatsapp/numaraisle?gonderimId={cmbGonderimListesi.SelectedValue}&kisiId={kisi.KisiId}&personelId={cmbPersonel.SelectedValue}";
                Request(url);
            }

            driver.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
           
            var client = new WebClient();
            client.Proxy = new WebProxy("zproxy.lum-superproxy.io:22225");
            client.Proxy.Credentials = new NetworkCredential("lum-customer-c_106dea10-zone-data_center", "9a8y03ngfse8");
            var r=client.DownloadString("https://www.instagram.com/cizgeicmelidishekimi/");
        }
    }
}
