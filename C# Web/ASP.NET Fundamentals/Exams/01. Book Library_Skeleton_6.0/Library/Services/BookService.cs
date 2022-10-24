using Library.Contracts;
using Library.Data;
using Library.Data.Models;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext context;

        public BookService(LibraryDbContext _context)
        {
            context = _context;
        }

        public async Task AddBookAsync(AddBookViewModel model)
        {
            var book = new Book()
            {
                Title = model.Title,
                Author = model.Author,
                ImageUrl = model.ImageUrl,
                CategoryId = model.CategoryId,
                Rating = model.Rating,
                Description = model.Description
            };

            await context.Books.AddAsync(book);
            await context.SaveChangesAsync();
        }

        public async Task AddBookToCollectionAsync(int bookId, string userId)
        {
            var user = await context.Users
                .Include(u => u.ApplicationUsersBooks)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new ArgumentException("Invalid User ID");
            }

            var book = await context.Books.FirstOrDefaultAsync(b => b.Id == bookId);

            if (book == null)
            {
                throw new ArgumentException("Invalid Book ID");
            }

            if (!user.ApplicationUsersBooks.Any(ub => ub.BookId == bookId))
            {
                user.ApplicationUsersBooks.Add(new ApplicationUserBook()
                {
                    BookId = bookId,
                    ApplicationUserId = userId,
                    Book = book,
                    ApplicationUser = user
                });

                await context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AllBookViewModel>> GetAllAsync()
        {
            var books = await context.Books.Include(b => b.Category).ToListAsync();

            return books.Select(b => new AllBookViewModel()
            {
                Id = b.Id,
                Title = b.Title,
                Author = b.Author,
                Category = b?.Category?.Name,
                ImageUrl = b.ImageUrl,
                Rating = b.Rating
            });
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await context.Categories.ToListAsync(); 
        }

        public async Task<IEnumerable<AllBookViewModel>> GetMineAsync(string userId)
        {
            var user = await context.Users.Where(u => u.Id == userId)
                .Include(u => u.ApplicationUsersBooks)
                .ThenInclude(um => um.Book)
                .ThenInclude(m => m.Category)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User ID");
            }

            return user.ApplicationUsersBooks.Select(b => new AllBookViewModel()
            {
                Id = b.BookId,
                Title = b.Book.Title,
                Author = b.Book.Author,
                Description = b.Book.Description,
                ImageUrl = b.Book.ImageUrl,
                Rating = b.Book.Rating,
                Category = b.Book.Category?.Name
            });
        }

        public async Task RemoveBookFromCollectionAsync(int bookId, string userId)
        {
            var user = await context.Users.Where(u => u.Id == userId)
               .Include(u => u.ApplicationUsersBooks)
               .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User ID");
            }

            var book = user.ApplicationUsersBooks.FirstOrDefault(b => b.BookId == bookId);

            if (book != null)
            {
                user.ApplicationUsersBooks.Remove(book);
                await context.SaveChangesAsync();
            }
        }
    }
}
