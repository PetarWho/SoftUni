using SoftUni.Data;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using SoftUni.Models;
using System.Globalization;

namespace SoftUni
{
    public class StartUp
    {
        static void Main(string[] args)
        {
            using SoftUniContext softUniContext = new SoftUniContext();

            //string problem03 = GetEmployeesFullInformation(softUniContext); //Problem 03
            //string problem04 = GetEmployeesWithSalaryOver50000(softUniContext); //Problem 04
            //string problem05 = GetEmployeesFromResearchAndDevelopment(softUniContext); //Problem 05
            //string problem06 = AddNewAddressToEmployee(softUniContext); //Problem 06
            //string problem07 = GetEmployeesInPeriod(softUniContext); //Problem 07
            //string problem08 = GetAddressesByTown(softUniContext); //Problem 08
            //string problem09 = GetEmployee147(softUniContext); //Problem 09
            //string problem10 = GetDepartmentsWithMoreThan5Employees(softUniContext); //Problem 10
            //string problem11 = GetLatestProjects(softUniContext); //Problem 11
            //string problem12 = IncreaseSalaries(softUniContext); //Problem 12
            //string problem13 = GetEmployeesByFirstNameStartingWithSa(softUniContext); //Problem 13
            //string problem14 = DeleteProjectById(softUniContext); //Problem 14
            string problem15 = RemoveTown(softUniContext); //Problem 15

            Console.WriteLine(problem15);
        }

        #region Problem 03

        public static string GetEmployeesFullInformation(SoftUniContext context)
        {
            var employees = context.Employees.ToList();

            StringBuilder sb = new StringBuilder();

            foreach (var employee in employees.OrderBy(e=>e.EmployeeId))
            {
                sb.AppendLine($"{employee.FirstName} {employee.LastName} {employee.MiddleName} {employee.JobTitle} {employee.Salary:f2}");
            }

            return sb.ToString().TrimEnd();
        }

        #endregion

        #region Problem 04

        public static string GetEmployeesWithSalaryOver50000(SoftUniContext context)
        {
            var employees = context.Employees.Where(e => e.Salary > 50000);

            StringBuilder sb = new StringBuilder();

            foreach (var employee in employees.OrderBy(e=>e.FirstName))
            {
                sb.AppendLine($"{employee.FirstName} - {employee.Salary:f2}");
            }
            return sb.ToString().TrimEnd();
        }

        #endregion

        #region Problem 05

        public static string GetEmployeesFromResearchAndDevelopment(SoftUniContext context)
        {

           var employees = context.Employees
                .Include(x => x.Department)
                .Where(x => x.Department.Name == "Research and Development")
                .OrderBy(x => x.Salary)
                .ThenByDescending(x => x.FirstName)
                .ToList();

            var sb = new StringBuilder();
            foreach (var employee in employees)
            {
                sb.AppendLine($"{employee.FirstName} {employee.LastName} from {employee.Department.Name} - ${employee.Salary:f2}");
            }
            sb.ToString().TrimEnd();

            return sb.ToString();
        }

        #endregion

        #region Problem 06

        public static string AddNewAddressToEmployee(SoftUniContext context)
        {
            var employee = context.Employees.FirstOrDefault(x => x.LastName == "Nakov");
            var address = new Address()
            {
                AddressText = "Vitoshka 15",
                TownId = 4
            };

            context.Addresses.Add(address);
            context.SaveChanges();

            employee.AddressId = address.AddressId;
            context.SaveChanges();

            var addresses = context.Employees
                .OrderByDescending(a => a.AddressId)
                .Take(10)
                .Select(a=>a.Address.AddressText);

            StringBuilder sb = new StringBuilder();

            return string.Join(Environment.NewLine, addresses);
        }

        #endregion

        #region Problem 07

        public static string GetEmployeesInPeriod(SoftUniContext context)
        {
            var employees = context.Employees
                .Include(x => x.Manager)
                .Include(x => x.EmployeesProjects)
                .ThenInclude(x => x.Project)
                .Where(e => e.EmployeesProjects.Any(x => x.Project.StartDate.Year >= 2001 && x.Project.StartDate.Year <= 2003))
                .Take(10);

            StringBuilder sb = new StringBuilder();

            foreach (var employee in employees)
            {
                sb.AppendLine($"{employee.FirstName} {employee.LastName} - Manager: {employee.Manager.FirstName} {employee.Manager.LastName}");

                foreach (var project in employee.EmployeesProjects)
                {
                    sb.AppendLine(String.Format("--{0} - {1} - {2}",
                        project.Project.Name,
                        project.Project.StartDate.ToString("M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture),
                        project.Project.EndDate.HasValue ? project.Project.EndDate.Value.ToString("M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture) : "not finished"));
                }
            }
            return sb.ToString().TrimEnd();
        }

        #endregion

        #region Problem 08

        public static string GetAddressesByTown(SoftUniContext context)
        {
            var addresses = context.Addresses
                                .Include(x => x.Town)
                                .Include(x => x.Employees)
                                .OrderByDescending(x => x.Employees.Count())
                                .ThenBy(x => x.Town.Name)
                                .ThenBy(x => x.AddressText)
                                .Take(10)
                                .ToList();

            return String.Join(Environment.NewLine,
                    addresses.Select(x =>$"{x.AddressText}, {x.Town.Name} - {x.Employees.Count()} employees"));
        }

        #endregion

        #region Problem 09

        public static string GetEmployee147(SoftUniContext context)
        {
            var employee = context.Employees
                .Include(x => x.EmployeesProjects)
                .ThenInclude(x => x.Project)
                .FirstOrDefault(x => x.EmployeeId == 147);

            var sb = new StringBuilder();

            sb.AppendLine($"{employee.FirstName} {employee.LastName} - {employee.JobTitle}");

            foreach (var item in employee.EmployeesProjects.OrderBy(x=>x.Project.Name))
            {
                sb.AppendLine(item.Project.Name);
            }

            return sb.ToString().TrimEnd();
        }

        #endregion

        #region Problem 10

        public static string GetDepartmentsWithMoreThan5Employees(SoftUniContext context)
        {
            var departments = context.Departments
                .Include(x => x.Employees)
                .Where(d => d.Employees.Count() > 5)
                .OrderBy(d => d.Employees.Count())
                .ThenBy(d => d.Name)
                .ToList();

            StringBuilder sb = new StringBuilder();

            foreach (var dep in departments)
            {
                sb.AppendLine($"{dep.Name} - {dep.Manager.FirstName} {dep.Manager.LastName}");


                foreach (var employee in dep.Employees.OrderBy(x=>x.FirstName).ThenBy(x=>x.LastName))
                {
                    sb.AppendLine($"{employee.FirstName} {employee.LastName} - {employee.JobTitle}");
                }
            }


            return sb.ToString().TrimEnd();
        }

        #endregion

        #region Problem 11

        public static string GetLatestProjects(SoftUniContext context)
        {
            var projects = context.Projects
                .Where(x => x.StartDate != null)
                .OrderByDescending(x=> x.StartDate)
                .Take(10)
                .OrderBy(x=>x.Name);

            return String.Join(Environment.NewLine, 
                projects.Select(x=>$"{x.Name}\n{x.Description}\n{x.StartDate.ToString("M/d/yyyy h:mm:ss tt")}"));
        }

        #endregion

        #region Problem 12

        public static string IncreaseSalaries(SoftUniContext context)
        {
            var employees = context.Employees
                .Include(x => x.Department)
                .Where(d => d.Department.Name == "Engineering" || d.Department.Name == "Tool Design"
                    || d.Department.Name == "Marketing" || d.Department.Name == "Information Services");

            foreach (var employee in employees)
            {
                employee.Salary *= 1.12m;
            }

            context.SaveChanges();

            return String.Join(Environment.NewLine, employees
                .OrderBy(x=> x.FirstName)
                .ThenBy(x=>x.LastName)
                .Select(x=> $"{x.FirstName} {x.LastName} (${x.Salary:f2})"));
        }

        #endregion

        #region Problem 13

        public static string GetEmployeesByFirstNameStartingWithSa(SoftUniContext context)
        {
            var employees = context.Employees
                .Where(x => x.FirstName.StartsWith("Sa"))
                .OrderBy(x => x.FirstName)
                .ThenBy(x => x.LastName);

            return String.Join(Environment.NewLine, employees
                .Select(x=> $"{x.FirstName} {x.LastName} - {x.JobTitle} - (${x.Salary:f2})"));
        }

        #endregion

        #region Problem 14

        public static string DeleteProjectById(SoftUniContext context)
        {
            var ep2 = context.EmployeesProjects.Where(x => x.ProjectId == 2);
            context.EmployeesProjects.RemoveRange(ep2);


            var project2 = context.Projects.Where(x => x.ProjectId == 2);
            context.Projects.RemoveRange(project2);
            context.SaveChanges();

            return String.Join(Environment.NewLine, context.Projects.Take(10).Select(x => x.Name));
        }

        #endregion

        #region Problem 15

        public static string RemoveTown(SoftUniContext context)
        {
            var town = context.Towns.FirstOrDefault(x => x.Name == "Seattle");

            var addresses = context.Addresses.Where(x => x.TownId == town.TownId);

            var employees = context.Employees.Where(x=>addresses.Any(y=>y.AddressId == x.AddressId)).ToList();

            employees.ForEach(x => x.AddressId = null);
            context.SaveChanges();

            var countOfRemovedAddresses = addresses.Count();
            context.Addresses.RemoveRange(addresses);
            context.SaveChanges();


            context.Towns.Remove(town);
            context.SaveChanges();

            return $"{countOfRemovedAddresses} addresses in Seattle were deleted";
        }

        #endregion
    }
}
