using System;

namespace MediaManager.ApiWebRole.Auth
{
    public class JsonWebTokenException : Exception
    {
        public JsonWebTokenException(string message)
            : base(message)
        {
        }
    }
}