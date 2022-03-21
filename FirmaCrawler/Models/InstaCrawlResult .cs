namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("InstaCrawlResult")]
    public class InstaCrawlResult
    {
        [Key]
        public int InstaCrawlResultId { get; set; }
        public string url { get; set; }
        public string hashTag { get; set; }
        public string account { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string type { get; set; }
        public string JsonContent { get; set; }
        public string Firma { get; set; }
        public string Aciklama { get; set; }
        public string SharedData { get; internal set; }
    }



}
