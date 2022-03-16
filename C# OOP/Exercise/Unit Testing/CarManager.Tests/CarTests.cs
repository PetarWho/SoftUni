using CarManager;
using NUnit.Framework;
using System;

namespace Tests
{
    public class CarTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        [TestCase("Opel", "Vectra", 5, 50)]
        public void ConstructorShouldWorkProperly(string make, string model, double fuelConsumption, double fuelCapacity)
        {
            Car car = new Car(make, model, fuelConsumption, fuelCapacity);

            Assert.IsNotEmpty(car.Make);
            Assert.IsNotEmpty(car.Model);
            Assert.IsNotNull(car.FuelCapacity);
            Assert.IsNotNull(car.FuelConsumption);
        }

        [Test]
        [TestCase("Opel", "Vectra", 5, 50)]
        public void PropertiesShouldWorkProperly(string make, string model, double fuelConsumption, double fuelCapacity)
        {
            Car car = new Car(make, model, fuelConsumption, fuelCapacity);
            Assert.AreEqual(make, car.Make);
            Assert.AreEqual(model, car.Model);
            Assert.AreEqual(fuelConsumption, car.FuelConsumption);
            Assert.AreEqual(fuelCapacity, car.FuelCapacity);
        }

        [Test]
        [TestCase("Opel", "Vectra", 5, 10, 5)]

        public void RefuelShouldWorkProperly(string make, string model, double fuelConsumption, double fuelCapacity, double fuelToRefuel)
        {
            Car car = new Car(make, model, fuelConsumption, fuelCapacity);

            car.Refuel(fuelToRefuel);
            Assert.AreEqual(5, car.FuelAmount);
            Assert.That(() => car.Refuel(-2), Throws.ArgumentException, "Fuel amount cannot be zero or negative!");

        }

        [Test]
        [TestCase("Opel", "Vectra", 5, 10, 100)]

        public void DriveShouldWorkProperly(string make, string model, double fuelConsumption, double fuelCapacity, double distance)
        {
            Car car = new Car(make, model, fuelConsumption, fuelCapacity);
            car.Refuel(10);
            car.Drive(distance);
            double fuelNeededTest = (distance / 100) * fuelConsumption;
            Assert.AreEqual(fuelCapacity-fuelNeededTest, car.FuelAmount);
            Assert.That(() => car.Drive(132321), Throws.InvalidOperationException, "You don't have enough fuel to drive!");
        }
    }
}