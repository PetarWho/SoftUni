--Problem 1.	Employee Address
SELECT TOP 5
e.[EmployeeID], e.[JobTitle], e.[AddressID], a.[AddressText]
FROM [Employees] AS e
JOIN [Addresses] AS a ON e.[AddressID] = a.[AddressID]
ORDER BY [AddressID] 

--Problem 2.	Addresses with Towns
SELECT TOP 50
e.[FirstName], e.[LastName], t.[Name], a.[AddressText]
FROM [Employees] AS e
JOIN [Addresses] AS a ON e.[AddressID] = a.[AddressID]
JOIN [Towns] AS t ON a.[TownID] = t.[TownID]
ORDER BY [FirstName], [LastName] 

--Problem 3.	Sales Employee
SELECT
e.[EmployeeID], e.[FirstName], e.[LastName], d.[Name]
FROM [Employees] AS e
JOIN [Departments] AS d ON e.[DepartmentID] = d.[DepartmentID]
WHERE d.[Name] = 'Sales'

--Problem 4.	Employee Departments
SELECT TOP 5
e.[EmployeeID], e.[FirstName], e.[Salary], d.[Name]
FROM [Employees] AS e
JOIN [Departments] AS d ON e.[DepartmentID] = d.[DepartmentID]
WHERE e.[Salary] > 15000
ORDER BY d.[DepartmentID]

--Problem 5.	Employees Without Project
SELECT TOP 3
e.[EmployeeID], e.[FirstName]
FROM [Employees] AS e
WHERE e.EmployeeID NOT IN (
SELECT [EmployeeID] FROM [EmployeesProjects]) 
ORDER BY e.[EmployeeID]

--Problem 6.	Employees Hired After
SELECT
e.[FirstName], e.[LastName], e.[HireDate], d.[Name]
FROM [Employees] AS e
JOIN [Departments] AS d ON e.[DepartmentID] = d.[DepartmentID]
WHERE e.[HireDate] > '1.1.1999' AND d.[Name] IN ('Sales', 'Finance')

--Problem 7.	Employees with Project
SELECT TOP 5
e.[EmployeeID], e.[FirstName], p.[Name]
FROM [Employees] AS e
JOIN [EmployeesProjects] AS ep ON e.[EmployeeID] = ep.[EmployeeID]
JOIN [Projects] AS p ON ep.[ProjectID] = p.[ProjectID]
WHERE p.StartDate > '2002-08-13' AND p.[EndDate] IS NULL
ORDER BY e.[EmployeeID]

--Problem 8.	Employee 24
SELECT
e.[EmployeeID], e.[FirstName],
(CASE 
	WHEN DATEPART (YEAR, p.[StartDate]) >=2005 THEN NULL
	ELSE p.[Name]
	END) AS [ProjectName]
FROM [Employees] AS e
JOIN [EmployeesProjects] as ep ON e.[EmployeeID] = ep.[EmployeeID]
JOIN [Projects] AS p ON ep.[ProjectID] = p.[ProjectID]
WHERE e.[EmployeeID] = 24

--Problem 9.	Employee Manager
SELECT 
e.[EmployeeID], e.[FirstName], e.[ManagerID], m.[FirstName] AS [ManagerName]
FROM [Employees] AS e
JOIN [Employees] AS m ON e.[ManagerID] = m.[EmployeeID]
WHERE e.[ManagerID] = 3 OR e.[ManagerID] = 7
ORDER BY e.[EmployeeID]

--Problem 10. Employee Summary
SELECT TOP 50
e.[EmployeeID]
, CONCAT(e.[FirstName], ' ', e.[LastName]) AS [EmployeeName]
, CONCAT(m.[FirstName], ' ', m.[LastName]) AS [ManagerName]
, d.[Name]
FROM [Employees] AS e
JOIN [Employees] AS m ON e.[ManagerID] = m.[EmployeeID]
JOIN [Departments] AS d ON e.[DepartmentID] = d.[DepartmentID]
ORDER BY e.[EmployeeID]

--Problem 11. Min Average Salary
SELECT TOP(1) 
AVG([Salary]) AS [MinAverageSalary]
FROM [Employees]
GROUP BY [DepartmentID]
ORDER BY [MinAverageSalary]

--Problem 12. Highest Peaks in Bulgaria
SELECT
c.[CountryCode], m.[MountainRange], p.[PeakName], p.[Elevation]
FROM [Countries] AS c
JOIN [MountainsCountries] AS mc ON c.[CountryCode] = mc.[CountryCode]
JOIN [Peaks] AS p ON mc.[MountainId] = p.[MountainId]
JOIN [Mountains] AS m ON mc.[MountainId] = m.[Id]
WHERE c.CountryCode = 'BG' AND p.Elevation>2835
ORDER BY p.[Elevation] DESC

--Problem 13. Count Mountain Ranges
SELECT
c.[CountryCode], COUNT(m.[MountainRange]) AS [MountainRanges]
FROM [Countries] AS c
JOIN [MountainsCountries] AS mc ON c.[CountryCode] = mc.[CountryCode]
JOIN [Mountains] AS m ON mc.[MountainId] = m.[Id]
WHERE c.[CountryCode] IN ('US', 'BG', 'RU')
GROUP BY c.[CountryCode]

--Problem 14. Countries with Rivers
SELECT TOP 5
c.[CountryName], r.[RiverName]
FROM [Countries] AS c
LEFT JOIN [CountriesRivers] AS cr ON c.[CountryCode] = cr.[CountryCode]
LEFT JOIN [Rivers] AS r ON cr.[RiverId] = r.[Id]
LEFT JOIN [Continents] AS co ON c.[ContinentCode] = co.[ContinentCode]
WHERE co.[ContinentName] = 'Africa'
ORDER BY c.[CountryName]

--Problem 15. *Continents and Currencies
SELECT
rc.[ContinentCode], rc.[CurrencyCode], rc.[CurrencyUsage]
FROM (
	SELECT 
	c.[ContinentCode], c.[CurrencyCode],
	COUNT(c.[CurrencyCode]) AS [CurrencyUsage],
	DENSE_RANK() OVER (PARTITION BY c.[ContinentCode]
	ORDER BY COUNT(c.[CurrencyCode]) DESC) AS [Rank]
FROM [Countries] AS c
GROUP BY c.[ContinentCode], c.[CurrencyCode]) AS rc
WHERE rc.[Rank] = 1 AND rc.CurrencyUsage >1

--Problem 16. Countries Without Any Mountains
SELECT
COUNT(*) AS [Count]
FROM [Countries] AS c
LEFT JOIN [MountainsCountries] AS mc ON c.[CountryCode] = mc.[CountryCode]
LEFT JOIN [Mountains] AS m ON mc.[MountainId] = m.[Id]
WHERE m.[Id] IS NULL

--Problem 17. Highest Peak and Longest River by Country
SELECT TOP(5)
	c.[CountryName], 
	MAX(p.[Elevation]) AS [HighestPeakElevation],
	MAX(r.[Length]) AS [LongestRiverLength]
FROM [Countries] AS c
LEFT JOIN [MountainsCountries] AS mc ON c.[CountryCode] = mc.[CountryCode]
LEFT JOIN [Mountains] AS m ON mc.[MountainId] = m.[Id]
LEFT JOIN [Peaks] AS p ON m.[Id] = p.[MountainId]
LEFT JOIN [CountriesRivers] AS cr ON c.[CountryCode] = cr.[CountryCode]
LEFT JOIN [Rivers] AS r ON cr.[RiverId] = r.[Id]
GROUP BY c.[CountryName]
ORDER BY [HighestPeakElevation] DESC, [LongestRiverLength] DESC, c.[CountryName]

--Problem 18. Highest Peak Name and Elevation by Country
SELECT TOP(5)
    [CountryName] AS [Country],
	ISNULL([Result].[PeakName], '(no highest peak)') AS [Highest Peak Name],
	ISNULL([Result].[Elevation], 0) AS [Highest Peak Elevation],
	ISNULL([Result].[MountainRange],'(no mountain)') AS [Mountain]
FROM(SELECT 
		c.[CountryName],
		p.[PeakName],
		p.[Elevation],
		m.[MountainRange],
		DENSE_RANK() OVER (PARTITION BY c.[CountryName] ORDER BY p.[Elevation] DESC) AS [Rank]
     FROM [Countries] c
            LEFT JOIN [MountainsCountries] mc ON c.[CountryCode] = mc.[CountryCode]
            LEFT JOIN [Mountains] m ON mc.[MountainId] = m.[Id]
            LEFT JOIN [Peaks] p  ON m.[Id] = p.[MountainId]
          ) AS [Result]
 WHERE [Rank] = 1
 ORDER BY [Country], [Highest Peak Name]