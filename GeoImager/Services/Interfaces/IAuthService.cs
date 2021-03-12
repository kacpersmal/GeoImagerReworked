using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
using GeoImager.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<RegisterResponse> RegisterAsync(RegisterRequest request);
        public Task<LoginResponse> LoginAsync(LoginRequest request);
        public UserPayload GetPayloadById(int id);
    }
}
