--Part I – Queries for SoftUni Database
--Problem 1.	Find Names of All Employees by First Name
SELECT [FirstName],[LastName] FROM [Employees]
WHERE SUBSTRING([FirstName],1,2) = 'SA'

--Problem 2.	  Find Names of All employees by Last Name 
SELECT [FirstName], [LastName] FROM [Employees] 
WHERE [LastName] LIKE '%ei%'

--Problem 3.	Find First Names of All Employees
SELECT [FirstName] FROM [Employees] 
WHERE [DepartmentID] = 3 OR [DepartmentID] = 10
AND YEAR([HireDate]) BETWEEN 1995 AND 2005

--Problem 4.	Find All Employees Except Engineers
SELECT [FirstName], [LastName] FROM [Employees]
WHERE [JobTitle] NOT LIKE '%engineer%'

--Problem 5.	Find Towns with Name Length
SELECT [Name] FROM [Towns]
WHERE LEN([Name]) BETWEEN 5 AND 6
ORDER BY [Name] ASC

--Problem 6.	 Find Towns Starting With
SELECT * FROM [Towns]
WHERE SUBSTRING([Name],1,1) IN('M', 'K', 'B', 'E')
ORDER BY [Name] ASC

--Problem 7.	 Find Towns Not Starting With
SELECT * FROM [Towns]
WHERE SUBSTRING([Name],1,1) NOT IN('R', 'B', 'D')
ORDER BY [Name] ASC

--Problem 8.	Create View Employees Hired After 2000 Year
CREATE VIEW [V_EmployeesHiredAfter2000] AS
SELECT [FirstName], [LastName] FROM [Employees]
WHERE YEAR([HireDate]) > 2000

--Problem 9.	Length of Last Name
SELECT [FirstName], [LastName] FROM [Employees]
WHERE LEN([LastName]) = 5

--Problem 10.	Rank Employees by Salary
SELECT [EmployeeID], [FirstName], [LastName], [Salary], 
DENSE_RANK() OVER (PARTITION BY [Salary] ORDER BY [EmployeeID]) AS [Rank]
FROM [Employees]
WHERE [Salary] BETWEEN 10000 AND 50000
ORDER BY [Salary] DESC

--Problem 11.	Find All Employees with Rank 2 *
SELECT * FROM
(SELECT [EmployeeID], [FirstName], [LastName], [Salary], 
DENSE_RANK() OVER (PARTITION BY [Salary] ORDER BY [EmployeeID]) AS [Rank]
FROM [Employees]
WHERE [Salary] BETWEEN 10000 AND 50000) AS [query]
WHERE [query].[Rank] = 2
ORDER BY [Salary] DESC

--Part II – Queries for Geography Database 
--Problem 12.	Countries Holding ‘A’ 3 or More Times
SELECT [CountryName], [IsoCode]
FROM [Countries]
WHERE [CountryName] LIKE '%A%A%A%' 
ORDER BY [IsoCode]

--Problem 13.	 Mix of Peak and River Names
SELECT [PeakName], [RiverName],
LOWER(CONCAT(
	[PeakName], 
	SUBSTRING([RiverName], 2, LEN([RiverName]))
		)) AS [Mix]
FROM [Peaks], [Rivers]
WHERE RIGHT([PeakName], 1) = LEFT([RiverName], 1)
ORDER BY [Mix]

--Part III – Queries for Diablo Database
--Problem 14.	Games from 2011 and 2012 year
SELECT TOP(50) [Name],FORMAT([Start], 'yyyy-MM-dd') AS [Start] FROM [Games]
WHERE YEAR([Start]) IN (2011, 2012)
ORDER BY [Start] ASC

--Problem 15.	 User Email Providers
SELECT [Username],SUBSTRING([Email],
	CHARINDEX('@', [Email]) + 1, 
	DATALENGTH([Email]) - CHARINDEX('@', [Email])) AS [Email Provider]
FROM [Users]
ORDER BY [Email Provider], [Username]

--Problem 16.	 Get Users with IPAdress Like Pattern
SELECT [Username], [IpAddress]
FROM [Users]
WHERE [IpAddress] LIKE '___.1%.%.___'
ORDER BY [Username]

--Problem 17.	 Show All Games with Duration and Part of the Day
SELECT [Name] AS [Game], 
	   (CASE 
			WHEN DATEPART(HOUR, [Start]) BETWEEN 0 AND 11 THEN 'Morning'
			WHEN DATEPART(HOUR, [Start]) BETWEEN 12 AND 17 THEN 'Afternoon'
			WHEN DATEPART(HOUR, [Start]) BETWEEN 18 AND 23 THEN 'Evening'
		END) AS [Part of The Day],
		(CASE
			WHEN [Duration] BETWEEN 0 AND 3 THEN 'Extra Short'
			WHEN [Duration] BETWEEN 4 AND 6 THEN 'Short'
			WHEN [Duration] > 6 THEN 'Long'
			ELSE 'Extra Long'
		END) AS [Duration]
FROM [Games]
ORDER BY [Name], [Duration], [Part of The Day]

--Part IV – Date Functions Queries
--Problem 18.	 Orders Table
SELECT [ProductName], 
	   [OrderDate],
	   DATEADD(DAY, 3, [OrderDate]) AS [Pay Due],
	   DATEADD(MONTH, 1, [OrderDate]) AS [Deliver Due]
FROM [Orders]

--CREATE TABLE People(
	 [Id] INT IDENTITY PRIMARY KEY,
	 [Name] NVARCHAR(MAX) NOT NULL,
	 [Birthdate] DATETIME2 NOT NULL
)

INSERT INTO [People]([Name], [Birthdate]) VALUES
	('Victor', '2000-12-07 00:00:00.000'),
	('Steven', '1992-09-10 00:00:00.000'),
	('Stephen', '1910-09-19 00:00:00.000'),
	('John', '2010-01-06 00:00:00.000')

SELECT [Name],
	   DATEDIFF(YEAR, [Birthdate], GETDATE()) AS [Age in Years],
	   DATEDIFF(MONTH, [Birthdate], GETDATE()) AS [Age in Months],
	   DATEDIFF(DAY, [Birthdate], GETDATE()) AS [Age in Days],
	   DATEDIFF(MINUTE, [Birthdate], GETDATE()) AS [Age in Minutes]
FROM [People]
CREATE TABLE People(
	 [Id] INT IDENTITY PRIMARY KEY,
	 [Name] NVARCHAR(MAX) NOT NULL,
	 [Birthdate] DATETIME2 NOT NULL
)

INSERT INTO [People]([Name], [Birthdate]) VALUES
	('Victor', '2000-12-07 00:00:00.000'),
	('Steven', '1992-09-10 00:00:00.000'),
	('Stephen', '1910-09-19 00:00:00.000'),
	('John', '2010-01-06 00:00:00.000')

SELECT [Name],
	   DATEDIFF(YEAR, [Birthdate], GETDATE()) AS [Age in Years],
	   DATEDIFF(MONTH, [Birthdate], GETDATE()) AS [Age in Months],
	   DATEDIFF(DAY, [Birthdate], GETDATE()) AS [Age in Days],
	   DATEDIFF(MINUTE, [Birthdate], GETDATE()) AS [Age in Minutes]
FROM [People]