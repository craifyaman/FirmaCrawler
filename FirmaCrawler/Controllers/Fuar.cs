namespace FuarCrawler.Controllers
{
    internal class Fuar
    {
        public string BaseUrl { get; set; }
        public string PaginationUrl { get; set; }
        public int PageCount { get; set; }
        public int KaynakId { get; set; }
        public int Tip { get; set; }
        public string TipAciklama { get; set; }
    }
}