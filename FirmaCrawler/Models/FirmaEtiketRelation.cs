using FuarCrawler.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public partial class FirmaEtiketRelation
{
    public int FirmaEtiketRelationId { get; set; }
    public int FirmaId { get; set; }
    public Firma Firma { get; set; }
    public int EtiketId { get; set; }
    public Etiket Etiket { get; set; }


}