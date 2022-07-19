﻿
using Newtonsoft.Json;

namespace ProductShop.DTOs
{
    public class SoldProductExportDTO
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }
    }
}
