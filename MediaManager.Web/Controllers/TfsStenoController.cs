﻿using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MediaManager.Web.Controllers
{
    public class TfsStenoController : ApiController
    {
        public class WorkItemEmail
        {
            public int WorkItemId { get; set; }
            public string HistoryText { get; set; }

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
                        if (Int32.TryParse(partText.Substring(partText.IndexOf('@') + 1), out workItemId))
                            WorkItemId = workItemId;
                        break;
                    case "TEXT":
                        if (String.IsNullOrEmpty(HistoryText))
                            HistoryText = partText;
                        break;
                    case "HTML":
                        HistoryText = partText;
                        break;
                }
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

                Trace.TraceInformation("Part {0} - {1}: {2}", contentIndex, partName, partText);
                Trace.TraceInformation("WorkItemEmail: " + workItemEmail.ToString());
            }

            string responseContent = workItemEmail.WorkItemId == -1
                ? "To address must be WorkItemId@tfssteno.aidanjryan.com"
                : "Appended to history of work item ID " + workItemEmail.WorkItemId;

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseContent)
            };
        }
    }
}