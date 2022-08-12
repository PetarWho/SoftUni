﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BookShop.Data.Models
{
    public class AuthorBook
    {
        [Required, ForeignKey(nameof(Author))]
        public int AuthorId { get; set; }
        public Author Author { get; set; }

        [Required, ForeignKey(nameof(Book))]
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}
