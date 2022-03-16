using System;
using System.Collections.Generic;
using System.Linq;

namespace ProductShop
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<string, Dictionary<string, double>> foodShops = new Dictionary<string, Dictionary<string, double>>();
            string input;
            while ((input = Console.ReadLine()) != "Revision")
            {
                string[] splitted = input.Split(", ");
                string shop = splitted[0];
                string product = splitted[1];
                double price = double.Parse(splitted[2]);

                if (!foodShops.ContainsKey(shop))
                {
                    foodShops.Add(shop, new Dictionary<string, double>());
                }
                foodShops[shop].Add(product, price);

            }
            foreach (var shop in foodShops.OrderBy(x => x.Key))
            {
                Console.WriteLine(shop.Key + "->");
                foreach (var item in shop.Value)
                {
                    Console.WriteLine($"Product: {item.Key}, Price: {item.Value}");
                }
            }
        }
    }
}
