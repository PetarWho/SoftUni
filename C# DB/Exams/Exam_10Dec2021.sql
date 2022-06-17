--Problem 1. Create Database
CREATE DATABASE [Airport]
GO
USE [Airport]
GO

CREATE TABLE [Passengers](
	[Id] INT PRIMARY KEY IDENTITY,
	[FullName] VARCHAR(100) UNIQUE NOT NULL,
	[Email] VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE [Pilots](
	[Id] INT PRIMARY KEY IDENTITY,
    [FirstName] VARCHAR(30) UNIQUE NOT NULL,
	[LastName] VARCHAR(30) UNIQUE NOT NULL,
	[Age] TINYINT NOT NULL CHECK([Age] BETWEEN 21 AND 62),
	[Rating] FLOAT CHECK([Rating] BETWEEN 0 AND 10)
)

CREATE TABLE [AircraftTypes](
	[Id] INT PRIMARY KEY IDENTITY,
	[TypeName] VARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE Aircraft(
	[Id] INT PRIMARY KEY IDENTITY,
	[Manufacturer] VARCHAR(25) NOT NULL,
	[Model] VARCHAR(30) NOT NULL,
	[Year] INT NOT NULL,
	[FlightHours] INT,
	[Condition] CHAR(1) NOT NULL,
	[TypeId] INT REFERENCES [AircraftTypes]([Id]) NOT NULL
)

CREATE TABLE PilotsAircraft(
	[AircraftId] INT REFERENCES [Aircraft]([Id]) NOT NULL,
	[PilotId] INT REFERENCES [Pilots]([Id]) NOT NULL,
	PRIMARY KEY([AircraftId], [PilotId])
)

CREATE TABLE [Airports](
	[Id] INT PRIMARY KEY IDENTITY,
	[AirportName] VARCHAR(70) UNIQUE NOT NULL,
	[Country] VARCHAR(100) UNIQUE NOT NULL
)

CREATE TABLE [FlightDestinations](
	[Id] INT PRIMARY KEY IDENTITY,
	[AirportId] INT REFERENCES [Airports]([Id]) NOT NULL,
	[Start] DATETIME NOT NULL,
	[AircraftId] INT REFERENCES [Aircraft]([Id]) NOT NULL,
	[PassengerId] INT REFERENCES [Passengers]([Id]) NOT NULL,
	[TicketPrice] DECIMAL(18,2) DEFAULT 15 NOT NULL
)

--Problem 2. Insert
INSERT INTO [Passengers]
SELECT 
CONCAT([FirstName], ' ', [LastName]) AS [FullName],
CONCAT([FirstName], [LastName], '@gmail.com') AS [Email]
FROM [Pilots]
WHERE [Id] BETWEEN 5 AND 15

--Problem 3.Update
UPDATE [Aircraft]
SET [Condition] = 'A'
WHERE ([Condition] = 'B' OR [Condition] = 'C')
AND ([FlightHours] IS NULL OR [FlightHours] <=100)
AND [Year] >=2013

--Problem 4. Delete
DELETE FROM [Passengers]
WHERE LEN([FullName]) <=10

--Problem 5.	Aircraft
SELECT
[Manufacturer], [Model], [FlightHours], [Condition]
FROM [Aircraft]
ORDER BY [FlightHours] DESC

--Problem 6.	Pilots and Aircraft
SELECT
p.[FirstName], p.[LastName],
a.[Manufacturer], a.[Model], a.[FlightHours]
FROM [Pilots] AS p
JOIN [PilotsAircraft] AS pa ON p.[Id] = pa.[PilotId]
JOIN [Aircraft] AS a ON pa.AircraftId = a.[Id]
WHERE a.[FlightHours] IS NOT NULL
AND a.[FlightHours] <=304
ORDER BY a.[FlightHours] DESC, p.[FirstName]

--Problem 7.	Top 20 Flight Destinations
SELECT TOP 20
d.[Id] AS [DestinationId], 
d.[Start],
p.[FullName],
a.[AirportName],
d.[TicketPrice]
FROM [FlightDestinations] AS d
JOIN [Passengers] AS p ON d.[PassengerId] = p.[Id]
JOIN [Airports] AS a ON d.[AirportId] = a.[Id]
WHERE DAY(d.[Start]) % 2 = 0
ORDER BY d.[TicketPrice] DESC, a.[AirportName]

--Problem 8.	Number of Flights for Each Aircraft
SELECT
a.[Id] AS [AircraftId],
a.[Manufacturer],
a.[FlightHours],
COUNT(*) AS [FlightDestinationsCount],
ROUND(AVG(fd.[TicketPrice]),2) AS [AvgPrice]
FROM [Aircraft] AS a
JOIN [FlightDestinations] AS fd ON a.[Id] = fd.[AircraftId]
GROUP BY a.[Id], a.[Manufacturer], a.[FlightHours]
HAVING COUNT(*) >=2
ORDER BY [FlightDestinationsCount] DESC, a.[Id]

--Problem 9.	Regular Passengers
SELECT
p.[FullName],
COUNT(*) AS [CountOfAircrafts],
SUM(fd.[TicketPrice]) AS [TotalPayed]
FROM [Passengers] AS p
JOIN [FlightDestinations] AS fd ON p.[Id] = fd.[PassengerId]
GROUP BY p.[FullName]
HAVING SUBSTRING(p.[FullName], 2,1) = 'a' AND COUNT(*) >1
ORDER BY p.[FullName]

--Problem 10.	Full Info for Flight Destinations
SELECT
a.[AirportName],
fd.[Start],
fd.[TicketPrice],
p.[FullName],
ac.[Manufacturer],
ac.[Model]
FROM [FlightDestinations] AS fd
JOIN [Airports] AS a ON fd.[AirportId] = a.[Id]
JOIN [Passengers] AS p ON fd.[PassengerId] = p.[Id]
JOIN [Aircraft] AS ac ON fd.[AircraftId] = ac.[Id]
WHERE DATEPART(HOUR,fd.[Start]) BETWEEN 6 AND 20
AND fd.[TicketPrice] > 2500
ORDER BY ac.[Model]

GO
--Problem 11.	Find all Destinations by Email Address
CREATE FUNCTION udf_FlightDestinationsByEmail(@email VARCHAR(50)) 
RETURNS INT
AS
BEGIN
	RETURN (SELECT COUNT(*) FROM [FlightDestinations] AS fp
	JOIN [Passengers] AS p ON fp.[PassengerId] = p.[Id]
	WHERE p.[Email] = @email)
END

GO
--Problem 12.	Full Info for Airports
CREATE PROC usp_SearchByAirportName(@airportName VARCHAR(70))
AS
BEGIN
	SELECT
	a.[AirportName],
	p.[FullName],
	(CASE 
		WHEN [fd].TicketPrice <= 400 THEN 'Low'
		WHEN [fd].TicketPrice <= 1500 THEN 'Medium'
		ELSE 'High'
	END) AS [LevelOfTicketPrice],
	ac.[Manufacturer],
	ac.[Condition],
	at.[TypeName]
	FROM [Airports] AS a
	JOIN [FlightDestinations] AS fd ON a.[Id] = fd.[AirportId]
	JOIN [Passengers] AS p ON fd.[PassengerId] = p.[Id]
	JOIN [Aircraft] AS ac ON fd.[AircraftId] = ac.[Id]
	JOIN [AircraftTypes] AS [at] ON ac.[TypeId] = [at].[Id]
	WHERE a.[AirportName] = @airportName
	ORDER BY ac.[Manufacturer], p.[FullName]
END