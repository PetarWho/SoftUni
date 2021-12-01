using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SoftUniParking
{
    class Program
    {
        static void Main(string[] args)
        {
            string vipCheck = @"^\d.{7}";
            HashSet<string> vips = new HashSet<string>();
            HashSet<string> regulars = new HashSet<string>();

            string input;
            while ((input = Console.ReadLine()) != "PARTY")
            {
                Match vipMatch = Regex.Match(input, vipCheck);
                if (vipMatch.Success)
                {
                    vips.Add(input);
                }
                else
                {
                    regulars.Add(input);
                }
            }
            vips.UnionWith(regulars);
            while ((input = Console.ReadLine()) != "END")
            {
                vips.Remove(input);
            }
            Console.WriteLine(vips.Count);
            Console.WriteLine(string.Join(Environment.NewLine, vips));
        }
    }
}
