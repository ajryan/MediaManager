using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MediaManager.Web.Controllers
{
    public class TfsStenoController : ApiController
    {
        public HttpResponseMessage Post(HttpRequestMessage request)
        {
            return new HttpResponseMessage(HttpStatusCode.Accepted)
            {
                Content = new StringContent("Got request with content: " + request.Content.ToString())
            };
        }
    }
}