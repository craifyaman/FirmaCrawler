using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models.Snovio
{
    public class EmailCountResponse
    {
        public bool success { get; set; }
        public string domain { get; set; }
        public bool webmail { get; set; }
        public int result { get; set; }
        public string error { get; set; }

    }
}