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
            BundleTable.Bundles.Add(
                new ScriptBundle("~/bundles/angular-app").Include(
                    "~/app/app.js",
                    "~/app/controllers/navigation.js",
                    "~/app/controllers/login.js",
                    "~/app/controllers/settings.js",
                    "~/app/services/azureMobile.js"));
        }
    }
}