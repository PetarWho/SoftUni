using NUnit.Framework;
using System;

namespace Tests
{
    public class DatabaseTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ArrayCapacityShouldBeExactly16Integers()
        {
            int[] data = new int[16];
            Database db = new Database(data);
            var ex = Assert.Throws<InvalidOperationException>(() => db.Add(1));
            Assert.That(ex.Message, Is.EqualTo("Array's capacity must be exactly 16 integers!"));
        }

        [Test]
        public void AddShouldAddAnElementToTheNextFreeCell()
        {
            int[] data = new int[15];
            Database db = new Database(data);
            db.Add(12);
            Assert.AreEqual(16, db.Count);
        }

        [Test]
        public void RemoveShouldRemoveAtLastIndexAndThrowExceptionIfEmpty()
        {
            int[] data = new int[2];
            Database db = new Database(data);
            db.Remove();
            Assert.AreEqual(1, db.Count);
            db.Remove();
            var ex = Assert.Throws<InvalidOperationException>(() => db.Remove());
            Assert.That(ex.Message, Is.EqualTo("The collection is empty!"));
        }

        [Test]
        public void ConstructorShouldAcceptOnlyIntsAndStoreInArray()
        {
            int[] data = new int[2];
            Database db = new Database(data);

            Assert.AreEqual(2, db.Count);
        }

        [Test]
        public void FetchShouldReturnAnArray()
        {
            int[] data = new int[2];
            Database db = new Database(data);
            int[] newdb = db.Fetch();
            Assert.AreEqual(newdb, data);
        }
    }
}