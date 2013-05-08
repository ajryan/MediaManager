using System;
using System.Web.Mvc;

namespace MediaManager.ApiWebRole.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
