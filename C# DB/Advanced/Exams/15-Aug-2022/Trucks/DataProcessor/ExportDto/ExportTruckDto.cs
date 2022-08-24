﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Trucks.DataProcessor.ExportDto
{
    [XmlType("Truck")]
    public class ExportTruckDto
    {
        public string RegistrationNumber { get; set; }
        public string Make { get; set; }
    }
}
