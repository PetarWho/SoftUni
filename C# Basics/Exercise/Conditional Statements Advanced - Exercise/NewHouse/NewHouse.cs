using System;

namespace NewHouse
{
    class NewHouse
    {
        static void Main(string[] args)
        {
            string flowersType = Console.ReadLine();
            int flowersAmount = int.Parse(Console.ReadLine());
            int budget = int.Parse(Console.ReadLine());

            double price = 0;

            switch (flowersType)
            {
                case "Roses":
                    price = 5;
                    if (flowersAmount > 80)
                    {
                        price *= 0.90;
                    }
                    break;
                case "Dahlias":
                    price = 3.80;
                    if (flowersAmount > 90)
                    {
                        price *= 0.85;
                    }
                    break;
                case "Tulips":
                    price = 2.80;
                    if (flowersAmount > 80)
                    {
                        price *= 0.85;
                    }
                    break;
                case "Narcissus":
                    price = 3;
                    if (flowersAmount < 120)
                    {
                        price *= 1.15;
                    }
                    break;
                case "Gladiolus":
                    price = 2.50;
                    if (flowersAmount < 80)
                    {
                        price *= 1.20;
                    }
                    break;
            }
            double totalPrice = price * flowersAmount;
            double diffInBudget = Math.Abs(totalPrice - budget);
            Console.WriteLine(totalPrice <= budget ? $"Hey, you have a great garden with {flowersAmount} {flowersType} and {diffInBudget:f2} leva left." : $"Not enough money, you need {diffInBudget:f2} leva more.");
        }
    }
}
