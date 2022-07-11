using Microsoft.EntityFrameworkCore;

namespace MusicHub
{
    using System;
    using System.Linq;
    using System.Text;
    using Data;
    using Initializer;

    public class StartUp
    {
        public static void Main(string[] args)
        {
            MusicHubDbContext context =
                new MusicHubDbContext();

            //DbInitializer.ResetDatabase(context);

            //Test your solutions here
            Console.WriteLine(ExportSongsAboveDuration(context, 4));
        }

        public static string ExportAlbumsInfo(MusicHubDbContext context, int producerId)
        {
            var albums = context.Albums
                .Include(x => x.Producer)
                .Include(x => x.Songs)
                .ThenInclude(x => x.Writer)
                .Where(x => x.ProducerId == producerId).ToList();

            StringBuilder sb = new StringBuilder();


            foreach (var album in albums.OrderByDescending(a => a.Price))
            {
                sb.AppendLine($"-AlbumName: {album.Name}");
                sb.AppendLine($"-ReleaseDate: {album.ReleaseDate.ToString("MM/dd/yyyy")}");
                sb.AppendLine($"-ProducerName: {album.Producer.Name}");
                sb.AppendLine($"-Songs:");
                int currentSongNumber = 1;
                foreach (var song in album.Songs.OrderByDescending(s => s.Name).ThenBy(s => s.Writer.Name))
                {
                    sb.AppendLine($"---#{currentSongNumber}");
                    sb.AppendLine($"---SongName: {song.Name}");
                    sb.AppendLine($"---Price: {song.Price:f2}");
                    sb.AppendLine($"---Writer: {song.Writer.Name}");
                    currentSongNumber++;
                }
                sb.AppendLine($"-AlbumPrice: {album.Price:f2}");
            }
            return sb.ToString().Trim();
        }

        public static string ExportSongsAboveDuration(MusicHubDbContext context, int duration)
        {
            var durationTimeSpan = TimeSpan.FromSeconds(duration);

            var songs = context.Songs
                .Where(x => x.Duration > durationTimeSpan)
                .Select(s => new
                {
                    s.Name,
                    Performer = s.SongPerformers
                        .Select(sp => sp.Performer.FirstName + " " + sp.Performer.LastName)
                        .FirstOrDefault(),
                    Writer = s.Writer.Name,
                    AlbumProducer = s.Album.Producer.Name,
                    s.Duration,
                })
                .OrderBy(x => x.Name)
                    .ThenBy(x => x.Writer)
                    .ThenBy(x => x.Performer)
                    .ToList();

            var sb = new StringBuilder();
            int currentSongNumber = 1;

            foreach (var song in songs)
            {
                sb.AppendLine($"-Song #{currentSongNumber}");
                sb.AppendLine($"---SongName: {song.Name}");
                sb.AppendLine($"---Writer: {song.Writer}");
                sb.AppendLine($"---Performer: {song.Performer}");
                sb.AppendLine($"---AlbumProducer: {song.AlbumProducer}");
                sb.AppendLine($"---Duration: {song.Duration:c}");

                currentSongNumber++;
            }

            return sb.ToString().Trim();
        }
    }
}
