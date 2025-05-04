using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models.Snovio
{
    public class EmailData
    {
            public string domain { get; set; }
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