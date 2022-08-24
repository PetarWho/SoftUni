namespace Trucks.DataProcessor
{
    using Data;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Trucks.Data.Models;
    using Trucks.Data.Models.Enums;
    using Trucks.DataProcessor.ImportDto;

    public class Deserializer
    {
        private const string ErrorMessage = "Invalid data!";

        private const string SuccessfullyImportedDespatcher
            = "Successfully imported despatcher - {0} with {1} trucks.";

        private const string SuccessfullyImportedClient
            = "Successfully imported client - {0} with {1} trucks.";

        public static string ImportDespatcher(TrucksContext context, string xmlString)
        {
            var dtos = XmlDeserializer<ImportDespatcherDto[]>(xmlString, "Despatchers");
            var sb = new StringBuilder();

            var despatchers = new List<Despatcher>();

            foreach (var dto in dtos)
            {
                if (!IsValid(dto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                if(dto.Position == null || dto.Name == null || dto.Position == "" || dto.Name == "")
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                var despatcher = new Despatcher()
                {
                    Name = dto.Name,
                    Position = dto.Position.ToString()
                };

                foreach (var truckDto in dto.Trucks)
                {
                    if (!IsValid(truckDto))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }
                    if(truckDto.MakeType<0 || truckDto.MakeType > 4 || truckDto.CategoryType < 0 || truckDto.CategoryType > 3)
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    if(truckDto.RegistrationNumber == null || truckDto.RegistrationNumber == "")
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    despatcher.Trucks.Add(new Truck()
                    {
                        RegistrationNumber = truckDto.RegistrationNumber,
                        VinNumber = truckDto.VinNumber,
                        CargoCapacity = truckDto.CargoCapacity,
                        TankCapacity = truckDto.TankCapacity,
                        CategoryType = (CategoryType)truckDto.CategoryType,
                        MakeType = (MakeType)truckDto.MakeType
                    });
                }
                despatchers.Add(despatcher);
                sb.AppendLine(String.Format(SuccessfullyImportedDespatcher, despatcher.Name, despatcher.Trucks.Count));
            }
            context.AddRange(despatchers);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }
        public static string ImportClient(TrucksContext context, string jsonString)
        {
            var dtos = JsonConvert.DeserializeObject<ImportClientDto[]>(jsonString);
            var sb = new StringBuilder();

            var clients = new List<Client>();

            foreach (var dto in dtos)
            {
                if (!IsValid(dto))
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }
                if(dto.Name == null || dto.Nationality == null || dto.Name == "" || dto.Nationality == "" || dto.Type == "usual")
                {
                    sb.AppendLine(ErrorMessage);
                    continue;
                }

                var client = new Client()
                {
                    Name = dto.Name,
                    Nationality = dto.Nationality,
                    Type = dto.Type
                };

                var trucks = context.Trucks.ToArray();

                foreach (var truckDto in dto.Trucks.Distinct())
                {
                    if(!trucks.Any(t=>t.Id == truckDto))
                    {
                        sb.AppendLine(ErrorMessage);
                        continue;
                    }

                    client.ClientsTrucks.Add(new ClientTruck()
                    {
                        Client = client,
                        Truck = trucks.FirstOrDefault(t=> t.Id == truckDto)
                    });
                }

                clients.Add(client);
                sb.AppendLine(String.Format(SuccessfullyImportedClient, client.Name, client.ClientsTrucks.Count));
            }
            context.AddRange(clients);
            context.SaveChanges();

            return sb.ToString().TrimEnd();
        }

        private static bool IsValid(object dto)
        {
            var validationContext = new ValidationContext(dto);
            var validationResult = new List<ValidationResult>();

            return Validator.TryValidateObject(dto, validationContext, validationResult, true);
        }

        private static T XmlDeserializer<T>(string inputXml, string rootName)
        {
            var xmlRoot = new XmlRootAttribute(rootName);
            var serializer = new XmlSerializer(typeof(T), xmlRoot);

            using StringReader reader = new StringReader(inputXml);

            T dtos = (T)serializer.Deserialize(reader);

            return dtos;
        }
    }
}
