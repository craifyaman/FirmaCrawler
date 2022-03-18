using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models
{
    public class Fuar
    {
        public string BaseUrl { get; set; }
        public string PaginationUrl { get; set; }
        public int PageCount { get; set; }
        public int KaynakId { get; set; }
        public int Tip { get; internal set; }
        public string TipAciklama { get; internal set; }
    }
}