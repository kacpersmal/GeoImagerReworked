using AutoMapper;
using GeoImager.Data;
using GeoImager.Data.DTO.Responses;
using GeoImager.Data.Models;
using GeoImager.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Implementations
{
    public class ImageService : IImageService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _environment;
        private readonly String IMAGES_ROOT;

        public ImageService(ApplicationDbContext context, IMapper mapper, IWebHostEnvironment environment)
        {
            _environment = environment;
            IMAGES_ROOT = @"D:\Workspace\GeoImager\GeoImagerSolution\GeoImager\imager-client\public\images\";
            _context = context;
            _mapper = mapper;
        }
        public async Task<ImageModel> UploadImage(IFormFile file)
        {
            var newfileName = RandomName() + Path.GetExtension(file.FileName);
            var path = Path.Combine(IMAGES_ROOT, newfileName);
            var imagePath = await UploadImageToServer(file, path);

            var model = new ImageModel { Path = imagePath,RelPath= @"/images/" + newfileName };
            _context.Images.Add(model);
            await _context.SaveChangesAsync();
            return model;
        }

        private async Task<String> UploadImageToServer(IFormFile file, String path)
        {
            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return path;
        }


        private String RandomName()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[32];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);

            return finalString;
        }
    }
}
