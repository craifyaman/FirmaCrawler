using ArrayToExcel;
using ExcelDataReader;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirmaCrawler.Controllers
{
    public class FaberController : Controller
    {
        public void GoruntuEsle()
        {
            var folderPath = @"C:\Users\raify\Desktop\fotolar";
            DirectoryInfo d = new DirectoryInfo(folderPath);
            var firmalar = new List<Firma>();
            var files = d.GetFiles();

            var urunlerDataSet = new DataSet();

            using (var stream = System.IO.File.Open(@"C:\Users\raify\Downloads\faber-urunler.xlsx", FileMode.Open, FileAccess.Read))
            {
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    urunlerDataSet = reader.AsDataSet();
                }
            }
            var urunler = new List<FaberUrun>();

            var counter = 0;
            foreach (DataRow row in urunlerDataSet.Tables[0].Rows)
            {
                if (counter == 0) { counter++; continue; };
                urunler.Add(new FaberUrun
                {
                    sku = row.ItemArray[0].ToString().Trim()
                });

                counter++;
            }
            var baseIUrl = "https://faber.fikayazilim.com.tr/wp-content/uploads/2022/10/";
            foreach (var urun in urunler)
            {
                if (urun.sku == "GD 112")
                {
                    var a = 1;
                }

                var urunFotograf = files.Where(i => i.Name.Replace(" ", "").Trim().StartsWith(urun.sku.Replace(" ", ""))).ToList();

                if (urunFotograf.Count() > 0)
                {
                    var fotoNames = new List<string>();

                    foreach (var item in urunFotograf)
                    {
                        var tekrarli = urunFotograf.Where(i => i.Name.Replace(i.Extension, "") == item.Name.Replace(item.Extension, ""));
                        if (tekrarli.Count() == 1)
                        {
                            fotoNames.Add(item.Name);
                        }
                        else
                        {
                            if (tekrarli.Any(i => i.Extension == ".png"))
                            {
                                fotoNames.Add(tekrarli.FirstOrDefault(i => i.Extension == ".png").Name);
                            }
                            else
                            {
                                fotoNames.Add(tekrarli.FirstOrDefault(i => i.Extension == ".jpg").Name);
                            }
                        }
                    }

                    var dir = @"C:\Users\raify\Desktop\fotolar\eslesen\" + urun.sku;
                    System.IO.Directory.CreateDirectory(dir);
                    foreach (var item in fotoNames.Distinct())
                    {
                        var file = files.FirstOrDefault(i => i.Name == item);
                        file.CopyTo(dir + @"\" + item);

                    }

                    var urunUrl = fotoNames.Distinct().Select(s => string.Concat(baseIUrl, s)).Aggregate((a, b) => a + "|" + b);
                    urun.images = urunUrl;
                }

            }


            var items = urunler.Select(x =>
            {
                var sayi = x.images != null ? x.images?.Split('|').Count() : 0;
                dynamic ret = new
                {
                    sku = x.sku,
                    images = x.images,
                    sayi = sayi
                };
                return ret;
            });

            var excel = items.ToExcel();
            //C:\Users\raify\Desktop
            System.IO.File.WriteAllBytes($"C:\\Users\\raify\\Desktop\\faber-urungorsel-3.xlsx", excel);

        }
    }

    public class FaberUrun
    {
        public string sku { get; set; }
        public string images { get; set; }
    }
}