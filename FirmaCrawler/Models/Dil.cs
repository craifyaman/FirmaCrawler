namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Dil")]
    public partial class Dil
    {
        public int DilId { get; set; }
        public string Adi { get; set; }
        public string Kod { get; set; }

        public virtual ICollection<HsKodCeviri> HsKodCeviri { get; set; }
        public virtual ICollection<AltKategoriCeviri> AltKategoriCeviri { get; set; }
        public virtual ICollection<KategoriCeviri> KategoriCeviri { get; set; }
        public virtual ICollection<Etiket> Etiket { get; set; }

    }



}
