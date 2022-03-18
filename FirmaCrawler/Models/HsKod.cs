namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("HsKod")]
    public partial class HsKod
    {
        public int HsKodId { get; set; }
        public string Kod { get; set; }
        public virtual ICollection<HsKodCeviri> HsKodCeviri { get; set; }
    }

    [Table("HsKodCeviri")]
    public partial class HsKodCeviri
    {
        public int HsKodCeviriId { get; set; }
        public int HsKodId { get; set; }
        public HsKod HsKod { get; set; }

        public int DilId { get; set; }
        public Dil Dil { get; set; }
        public string Aciklama { get; set; }
    }




}
