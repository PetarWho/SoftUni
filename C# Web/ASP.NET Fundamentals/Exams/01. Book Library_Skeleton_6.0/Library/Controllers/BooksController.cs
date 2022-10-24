using Library.Contracts;
using Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing;
using System.Security.Claims;

namespace Library.Controllers
{
    [Authorize]
    public class BooksController : Controller
    {
        #region Injection

        private readonly IBookService bookService;
        public BooksController(IBookService _bookService)
        {
            bookService = _bookService;
        }

        #endregion

        #region Get All Books
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var model = await bookService.GetAllAsync();

            return View(model);
        }

        #endregion

        #region Add New Book

        [HttpGet]
        public async Task<IActionResult> Add()
        {
            var model = new AddBookViewModel()
            {
                Categories = await bookService.GetCategoriesAsync()
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddBookViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            try
            {
                await bookService.AddBookAsync(model);

                return RedirectToAction(nameof(All));
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Oops.. That was not supposed to happen");

                return View(model);
            }
        }

        #endregion

        #region Add Book To Collection

        public async Task<IActionResult> AddToCollection(int bookId)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                await bookService.AddBookToCollectionAsync(bookId, userId);
            }
            catch (Exception)
            {
                throw;
            }


            return RedirectToAction(nameof(All));
        }

        #endregion

        #region My Books Collection

        public async Task<IActionResult> Mine()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var model = await bookService.GetMineAsync(userId);

            return View(model);
        }

        #endregion

        #region Remove Book From Collection

        public async Task<IActionResult> RemoveFromCollection(int bookId)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                await bookService.RemoveBookFromCollectionAsync(bookId, userId);
            }
            catch (Exception)
            {
                throw;
            }


            return RedirectToAction(nameof(Mine));
        }

        #endregion

    }
}
