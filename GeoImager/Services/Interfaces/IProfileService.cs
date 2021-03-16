using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
using GeoImager.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Interfaces
{
    public interface IProfileService
    {
        public Task<UserProfileResponse> GetUserProfileByName(string name);
        public Task<UserProfileResponse> EditProfileDescription(EditProfileDescriptionRequest request, UserPayload payload);
        public Task<UserProfileResponse> EditProfileImage(EditProfileImageRequest request, UserPayload payload);

    }
}
