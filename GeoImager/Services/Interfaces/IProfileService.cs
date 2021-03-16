using GeoImager.Data.DTO.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Interfaces
{
    public interface IProfileService
    {
        public Task<UserProfileResponse> GetUserProfileByName(string name);
    }
}
