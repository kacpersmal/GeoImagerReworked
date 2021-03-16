using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Data.DTO.Requests
{
    public class EditProfileImageRequest
    {
        public IFormFile Data { get; set; }
    }
}
