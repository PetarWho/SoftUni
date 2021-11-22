using NUnit.Framework;
using System;

[TestFixture]
public class AxeTests
{
    [Test]
    public void AxeShouldLoseDurabilityAfterAttack()
    {
        Axe axe = new Axe(10,10);
        Dummy dummy = new Dummy(10,10);
        axe.Attack(dummy);
        Assert.That(axe.DurabilityPoints, Is.EqualTo(9), "Axe Durability doesn't change after attack");
    }

    [Test]
    public void BrokenAxeShouldThrowExceptionOnAttack()
    {
        Axe axe = new Axe(1, 0);
        Dummy dummy = new Dummy(10, 10);
        var ex = Assert.Throws<InvalidOperationException>(() => axe.Attack(dummy));
        Assert.That(ex.Message, Is.EqualTo("Axe is broken."));
    }
}