using GeoImager.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Data.DTO.Responses
{
    public class LoginResponse
    {
        public bool Authenticated { get; set; }
        public UserPayload Payload { get; set; }
    }
}
