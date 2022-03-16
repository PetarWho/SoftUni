using System.Collections.Generic;
using System;

namespace Animals
{
    public class StartUp
    {
        public static void Main(string[] args)
        {
            List<Animal> animals = new List<Animal>();
            string typeOfAnimal = Console.ReadLine();
            while (typeOfAnimal != "Beast!")
            {
                string[] other = Console.ReadLine().Split(" ", StringSplitOptions.RemoveEmptyEntries);
                string name = other[0];
                int age = int.Parse(other[1]);
                string gender = other[2];
                Animal current;

                if (age > 0)
                {
                    if (typeOfAnimal == "Dog")
                        current = new Dog(name, age, gender);
                    else if (typeOfAnimal == "Cat")
                        current = new Cat(name, age, gender);
                    else if (typeOfAnimal == "Frog")
                        current = new Frog(name, age, gender);
                    else if (typeOfAnimal == "Kitten")
                        current = new Kitten(name, age);
                    else if (typeOfAnimal == "Tomcat")
                        current = new Tomcat(name, age);
                    else
                    {
                        Console.WriteLine("Invalid input!");
                        typeOfAnimal = Console.ReadLine();
                        continue;
                    }
                }
                else
                {
                    Console.WriteLine("Invalid input!");
                    typeOfAnimal = Console.ReadLine();
                    continue;
                }
                animals.Add(current);
                typeOfAnimal = Console.ReadLine();
            }
            Console.WriteLine(string.Join(Environment.NewLine, animals));
        }
    }
}
