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

            for (int contentIndex = 0; contentIndex < requestMulti.Contents.Count; contentIndex++)
            {
                var part = requestMulti.Contents[contentIndex];
                Trace.TraceInformation("Part {0}: {1}", contentIndex, await part.ReadAsStringAsync());
            }

            //string to = await requestMulti.Contents[2].ReadAsStringAsync();
            //string subject = await requestMulti.Contents[8].ReadAsStringAsync();
            //string body = await requestMulti.Contents[3].ReadAsStringAsync();

            //Trace.TraceInformation(String.Format("Received message. To: {0}; Subject: {1}, Body: {2}", to, subject, body));

            //int workItemId;
            //if (!Int32.TryParse(to.Substring(to.IndexOf('@') + 1), out workItemId))
            //{
            //    string failMessage = "Could not parse workitem ID from " + to;
            //    Trace.TraceInformation(failMessage);
            //    return new HttpResponseMessage(HttpStatusCode.OK)
            //    {
            //        Content = new StringContent(failMessage)
            //    };
            //}

            //Trace.TraceInformation("WorkItem ID: " + workItemId);
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                //Content = new StringContent("Appended to history of work item " + workItemId)
                Content = new StringContent("temp")
            };

        }
    }
}