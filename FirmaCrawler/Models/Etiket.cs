namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Etiket")]
    public partial class Etiket
    {
        public int EtiketId { get; set; }
        public string Adi { get; set; }
        public int DilId { get; set; }
        public virtual ICollection<FirmaEtiketRelation> FirmaEtiketRelation { get; set; }

    }



}
