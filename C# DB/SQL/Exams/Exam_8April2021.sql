CREATE DATABASE [Service]
GO
USE [Service]
GO

CREATE TABLE [Users](
	[Id] INT PRIMARY KEY IDENTITY,
	[Username] NVARCHAR(30) UNIQUE NOT NULL,
	[Password] NVARCHAR(50) NOT NULL,
	[Name] NVARCHAR(50),
	[Birthdate] DATETIME2,
	[Age] INT,
	CHECK ([Age] BETWEEN 14 AND 110),
	[Email] VARCHAR(50) NOT NULL
)

CREATE TABLE [Departments](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(50) NOT NULL
)

CREATE TABLE [Employees](
	[Id] INT PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR(25),
	[LastName] NVARCHAR(25),
	[Birthdate] DATETIME2,
	[Age] INT,
	CHECK ([Age] BETWEEN 18 AND 110),
	[DepartmentId] INT REFERENCES [Departments]([Id])
)

CREATE TABLE [Categories](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR(50) NOT NULL,
	[DepartmentId] INT REFERENCES [Departments]([Id]) NOT NULL
)

CREATE TABLE [Status](
	[Id] INT PRIMARY KEY IDENTITY,
	[Label] NVARCHAR(30) NOT NULL
)

CREATE TABLE [Reports](
	[Id] INT PRIMARY KEY IDENTITY,
	[CategoryId] INT REFERENCES [Categories]([Id]) NOT NULL,
	[StatusId] INT REFERENCES [Status]([Id]) NOT NULL,
	[OpenDate] DATETIME2 NOT NULL,
	[CloseDate] DATETIME2,
	[Description] NVARCHAR(200) NOT NULL,
	[UserId] INT REFERENCES [Users]([Id]) NOT NULL,
	[EmployeeId] INT REFERENCES [Employees]([Id])
)

--Problem 2. Insert
INSERT INTO [Employees]([FirstName], [LastName], [Birthdate], [DepartmentId]) 
VALUES
('Marlo', 'O''Malley', '1958-9-21', 1)
,('Niki', 'Stanaghan', '1969-11-26', 4)
,('Ayrton', 'Senna', '1960-03-21', 9)
,('Ronnie', 'Peterson', '1944-02-14', 9)
,('Giovanna', 'Amati', '1959-07-20', 5)

INSERT INTO [Reports]([CategoryId], [StatusId], 
[OpenDate], [CloseDate], [Description], [UserId], [EmployeeId])
VALUES
(1, 1, '2017-04-13', NULL, 'Stuck Road on Str.133', 6, 2)
,(6, 3, '2015-09-05', '2015-12-06', 'Charity trail running', 3, 5)
,(14, 2, '2015-09-07', NULL, 'Falling bricks on Str.58', 5, 2)
,(4, 3, '2017-07-03', '2017-07-06', 'Cut off streetlight on Str.11', 1, 1)

--Problem 3. Update
UPDATE [Reports]
SET [CloseDate] = GETDATE()
WHERE [CloseDate] IS NULL

--Problem 4. Delete
DELETE FROM [Reports]
WHERE [StatusId] = 4

--Problem 5.	Unassigned Reports
SELECT 
[Description], FORMAT([OpenDate], 'dd-MM-yyyy') AS [OpenDate]
FROM [Reports] AS r
WHERE [EmployeeId] IS NULL
ORDER BY r.[OpenDate], [Description]

--Problem 6.	Reports & Categories
SELECT
r.[Description], c.[Name]
FROM [Reports] AS r
JOIN [Categories] AS c ON r.[CategoryId] = c.[Id]
WHERE r.[CategoryId] IS NOT NULL
ORDER BY r.[Description], c.[Name]

--Problem 7.	Most Reported Category
SELECT TOP 5
c.[Name] AS [CategoryName],
COUNT(c.[Name]) AS [ReportsNumber]
FROM [Reports] AS r
JOIN [Categories] AS c ON r.[CategoryId] = c.[Id]
GROUP BY c.[Name]
ORDER BY [ReportsNumber] DESC, c.[Name] ASC

--Problem 8.	Birthday Report
SELECT
u.[Username], c.[Name] AS [CategoryName]
FROM [Reports] AS r
JOIN [Users] AS u ON r.[UserId] = u.[Id]
JOIN [Categories] AS c ON r.[CategoryId] = c.[Id]
WHERE DATEPART(DAY,r.[OpenDate]) = DATEPART(DAY,u.[Birthdate])
AND DATEPART(MONTH,r.[OpenDate]) = DATEPART(MONTH,u.[Birthdate])
ORDER BY u.[Username], c.[Name]

--Problem 9.	Users per Employee 
SELECT DISTINCT
CONCAT(e.[FirstName], ' ', e.[LastName]) AS [FullName]
, COUNT(r.[UserId]) AS [UsersCount]
FROM Employees AS e
LEFT JOIN Reports AS r ON r.EmployeeId = e.Id
LEFT JOIN Users AS u ON u.Id = r.UserId
GROUP BY e.FirstName, e.LastName
ORDER BY [UsersCount] DESC, [FullName]

--Problem 10.	Full Info
SELECT
	CASE
		WHEN r.EmployeeId IS NULL THEN 'None'
		ELSE CONCAT(e.FirstName, ' ', e.LastName) 
		END AS [Employee],
		ISNULL(d.[Name], 'None') AS [Department],
		ISNULL(c.[Name], 'None') AS [Category],
		ISNULL(r.[Description], 'None') AS [Description],
		ISNULL(FORMAT(r.OpenDate, 'dd.MM.yyyy'), 'None') AS [OpenDate],
		ISNULL(s.[Label], 'None') AS [Status],
		ISNULL(u.[Name],'None') AS [User]
FROM [Reports] AS r
LEFT JOIN [Employees] AS e ON r.[EmployeeId] = e.[Id]
LEFT JOIN [Departments] AS d ON e.[DepartmentId] = d.[Id]
LEFT JOIN [Categories] AS c ON r.[CategoryId] = c.[Id]
LEFT JOIN [Status] AS s ON r.[StatusId] = s.[Id]
LEFT JOIN [Users] AS u ON r.[UserId] = u.[Id]
ORDER BY 
  e.[FirstName] DESC
, e.[LastName] DESC
, d.[Name]
, c.[Name]
, r.[Description]
, r.[OpenDate]
, s.[Label]
, u.[Username]

GO
--Problem 11.	Hours to Complete
CREATE OR ALTER FUNCTION udf_HoursToComplete(@StartDate DATETIME, @EndDate DATETIME)
RETURNS INT
BEGIN
	IF(@StartDate IS NULL OR @EndDate IS NULL)
	BEGIN
		RETURN 0
	END

	RETURN  DATEDIFF(HOUR, @StartDate, @EndDate)
END

GO
--Problem 12.	Assign Employee
CREATE OR ALTER PROC usp_AssignEmployeeToReport(@EmployeeId INT, @ReportId INT)
AS
BEGIN
	DECLARE @employeeDepartmentId INT;
	SET @employeeDepartmentId = 
	(SELECT d.Id FROM Employees AS e
	JOIN Departments AS d ON d.Id = e.DepartmentId 
	WHERE e.Id = @EmployeeId)

	DECLARE @reportDepartmentId INT;
	SET @reportDepartmentId = 
	(SELECT d.Id FROM Reports AS r
	JOIN Categories AS c ON r.CategoryId = c.Id
	JOIN Departments AS d ON d.Id = c.DepartmentId
	WHERE r.Id = @ReportId)

	IF(@employeeDepartmentId = @reportDepartmentId)
		UPDATE Reports
		SET EmployeeId = @EmployeeId
		WHERE Id = @ReportId
	ELSE
		RAISERROR('Employee doesn''t belong to the appropriate department!', 16, 1);
END