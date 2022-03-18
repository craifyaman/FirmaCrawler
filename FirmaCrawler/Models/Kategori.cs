namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Kategori")]
    public partial class Kategori
    {
        public int KategoriId { get; set; }
        public string Kod { get; set; }
        public string Adi { get; set; }
        public virtual ICollection<AltKategori> AltKategori { get; set; }
        public virtual ICollection<KategoriCeviri> KategoriCeviri { get; set; }
    }

    [Table("KategoriCeviri")]
    public partial class KategoriCeviri
    {
        public int KategoriCeviriId { get; set; }
        public int KategoriId { get; set; }
        public Kategori Kategori { get; set; }

        public int DilId { get; set; }
        public Dil Dil { get; set; }
        public string Adi { get; set; }
    }

}
