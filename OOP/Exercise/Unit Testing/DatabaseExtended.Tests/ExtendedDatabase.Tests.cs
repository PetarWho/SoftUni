using NUnit.Framework;
using System;

namespace Tests
{
    public class ExtendedDatabaseTests
    {

        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void AddShouldThrowExceptionIfThisUsernameOrIdIsTaken()
        {
            Person person = new Person(123456789, "Roy");
            Person person2 = new Person(123456789, "Asd");
            ExtendedDatabase db = new ExtendedDatabase();
            db.Add(person);
            var ex = Assert.Throws<InvalidOperationException>(() => db.Add(person));
            Assert.That(ex.Message, Is.EqualTo("There is already user with this username!"));
            var ex2 = Assert.Throws<InvalidOperationException>(() => db.Add(person2));
            Assert.That(ex2.Message, Is.EqualTo("There is already user with this Id!"));
        }

        [Test]
        public void RemoveShouldThrowExceptionIfListIsEmpty()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            var ex = Assert.Throws<InvalidOperationException>(() => db.Remove());
            Assert.That(ex.Message, Is.EqualTo(ex.Message));
        }

        [Test]
        public void FindByUsernameShouldThrowExceptionIfNotFound()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            db.Add(person);
            var ex = Assert.Throws<InvalidOperationException>(() => db.FindByUsername("Asd"));
            Assert.That(ex.Message, Is.EqualTo("No user is present by this username!"));
        }

        [Test]
        public void FindByUsernameShouldThrowExceptionIfNull()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            db.Add(person);
            var ex = Assert.Throws<ArgumentNullException>(() => db.FindByUsername(null));
            Assert.That(ex.Message.Contains("Username parameter is null!"));
        }

        [Test]
        public void FindByUsernameIsCaseSensitive()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            db.Add(person);
            var ex = Assert.Throws<InvalidOperationException>(() => db.FindByUsername("roy"));
            Assert.That(ex.Message, Is.EqualTo("No user is present by this username!"));
            Assert.AreEqual(person, db.FindByUsername("Roy"));
        }

        [Test]
        public void FindByIdShouldThrowExceptionIfNotFound()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            var ex = Assert.Throws<InvalidOperationException>(() => db.FindById(123123123));
            Assert.That(ex.Message, Is.EqualTo("No user is present by this ID!"));
        }

        [Test]
        public void FindByIdShouldThrowExceptionIfNegative()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase();
            var ex = Assert.Throws<ArgumentOutOfRangeException>(() => db.FindById(-123123123));
            Assert.That(ex.Message.Contains("Id should be a positive number!"));
        }

        [Test]
        public void ConstructorShouldWorkProperly()
        {
            Person person = new Person(123456789, "Roy");
            ExtendedDatabase db = new ExtendedDatabase(person);
            Assert.AreEqual(db.FindByUsername("Roy"), person);
        }

    }
}