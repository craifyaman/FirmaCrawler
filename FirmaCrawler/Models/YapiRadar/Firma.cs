using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FirmaCrawler.Models.YapiRadar
{
    public class Firma
    {
        public string No { get; set; }
        public string Adi{ get; set; }
        public string Adres { get; set; }
        public string Mahalle { get; set; }
        public string Ilce { get; set; }
        public string Il{ get; set; }
        public string Ulke{ get; set; }
        public string Telefon { get; set; }
        public string Eposta { get; set; }
        public string Web { get; set; }
        public string FirmaYetkili { get; set; }
        public string DevamEdenProje { get; set; }
        public string GuncellemeTarihi { get; set; }
        public string Hizmet { get; set; }
        public string Hata { get; set; }
        public string HataIndex { get; set; }
        public string DevamEdenProjeSayisi { get; internal set; }
        public string TamamlananProjeSayisi { get; set; }

    }
}
