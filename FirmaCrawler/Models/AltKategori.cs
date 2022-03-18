namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("AltKategori")]
    public partial class AltKategori
    {
        public int AltKategoriId { get; set; }

        public int KategoriId { get; set; }
        public Kategori Kategori { get; set; }

        public string Kod { get; set; }

        public string Adi { get; set; }
        public virtual ICollection<AltKategoriCeviri> AltKategoriCeviri { get; set; }
    }

    [Table("AltKategoriCeviri")]
    public partial class AltKategoriCeviri
    {
        public int AltKategoriCeviriId { get; set; }
        public int AltKategoriId { get; set; }
        public AltKategori AltKategori { get; set; }

        public int DilId { get; set; }
        public Dil Dil { get; set; }
        public string Adi { get; set; }
    }

}
