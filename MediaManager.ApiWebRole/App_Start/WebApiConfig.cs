﻿using System;
using System.Web.Http;
using System.Web.Http.Cors;
using MediaManager.ApiWebRole.Auth;
using Microsoft.WindowsAzure;

namespace MediaManager.ApiWebRole.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            config.EnableSystemDiagnosticsTracing();

            // NOTE: order is important for the handlers. we want
            //       CORS processing to run before JWT validation
            //       to avoid "false negative" on CORS

            // enable CORS message handler
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            // register JWT authorization validation
            JsonWebTokenValidationHandler.Register(config, CloudConfigurationManager.GetSetting("zumoMaster"));
        }
    }
}
