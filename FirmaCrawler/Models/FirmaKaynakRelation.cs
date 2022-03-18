using FuarCrawler.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public partial class FirmaKaynakRelation
{
    public int FirmaKaynakRelationId { get; set; }
    public int FirmaId { get; set; }
    public Firma Firma { get; set; }
    public int KaynakId { get; set; }
    public Kaynak Kaynak { get; set; }


}