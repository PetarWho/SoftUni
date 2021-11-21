using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Collector
{
    public class Spy
    {
        public string CollectGetterAndSetters(string fileToInvestigate)
        {
            StringBuilder sb = new StringBuilder();
            Type classType = Type.GetType(fileToInvestigate);
            MethodInfo[] classMethods = classType.GetMethods(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);
            foreach (var method in classMethods.Where(m=> m.Name.Contains("get")))
            {
                sb.AppendLine($"{method.Name} will return {method.ReturnType}");
            }
            foreach (var method in classMethods.Where(m => m.Name.Contains("set")))
            {
                sb.AppendLine($"{method.Name} will set field of {method.GetParameters().First().ParameterType}");
            }
            return sb.ToString().Trim();
        }
    }
}
