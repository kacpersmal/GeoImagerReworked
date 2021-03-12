using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
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
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<RegisterResponse> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            return result;
        }

        [HttpPost("authenticate")]
        public async Task<LoginResponse> Authenticate([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            return result;
        }
    }
}
