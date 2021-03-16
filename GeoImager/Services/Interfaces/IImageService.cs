using GeoImager.Data.DTO.Responses;
using GeoImager.Data.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Interfaces
{
    public interface IImageService
    {
        public Task<ImageModel> UploadImage(IFormFile file);
    }
}
