using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Trucks.DataProcessor.ExportDto
{
    [XmlType("Despatcher")]
    public class ExportDespatcherDto
    {
        [XmlAttribute("TrucksCount")]
        public int TrucksCount { get; set; }
        public string DespatcherName { get; set; }
        [XmlArray]
        public ExportTruckDto[] Trucks { get; set; }
    }
}
