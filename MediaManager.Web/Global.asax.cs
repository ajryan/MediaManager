using System;
using System.Web;
using System.Web.Optimization;

namespace MediaManager.Web
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            BundleTable.Bundles.Add(
                new ScriptBundle("~/bundles/libs").Include(
                    "~/Scripts/azuremobileservices.js",
                    "~/Scripts/jquery-{version}.js",
                    "~/Scripts/angular.js"));
        }
    }
}