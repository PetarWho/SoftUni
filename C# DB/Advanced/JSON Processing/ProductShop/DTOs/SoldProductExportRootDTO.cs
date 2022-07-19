using Newtonsoft.Json;
using System.Collections.Generic;

namespace ProductShop.DTOs
{
    public class SoldProductExportRootDTO
    {
        public int Count { get; set; }

        [JsonProperty("products")]
        public IEnumerable<SoldProductExportDTO> Products { get; set; }
    }
}
