using System;
using System.Collections.Generic;
using System.Text;

namespace ValidationAttributes
{
    public class MyRangeAttribute:MyValidationAttribute
    {
        private int _minValue;
        private int _maxValue;

        public MyRangeAttribute(int minValue, int maxValue)
        {
            _minValue = minValue;
            _maxValue = maxValue;
        }
        public override bool IsValid(object obj)
        {
            int validInt = 0;
            if (int.TryParse(obj.ToString(), out validInt))
            {
                if (validInt >= _minValue && validInt <= _maxValue)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
