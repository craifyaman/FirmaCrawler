public class FirmaEposta
{
    public int FirmaEpostaId { get; set; }

    public int FirmaId { get; set; }
    public Firma Firma { get; set; }
    public string Eposta { get; set; }
}