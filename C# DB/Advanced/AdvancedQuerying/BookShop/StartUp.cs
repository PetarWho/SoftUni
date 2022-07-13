namespace BookShop
{
    using Data;
    using BookShop.Models.Enums;
    using System;
    using System.Globalization;
    using System.Linq;
    using System.Text;
    using Microsoft.EntityFrameworkCore;

    public class StartUp
    {
        public static void Main()
        {
            using var db = new BookShopContext();
            //DbInitializer.ResetDatabase(db);


            //Console.WriteLine(GetBooksByAgeRestriction(db, "adult"));
            //Console.WriteLine(GetGoldenBooks(db));
            //Console.WriteLine(GetBooksByPrice(db));
            //Console.WriteLine(GetBooksNotReleasedIn(db, 2000));
            //Console.WriteLine(GetBooksByCategory(db, "horror mystery drama"));
            //Console.WriteLine(GetBooksReleasedBefore(db, "12-04-1992"));
            //Console.WriteLine(GetAuthorNamesEndingIn(db,"e"));
            //Console.WriteLine(GetBookTitlesContaining(db,"sK"));
            //Console.WriteLine(GetBooksByAuthor(db, "R"));
            //Console.WriteLine(CountBooks(db, 12));
            //Console.WriteLine(CountCopiesByAuthor(db));
            //Console.WriteLine(GetTotalProfitByCategory(db));
            //Console.WriteLine(GetTotalProfitByCategory(db));
            //Console.WriteLine(GetMostRecentBooks(db));
            //IncreasePrices(db);
            RemoveBooks(db);
        }

        public static string GetBooksByAgeRestriction(BookShopContext context, string command)
        {
            var ageRestrict = (AgeRestriction)Enum.Parse(typeof(AgeRestriction), command, true);

            var books = context.Books
                .Where(b => b.AgeRestriction == ageRestrict)
                .OrderBy(b => b.Title)
                .Select(b => b.Title)
                .ToList();

            return String.Join(Environment.NewLine, books);
        }

        public static string GetGoldenBooks(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.EditionType == EditionType.Gold)
                .Where(b => b.Copies < 5000)
                .OrderBy(b => b.BookId)
                .Select(b => b.Title)
                .ToList();

            return String.Join(Environment.NewLine, books);
        }

        public static string GetBooksByPrice(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.Price > 40)
                .OrderByDescending(b => b.Price)
                .Select(b => $"{b.Title} - ${b.Price:f2}")
                .ToList();

            return String.Join(Environment.NewLine, books);
        }

        public static string GetBooksNotReleasedIn(BookShopContext context, int year)
        {
            var books = context.Books
                .Where(b => b.ReleaseDate.HasValue && b.ReleaseDate.Value.Year != year)
                .OrderBy(b => b.BookId);

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine(book.Title);
            }

            return sb.ToString().Trim();
        }

        public static string GetBooksByCategory(BookShopContext context, string input)
        {
            var categories = input
                .Split(" ", StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.ToLower()).ToArray();

            var books = context.Books
                .Where(b => b.BookCategories
                    .Any(bc => b.BookCategories
                        .Any(bc => categories.Any(c => c == bc.Category.Name.ToLower()))))
                .Select(b => b.Title)
                .OrderBy(t => t)
                .ToList();

            return String.Join(Environment.NewLine, books);
        }

        public static string GetBooksReleasedBefore(BookShopContext context, string date)
        {
            var dateTime = DateTime.ParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            var books = context.Books.
                Where(b => b.ReleaseDate < dateTime)
                .OrderByDescending(b => b.ReleaseDate)
                .ToList();

            var sb = new StringBuilder();

            foreach (var book in books)
            {
                sb.AppendLine($"{book.Title} - {book.EditionType.ToString()} - ${book.Price:f2}");
            }
            return sb.ToString().Trim();
        }

        public static string GetAuthorNamesEndingIn(BookShopContext context, string input)
        {
            var authors = context.Authors
                .Where(a => a.FirstName.EndsWith(input))
                .OrderBy(a => a.FirstName)
                .ThenBy(a => a.LastName)
                .Select(a => $"{a.FirstName} {a.LastName}")
                .ToList();

            return String.Join(Environment.NewLine, authors);
        }

        public static string GetBookTitlesContaining(BookShopContext context, string input)
        {
            var books = context.Books
                .Where(b => b.Title.ToLower().Contains(input.ToLower()))
                .Select(b => b.Title)
                .OrderBy(b => b);

            return String.Join(Environment.NewLine, books);
        }

        public static string GetBooksByAuthor(BookShopContext context, string input)
        {
            var books = context.Books
                .Include(x => x.Author)
                .Where(b => b.Author.LastName.ToLower().StartsWith(input.ToLower()))
                .OrderBy(b => b.BookId)
                .Select(b => $"{b.Title} ({b.Author.FirstName} {b.Author.LastName})")
                .ToList();

            return String.Join(Environment.NewLine, books);
        }

        public static int CountBooks(BookShopContext context, int lengthCheck)
        {
            return context.Books
                .Where(b => b.Title.Length > lengthCheck)
                .Count();
        }

        public static string CountCopiesByAuthor(BookShopContext context)
        {
            var authorsCopies = context.Authors
                .Include(x => x.Books)
                .Select(a => new { a.FirstName, a.LastName, Copies = a.Books.Sum(b => b.Copies) })
                .OrderByDescending(a => a.Copies)
                .Select(a => $"{a.FirstName} {a.LastName} - {a.Copies}")
                .ToList();

            return String.Join(Environment.NewLine, authorsCopies);
        }

        public static string GetTotalProfitByCategory(BookShopContext context)
        {
            var categoriesProfits = context.Categories
                .Include(x => x.CategoryBooks)
                .Select(c => new { c.Name, Profit = c.CategoryBooks.Sum(cb => cb.Book.Price * cb.Book.Copies) })
                .OrderByDescending(c => c.Profit)
                .Select(c => $"{c.Name} ${c.Profit:f2}")
                .ToList();

            return String.Join(Environment.NewLine, categoriesProfits);
        }

        public static string GetMostRecentBooks(BookShopContext context)
        {
            var categories = context.Categories
                .Include(x => x.CategoryBooks)
                .Select(c => new
                {
                    c.Name,
                    Books = c.CategoryBooks.Select(cb => new
                    {
                        cb.Book.Title,
                        cb.Book.ReleaseDate
                    })
                    .OrderByDescending(cb => cb.ReleaseDate)
                    .Take(3)
                })
                .OrderBy(c => c.Name)
                .ToList();

            var sb = new StringBuilder();

            foreach (var category in categories)
            {
                sb.AppendLine($"--{category.Name}");
                foreach (var book in category.Books)
                {
                    sb.AppendLine($"{book.Title} ({book.ReleaseDate.Value.Year})");
                }
            }

            return sb.ToString().Trim();
        }

        public static void IncreasePrices(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.ReleaseDate.Value.Year < 2010);

            books.ForEachAsync(b => b.Price += 5);
            context.SaveChanges();
        }

        public static int RemoveBooks(BookShopContext context)
        {
            var books = context.Books
                .Where(b => b.Copies < 4200);

            int count = books.Count();

            context.RemoveRange(books);
            context.SaveChanges();

            return count;
        }
    }
}
