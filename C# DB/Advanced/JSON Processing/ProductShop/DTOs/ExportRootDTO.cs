using Newtonsoft.Json;
using System.Collections.Generic;

namespace ProductShop.DTOs
{
    public class ExportRootDTO
    {
        [JsonProperty("usersCount")]
        public int UsersCount { get; set; }

        [JsonProperty("users")]
        public IEnumerable<UserDTO> Users { get; set; }
    }
}
