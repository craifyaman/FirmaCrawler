using FuarCrawler.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

public partial class Firma
{
    public int FirmaId { get; set; }
    public int? SirketTurId { get; set; }
    public SirketTur SirketTur { get; set; }
    public string SirketTuru { get; set; }
    public string Unvan { get; set; }
    public string Adres { get; set; }
    public string Ilce { get; set; }
    public string Il { get; set; }
    public string Telefon { get; set; }
    public string CepTelefon { get; set; }
    public string Eposta { get; set; }
    public string WebSitesi { get; set; }

    public string Yetkili { get; set; }

    public string Nace { get; set; }
    public string MeslekGrubu { get; set; }
    public string Urun { get; set; }
    public string Sektor { get; set; }

    public string OdaSicilNo { get; set; }
    public string TicaretSicilNo { get; set; }

    public string VergiDairesi { get; set; }
    public string VergiNo { get; set; }

    public string IhracatDurumu { get; set; }

    public Nullable<bool> MobilUyumlu { get; set; }
    public Nullable<int> MobilTestDenemeSayisi { get; set; }
    public string MobilTestHata { get; set; }

    public string Kaynak { get; set; }
    public string KaynakTip { get; set; }
    public string KaynakGuid { get; set; }

    public DateTime? KayıtTarihi { get; set; }
    public bool WebSitesindenMail { get; set; }
    public string WebSitesindenMailHata { get; set; }
    public string WebSitesiIletisimSayfasi { get; set; }
    public bool WebSitesiMevcut { get; set; }
    public bool WebSitesiMevcutKontrol { get; set; }
    public bool Aktarim { get; set; }
    public bool YeniTipKayit { get; set; }
    public DateTime KayitTarihi { get; set; }
    public virtual ICollection<FirmaEtiketRelation> FirmaEtiketRelation { get; set; }
    public virtual ICollection<FirmaKaynakRelation> FirmaKaynakRelation { get; set; }
    public virtual ICollection<FirmaEposta> FirmaEposta { get; set; }

    [NotMapped]
    public List<string> EtiketListesi { get; set; }

}