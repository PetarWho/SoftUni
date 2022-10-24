using Library.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
    public class AddBookViewModel
    {
        [Required]
        [MinLength(10), MaxLength(50)]
        public string Title { get; set; } = null!;

        [Required]
        [MinLength(5), MaxLength(50)]
        public string Author { get; set; } = null!;

        [Required]
        [MinLength(5), MaxLength(5000)]
        public string Description { get; set; } = null!;

        [Required]
        public string ImageUrl { get; set; } = null!;

        [Required]
        [Range(typeof(decimal), "0.00", "10.00", ConvertValueInInvariantCulture = true)]
        public decimal Rating { get; set; }
        public int CategoryId { get; set; }

        public IEnumerable<Category> Categories { get; set; } = new List<Category>();
    }
}
