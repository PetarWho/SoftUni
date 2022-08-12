namespace BookShop.DataProcessor
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using BookShop.Data.Models;
    using BookShop.Data.Models.Enums;
    using BookShop.DataProcessor.ImportDto;
    using Data;
    using Newtonsoft.Json;
    using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedBook
            = "Successfully imported book {0} for {1:F2}.";

        private const string SuccessfullyImportedAuthor
            = "Successfully imported author - {0} with {1} books.";

        public static string ImportBooks(BookShopContext context, string xmlString)
        {
            var booksDto = XmlDeserializer<List<ImportBookDto>>("Books", xmlString);
            var books = new List<Book>();
            var sb = new StringBuilder();

            foreach (var bookDto in booksDto)
            {
                if (!IsValid(bookDto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                var isValidDate = DateTime.TryParseExact(bookDto.PublishedOn, "MM/dd/yyyy", CultureInfo.InvariantCulture,
                    DateTimeStyles.None, out DateTime publisedDate);

                if (!isValidDate)
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                books.Add(new Book()
                {
                    Name = bookDto.Name,
                    Genre = (Genre)bookDto.Genre,
                    Pages = bookDto.Pages,
                    Price = bookDto.Price,
                    PublishedOn = publisedDate
                });
                sb.AppendLine(String.Format(SuccessfullyImportedBook,bookDto.Name, bookDto.Price));
            }

            context.AddRange(books);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        public static string ImportAuthors(BookShopContext context, string jsonString)
        {
            var authorDtos = JsonConvert.DeserializeObject<List<ImportAuthorDto>>(jsonString);
            var existingEmails = context.Authors.Select(a => a.Email).ToHashSet();
            var existingBookId = context.Books.Select(b => b.Id).ToHashSet();

            var authors = new List<Author>();
            var sb = new StringBuilder();

            foreach (var authorDto in authorDtos)
            {
                if (!IsValid(authorDto) || existingEmails.Contains(authorDto.Email))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                existingEmails.Add(authorDto.Email);

                var author = new Author()
                {
                    FirstName = authorDto.FirstName,
                    LastName = authorDto.LastName,
                    Email = authorDto.Email,
                    Phone = authorDto.Phone
                };

                foreach (var book in authorDto.Books)
                {
                    if(book.Id !=null && existingBookId.Contains((int)book.Id))
                    {
                        author.AuthorsBooks.Add(new AuthorBook
                        {
                            Author = author,
                            BookId = (int)book.Id
                        });
                    }
                }
                if (!author.AuthorsBooks.Any())
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }
                authors.Add(author);
                sb.AppendLine(String.Format(SuccessfullyImportedAuthor, $"{author.FirstName} {author.LastName}", author.AuthorsBooks.Count));
            }

            context.AddRange(authors);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }

        private static T XmlDeserializer<T>(string rootTag, string inputXml)
        {
            XmlRootAttribute root = new XmlRootAttribute(rootTag);
            XmlSerializer serializer = new XmlSerializer(typeof(T), root);

            T dtos;

            using (StringReader reader = new StringReader(inputXml))
            {
                dtos = (T)serializer.Deserialize(reader);
            }

            return dtos;
        }
    }
}