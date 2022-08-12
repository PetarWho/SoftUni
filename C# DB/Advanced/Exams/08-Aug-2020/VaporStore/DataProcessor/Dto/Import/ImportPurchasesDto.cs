using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Serialization;

namespace VaporStore.DataProcessor.Dto.Import
{
    [XmlType("Purchase")]
    public class ImportPurchasesDto
    {
        [Required, XmlAttribute("title")]
        public string Title { get; set; }

        [Required]
        public string Type { get; set; }
        [Required]
        public string Key { get; set; }
        [Required]
        public string Card { get; set; }
        [Required]
        public string Date { get; set; }

    }
}
