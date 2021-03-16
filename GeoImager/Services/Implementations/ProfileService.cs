using AutoMapper;
using GeoImager.Data;
using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
using GeoImager.Data.Models;
using GeoImager.Helpers;
using GeoImager.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Implementations
{
    public class ProfileService : IProfileService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public readonly IImageService _imageService;
        public ProfileService(ApplicationDbContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<UserProfileResponse> EditProfileDescription(EditProfileDescriptionRequest request, UserPayload payload)
        {
            var ent = _context.UserProfiles.Include(x => x.UserProfileImage).Include(x => x.User).FirstOrDefault(x => x.Id == payload.Id);
            if(ent != null)
            {
                ent.Description = request.Description;
                await _context.SaveChangesAsync();
            }
            return _mapper.Map<UserProfileResponse>(ent);
        }

        public async Task<UserProfileResponse> EditProfileImage(EditProfileImageRequest request, UserPayload payload)
        {
            var uploaded = await _imageService.UploadImage(request.Data);
            var profile = await _context.UserProfiles.Include(x => x.UserProfileImage).Include(x => x.User).FirstOrDefaultAsync(x => x.Id == payload.Id);
            profile.UserProfileImage = uploaded;
            await _context.SaveChangesAsync();
            return _mapper.Map<UserProfileResponse>(profile);
        }

        public async Task<UserProfileResponse> GetUserProfileByName(string name)
        {
            var profile = await _context.UserProfiles.Include(x => x.UserProfileImage).Include(x=> x.User).FirstOrDefaultAsync(x => x.User.Username.Equals(name));
            var mapped = _mapper.Map<UserProfileResponse>(profile);
            
            if(mapped.UserProfileImagePath == null)
            {
                mapped.UserProfileImagePath =  @"/images/profile-default.png" ;
            }
            return mapped;
        }
    }
}
