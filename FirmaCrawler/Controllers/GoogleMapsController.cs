using ExcelDataReader;
using FirmaCrawler.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace FuarCrawler.Controllers
{
    public class GoogleMapsController : Controller
    {
        List<Fuar> fuarList = new List<Fuar>();
        public void Aktar()
        {
            var db = new Db();
            var firmalar = new List<Firma>();
            var firmaKaynakRelation = new List<FirmaKaynakRelation>();

            var filePath = @"C:\Users\raify\OneDrive\Desktop\Lets Extract Data\TurkishExporter\ExporterDataTurkiyeAyıklanmis.xlsx";
            var dataset = new DataSet();
            using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
            {
                // Auto-detect format, supports:
                //  - Binary Excel files (2.0-2003 format; *.xls)
                //  - OpenXml Excel files (2007 format; *.xlsx, *.xlsb)
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    // Choose one of either 1 or 2:

                    // 1. Use the reader methods
                    //do
                    //{
                    //    while (reader.Read())
                    //    {
                    //        var postUrl = reader.GetString(0);
                    //        var hashtag = reader.GetString(1);
                    //        postList.Add(new InstaCrawlPost { hashtag = hashtag, url = postUrl, process = false });
                    //    }
                    //} while (reader.NextResult());

                    // 2. Use the AsDataSet extension method
                    dataset = reader.AsDataSet();

                    // The result of each spreadsheet is in result.Tables
                }
            }


            foreach (DataRow row in dataset.Tables[0].Rows)
            {
                var unvan = row.ItemArray[0].ToString();
                var websitesi= row.ItemArray[1].ToString();
                var adres= row.ItemArray[2].ToString();
                var telefon= row.ItemArray[3].ToString();
                var category= row.ItemArray[4].ToString();

                firmalar.Add(new Firma
                {
                    Unvan = unvan,
                    WebSitesi = websitesi,
                    Adres = adres,
                    Telefon = telefon,

                });
                
            }


            var insertlist = new List<Firma>();

            foreach (var item in firmalar)
            {
                var fromDb = db.Firma
                    .Include("FirmaEtiketRelation")
                    .Include("FirmaEtiketRelation.Etiket")
                    .Include("FirmaKaynakRelation")
                    .FirstOrDefault(j => j.YeniTipKayit && ((!string.IsNullOrEmpty(j.WebSitesi) && j.WebSitesi.Contains(item.WebSitesi)) || j.Unvan == item.Unvan));

                if (fromDb != null)
                {
                    if (!fromDb.FirmaKaynakRelation.Any(i => i.KaynakId == 203))
                    {
                        firmaKaynakRelation.Add(new FirmaKaynakRelation { FirmaId = fromDb.FirmaId, KaynakId = 203 });
                    }

                    

                }
                else
                {
                    item.Aktarim = true;
                    item.YeniTipKayit = true;
                    item.KayitTarihi = DateTime.Now;
                    insertlist.Add(item);

                }
            }

            db.Firma.AddRange(insertlist);
            db.FirmaKaynakRelation.AddRange(firmaKaynakRelation);
            //db.FirmaEposta.AddRange(firmaEposta);
            db.SaveChanges();
        }
        


    }
}