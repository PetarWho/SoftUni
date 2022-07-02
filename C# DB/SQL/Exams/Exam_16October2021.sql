CREATE DATABASE [CigarShop]
GO
USE [CigarShop]
GO

CREATE TABLE [Sizes](
	[Id] INT PRIMARY KEY IDENTITY,
	[Length] INT NOT NULL,
	CHECK ([Length] BETWEEN 10 AND 25),
	[RingRange] DECIMAL(10,2) NOT NULL,
	CHECK ([RingRange] BETWEEN 1.5 AND 7.5)
)

CREATE TABLE [Tastes](
	[Id] INT PRIMARY KEY IDENTITY,
	[TasteType] VARCHAR(20) NOT NULL,
	[TasteStrength] VARCHAR(15) NOT NULL,
	[ImageUrl] NVARCHAR(100) NOT NULL
)

CREATE TABLE [Brands](
	[Id] INT PRIMARY KEY IDENTITY,
	[BrandName] VARCHAR(30) UNIQUE NOT NULL,
	[BrandDescription] VARCHAR(MAX)
)

CREATE TABLE [Cigars](
	[Id] INT PRIMARY KEY IDENTITY,
	[CigarName] VARCHAR(80) NOT NULL,
	[BrandId] INT REFERENCES [Brands]([Id]) NOT NULL,
	[TastId] INT REFERENCES [Tastes]([Id]) NOT NULL,
	[SizeId] INT REFERENCES [Sizes]([Id]) NOT NULL,
	[PriceForSingleCigar] MONEY NOT NULL,
	[ImageUrl] VARCHAR(100) NOT NULL
)

CREATE TABLE [Addresses](
	[Id] INT PRIMARY KEY IDENTITY,
	[Town] VARCHAR(30) NOT NULL,
	[Country] NVARCHAR(30) NOT NULL,
	[Streat] NVARCHAR(100) NOT NULL,
	[ZIP] VARCHAR(20) NOT NULL
)

CREATE TABLE [Clients](
	[Id] INT PRIMARY KEY IDENTITY,
	[FirstName] NVARCHAR(30) NOT NULL,
	[LastName] NVARCHAR(30) NOT NULL,
	[Email] NVARCHAR(50) NOT NULL,
	[AddressId] INT REFERENCES [Addresses]([Id]) NOT NULL
)

CREATE TABLE [ClientsCigars](
	[ClientId] INT REFERENCES [Clients]([Id]) NOT NULL,
	[CigarId] INT REFERENCES [Cigars]([Id]) NOT NULL
	PRIMARY KEY([ClientId], [CigarId])
)

--Problem 2. Insert
INSERT INTO [Cigars]([CigarName], [BrandId], [TastId]
, [SizeId], [PriceForSingleCigar], [ImageUrl]) VALUES
	('COHIBA ROBUSTO', 9, 1, 5, 15.50, 'cohiba-robusto-stick_18.jpg')
	,('COHIBA SIGLO I', 9, 1, 10, 410.00, 'cohiba-siglo-i-stick_12.jpg')
	,('HOYO DE MONTERREY LE HOYO DU MAIRE', 14, 5, 11, 7.50, 'hoyo-du-maire-stick_17.jpg')
	,('HOYO DE MONTERREY LE HOYO DE SAN JUAN', 14, 4, 15, 32.00, 'hoyo-de-san-juan-stick_20.jpg')
	,('TRINIDAD COLONIALES', 2, 3, 8, 85.21, 'trinidad-coloniales-stick_30.jpg')

INSERT INTO [Addresses]([Town], [Country], [Streat], [ZIP]) VALUES
	('Sofia', 'Bulgaria', '18 Bul. Vasil levski', '1000')
	,('Athens', 'Greece', '4342 McDonald Avenue', '10435')
	,('Zagreb', 'Croatia', '4333 Lauren Drive', '10000')

--Problem 3. Update
UPDATE [Cigars]
SET [PriceForSingleCigar] = [PriceForSingleCigar] * 1.2
FROM [Cigars] AS c
JOIN [Tastes] AS t ON c.[TastId] = t.[Id]
WHERE t.[TasteType] = 'Spicy'

UPDATE [Brands]
SET [BrandDescription] = 'New description'
WHERE [BrandDescription] IS NULL

--Problem 4. Delete
DELETE FROM [Clients]
WHERE [AddressId] IN (SELECT [Id] FROM [Addresses] WHERE SUBSTRING([Country], 1, 1) = 'C')

DELETE FROM [Addresses]
WHERE SUBSTRING([Country], 1, 1) = 'C'

--Problem 5. Cigars By Price
SELECT
[CigarName], [PriceForSingleCigar], [ImageURL]
FROM [Cigars]
ORDER BY [PriceForSingleCigar] ASC, [CigarName] DESC

--Problem 6. Cigars by Taste
SELECT
c.[Id], c.[CigarName], c.[PriceForSingleCigar], t.[TasteType], t.[TasteStrength]
FROM [Cigars] AS c
JOIN [Tastes] AS t ON c.[TastId] = t.[Id]
WHERE t.[TasteType] IN ('Earthy', 'Woody')
ORDER BY c.[PriceForSingleCigar] DESC

--Problem 7. Clients without Cigars
SELECT
c.[Id], CONCAT(c.[FirstName], ' ', c.[LastName]) AS ClientName, c.[Email]
FROM [Clients] AS c
WHERE Id NOT IN (SELECT ClientId FROM ClientsCigars)
ORDER BY c.[FirstName]

--Problem 8. First 5 Cigars
SELECT TOP 5
c.[CigarName], c.[PriceForSingleCigar], c.[ImageUrl]
FROM [Cigars] AS c
JOIN [Sizes] AS s ON c.[SizeId] = s.[Id]
WHERE s.[Length] >=12 
AND (c.[CigarName] LIKE '%ci%'
OR c.[PriceForSingleCigar] >50)
AND s.[RingRange] > 2.55
ORDER BY c.[CigarName] ASC, c.[PriceForSingleCigar] DESC

--Problem 09. Clients with ZIP Codes
SELECT 
	CONCAT(cl.[FirstName], ' ', cl.[LastName]) AS [FullName],
	a.[Country],
	a.[ZIP],
	CONCAT('$', MAX(c.[PriceForSingleCigar])) AS [CigarPrice]
FROM [Clients] AS cl
JOIN [Addresses] AS a ON cl.[AddressId] = a.[Id]
JOIN [ClientsCigars] AS cc ON cl.[Id] = cc.[ClientId]
JOIN [Cigars] AS c ON cc.[CigarId] = c.[Id]
WHERE a.[ZIP] NOT LIKE '%[^0-9.]%'
GROUP BY [FirstName], [LastName], a.[Id], a.[Country], a.[ZIP]
ORDER BY [FullName]

--Problem 10.	Cigars by Size
SELECT
cl.[LastName]
, AVG(s.[Length]) AS [CigarLength]
, CEILING(AVG(s.[RingRange])) AS [CigarRingRange]
FROM [Clients] AS cl 
JOIN [ClientsCigars] AS cc ON cl.[Id] = cc.[ClientId]
JOIN [Cigars] AS c ON cc.[CigarId] = c.[Id]
JOIN [Sizes] AS s ON c.[SizeId] = s.[Id]
WHERE cl.Id IN (SELECT cc.ClientId FROM ClientsCigars)
GROUP BY cl.[LastName]
ORDER BY [CigarLength] DESC

GO
--Problem 11.	Client with Cigars
CREATE OR ALTER FUNCTION udf_ClientWithCigars(@name NVARCHAR(MAX)) 
RETURNS INT
AS
BEGIN
	RETURN (SELECT COUNT(*) FROM [ClientsCigars] AS cc
	JOIN [Clients] AS cl ON cc.[ClientId] = cl.[Id]
	JOIN [Cigars] AS c ON cc.[CigarId] = c.[Id]
	WHERE cl.[FirstName] = @name)
END

GO
SELECT dbo.udf_ClientWithCigars('Betty')

GO
--Problem 12.	Search for Cigar with Specific Taste
CREATE OR ALTER PROC usp_SearchByTaste(@taste NVARCHAR(MAX))
AS
SELECT
c.[CigarName]
, CONCAT('$', c.[PriceForSingleCigar]) AS [Price]
, t.[TasteType]
, b.[BrandName]
, CONCAT(s.[Length], ' cm') AS [CigarLength]
, CONCAT(s.[RingRange], ' cm') AS [CigarRingRange]
FROM [Cigars] AS c
JOIN [Sizes] AS s ON c.[SizeId] = s.[Id]
JOIN [Tastes] AS t ON c.[TastId] = t.[Id]
JOIN [Brands] AS b ON c.[BrandId] = b.[Id]
WHERE t.[TasteType] = @taste
ORDER BY s.[Length], s.[RingRange] DESC