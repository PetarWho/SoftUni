using System;

namespace MissionPrivateImpossible
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            Spy spy = new Spy();
            string result = spy.RevealPrivateMethods("MissionPrivateImpossible.Hacker");
            Console.WriteLine(result);
        }
    }
}
