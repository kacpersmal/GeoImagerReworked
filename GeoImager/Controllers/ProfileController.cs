using GeoImager.Data.DTO.Responses;
using GeoImager.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{username}")]
        public async Task<UserProfileResponse> GetProfile(string username)
        {
            var result = await _profileService.GetUserProfileByName(username);
            return result;
        }
    }
}
