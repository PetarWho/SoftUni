using System;
using System.Collections.Generic;
using System.Text;

namespace CommandPattern.Core.Contracts
{
    class Engine : IEngine
    {
        private readonly ICommandInterpreter _command;
        public Engine(ICommandInterpreter command)
        {
            _command = command;
        }

        public void Run()
        {
            string engine;
            while (true)
            {
                engine = _command.Read(Console.ReadLine());
                if (engine == null)
                    break;
                Console.WriteLine(engine);
            }
        }
    }
}
