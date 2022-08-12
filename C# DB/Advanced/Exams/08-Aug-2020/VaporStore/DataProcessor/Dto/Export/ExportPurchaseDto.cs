using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Serialization;

namespace VaporStore.DataProcessor.Dto.Export
{
    [XmlType("Purchase")]
    public class ExportPurchaseDto
    {
        [Required, RegularExpression(@"^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$")]
        public string Card { get; set; }

        [Required, RegularExpression(@"^[0-9]{3}$")]
        public string Cvc { get; set; }

        [Required]
        public string Date { get; set; }

        public ExportGameDto Game { get; set; }
    }
}
