using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace CommandPattern.Core.Contracts
{
    public class CommandInterpreter : ICommandInterpreter
    {
        public string Read(string args)
        {
            string result = string.Empty;
            string[] commandArgs = args.Split();
            string commandType = commandArgs[0] + "Command";
            Type typeOfCommand = Assembly.GetCallingAssembly().GetTypes().Where(t => t.Name == commandType).FirstOrDefault();
            ICommand executable = (Activator.CreateInstance(typeOfCommand)) as ICommand;
            result = executable.Execute(commandArgs.Skip(1).ToArray());
            return result;
        }
    }
}
