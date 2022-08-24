namespace Trucks.DataProcessor
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;
    using Trucks.DataProcessor.ExportDto;
    using Formatting = Newtonsoft.Json.Formatting;

    public class Serializer
    {
        public static string ExportDespatchersWithTheirTrucks(TrucksContext context)
        {
            var result = context.Despatchers
                .Include(x => x.Trucks)
                .Where(d => d.Trucks.Any())
                .ToArray()
                .Select(d => new ExportDespatcherDto()
                {
                    DespatcherName = d.Name,
                    TrucksCount = d.Trucks.Count,
                    Trucks = d.Trucks.ToArray()
                    .Select(t => new ExportTruckDto()
                    {
                        RegistrationNumber = t.RegistrationNumber,
                        Make = t.MakeType.ToString()
                    })
                    .OrderBy(t => t.RegistrationNumber)
                    .ToArray()
                })
                .OrderByDescending(d => d.TrucksCount)
                .ThenBy(d => d.DespatcherName)
                .ToArray();

            return SerializerHelper(result, "Despatchers");
        }

        public static string ExportClientsWithMostTrucks(TrucksContext context, int capacity)
        {
            var result = context.Clients
                .Include(x=>x.ClientsTrucks)
                .ThenInclude(x=>x.Truck)
                .Where(c=>c.ClientsTrucks.Any(t=>t.Truck.TankCapacity >= capacity))
                .ToArray()
                .Select(c=> new
                {
                    Name = c.Name,
                    Trucks = c.ClientsTrucks.Where(t=>t.Truck.TankCapacity >= capacity)
                    .ToArray()
                        .Select(ct=> new
                        {
                            TruckRegistrationNumber = ct.Truck.RegistrationNumber,
                            VinNumber = ct.Truck.VinNumber,
                            TankCapacity = ct.Truck.TankCapacity,
                            CargoCapacity = ct.Truck.CargoCapacity,
                            CategoryType = ct.Truck.CategoryType .ToString(),
                            MakeType = ct.Truck.MakeType.ToString()
                        })
                        .OrderBy(t=>t.MakeType)
                        .ThenByDescending(t=>t.CargoCapacity)  
                })
                .OrderByDescending(c=>c.Trucks.Count())
                .ThenBy(c=>c.Name)
                .Take(10)
                .ToArray();

            return JsonConvert.SerializeObject(result, Formatting.Indented);
        }

        private static string SerializerHelper<T>(T dto, string rootName)
        {
            var sb = new StringBuilder();

            var xmlRoot = new XmlRootAttribute(rootName);
            var namespaces = new XmlSerializerNamespaces();
            namespaces.Add("", "");

            var serializer = new XmlSerializer(typeof(T), xmlRoot);

            using var writer = new StringWriter(sb);
            serializer.Serialize(writer, dto, namespaces);

            return sb.ToString().TrimEnd();
        }
    }
}
