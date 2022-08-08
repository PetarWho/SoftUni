using System.Xml.Serialization;

namespace Footballers.DataProcessor.ExportDto
{
    [XmlType("Coach")]
    public class CoachExportDto
    {
        public string CoachName { get; set; }

        [XmlArray("Footballers")]
        public ExportFootballerDto[] Footballers { get; set; }

        [XmlAttribute]
        public int FootballersCount { get; set; }
    }
}
