namespace SharedTrip.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using MyWebServer.Http;
    using MyWebServer.Results;
    using SharedTrip.Models;
    using System.Threading.Tasks;
    public class UserController : Controller
    {

        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            var model = new LoginViewModel()
            {
                ReturnUrl = returnUrl,
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return this.View(model);
            }

            return Ok();
        }
    }
}
