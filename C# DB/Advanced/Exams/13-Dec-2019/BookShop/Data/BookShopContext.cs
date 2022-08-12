namespace BookShop.Data
{
    using BookShop.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class BookShopContext : DbContext
    {
        public virtual DbSet<Author> Authors { get; set; }

        public virtual DbSet<Book> Books { get; set; }

        public virtual DbSet<AuthorBook> AuthorsBooks { get; set; }
        public BookShopContext() { }

        public BookShopContext(DbContextOptions options)
            : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer(Configuration.ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AuthorBook>()
                .HasKey(a => new { a.AuthorId, a.BookId });
        }
    }
}