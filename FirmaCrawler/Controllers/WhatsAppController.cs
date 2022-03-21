using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class WhatsappController : Controller
    {
        IWebDriver driver;
        public WhatsappController()
        {
            driver = driver = new ChromeDriver(@"C:\WebDrivers");
        }
        public void Mesaj()
        {

            IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
            HtmlAgilityPack.HtmlDocument document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
            var firmaUrl = new List<string>();
            var firmaList = new List<Firma>();
            //Login Oluyoruz
            driver.Navigate().GoToUrl("https://api.whatsapp.com/send/?phone=+905320543530&text&app_absent=0");

            var sohbeteBaslaButon = driver.FindElementSafe(By.XPath("//a[contains(@href, 'phone=+905320543530')]"));

            sohbeteBaslaButon.Click();

            var whatsappWebKullanButon = driver.FindElementSafe(By.XPath("//*[@id='fallback_block']/div/div/a"));

            whatsappWebKullanButon.Click();


            var mesajAlani = driver.FindElementSafe(SelectorByAttributeValue("title", "Bir mesaj yazın"));
            var script = "document.evaluate('//*[@title = \"Bir mesaj yazın\"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = 'New text!'";
            js.ExecuteScript(script);
            mesajAlani.Click();

            driver.Close();
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

            var gonderButton = driver.FindElementSafe(By.CssSelector("button._4sWnG"));//Click SEND Arrow Button

            gonderButton.Click();
        }
        public void MesajYolla()
        {
            driver.Navigate().GoToUrl("https://web.whatsapp.com");

            while (true)
            {
                if (CheckLoggedIn())
                    break;
            }
            SendMessage("+905320543530", "replace with your text"); //*** Replace here ***//
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
        public static By SelectorByAttributeValue(string p_strAttributeName, string p_strAttributeValue)
        {
            return (By.XPath(String.Format("//*[@{0} = '{1}']", p_strAttributeName, p_strAttributeValue)));
        }
    }
}