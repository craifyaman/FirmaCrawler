using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public static class Extension
{
    public static IWebElement FindElementSafe(this IWebDriver driver, By by)
    {
        try
        {
            return driver.FindElement(by);
        }
        catch (NoSuchElementException)
        {
            return null;
        }
    }
    public static IWebElement FindElementSafe(this IWebDriver driver, By by, string attribute, string contains)
    {
        try
        {
            return driver.FindElements(by).FirstOrDefault(i => i.GetAttribute(attribute).Contains(contains));

        }
        catch (NoSuchElementException)
        {
            return null;
        }
    }
}
