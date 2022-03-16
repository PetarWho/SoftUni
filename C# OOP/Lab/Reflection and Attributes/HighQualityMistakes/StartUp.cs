using System;

namespace HighQualityMistakes
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            Spy spy = new Spy();
            string result = spy.AnalyzeAccessModifiers("HighQualityMistakes.Hacker");
            Console.WriteLine(result); ;
        }
    }
}
