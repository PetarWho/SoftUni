using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using MVC_Intro_Demo.Models;
using System.Text;
using System.Text.Json;

namespace MVC_Intro_Demo.Controllers
{
    public class ProductsController : Controller
    {
        private IEnumerable<ProductViewModel> products = new List<ProductViewModel>()
        {
            new ProductViewModel()
            {
                Id = 1,
                Name = "Cheese",
                Price = 7.00m
            },
            new ProductViewModel()
            {
                Id = 2,
                Name = "Ham",
                Price = 5.50m
            },
            new ProductViewModel()
            {
                Id = 3,
                Name = "Bread",
                Price = 1.50m
            },
        };

        [ActionName("My-Products")]
        public IActionResult All(string keyword)
        {
            if (keyword == null)
            {
                return View(this.products);
            }
            var foundProducts = this.products.Where(pr => pr.Name.ToLower()
                                                .Contains(keyword.ToLower()));

            return View(foundProducts);
        }

        public IActionResult ById(int id)
        {
            var product = this.products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        public IActionResult AllAsJson()
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            return Json(products);
        }

        public IActionResult AllAsText()
        {
            var text = string.Empty;
            foreach (var pr in products)
            {
                text += $"Product {pr.Id}: {pr.Name} - {pr.Price}lv.";
                text += "\r\n";
            }
            return Content(text);
        }

        public IActionResult AllAsTextFile()
        {
            var sb = new StringBuilder();
            foreach (var pr in products)
            {
                sb.AppendLine($"Product {pr.Id}: {pr.Name} - {pr.Price}lv.");
            }
            Response.Headers.Add(HeaderNames.ContentDisposition,
                @"attachment;filename = products.txt");
            return File(Encoding.UTF8.GetBytes(sb.ToString().TrimEnd()), "text/plain");
        }
    }
}
