using GeoImager.Data;
using GeoImager.Data.DTO.Requests;
using GeoImager.Data.DTO.Responses;
using GeoImager.Data.Models;
using GeoImager.Helpers;
using GeoImager.Services.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GeoImager.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var response = new LoginResponse { Authenticated = false};
            var hashedPassword = HashPassword(request.Password);
            var user = await _context.Users.FirstOrDefaultAsync(mod => mod.Email == request.Email && mod.Password == hashedPassword);

            if (user != null)
            {
                response.Authenticated = true;
                response.Payload = new UserPayload { Mail = user.Email, Username = user.Username, Token = generateJwtToken(user), Id = user.Id };
            }

            return response;
        }

        public async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            var result = new RegisterResponse { Succes = false };
            var userExists = await _context.Users.FirstOrDefaultAsync(mod => mod.Username == request.Username || mod.Email == request.Email) != null;
            if (userExists)
            {
                return result;
            }
            var userModel = new UserModel { CreationDate = DateTime.UtcNow, Email = request.Email, Username = request.Username,  Password = HashPassword(request.Password), Name = request.Name, Surname = request.Surname};
            var profileModel = new ProfileModel { Description = "", IsPrivate = false, User = userModel};

            await _context.Users.AddAsync(userModel);
            await _context.UserProfiles.AddAsync(profileModel);
            await _context.SaveChangesAsync();
            result.Succes = true;

            return result;
        }

        public UserPayload GetPayloadById(int id)
        {
            var payload = new UserPayload { Mail = "", Token = "", Username = "" };
            var userModel = _context.Users.FirstOrDefault(x => x.Id == id);
            if (userModel != null)
             {
                payload.Mail = userModel.Email;
                payload.Username = userModel.Username;
                payload.Id = userModel.Id;
             }

            return payload;
        }
       

        private string generateJwtToken(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("SUPERSECRETMEGASTRONGSECRET");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private String HashPassword(String pass)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: pass,
            salt: Encoding.ASCII.GetBytes("NZsP6NnmfBuYeJrrAKNuVQ=="),
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
