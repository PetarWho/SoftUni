namespace Restaurant
{
    public class Coffee:HotBeverage
    {
        private const double CoffeeMilliliters = 50;
        private const decimal CoffeePrice = 3.5m;
        public double Caffeine { get; set; }
        public Coffee(string name, double caffeine):base(name, CoffeePrice, CoffeeMilliliters)
        {
            Caffeine = caffeine;
        }
    }
}
