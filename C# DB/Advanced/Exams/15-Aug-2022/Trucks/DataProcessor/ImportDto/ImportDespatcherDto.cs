using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Serialization;

namespace Trucks.DataProcessor.ImportDto
{
    [XmlType("Despatcher")]
    public class ImportDespatcherDto
    {
        [Required, MinLength(2), MaxLength(40)]
        public string Name { get; set; }
        public string Position { get; set; }

        [XmlArray]
        public ImportTruckDto[] Trucks { get; set; }
    }
}
