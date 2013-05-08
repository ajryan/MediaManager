using System;
using System.Collections.Generic;
using System.Web.Http;

namespace MediaManager.ApiWebRole.Controllers
{
    public class SettingsController : ApiController
    {
        // GET api/settings
        public IEnumerable<string> Get()
        {
            return new string[] { "setting1", "setting2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "setting" + id;
        }
    }
}