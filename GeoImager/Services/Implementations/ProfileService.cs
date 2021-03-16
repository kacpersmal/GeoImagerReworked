using AutoMapper;
using GeoImager.Data;
using GeoImager.Data.DTO.Responses;
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
        public ProfileService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UserProfileResponse> GetUserProfileByName(string name)
        {
            var profile = await _context.UserProfiles.Include(x=> x.User).FirstOrDefaultAsync(x => x.User.Username.Equals(name));
            
            return _mapper.Map<UserProfileResponse>(profile);
        }
    }
}
