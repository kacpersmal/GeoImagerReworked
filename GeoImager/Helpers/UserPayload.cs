using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Helpers
{
    public class UserPayload
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Mail { get; set; }
        public string Token { get; set; }
    }
}
