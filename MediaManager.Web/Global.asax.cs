using System;
using System.Web;
using System.Web.Http;
using System.Web.Optimization;
using BundleTransformer.Core.Transformers;

namespace MediaManager.Web
{
    public class Global : HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            ConfigureWebApi();
            ConfigureBundles();
        }

        private void ConfigureWebApi()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        private static void ConfigureBundles()
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
                "~/app/models/user.js",
                "~/app/services/auth.js",
                "~/app/controllers/navigation.js",
                "~/app/controllers/home.js",
                "~/app/controllers/login.js",
                "~/app/controllers/settings.js");
            angularAppBundle.Transforms.Add(jsTransformer);
            BundleTable.Bundles.Add(angularAppBundle);
        }
    }
}