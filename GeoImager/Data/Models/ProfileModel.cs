using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeoImager.Data.Models
{
    public class ProfileModel
    {
        public UserModel User { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
        public ImageModel UserProfileImage { get; set; }
        public bool IsPrivate { get; set; }

    }
}
