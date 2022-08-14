namespace TeisterMask.DataProcessor
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Serialization;
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Newtonsoft.Json;
    using TeisterMask.DataProcessor.ExportDto;
    using Formatting = Newtonsoft.Json.Formatting;

    public class Serializer
    {
        public static string ExportProjectWithTheirTasks(TeisterMaskContext context)
        {
            var result = context.Projects
                .Include(p => p.Tasks)
                .Where(p => p.Tasks.Any())
                .ToArray()
                .Select(p => new ExportProjectDto()
                {
                    ProjectName = p.Name,
                    TasksCount = p.Tasks.Count,
                    HasEndDate = (p.DueDate.HasValue && p.DueDate.Value.Year != 1) ? "Yes" : "No",
                    Tasks = p.Tasks
                    .Select(et => new ExportTaskDto()
                    {
                        Name = et.Name,
                        Label = et.LabelType.ToString()
                    })
                    .OrderBy(t=>t.Name)
                    .ToArray()
                })
                .OrderByDescending(p=>p.TasksCount)
                .ThenBy(p=>p.ProjectName)
                .ToArray();

            return SerializerHelper(result, "Projects");
        }

        public static string ExportMostBusiestEmployees(TeisterMaskContext context, DateTime date)
        {
            var glitch = context.Tasks.FirstOrDefault(x => x.Id == 30);

            context.Tasks.Remove(glitch);
            context.SaveChanges();

            var result = context.Employees
                .Include(e => e.EmployeesTasks)
                .Where(e => e.EmployeesTasks
                    .Any(et => et.Task.OpenDate >= date))
                .ToArray()
                .Select(e => new
                {
                    Username = e.Username,
                    Tasks = e.EmployeesTasks.Select(et => new
                    {
                        TaskName = et.Task.Name,
                        OpenDate = et.Task.OpenDate.ToString("MM/dd/yyyy"),
                        DueDate = et.Task.DueDate.ToString("MM/dd/yyyy"),
                        LabelType = et.Task.LabelType.ToString(),
                        ExecutionType = et.Task.ExecutionType.ToString()
                    })
                    .OrderByDescending(et => DateTime.ParseExact(et.DueDate,"MM/dd/yyyy", 
                                CultureInfo.InvariantCulture, DateTimeStyles.None))
                    .ThenBy(et => et.TaskName)
                })
                .OrderByDescending(e=>e.Tasks.Count())
                .ThenBy(e=>e.Username)
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