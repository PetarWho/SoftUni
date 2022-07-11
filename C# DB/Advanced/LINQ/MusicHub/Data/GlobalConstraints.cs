using System;
using System.Collections.Generic;
using System.Text;

namespace MusicHub.Data
{
    public static class GlobalConstraints
    {
        //Song
        public const byte SongNameMaxLength = 20;

        //Album
        public const byte AlbumNameMaxLength = 40;

        //Performer
        public const byte PerformerFirstNameMaxLength = 20;
        public const byte PerformerLastNameMaxLength = 20;

        //Producer
        public const byte ProducerNameMaxLength = 30;

        //Writer
        public const byte WriterNameMaxLength = 20;
    }
}
