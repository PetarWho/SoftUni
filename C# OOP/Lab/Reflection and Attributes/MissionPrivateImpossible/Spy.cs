using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MissionPrivateImpossible
{
    public class Spy
    {
        public string RevealPrivateMethods(string className)
        {
            StringBuilder sb = new StringBuilder();
            Type classType = Type.GetType(className);
            MethodInfo[] classMethods = classType.GetMethods(BindingFlags.NonPublic | BindingFlags.Instance);
            sb.AppendLine($"All Private Methods of Class: {className}");
            sb.AppendLine($"Base Class: {classType.BaseType.Name}");

            foreach (var method in classMethods)
            {
                sb.AppendLine(method.Name);
            }
            return sb.ToString();
        }
    }
}
