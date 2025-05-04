namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("CrawlUrl")]
    public partial class CrawlUrl
    {
        public int CrawlUrlId { get; set; }
        public string Url { get; set; }
        public bool Ýslem { get; set; }
        public string Kaynak { get; set; }

    }



}
