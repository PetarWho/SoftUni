﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PlayersAndMonsters
{
    public class Hero
    {
        public string Username { get; set; }
        public int Level { get; set; }

        public Hero(string name, int level)
        {
            Username= name;
            Level = level;
        }
        public override string ToString()
        {
            return $"Type: {this.GetType().Name} Username: {this.Username} Level: {this.Level}";
        }
    }
}
