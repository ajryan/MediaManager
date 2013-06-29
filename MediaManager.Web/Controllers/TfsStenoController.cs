using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MediaManager.Web.Controllers
{
    public class TfsStenoController : ApiController
    {
        public HttpResponseMessage Post(string to, string subject, string html, string text)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(String.Format(
                    "Got request with to: {0}; subject: {1}, html: {2}, text: {3}",
                    to, subject, html, text))
            };
        }
    }
}