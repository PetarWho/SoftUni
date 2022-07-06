namespace P01_StudentSystem.Data.Common
{
    public static class GlobalConstraints
    {
        //Student
        public const byte StudentNameMaxLength = 100;
        public const byte StudentPhoneNumberFixedLength = 10;

        //Course
        public const byte CourseNameMaxLength = 80;

        //Resource
        public const byte ResourceNameMaxLength = 50;
    }
}
