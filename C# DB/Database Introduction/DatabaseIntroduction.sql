--Problem 1
CREATE DATABASE [DatabasesIntroduction]

USE [DatabasesIntroduction]


--Problem 2
CREATE TABLE [Minions](
	[Id] INT PRIMARY KEY,
	[Name] NVARCHAR (70) NOT NULL,
	[Age] TINYINT
)

CREATE TABLE [Towns](
	[Id] INT PRIMARY KEY,
	[Name] NVARCHAR (50) NOT NULL
)


--Problem 3
ALTER TABLE [Minions]
ADD [TownId] INT FOREIGN KEY REFERENCES [Towns](Id) NOT NULL


--Problem 4
INSERT INTO [Towns]([Id], [Name])
	VALUES
(1, 'Sofia'),
(2, 'Plovdiv'),
(3, 'Varna')

INSERT INTO [Minions]([Id], [Name], [Age], [TownId])
	VALUES
(1, 'Kevin', 22, 1),
(2, 'Bob', 15, 3),
(3, 'Steward', NULL, 2)


--Problem 5
TRUNCATE TABLE [Minions]


--Problem 6
DROP TABLE [Minions]


--Problem 7
CREATE TABLE [People](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] NVARCHAR (200) NOT NULL,
	[Picture] VARBINARY,
	CHECK (DATALENGTH([Picture])<=2000000),
	[Height] DECIMAL (3,2),
	[Weight] DECIMAL (5, 2),
	[Gender] CHAR (1) NOT NULL,
	CHECK([Gender]='m' OR [Gender]='f'),
	[Birthdate] DATE NOT NULL,
	[Biography] NVARCHAR(MAX)
)

INSERT INTO [People]([Name],[Height],[Weight],[Gender],[Birthdate])
	VALUES
('Ivan', 1.77, 75.2, 'm','2000-05-25'),
('George', 2.03, 95.2, 'm','2000-09-11'),
('Dan', 1.87, 105.2, 'm','2002-03-15'),
('Tedy', 1.60, 60, 'f','2002-11-06'),
('Tony', 1.65, 52, 'f','2002-05-09')


--Problem 8