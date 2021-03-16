using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
using GeoImager.Helpers;
using GeoImager.Services.Interfaces;
using Microsoft.AspNetCore.Http;
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

        [Authorize]
        [HttpPost("edit/description")]
        public async Task<UserProfileResponse> EditProfileDescription(EditProfileDescriptionRequest req)
        {
            var payload = (UserPayload)HttpContext.Items["User"];

            var res = await _profileService.EditProfileDescription(req,payload);
            return res;
        }

        [Authorize]
        [HttpPost("edit/image")]
        public async Task<UserProfileResponse> EditProfileImage([FromForm(Name = "image")] IFormFile file)
        {
            var payload = (UserPayload)HttpContext.Items["User"];
            var req = new EditProfileImageRequest { Data = file };
            var res = await _profileService.EditProfileImage(req, payload);
            return res;
        }
    }
}
