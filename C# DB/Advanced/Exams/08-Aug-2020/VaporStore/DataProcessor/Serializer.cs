namespace VaporStore.DataProcessor
{
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;
    using System;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using VaporStore.DataProcessor.Dto.Export;

    public static class Serializer
	{
		public static string ExportGamesByGenres(VaporStoreDbContext context, string[] genreNames)
		{
			var games = context.Genres
				.Include(g => g.Games)
				.ThenInclude(g => g.Developer)
				.Include(g => g.Games)
				.ThenInclude(g => g.Purchases)
				.Where(g => genreNames.Contains(g.Name))
				.ToArray()
				.Select(g => new
				{
					g.Id,
					Genre = g.Name,
					Games = g.Games.Where(p => p.Purchases.Any())
					.Select(gm => new
					{
						gm.Id,
						Title = gm.Name,
						Developer = gm.Developer.Name,
						Tags = string.Join(", ", gm.GameTags.Select(x=>x.Tag.Name)),
						Players = gm.Purchases.Count()
					})
					.OrderByDescending(x=>x.Players)
					.ThenBy(x=>x.Id),
					TotalPlayers = g.Games.Sum(ga => ga.Purchases.Count()),
				})
				.OrderByDescending(x=>x.TotalPlayers)
				.ThenBy(x=>x.Id)
				.ToArray();

			return JsonConvert.SerializeObject(games, Formatting.Indented);
		}

		public static string ExportUserPurchasesByType(VaporStoreDbContext context, string storeType)
		{
			var result = context.Users
					.Include(u => u.Cards)
					.ThenInclude(c => c.Purchases)
					.ThenInclude(g => g.Game)
					.Where(u => u.Cards.Any(c => c.Purchases.Any()))
					.ToArray()
					.Select(u => new ExportUserDto()
					{
						Username = u.Username,
						Purchases = u.Cards
							.SelectMany(c => c.Purchases.Where(p => p.Type.ToString().ToLower() == storeType.ToLower()))
							.Select(p => new ExportPurchaseDto()
							{
								Card = p.Card.Number,
								Cvc = p.Card.Cvc,
								Date = p.Date.ToString("yyyy-MM-dd HH:mm"),
								Game = new ExportGameDto()
								{
									Title = p.Game.Name,
									Genre = p.Game.Genre.Name,
									Price = p.Game.Price,
								}
							})
							.OrderBy(p => p.Date)
							.ToArray(),
					})
					.ToArray();

			foreach (var user in result)
			{
				user.TotalSpent = user.Purchases.Sum(p => p.Game.Price);
			}

			result = result
						.Where(u => u.Purchases.Any())
						.OrderByDescending(u => u.TotalSpent)
						.ThenBy(u => u.Username)
						.ToArray();

			return SerializerHelper(result, "Users");
		}

		private static string SerializerHelper<T>(T dto, string rootName)
		{
			var sb = new StringBuilder();

			var xmlRoot = new XmlRootAttribute(rootName);
			var namespaces = new XmlSerializerNamespaces();
			namespaces.Add("", "");

			var serializer = new XmlSerializer(typeof(T), xmlRoot);

			using var writer = new StringWriter(sb);
			serializer.Serialize(writer, dto, namespaces);

			return sb.ToString().TrimEnd();
		}
	}
}