﻿using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MediaManager.Web.Controllers
{
    public class Email
    {
        public string[] to;
        public string from;
        public string subject;
        public string text;
        public string html;
        public int attachments;

        public override string ToString()
        {
            return String.Format(
                "to: {0}; subject: {1}, html: {2}, text: {3}",
                to, subject, html, text);
        }
    }

    public class TfsStenoController : ApiController
    {
        public HttpResponseMessage Post([FromBody] Email email)
        {
            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(email.ToString())
            };
        }
    }
}