using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FuarCrawler.Models
{
    public class KaynakTip
    {
        public int KaynakTipId { get; set; }
        public string Adi { get; set; }
        public virtual ICollection<Kaynak> Kaynak { get; set; }
    }
}