using ArrayToExcel;
using DocumentFormat.OpenXml.Spreadsheet;
using ExcelDataReader;
using FirmaCrawler.Models.Snovio;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;


namespace FirmaCrawler.Controllers
{
    public class SnovioApiController : Controller
    {
        // GET: SnovioApi
        public TokenResponse Token()
        {
            var client = new RestClient("https://api.snov.io/v2/oauth/access_token");

            var request = new RestRequest();
            request.Method = Method.Post;
            request.AddHeader("Content-Type", "application/json");
            var body = new TokenRequest
            {
                grant_type = "client_credentials",
                client_id = "3c5755540d25cdec5ce4a790ecaebc2e",
                client_secret = "ce8c1c4d44df5ffc6f8e30f04347be2e"
            };

            request.AddParameter("application/json", JsonConvert.SerializeObject(body), ParameterType.RequestBody);
            var response = client.Execute(request);
            var tokenReponse = JsonConvert.DeserializeObject<TokenResponse>(response.Content);
            return tokenReponse;
        }
        public EmailCountResponse DomainEmailsCount(TokenResponse token, string domain)
        {
            try
            {
                var client = new RestClient("https://api.snov.io/v1/get-domain-emails-count");
                var request = new RestRequest();
                request.Method = Method.Post;
                request.AddHeader("Authorization", $"Bearer {token.access_token}");
                request.AddHeader("Content-Type", "application/json");

                var body = new EmailCountRequest
                {
                    domain = domain
                };

                request.AddParameter("application/json", JsonConvert.SerializeObject(body), ParameterType.RequestBody);
                request.AddParameter("application/json", body, ParameterType.RequestBody);
                var r = client.Execute(request);
                var response = JsonConvert.DeserializeObject<EmailCountResponse>(r.Content);
                return response;
            }
            catch (Exception)
            {

                return new EmailCountResponse { success = false };
            }
        }
        public DomainEmailsWithInfoResponse DomainEmailsWithInfo(TokenResponse token, string domain, string type, string limit, string lastId, string[] positions)
        {
            try
            {
                var url = "https://api.snov.io/v2/domain-emails-with-info?";
                url += !string.IsNullOrEmpty(domain) ? $"domain={domain.Trim()}" : "";
                url += !string.IsNullOrEmpty(type) ? $"&type={type}" : "";
                url += !string.IsNullOrEmpty(type) ? $"&limit={limit}" : "";
                url += !string.IsNullOrEmpty(type) ? $"&lastId={lastId}" : "";


                var client = new RestClient(url);
                //var client = new RestClient("https://api.snov.io/v2/domain-emails-with-info?type=all&limit=20&lastId=0&domain=eyfelparfum.com.tr");
                var request = new RestRequest();
                request.Method = Method.Get;
                request.AddHeader("Authorization", $"Bearer {token.access_token}");


                RestResponse r = client.Execute(request);
                var response = JsonConvert.DeserializeObject<DomainEmailsWithInfoResponse>(r.Content);
                return response;
            }
            catch (Exception ex)
            {

                return new DomainEmailsWithInfoResponse { success = false };
            }
        }
        public CompanyProfileSearchResponse CompanyProfile(int countryId, int industryId, int page, int perPage)
        {

            var url = "https://app.snov.io/company-profile-search/search";

            var options = new RestClientOptions("https://app.snov.io")
            {
                MaxTimeout = -1,
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            };
            var client = new RestClient(options);
            var request = new RestRequest("/company-profile-search/search", Method.Post);
            request.AddHeader("Host", "app.snov.io");
            request.AddHeader("Connection", "keep-alive");
            request.AddHeader("sec-ch-ua", "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"");
            request.AddHeader("DNT", "1");
            request.AddHeader("sec-ch-ua-mobile", "?0");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Accept", "application/json, text/plain, */*");
            request.AddHeader("X-Requested-With", "XMLHttpRequest");
            request.AddHeader("sec-ch-ua-platform", "\"Windows\"");
            request.AddHeader("Origin", "https://app.snov.io");
            request.AddHeader("Sec-Fetch-Site", "same-origin");
            request.AddHeader("Sec-Fetch-Mode", "cors");
            request.AddHeader("Sec-Fetch-Dest", "empty");
            request.AddHeader("Referer", "https://app.snov.io/company-profile-search");
            request.AddHeader("Accept-Encoding", "gzip, deflate, br");
            request.AddHeader("Accept-Language", "en,tr;q=0.9,en-US;q=0.8,ar;q=0.7,th;q=0.6");
            request.AddHeader("Cookie", "_ga=GA1.3.829093151.1663422419; snovTrackingId=MJQodhfnoxWk63krTCCSCCOt7Aw33ZelYsFkeUioqGHnh68eZ3ecPPhYGyszRUku; snovTrackingId=MJQodhfnoxWk63krTCCSCCOt7Aw33ZelYsFkeUioqGHnh68eZ3ecPPhYGyszRUku; _hjSessionUser_915836=eyJpZCI6IjgyMmJmNzgzLWI2MzItNTQ1Zi1hYjNkLTY4OTVhOWE4MTRlMyIsImNyZWF0ZWQiOjE2NjM0MjI0MTk4ODQsImV4aXN0aW5nIjp0cnVlfQ==; _hjMinimizedPolls=801132; crisp-client%2Fsession%2Fa8acb4a0-a13f-4d09-b433-ea92cabf4252=session_af588249-67b9-4dfa-af86-8d564b4744a5; _hjDonePolls=843261%2C874449; _gcl_au=1.1.587612238.1679292036; _ga_BNRTCNFP5Y=deleted; _ga_BNRTCNFP5Y=deleted; _gcl_aw=GCL.1679917588.CjwKCAjw_YShBhAiEiwAMomsEPJqHgEGXgZfkzm0Sc8_1rZNm2JsQMCIxisC45cf2s-pmgjC4YCjXhoCpLkQAvD_BwE; _gac_UA-94112226-2=1.1679917589.CjwKCAjw_YShBhAiEiwAMomsEPJqHgEGXgZfkzm0Sc8_1rZNm2JsQMCIxisC45cf2s-pmgjC4YCjXhoCpLkQAvD_BwE; _gac_UA-94112226-1=1.1679917589.CjwKCAjw_YShBhAiEiwAMomsEPJqHgEGXgZfkzm0Sc8_1rZNm2JsQMCIxisC45cf2s-pmgjC4YCjXhoCpLkQAvD_BwE; _gac_UA-94112226-2=1.1679917589.CjwKCAjw_YShBhAiEiwAMomsEPJqHgEGXgZfkzm0Sc8_1rZNm2JsQMCIxisC45cf2s-pmgjC4YCjXhoCpLkQAvD_BwE; browserAcceptedLanguage=en; lang=eyJpdiI6ImJlN2lHb2pzcTdiRkIrS0ZOWUY4N1E9PSIsInZhbHVlIjoiUzkxNVQxbkNxL2xmdG5PUWdyajFkT3NLMHdQN3drZjlxZExiZy9QMENOVFk2MlluN1MxTHNTVSttRHRuWkY0TyIsIm1hYyI6ImM3MTU4YThjNDg4YTU5YWU4ZTgxMDE3YzY3MDg0Zjc2MGUxMDk3MDFhZmUxOWNmOTRhN2U4NjNkZTQ0NmU3YjUiLCJ0YWciOiIifQ%3D%3D; _gid=GA1.3.639746796.1682421267; selector=91f2dd34c09234a6fb2b5cb87a671598; userId=eea41898520475d793ce365ad2cbca9380c10d1c4ef1d4eac94a8073179064f6; _gid=GA1.2.639746796.1682421267; ps5c77f6916f75591130a2b7dc=false|1680652800000; crisp-client%2Fsocket%2Fa8acb4a0-a13f-4d09-b433-ea92cabf4252=1; psuid=877ece16-26e6-40a6-8e64-de81177d04c2; token=1589eac012ab652416d0960e265a1a9f; snov_io=tWfmjOztMK3fRx0ea0mB6aQ1Zdlruf9gwBjFyWBF; _ga=GA1.1.829093151.1663422419; Hm_lvt_37b39b5356e9556531e38d50ddd8c555=1680532074,1682421268,1682499117,1682586390; Hm_lpvt_37b39b5356e9556531e38d50ddd8c555=1682586390; _hjSession_915836=eyJpZCI6ImViNmM3YTZjLWJmZTgtNGE0OC04Mzk1LWU3ZTYxZjdmMmE5NiIsImNyZWF0ZWQiOjE2ODI1ODYzOTAzOTcsImluU2FtcGxlIjpmYWxzZX0=; st_ua=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODQ0MDA3ODYsImRhdGEiOnsidXNlciI6eyJpZCI6MTA0MjA4NywiZW1haWwiOiJyYWlmLnlhbWFuQGZpa2F5YXppbGltLmNvbSIsIm5hbWUiOiJSYWlmIFlhbWFuIiwiY291bnRyeSI6IkRFIiwibGFuZyI6ImVuIiwic2Vzc2lvblN0YXJ0ZWRBdE1zIjoxNjgyNTg2Mzg2MDI4LCJjdXJyZW5jeUlkIjoxMDQsInRpbWV6b25lIjoiRXVyb3BlL0lzdGFuYnVsIiwidGVhbSI6eyJpc0xlYWQiOjF9fX19.yGVeUtSX6fVY-0FEOgCVVU-Nd1Sqz1i0RkHfWSU6t5c; _ga_BNRTCNFP5Y=GS1.1.1682586386.139.1.1682586394.52.0.0");


            var body = new CompanyProfileSearchRequest
            {
                countryId = countryId,
                industryId = industryId,
                page = page,
                perPage = perPage,
                city = "",
                founded = "",
                name = "",
                sizeId = 0,
                specialties = new List<string>().ToArray(),
                state = ""
            };

            var data = JsonConvert.SerializeObject(body);
            request.AddStringBody(data, DataFormat.Json);
            RestResponse response = client.Execute(request);


            var model = JsonConvert.DeserializeObject<CompanyProfileSearchResponse>(response.Content);
            return model;



        }
        public void DomainEpostaSayac()
        {
            var list = new List<EmailCountResponse>();
            var domainList = new List<string>();
            var countedDomainList = new List<string>();

            var crawlerDataset = new DataSet();

            var excludeDataset = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\8810 BrandDomainList.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Desktop\redbrandnames.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    excludeDataset = reader.AsDataSet();
                }
            }

            var domainRows = crawlerDataset.Tables[0].Rows;

            IEnumerable<DataRow> exclude = excludeDataset.Tables[0].AsEnumerable().ToList();

            var excludeDomains = exclude.Select(s => s.ItemArray[0].ToString());

            var token = Token();
            var l = domainList.Where(w => !countedDomainList.Contains(w)).ToList();
            var counter = 0;
            foreach (DataRow dr in domainRows)
            {
                try
                {
                    counter++;
                    var brand = dr.ItemArray[2].ToString();
                    var domain = dr.ItemArray[1].ToString();
                    if (!excludeDomains.Contains(brand))
                    {
                        var r = DomainEmailsCount(token, domain);
                        if (r.error != null && r.error == "Unauthenticated")
                        {
                            token = Token();
                            r = DomainEmailsCount(token, dr.ItemArray[0].ToString());
                        }
                        if (r.success) list.Add(r);
                    }
                    else
                    {
                        var a = 1;
                    }


                }
                catch (Exception ex)
                {
                    continue;
                }

            }
            var items = list.Select(x => new
            {
                Domain = x.domain,
                EmailCount = x.result
            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes(@"C:\Users\raify\Downloads\88101 Domain Email Couunt List.xlsx", excel);
        }
        public void DomainSearchV2()
        {
            var list = new List<Datum>();
            var domainList = new List<string>();
            var exclude = new List<string>();
            var domainsWithNoEmail = new List<Datum>();

            var crawlerDataset = new DataSet();
            var excludeDataset = new DataSet();

            var path = @"C:\Users\raify\Downloads\Fika Doğru Domain 864.xlsx";
            var domainEmailListpath = @"C:\Users\raify\Downloads\Fika Doğru Domain 864 Email List.xlsx";
            var domainNoEmailListpath = @"C:\Users\raify\Downloads\Fika Doğru Domain 864 No Email List.xlsx";

            using (var stream = System.IO.File.Open(path, FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    crawlerDataset = reader.AsDataSet();
                }
            }

            var domainRows = crawlerDataset.Tables[0].Rows;

            var token = Token();

            var counter = 0;

            foreach (DataRow dr in domainRows)
            {
                try
                {
                    counter++;

                    var domain = dr.ItemArray[1].ToString();

                    var dEmailCountResponse = DomainEmailsCount(token, domain);
                    if (dEmailCountResponse.error != null && dEmailCountResponse.error == "Unauthenticated")
                    {
                        token = Token();
                        dEmailCountResponse = DomainEmailsCount(token, domain);
                    }

                    if (string.IsNullOrEmpty(domain)) continue;

                    if (dEmailCountResponse.result > 0)
                    {
                        if (dEmailCountResponse.result <= 10)
                        {
                            var r = DomainEmailsWithInfo(token, domain, "all", "10", "0", new List<string>().ToArray());
                            if (r.error != null && r.error == "Unauthenticated")
                            {
                                token = Token();
                                r = DomainEmailsWithInfo(token, domain, "all", "10", "0", new List<string>().ToArray());
                            }
                            if (r.success)
                            {

                                list.AddRange(r.data);
                                list.ForEach(f => f.company_name = r.companyName);
                                list.ForEach(f => f.domain = r.domain);
                            }
                        }
                        else if (dEmailCountResponse.result > 10 && dEmailCountResponse.result <= 20)
                        {
                            var res = DomainEmailsWithInfo(token, domain, "personal", "10", "0", new List<string>().ToArray());
                            if (res.error != null && res.error == "Unauthenticated")
                            {
                                token = Token();
                                res = DomainEmailsWithInfo(token, domain, "personal", "10", "0", new List<string>().ToArray());
                            }
                            if (res.success)
                            {

                                list.AddRange(res.data);
                                list.ForEach(f => f.company_name = res.companyName);
                                list.ForEach(f => f.domain = res.domain);
                            }

                        }
                        else if (dEmailCountResponse.result > 20)
                        {
                            var res = DomainEmailsWithInfo(token, domain, "personal", "10", "0", new List<string> { "sales", "marketing", "manager", "ceo", "chief", "director" }.ToArray());
                            if (res.result > 0)
                            {
                                if (res.error != null && res.error == "Unauthenticated")
                                {
                                    token = Token();
                                    res = DomainEmailsWithInfo(token, domain, "personal", "10", "0", new List<string> { "sales", "marketing", "manager", "ceo", "chief", "director" }.ToArray());
                                }
                            }
                            else if (res.result == 0)
                            {
                                res = DomainEmailsWithInfo(token, domain, "all", "10", "0", new List<string>().ToArray());
                            }
                            if (res.success)
                            {

                                list.AddRange(res.data);
                                list.ForEach(f => f.company_name = res.companyName);
                                list.ForEach(f => f.domain = res.domain);
                            }
                        }
                    }
                    else
                        if (dEmailCountResponse.result == 0)
                    {
                        try
                        {
                            var emails = EmailTopla(domain);

                            list.AddRange(emails.Select(s => new Datum { domain = domain, email = s }));

                            if (emails.Count == 0)
                            {
                                domainsWithNoEmail.Add(new Datum { domain = domain });
                            }
                        }
                        catch (Exception)
                        {
                            continue;
                        }
                    }
                    
                }
                catch (Exception ex)
                {
                    continue;
                }
            }

            var items = list.Select(x => new
            {
                domain = x.email.Split('@') != null ? x.email.Split('@')[1] : "",
                email = x.email,
                firstName = x.first_name,
                lastName = x.last_name,
                position = x.position,
                sourcePage = x.source_page,
                companyName = x.company_name,
                type = x.type,
                status = x.status
            });

            var excel = items.ToExcel();

            System.IO.File.WriteAllBytes(domainEmailListpath, excel);

            var noEmailDomains = domainsWithNoEmail.Select(x => new
            {
                domain = x.domain,
            });

            excel = noEmailDomains.ToExcel();

            System.IO.File.WriteAllBytes(domainNoEmailListpath, excel);


        }
        public void ProfileSearch()
        {
            //Almanya 83,
            //Azerbeycan 16
            //Turkiye 228

            var list = new List<int> { 47 };
            var sorun = new List<int>();
            var countryId = 228;
            var pageSize = 100;
            //son ind=11
            for (int i = 11; i < 427; i++)
            {

                try
                {
                    var result = new List<Result>();
                    var a = CompanyProfile(countryId, i, 1, pageSize);

                    result.AddRange(a.result);
                    int totalPages = a.total / pageSize + (a.total % 100 > 0 ? 1 : 0);
                    for (int j = 1; j <= totalPages; j++)
                    {
                        System.Threading.Thread.Sleep(500);

                        a = CompanyProfile(countryId, i, j, pageSize);
                        result.AddRange(a.result);
                    }

                    var items = result.Select(x => new
                    {
                        id = x.id,
                        name = x.name,
                        url = x.url,
                        country = x.country,
                        industry = x.industry,
                        emailsCount = x.emailsCount,
                        prospectsCount = x.prospectsCount

                    });

                    var excel = items.ToExcel();
                    if (result.Count > 0)
                    {
                        var path = $"C:\\Users\\raify\\Desktop\\Desktop\\Company Profile\\Turkey\\{result.FirstOrDefault().industry.Replace('/', '-') + " - " + result.Count()}.xlsx";
                        System.IO.File.WriteAllBytes(path, excel);
                    }
                }
                catch (Exception)
                {
                    sorun.Add(i);
                    continue;
                }


            }

            var ex = sorun.ToExcel();

            var p = $"C:\\Users\\raify\\Desktop\\Desktop\\Company Profile\\Turkey\\hatalı_endustri.xlsx";
            System.IO.File.WriteAllBytes(p, ex);

        }
        public List<string> EmailTopla(string url)
        {
            var list = new List<string>();

            try
            {

                var istenmeyenUzanti = new List<string> { "jpg", "jpeg", "png", "pdf", "txt", "xml", "js", "css" };
                try
                {
                    string link = url.Replace("www.", "").Replace("http://", "").Replace("https://", ""); //Uri tipinde değişeken linkimizi veriyoruz.
                    var html = "";

                    if (!UrlExist(link))
                    {
                        return list;
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
                            if (epostaDom != null && epostaDom.Attributes["data-cfemail"] != null)
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
                        html = client.DownloadString("http://" + link);

                        document = new HtmlAgilityPack.HtmlDocument(); //kütüphanemizi kullanıp htmldocument oluşturuyoruz.
                        document.LoadHtml(html);//documunt değişkeninin html ine çektiğimiz htmli veriyoruz
                        innerText = document.DocumentNode.InnerText;

                        foreach (Match myMatch in myRegex.Matches(innerText))
                        {
                            emails.Add(myMatch.Value);
                        }
                    }

                    emails = emails.Distinct().ToList();
                    list = emails;


                }
                catch (Exception ex)
                {
                    return new List<string>();
                }

            }
            catch (Exception ex)
            {
                return new List<string>();
            }

            return list;
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
}