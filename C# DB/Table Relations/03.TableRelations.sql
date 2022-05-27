CREATE DATABASE [TableRelations]
USE [TableRelations]

--Problem 1.	One-To-One Relationship
CREATE TABLE [Passports](
	[PassportID] INT PRIMARY KEY IDENTITY(101,1),
	[PassportNumber] NVARCHAR(20) UNIQUE 
)

CREATE TABLE [Persons](
	[PersonID] INT IDENTITY PRIMARY KEY, 
	[FirstName] NVARCHAR(20) NOT NULL,
	[Salary] DECIMAL(7,2) NOT NULL,
	[PassportID] INT REFERENCES [Passports]([PassportID])
)

INSERT INTO [Passports] VALUES
('N34FG21B'),
('K65LO4R7'),
('ZE657QP2')
INSERT INTO [Persons] VALUES
('Roberto', 43300.00, 102),
('Tom', 56100.00, 103),
('Yana', 60200.00, 101)


--Problem 2.	One-To-Many Relationship
CREATE TABLE [Manufacturers](
	[ManufacturerID] INT IDENTITY PRIMARY KEY,
	[Name] NVARCHAR(20) NOT NULL,
	[EstablishedOn] DATE NOT NULL
)
CREATE TABLE [Models](
	[ModelID] INT IDENTITY(101,1) PRIMARY KEY,
	[Name] NVARCHAR(20) NOT NULL,
	[ManufacturerID] INT REFERENCES [Manufacturers]([ManufacturerID])
)
INSERT INTO [Manufacturers] VALUES
('BMW', '07/03/1916'),
('Tesla','01/01/2003'),
('Lada','01/05/1966')
INSERT INTO [Models] VALUES
('X1', 1),
('i6', 1),
('Model S', 2),
('Model X', 2),
('Model 3', 2),
('Nova', 3)


--Problem 3.	Many-To-Many Relationship
CREATE TABLE [Students]
(
	[StudentID] INT IDENTITY PRIMARY KEY,
	[Name] NVARCHAR(20)
)
CREATE TABLE [Exams]
(
	[ExamID] INT IDENTITY(101,1) PRIMARY KEY,
	[Name] NVARCHAR(50)
)
CREATE TABLE [StudentsExams]
(
	[StudentID] INT REFERENCES [Students]([StudentID]),
	[ExamID] INT REFERENCES [Exams]([ExamID]),
	PRIMARY KEY([StudentID], [ExamID])
)
INSERT INTO [Students] VALUES
('Mila'),
('Toni'),
('Ron')
INSERT INTO [Exams] VALUES
('SpringMVC'),
('Neo4j'),
('Oracle 11g')
INSERT INTO [StudentsExams] VALUES
(1, 101),
(1, 102),
(2, 101),
(3, 103),
(2, 102),
(2, 103)


--Problem 4.	Self-Referencing 
CREATE TABLE [Teachers]
(
	[TeacherID] INT IDENTITY(101,1) PRIMARY KEY,
	[Name] NVARCHAR(20),
	[ManagerID] INT REFERENCES [Teachers]([TeacherID])
)
INSERT INTO [Teachers] VALUES
('John', NULL),
('Maya', 106),
('Silvia', 106),
('Ted', 105),
('Mark', 101),
('Greta', 101)


--Problem 5.	Online Store Database
CREATE DATABASE [OnlineStore]
USE [OnlineStore]

CREATE TABLE [Cities](
	[CityID] INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50)
)

CREATE TABLE [Customers](
	[CustomerID] INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50),
	[Birthday] DATE,
	[CityID] INT REFERENCES [Cities]([CityID])
)

CREATE TABLE [Orders](
	[OrderID] INT IDENTITY PRIMARY KEY,
	[CustomerID] INT REFERENCES [Customers]([CustomerID])
)

CREATE TABLE [ItemTypes](
	[ItemTypeID] INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50)
)

CREATE TABLE [Items](
	[ItemID] INT IDENTITY PRIMARY KEY,
	[Name] VARCHAR(50),
	[ItemTypeID] INT REFERENCES [ItemTypes]([ItemTypeID])
)

CREATE TABLE [OrderItems](
	[OrderID] INT REFERENCES [Orders]([OrderID]),
	[ItemID] INT REFERENCES [Items]([ItemID]),
	PRIMARY KEY ([OrderID], [ItemID])
)


--Problem 6.	University Database
CREATE DATABASE [University]
USE [University]

CREATE TABLE [Majors](
	[MajorID] INT IDENTITY PRIMARY KEY,
	[Name] NVARCHAR(50)
)

CREATE TABLE [Students](
	[StudentID] INT IDENTITY PRIMARY KEY,
	[StudentNumber] INT,
	[StudentName] NVARCHAR(50),
	[MajorID] INT REFERENCES [Majors]([MajorID])
)

CREATE TABLE [Payments](
	[PaymentID] INT IDENTITY PRIMARY KEY,
	[PaymentDate] DATE,
	[PaymentAmount] DECIMAL(6,2),
	[StudentID] INT REFERENCES [Students]([StudentID])
)

CREATE TABLE [Subjects](
	[SubjectID] INT IDENTITY PRIMARY KEY,
	[SubjectName] NVARCHAR(50)
)

CREATE TABLE [Agenda](
	[StudentID] INT REFERENCES [Students]([StudentID]),
	[SubjectID] INT REFERENCES [Subjects]([SubjectID]),
	PRIMARY KEY ([StudentID],[SubjectID])
)


--Problem 9.	*Peaks in Rila
USE [Geography]

SELECT [Mountains].[MountainRange],
	[Peaks].[PeakName],
	[Peaks].[Elevation]
FROM [Mountains]
JOIN [Peaks] ON [Peaks].[MountainId] = [Mountains].[Id]
AND [MountainRange] = 'Rila'
ORDER BY [Elevation] DESC