namespace FirmaCrawler.Models.Snovio
{
    public class DomainEmailsWithInfoResponse
    {
        public bool success { get; set; }
        public Meta meta { get; set; }
        public Datum[] data { get; set; }
        public string domain { get; set; }
        public string error { get; set; }
        public bool webmail { get; set; }
        public int result { get; set; }
        public long lastId { get; set; }
        public int limit { get; set; }
        public string companyName { get; set; }
        public Email[] emails { get; set; }
    }

    public class Meta
    {
        public string domain { get; set; }
        public bool webmail { get; set; }
        public int result { get; set; }
        public long last_id { get; set; }
        public int limit { get; set; }
        public string company_name { get; set; }
    }

    public class Datum
    {
        public string domain { get; set; }
        public string email { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string position { get; set; }
        public string source_page { get; set; }
        public string company_name { get; set; }
        public string type { get; set; }
        public string status { get; set; }
    }

    public class Email
    {
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string position { get; set; }
        public string sourcePage { get; set; }
        public string companyName { get; set; }
        public string type { get; set; }
        public string status { get; set; }
    }
}