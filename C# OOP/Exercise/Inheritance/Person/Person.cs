using System;
using System.Collections.Generic;
using System.Text;

namespace Inheritance
{
    public class Person
    {
        private string _name;
        private int _age;

        public Person(string name, int age)
        {
            _name = name;
            _age = age;
            
        }

        public string Name { get { return _name; } set { _name = value; } }
        public int Age { get { return _age; } set { _age = value; } }
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(String.Format("Name: {0}, Age: {1}", this.Name, this.Age));

            return sb.ToString();
        }

    }
}
