using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirmaCrawler.Models
{
    public class Doktor
    {
        public int DoktorId { get; set; }
        public string Unvan { get; set; }
        public string Brans { get; set; }
        public string AdSoyad { get; set; }
        public string Eposta { get; set; }
        public string Eposta2 { get; set; }
        public string Telefon { get; set; }
        public string Telefon2 { get; set; }
        public string Cep { get; set; }
        public string Il { get; set; }
        public string Ilce { get; set; }
        public string Adres { get; internal set; }
        public string Web { get; internal set; }
    }
}