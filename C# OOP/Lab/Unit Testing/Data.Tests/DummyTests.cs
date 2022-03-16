using NUnit.Framework;
using System;

[TestFixture]
public class DummyTests
{
    [Test]
    public void TakeDmgShouldWorkProperly()
    {
        Dummy dummy = new Dummy(10,10);
        dummy.TakeAttack(1);
        Assert.That(dummy.Health, Is.EqualTo(9), "TakeAttack doesn't work");
    }

    [Test]
    public void DeadDummyShouldThrowExceptionIfAttacked()
    {
        Dummy dummy = new Dummy(0, 1);
        dummy.IsDead();
        var ex = Assert.Throws<InvalidOperationException>(()=>dummy.TakeAttack(1));
        Assert.That(ex.Message, Is.EqualTo("Dummy is dead."));
    }

    [Test]
    public void DeadDummyShouldGiveXP()
    {
        Dummy dummy = new Dummy(0, 1);
        dummy.IsDead();
        Assert.That(dummy.GiveExperience(), Is.EqualTo(1), "XP on dead dummy doesn't work");
    }

    [Test]
    public void AliveDummyShouldNotGiveXP()
    {
        Dummy dummy = new Dummy(10, 10);
        var ex = Assert.Throws<InvalidOperationException>(() => dummy.GiveExperience());
        Assert.That(ex.Message, Is.EqualTo("Target is not dead."));
    }
}
