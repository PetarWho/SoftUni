using System;

namespace AuthorProblem
{
    [Author("Ivan")]
    public class StartUp
    {
        [Author("Victor")]
        public static void Main(string[] args)
        {
            var tracker = new Tracker();
            tracker.PrintMethodsByAuthor();
        }
    }
}