using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FuarCrawler.Models
{
    public class Kaynak
    {
        public int KaynakId { get; set; }
        public string Adi { get; set; }
        public int? KaynakTipId { get; set; }
        public KaynakTip KaynakTip { get; set; }
        public virtual ICollection<FirmaKaynakRelation> FirmaKaynakRelation { get; set; }
        

    }
}