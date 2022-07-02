CREATE DATABASE [Zoo]
GO
USE [Zoo]
GO

--Problem 1. Create
CREATE TABLE [Owners](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(50) NOT NULL,
	[PhoneNumber] VARCHAR(15) NOT NULL,
	[Address] VARCHAR(50)
)

CREATE TABLE [AnimalTypes](
	[Id] INT PRIMARY KEY IDENTITY,
	[AnimalType] VARCHAR(30) NOT NULL
)

CREATE TABLE [Cages](
	[Id] INT PRIMARY KEY IDENTITY,
	[AnimalTypeId] INT REFERENCES [AnimalTypes]([Id]) NOT NULL
)

CREATE TABLE [Animals](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(30) NOT NULL,
	[BirthDate] DATE NOT NULL,
	[OwnerId] INT REFERENCES [Owners]([Id]),
	[AnimalTypeId] INT REFERENCES [AnimalTypes]([Id]) NOT NULL
)

CREATE TABLE [AnimalsCages](
	[CageId] INT REFERENCES [Cages]([Id]) NOT NULL,
	[AnimalId] INT REFERENCES [Animals]([Id]) NOT NULL,
	PRIMARY KEY([CageId], [AnimalId])
)

CREATE TABLE [VolunteersDepartments](
	[Id] INT PRIMARY KEY IDENTITY,
	[DepartmentName] VARCHAR(30) NOT NULL
)

CREATE TABLE [Volunteers](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(50) NOT NULL,
	[PhoneNumber] VARCHAR(15) NOT NULL,
	[Address] VARCHAR(50),
	[AnimalId] INT REFERENCES [Animals]([Id]),
	[DepartmentId] INT REFERENCES [VolunteersDepartments]([Id]) NOT NULL
)

--Problem 2. Insert
INSERT INTO [Volunteers] VALUES
('Anita Kostova', '0896365412', 'Sofia, 5 Rosa str.', 15,1)
,('Dimitur Stoev', '0877564223', NULL, 42,4)
,('Kalina Evtimova', '0896321112', 'Silistra, 21 Breza str.', 9,7)
,('Stoyan Tomov', '0898564100', 'Montana, 1 Bor str.', 18,8)
,('Boryana Mileva', '0888112233', NULL, 31,5)

INSERT INTO [Animals] VALUES
('Giraffe', '2018-09-21', 21, 1)
,('Harpy Eagle', '2015-04-17', 15, 3)
,('Hamadryas Baboon', '2017-11-02', NULL, 1)
,('Tuatara', '2021-06-30', 2, 4)


--Problem 3. Update
UPDATE [Animals]
SET [OwnerId] = 4
WHERE [OwnerId] IS NULL

--Problem 4.Delete
DELETE FROM [Volunteers]
WHERE [DepartmentId] = 
(SELECT [Id] FROM [VolunteersDepartments] 
 WHERE [DepartmentName] = 'Education program assistant')

DELETE FROM [VolunteersDepartments]
WHERE [DepartmentName] = 'Education program assistant'

--Problem 5.	Volunteers
SELECT
v.[Name], v.[PhoneNumber], v.[Address], v.[AnimalId], v.[DepartmentId]
FROM [Volunteers] AS v
ORDER BY v.[Name], v.[AnimalId], v.[DepartmentId] 

--Problem 6.	Animals data
SELECT
a.[Name], [at].[AnimalType], FORMAT(a.[BirthDate], 'dd.MM.yyyy') AS [BirthDate]
FROM [Animals] AS a
JOIN [AnimalTypes] AS [at] ON a.[AnimalTypeId] = [at].[Id]
ORDER BY a.[Name]

--Problem 7.	Owners and Their Animals
SELECT TOP 5
o.[Name], COUNT(*) AS [CountOfAnimals]
FROM [Owners] AS o
JOIN [Animals] AS a ON a.[OwnerId] = o.[Id]
GROUP BY o.[Id], o.[Name]
ORDER BY COUNT(*) DESC, o.[Name]

--Problem 8.	Owners, Animals and Cages
SELECT
CONCAT(o.[Name], '-', a.[Name]) AS [OwnersAnimals],
o.[PhoneNumber], c.[Id]
FROM [Owners] AS o
JOIN [Animals] AS a ON a.[OwnerId] = o.[Id]
JOIN [AnimalsCages] AS ac ON ac.[AnimalId] = a.[Id]
JOIN [Cages] AS c ON ac.[CageId] = c.[Id]
JOIN [AnimalTypes] AS [at] ON a.[AnimalTypeId] = [at].[Id]
WHERE [at].[AnimalType] = 'Mammals'
ORDER BY o.[Name], a.[Name] DESC

--Problem 9.	Volunteers in Sofia
SELECT
v.[Name], v.[PhoneNumber], 
LTRIM(SUBSTRING(LTRIM(v.[Address]), PATINDEX('%[0-9]%',v.[Address]) - 1, 100)) AS [Address]
FROM [Volunteers] AS v
JOIN [VolunteersDepartments] AS vd ON v.[DepartmentId] = vd.[Id]
WHERE vd.[DepartmentName] = 'Education program assistant'
AND v.[Address] LIKE '%Sofia%'
ORDER BY v.[Name]

--Problem 10.	Animals for Adoption
SELECT
a.[Name], YEAR(a.[BirthDate]) AS [BirthYear], [at].[AnimalType]
FROM [Animals] AS a
JOIN [AnimalTypes] AS [at] ON a.[AnimalTypeId] = [at].[Id]
WHERE a.[OwnerId] IS NULL
AND DATEDIFF(YEAR, a.[BirthDate], '2022-1-1') < 5
AND [at].[AnimalType] != 'Birds'
ORDER BY a.[Name]

GO
--Problem 12. All Volunteers in a Department
CREATE FUNCTION udf_GetVolunteersCountFromADepartment (@VolunteersDepartment VARCHAR(100)) 
RETURNS INT
AS
BEGIN
	RETURN 
	(SELECT COUNT(*) FROM [Volunteers] AS v
	 JOIN [VolunteersDepartments] AS vd ON v.[DepartmentId] = vd.[Id]
	 WHERE [DepartmentName] = @VolunteersDepartment)
END

GO
--Problem 12.	Animals with Owner or Not
CREATE PROC usp_AnimalsWithOwnersOrNot(@AnimalName VARCHAR(100))
AS
SELECT
a.[Name], 
(CASE 
	WHEN o.[Id] IS NULL THEN 'For adoption'
	ELSE o.[Name]
END) AS [OwnersName]
FROM [Animals] AS a
LEFT JOIN [Owners] AS o ON a.[OwnerId] = o.[Id]
WHERE a.[Name] = @AnimalName