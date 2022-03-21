namespace FuarCrawler.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("InstaCrawlPost")]
    public class InstaCrawlPost
    {
        [Key]
        public int InstaCrawlPostId { get; set; }
        public string url { get; set; }
        public string hashtag { get; set; }
        public bool process { get; set; }
        public string account { get; set; }
        public bool lastCrawl { get; set; }
    }



}
