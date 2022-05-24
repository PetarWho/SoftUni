--Problem 1.	Create Database
CREATE DATABASE [DatabasesIntroduction]

USE [DatabasesIntroduction]


--Problem 2.	Create Tables
CREATE TABLE [Minions](
	[Id] INT PRIMARY KEY,
	[Name] NVARCHAR (70) NOT NULL,
	[Age] TINYINT
)

CREATE TABLE [Towns](
	[Id] INT PRIMARY KEY,
	[Name] NVARCHAR (50) NOT NULL
)


--Problem 3.	Alter Minions Table
ALTER TABLE [Minions]
ADD [TownId] INT FOREIGN KEY REFERENCES [Towns](Id) NOT NULL


--Problem 4.	Insert Records in Both Tables
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


--Problem 5.	Truncate Table Minions
TRUNCATE TABLE [Minions]


--Problem 6.	Drop All Tables
DROP TABLE [Minions]


--Problem 7.	Create Table People
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


--Problem 8.	Create Table Users
CREATE TABLE [Users](
	[Id] INT PRIMARY KEY IDENTITY,
	[Username] VARCHAR (30) NOT NULL,
	[Password] VARCHAR (26) NOT NULL,
	[ProfilePicture] VARBINARY,
	CHECK (DATALENGTH([ProfilePicture])<=900000),
	[LastLoginTime] TIME,
	[IsDeleted] BIT
)

INSERT INTO [Users]([Username], [Password])
	VALUES
('Ivan', '123'),
('George', '321'),
('Stoyan', '213'),
('Alex', '231'),
('Peter', '312')


--Problem 9.	Change Primary Key
SELECT * 
  FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
 WHERE TABLE_NAME = 'Users'

 ALTER TABLE [Users]
 DROP CONSTRAINT PK__Users__3214EC0797777D76
 ALTER TABLE [Users]
 ADD CONSTRAINT PK_Users PRIMARY KEY (Id, Username)


 --Problem 10.	Add Check Constraint
 ALTER TABLE [Users]
 ADD CONSTRAINT CK_MinLength CHECK (DATALENGTH([Password]) > 5)

 --Problem 11.	Set Default Value of a Field
 ALTER TABLE [Users] 
 ADD CONSTRAINT DF_Users DEFAULT GETDATE() FOR [LastLoginTime]

 --Problem 12.	Set Unique Field
ALTER TABLE Users
DROP CONSTRAINT PK_Users
ALTER TABLE Users
ADD PRIMARY KEY(Id)
ALTER TABLE Users
ADD CHECK(LEN(Username) >= 3)

--Problem 13.	Movies Database
CREATE DATABASE Movies
USE [Movies]

CREATE TABLE [Directors](
	[Id] INT PRIMARY KEY IDENTITY,
	[DirectorName] NVARCHAR (200) NOT NULL,
	[Notes] NVARCHAR (MAX)
)

CREATE TABLE [Genres](
	[Id] INT PRIMARY KEY IDENTITY,
	[GenreName] NVARCHAR (100) NOT NULL,
	[Notes] NVARCHAR (MAX)
)

CREATE TABLE [Categories](
	[Id] INT PRIMARY KEY IDENTITY,
	[CategoryName] NVARCHAR (100) NOT NULL,
	[Notes] NVARCHAR (MAX)
)

CREATE TABLE [Movies](
	[Id] INT PRIMARY KEY IDENTITY,
	[Title] NVARCHAR (200) NOT NULL,
	[DirectorId] INT FOREIGN KEY REFERENCES [Directors](Id) NOT NULL,
	[CopyrightYear] INT NOT NULL,
	[Length] TIME,
	[GenreId] INT FOREIGN KEY REFERENCES [Genres](Id) NOT NULL,
	[CategoryId] INT FOREIGN KEY REFERENCES [Categories](Id) NOT NULL,
	[Rating] DECIMAL (2,1),
	[Notes] NVARCHAR(MAX)
)

INSERT INTO [Directors]([DirectorName]) VALUES
('Peter'),
('George'),
('Dan'),
('Rachel'),
('Greg')

INSERT INTO [Genres]([GenreName]) VALUES
('Adventurous'),
('Comedy'),
('Action'),
('Horror'),
('Sci-Fi')

INSERT INTO [Categories]([CategoryName]) VALUES
('TV Series'),
('Films'),
('Animation'),
('Documentary'),
('Biography')

INSERT INTO [Movies]([Title], [DirectorId],[CopyrightYear],[GenreId],[CategoryId]) VALUES
('IT', 2, 2019, 4, 2),
('6 Underground', 1, 2018, 3, 2),
('Jumper', 3, 2009, 5, 2),
('Cobra Kai', 1, 2018, 3, 1),
('A star is born', 5, 2018, 1, 2)


--Problem 14.	Car Rental Database
CREATE DATABASE [CarRental]
USE [CarRental]

CREATE TABLE [Categories](
	[Id] INT PRIMARY KEY IDENTITY,
	[CategoryName] NVARCHAR(200) NOT NULL,
	[DailyRate] DECIMAL(3,1),
	[WeeklyRate] DECIMAL(3,1),
	[MonthlyRate] DECIMAL(3,1),
	[WeekendRate] DECIMAL(3,1)
)

CREATE TABLE [Cars](
	[Id] INT PRIMARY KEY IDENTITY,
	[PlateNumber] NVARCHAR(50),
	[Manufacturer] NVARCHAR(100) NOT NULL,
	[Model] NVARCHAR (100) NOT NULL,
	[CarYear] INT NOT NULL,
	[CategoryId] INT FOREIGN KEY REFERENCES [Categories]([Id]) NOT NULL,
	[Doors] INT,
	[Picture] VARBINARY(MAX),
	[Condition] NVARCHAR(MAX),
	[Available] NVARCHAR(MAX)
)

CREATE TABLE [Employees](
	[Id] INT PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR (100) NOT NULL,
	[LastName] NVARCHAR (100) NOT NULL,
	[Title] NVARCHAR(100),
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [Customers](
	[Id] INT PRIMARY KEY IDENTITY,
	[DriverLicenseNumber] INT NOT NULL,
	[FullName] NVARCHAR(200) NOT NULL,
	[Address] NVARCHAR(MAX),
	[City] NVARCHAR(MAX),
	[ZIPCode] NVARCHAR(MAX),
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [RentalOrders](
	[Id] INT PRIMARY KEY IDENTITY,
	[EmployeeId] INT FOREIGN KEY REFERENCES [Employees]([Id]) NOT NULL,
	[CustomerId] INT FOREIGN KEY REFERENCES [Customers]([Id]) NOT NULL,
	[CarId] INT FOREIGN KEY REFERENCES [Cars]([Id]) NOT NULL,
	[TankLevel] DECIMAL (4,2),
	[KilometrageStart] INT,
	[KilometrageEnd] INT,
	[TotalKilometrage]	INT,
	[StartDate] DATE,
	[EndDate] DATE,
	[TotalDays] INT,
	[RateApplied] DECIMAL(3,1),
	[TaxRate] DECIMAL(3,1),
	[OrderStatus] NVARCHAR(MAX) NOT NULL,
	[Notes] NVARCHAR(MAX)
)

INSERT INTO [Categories]([CategoryName]) VALUES
('Sedan')
,('Hatchback')
,('Coupe')

INSERT INTO [Cars]([Manufacturer], [Model], [CarYear],[CategoryId]) VALUES
('Corvette', 'C7', 2018, 3)
,('Lamborghini', 'Vision GT', 2021, 3)
,('Opel', 'Vectra', 2005, 2)

INSERT INTO [Employees]([FirstName], [LastName]) VALUES
('Roger', 'Stevens')
,('Michael' ,'Jackson')
,('Cameron', 'Black')

INSERT INTO [Customers]([DriverLicenseNumber],[FullName]) VALUES
(3212, 'Dan The Man')
,(1520, 'George The Great')
,(6969, 'Roy')


INSERT INTO [RentalOrders]([EmployeeId],[CustomerId],[CarId],[OrderStatus]) VALUES
(1, 1, 3, 'Approved')
,(3, 3, 2, 'Approved')
,(2, 2, 1, 'Pending')


--Problem 15
CREATE DATABASE [Hotels]
USE [Hotels]

CREATE TABLE [Employees](
	[Id] INT PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR (100) NOT NULL,
	[LastName] NVARCHAR (100) NOT NULL,
	[Title] NVARCHAR(100),
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [Customers](
	[AccountNumber] INT PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR (100) NOT NULL,
	[LastName] NVARCHAR (100) NOT NULL,
	[PhoneNumber] INT NOT NULL,
	[EmergencyName] NVARCHAR(100),
	[EmergencyNumber] INT,
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [RoomStatus](
	[RoomStatus] NVARCHAR(450) PRIMARY KEY,
	[Notes] NVARCHAR(MAX)
)
CREATE TABLE [RoomTypes](
	[RoomType] NVARCHAR(450) PRIMARY KEY,
	[Notes] NVARCHAR(MAX)
)
CREATE TABLE [BedTypes](
	[BedType] NVARCHAR(450) PRIMARY KEY,
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [Rooms](
	[RoomNumber] INT PRIMARY KEY,
	[RoomType] NVARCHAR(450) FOREIGN KEY REFERENCES [RoomTypes]([RoomType]),
	[BedType] NVARCHAR(450) FOREIGN KEY REFERENCES [BedTypes]([BedType]),
	[Rate] DECIMAL (3,1),
	[RoomStatus] NVARCHAR(450) FOREIGN KEY REFERENCES [RoomStatus]([RoomStatus]),
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [Payments]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[EmployeeId] INT FOREIGN KEY REFERENCES [Employees]([Id]),
	[PaymentDate] DATE,
	[AccountNumber] INT FOREIGN KEY REFERENCES [Customers]([AccountNumber]),
	[FirstDateOccupied] DATE,
	[LastDateOccupied] DATE,
	[TotalDays] INT,
	[AmountCharged] DECIMAL(10,2),
	[TaxRate] DECIMAL(10,2),
	[TaxAmount] DECIMAL(10,2),
	[PaymentTotal] DECIMAL(10,2) NOT NULL,
	[Notes] NVARCHAR(MAX)
)

CREATE TABLE [Occupancies]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[EmployeeId] INT FOREIGN KEY REFERENCES [Employees]([Id]),
	[DateOccupied] DATE,
	[AccountNumber] INT FOREIGN KEY REFERENCES [Customers]([AccountNumber]),
	[RoomNumber] INT FOREIGN KEY REFERENCES [Rooms]([RoomNumber]),
	[RateApplied] DECIMAL(5,2),
	[PhoneCharge] DECIMAL(5,2),
	[Notes] NVARCHAR(MAX)
)

INSERT INTO [Employees] ([FirstName], [LastName]) VALUES
('Roger', 'Stevens')
,('Michael' ,'Jackson')
,('Cameron', 'Black')
INSERT INTO Customers (FirstName, LastName, PhoneNumber) VALUES
('Dan', 'The Man', 0887654165)
,('George', 'The Great', 0881254165)
,('Roy', 'The Boy', 0875654165)
INSERT INTO RoomStatus(RoomStatus) VALUES
('Available'),
('Already Taken'),
('In Renovation')
INSERT INTO RoomTypes(RoomType) VALUES
('Single'),
('Double'),
('President')
INSERT INTO BedTypes(BedType) VALUES
('Single'),
('Double'),
('For Fun')
INSERT INTO Rooms(RoomNumber, RoomType, BedType, RoomStatus) VALUES
(123, 'Single', 'Single', 'Already Taken'),
(218, 'Double', 'Double', 'In Renovation'),
(333, 'President', 'For Fun', 'Available')
INSERT INTO Payments (EmployeeId, AccountNumber, PaymentTotal) VALUES
(1, 1, 1375.25),
(2, 2, 683.21),
(3, 3, 2731.89)
INSERT INTO [Occupancies] ([EmployeeId], [AccountNumber], [RoomNumber]) VALUES
(1, 1, 123),
(2, 2, 218),
(3, 3, 333)