namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ExporterFirma")]
    public partial class ExporterFirma
    {
        public int ExporterFirmaId { get; set; }
        public string Unvan { get; set; }
        public string Kod { get; set; }
        public string VergiDairesi { get; set; }
        public string VergiNo { get; set; }
        public string KurulusYili { get; set; }
        public string CalisanSayisi { get; set; }
        public string Yetkili { get; set; }
        public string Adres { get; set; }
        public string Ulke { get; set; }
        public string Sertifika { get; set; }
        public string Kategori { get; set; }
        public string UyelikTipi { get; set; }
        public bool? FirmaBilgisiAlindi { get; set; }

    }



}
