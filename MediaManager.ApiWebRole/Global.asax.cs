﻿using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using MediaManager.ApiWebRole.App_Start;

namespace MediaManager.ApiWebRole
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}