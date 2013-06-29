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
            //Trace.TraceInformation("Request content-type: " + String.Join(", ", request.Headers.GetValues("Content-Type")));
            string requestDump = "Request: " + request.ToString();
            Trace.TraceInformation(requestDump);

            //var requestMulti = await request.Content.ReadAsMultipartAsync();
            
            //string messageDump = String.Empty;
            //for (int index = 0; index < requestMulti.Contents.Count; index++)
            //{
            //    HttpContent part = requestMulti.Contents[index];
            //    messageDump += "Part " + index + ": " + await part.ReadAsStringAsync();
            //}
            //Trace.TraceInformation(messageDump);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Request: " + request.ToString())
            };
        }
    }
}