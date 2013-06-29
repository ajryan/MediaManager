using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MediaManager.Web.Controllers
{
    public class TfsStenoController : ApiController
    {
        public async Task<HttpResponseMessage> Post(HttpRequestMessage request)
        {
            var requestMulti = await request.Content.ReadAsMultipartAsync();

            string to = await requestMulti.Contents[2].ReadAsStringAsync();
            string subject = await requestMulti.Contents[8].ReadAsStringAsync();
            string body = await requestMulti.Contents[3].ReadAsStringAsync();

            Trace.TraceInformation(String.Format("Received message. To: {0}; Subject: {1}, Body: {2}", to, subject, body));

            int workItemId = Int32.Parse(to.Substring(to.IndexOf('@') + 1));
            Trace.TraceInformation("WorkItem ID: " + workItemId);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Appended to history of work item " + workItemId)
            };
        }
    }
}