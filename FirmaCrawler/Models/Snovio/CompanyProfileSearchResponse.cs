
public class CompanyProfileSearchResponse
{
    public int total { get; set; }
    public Result[] result { get; set; }
}

public class Result
{
    public string id { get; set; }
    public string name { get; set; }
    public string url { get; set; }
    public string country { get; set; }
    public string industry { get; set; }
    public string emailsCount { get; set; }
    public string prospectsCount { get; set; }
    public object[] list_id { get; set; }
}
