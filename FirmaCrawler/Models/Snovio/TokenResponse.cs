using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models.Snovio
{
    public class TokenResponse
    {
        public bool success { get; set; }
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public DateTime expires_date{ get { return DateTime.Now.AddMinutes(59); } set { } }
    }
}