using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models.Snovio
{
    public class TokenRequest
    {
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
    }
}