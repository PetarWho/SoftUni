using AutoMapper;
using BookShop.Data.Models;
using BookShop.DataProcessor.ExportDto;
using System.Globalization;

namespace BookShop.DataProcessor
{
    public class BookShopProfile:Profile
    {
        public BookShopProfile()
        {
            CreateMap<Book, ExportBookXmlDto>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.PublishedOn.ToString("d", CultureInfo.InvariantCulture)));
        }
    }
}