using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FuarCrawler.Models
{
    public class SirketTur
    {
        public int SirketTurId { get; set; }
        public string Adi { get; set; }
        public virtual ICollection<Firma> Firma { get; set; }
    }
}