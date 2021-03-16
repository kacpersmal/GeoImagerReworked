using AutoMapper;
using GeoImager.Data.DTO.Responses;
using GeoImager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Data
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<ProfileModel, UserProfileResponse>()
                .ForMember(x => x.Id, a => a.MapFrom(x => x.Id))
                .ForMember(x => x.Description, a => a.MapFrom(x => x.Description))
                .ForMember(x => x.Username, a => a.MapFrom(x => x.User.Username))
                .ForMember(x => x.UserProfileImagePath, a => a.MapFrom(x => x.UserProfileImage.RelPath))
                .ForMember(x => x.Name, a => a.MapFrom(x => x.User.Name))
                .ForMember(x => x.Surname, a => a.MapFrom(x => x.User.Surname));







        }
    }
}
