namespace SharedTrip.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using MyWebServer.Http;
    using MyWebServer.Results;
    using SharedTrip.Models;
    using System.Threading.Tasks;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return this.View();
        }
    }
}