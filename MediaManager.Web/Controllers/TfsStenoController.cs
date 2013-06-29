using System;
using System.Configuration;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.TeamFoundation.Client;
using Microsoft.TeamFoundation.WorkItemTracking.Client;

namespace MediaManager.Web.Controllers
{
    public class TfsStenoController : ApiController
    {
        public class WorkItemEmail
        {
            public int WorkItemId { get; set; }
            public string HistoryText
            {
                get
                {
                    return String.Format("<h2>{0} UTC - {1}</h2><div>{2}</div>", DateTime.UtcNow, _subject, _body);
                }
            }

            private string _body;
            private string _subject;

            public WorkItemEmail()
            {
                WorkItemId = -1;
            }

            public void ParsePart(string partName, string partText)
            {
                switch (partName.Replace("\"", String.Empty).ToUpper())
                {
                    case "TO":
                        int workItemId;
                        string trimmedTo = partText.Replace("\"", String.Empty);
                        Trace.TraceInformation("Parsing ID from " + trimmedTo);
                        if (Int32.TryParse(trimmedTo.Substring(0, trimmedTo.IndexOf('@')), out workItemId))
                            WorkItemId = workItemId;
                        break;
                    case "SUBJECT":
                        _subject = partText;
                        break;
                    case "TEXT":
                        if (String.IsNullOrEmpty(_body))
                            _body = partText;
                        break;
                    case "HTML":
                        _body = partText;
                        break;
                }
            }

            public void Save()
            {
                string tfsUserName = ConfigurationManager.AppSettings["tfsUserName"];
                string tfsPassword = ConfigurationManager.AppSettings["tfsPassword"];
                string tfsUrl = ConfigurationManager.AppSettings["tfsUrl"];
                string tfsProjectName = ConfigurationManager.AppSettings["tfsProject"];

                var networkCred = new NetworkCredential(tfsUserName, tfsPassword);
                var basicCred = new BasicAuthCredential(networkCred);
                var tfsCred = new TfsClientCredentials(basicCred) {AllowInteractive = false};

                var teamProjectColl = new TfsTeamProjectCollection(new Uri(tfsUrl), tfsCred);
                teamProjectColl.Authenticate();

                var workItemService = teamProjectColl.GetService<WorkItemStore>();
                var workItem = workItemService.GetWorkItem(WorkItemId);
                workItem.History = HistoryText;
                workItem.Save();
            }

            public override string ToString()
            {
                return String.Format("ID: {0}; Text: {1}", WorkItemId, HistoryText);
            }
        }

        public async Task<HttpResponseMessage> Post(HttpRequestMessage request)
        {
            var workItemEmail = new WorkItemEmail();

            var requestMulti = await request.Content.ReadAsMultipartAsync();
            for (int contentIndex = 0; contentIndex < requestMulti.Contents.Count; contentIndex++)
            {
                var part = requestMulti.Contents[contentIndex];
                
                string partName = part.Headers.ContentDisposition.Name;
                string partText = await part.ReadAsStringAsync();
                
                workItemEmail.ParsePart(partName, partText);

                Trace.TraceInformation("Part {0} - {1}: {2}", contentIndex, partName, partText.Substring(0, Math.Min(partText.Length, 25)));
            }
            Trace.TraceInformation("WorkItemEmail: " + workItemEmail.ToString());

            string responseContent = workItemEmail.WorkItemId == -1
                ? "To address must be WorkItemId@tfssteno.aidanjryan.com"
                : "Appended to history of work item ID " + workItemEmail.WorkItemId;

            try
            {
                workItemEmail.Save();
                Trace.TraceInformation("Saved history to workitem id " + workItemEmail.WorkItemId);
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(responseContent)
                };
            }
            catch (Exception ex)
            {
                string errorMessage = "Failed to save work item with exception: " + ex;
                Trace.TraceInformation(errorMessage);
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent(errorMessage)
                };
            }
        }
    }
}