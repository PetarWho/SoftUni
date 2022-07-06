using System;
using System.Collections.Generic;
using System.Text;

namespace P03_FootballBetting.Data.Common
{
    public static class GlobalConstraints
    {
        //Team
        public const int TeamNameMaxLength = 50;
        public const int TeamInitialsMaxLength = 4;
        public const int TeamLogoUrlMaxLength = 255;

        //Color
        public const int ColorNameMaxLength = 20;

        //Town
        public const int TownNameMaxLength = 100;

        //Country
        public const int CountryNameMaxLength = 50;

        //Player
        public const int PlayerNameMaxLength = 100;

        //Position
        public const int PositionNameMaxLenght = 30;

        //Game
        public const int GameResultFormatMaxLength = 10;

        //User
        public const int UserUsernameMaxLength = 30;
        public const int UserPasswordMaxLength = 256;
        public const int UserEmailMaxLength = 320;
        public const int UserNameMaxLength = 100;
    }
}
