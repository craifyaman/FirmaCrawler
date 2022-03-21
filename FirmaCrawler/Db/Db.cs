using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration.Conventions;
using Migrations;
using System.Data.Entity;
using FuarCrawler.Models;

public partial class Db : DbContext
{
    public virtual DbSet<Firma> Firma { get; set; }
    public virtual DbSet<FirmaEposta> FirmaEposta { get; set; }
    public virtual DbSet<KaynakTip> KaynakTip { get; set; }
    public virtual DbSet<Kaynak> Kaynak { get; set; }
    public virtual DbSet<FirmaKaynakRelation> FirmaKaynakRelation { get; set; }
    public virtual DbSet<Etiket> Etiket { get; set; }
    public virtual DbSet<Kategori> Kategori { get; set; }
    public virtual DbSet<AltKategori> AltKategori { get; set; }
    public virtual DbSet<AltKategoriCeviri> AltKategoriCeviri { get; set; }
    public virtual DbSet<ExporterFirma> ExporterFirma { get; set; }
    public virtual DbSet<HsKod> HsKod { get; set; }
    public virtual DbSet<HsKodCeviri> HsKodCeviri { get; set; }
    public virtual DbSet<KategoriCeviri> KategoriCeviri { get; set; }
    public virtual DbSet<SirketTur> SirketTur { get; set; }
    public virtual DbSet<InstaCrawlResult> InstaCrawlResult { get; set; }
    public virtual DbSet<InstaCrawlPost> InstaCrawlPost { get; set; }
    

    public Db() : base("name=Model1")
    {
        Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        Database.SetInitializer(new MigrateDatabaseToLatestVersion<Db, Configuration>("Model1"));
    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

    }
    public void Update<T>(T entity, params string[] exlude) where T : class
    {
        var entry = Entry<T>(entity);
        entry.State = EntityState.Modified;
        if (exlude != null)
        {
            foreach (var name in exlude)
            {
                entry.Property(name.Trim()).IsModified = false;
            }
        }
        SaveChanges();
    }
    public void Update<T>(T entity, List<string> include) where T : class
    {

        var entry = Entry<T>(entity);
        entry.State = EntityState.Modified;
        if (include.Count > 0)
        {
            foreach (var name in entry.CurrentValues.PropertyNames)
            {
                if (include.Contains(name))
                {
                    entry.Property(name.Trim()).IsModified = true;
                }
                else
                {
                    entry.Property(name.Trim()).IsModified = false;
                }

            }
        }
    }
    public void Insert<T>(T entity) where T : class
    {
        Set<T>().Add(entity);
        SaveChanges();
    }
    public void Delete<T>(T entity) where T : class
    {
        if (entity != null)
        {
            Set<T>().Remove(entity);
            SaveChanges();
        }
    }
}

