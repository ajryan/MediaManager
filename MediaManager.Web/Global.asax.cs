using System;
using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Transformers;

namespace MediaManager.Web
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            var jsTransformer = new JsTransformer();

            var libsBundle = new Bundle("~/bundles/libs").Include(
                "~/Scripts/azuremobileservices.js",
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/angular.js");
            libsBundle.Transforms.Add(jsTransformer);
            BundleTable.Bundles.Add(libsBundle);
            
            var angularAppBundle = new Bundle("~/bundles/angular-app").Include(
                "~/app/app.js",
                "~/app/services/azureMobile.js",
                "~/app/controllers/navigation.js",
                "~/app/controllers/home.js",
                "~/app/controllers/login.js",
                "~/app/controllers/settings.js");
            angularAppBundle.Transforms.Add(jsTransformer);
            BundleTable.Bundles.Add(angularAppBundle);
        }
    }
}