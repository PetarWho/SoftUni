using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace HighQualityMistakes
{
    public class Spy
    {
        public string AnalyzeAccessModifiers(string classToInvestigate)
        {
            StringBuilder sb = new StringBuilder();

            Type classType = Type.GetType(classToInvestigate);
            FieldInfo[] classFields = classType.GetFields(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public);
            MethodInfo[] classPublicMethods = classType.GetMethods(BindingFlags.Instance | BindingFlags.Public);
            MethodInfo[] classNonPublicMethods = classType.GetMethods(BindingFlags.Instance | BindingFlags.NonPublic);

            foreach (var field in classFields)
            {
                sb.AppendLine($"{field.Name} must be private!");
            }
            foreach (var publicMethod in classPublicMethods.Where(n => n.Name.StartsWith("set")))
            {
                sb.AppendLine($"{publicMethod.Name} have be private!");
            }
            foreach (var privateMethod in classNonPublicMethods.Where(n => n.Name.StartsWith("get")))
            {
                sb.AppendLine($"{privateMethod.Name} have be public!");
            }
            return sb.ToString();
        }
    }
}
