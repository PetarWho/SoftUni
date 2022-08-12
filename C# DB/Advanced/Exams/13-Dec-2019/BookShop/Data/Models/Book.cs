using BookShop.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookShop.Data.Models
{
    public class Book
    {
        public Book()
        {
            this.AuthorsBooks = new HashSet<AuthorBook>();
        }

        [Key]
        public int Id { get; set; }

        [Required, MinLength(3), MaxLength(30)]
        public string Name { get; set; }

        [Required]
        public Genre Genre { get; set; }

        [Range((double)0.01m, (double)decimal.MaxValue)]
        public decimal Price { get; set; }

        [Range(50,5000)]
        public int Pages { get; set; }

        [Required]
        public DateTime PublishedOn { get; set; }
        public ICollection<AuthorBook> AuthorsBooks { get; set; }
    }
}
