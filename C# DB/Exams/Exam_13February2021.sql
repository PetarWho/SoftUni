CREATE DATABASE [Bitbucket]
GO
USE [Bitbucket]
GO

--Problem 1. Create 
CREATE TABLE [Users](
	[Id] INT PRIMARY KEY IDENTITY,
	[Username] VARCHAR(30) NOT NULL,
	[Password] VARCHAR(30) NOT NULL,
	[Email] VARCHAR(50) NOT NULL
)

CREATE TABLE [Repositories](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(50) NOT NULL
)

CREATE TABLE [RepositoriesContributors](
	[RepositoryId] INT REFERENCES [Repositories]([Id]) NOT NULL,
	[ContributorId] INT REFERENCES [Users]([Id]) NOT NULL
	PRIMARY KEY([RepositoryId], [ContributorId])
)

CREATE TABLE [Issues](
	[Id] INT PRIMARY KEY IDENTITY,
	[Title] VARCHAR(255) NOT NULL,
	[IssueStatus] VARCHAR(6) NOT NULL,
	[RepositoryId] INT REFERENCES [Repositories]([Id]) NOT NULL,
	[AssigneeId] INT REFERENCES [Users]([Id]) NOT NULL
)

CREATE TABLE [Commits](
	[Id] INT PRIMARY KEY IDENTITY,
	[Message] VARCHAR(255) NOT NULL,
	[IssueId] INT REFERENCES [Issues]([Id]),
	[RepositoryId] INT REFERENCES [Repositories]([Id]) NOT NULL,
	[ContributorId] INT REFERENCES [Users]([Id]) NOT NULL
)

CREATE TABLE [Files](
	[Id] INT PRIMARY KEY IDENTITY,
	[Name] VARCHAR(100) NOT NULL,
	[Size] DECIMAL(18,2) NOT NULL,
	[ParentId] INT REFERENCES[Files]([Id]),
	[CommitId] INT REFERENCES [Commits]([Id]) NOT NULL
)

--Problem 2. Insert
INSERT INTO [Files]([Name],[Size],[ParentId], [CommitId]) VALUES
('Trade.idk', 2598.0, 1, 1)
,('menu.net', 9238.31, 2, 2)
,('Administrate.soshy', 1246.93, 3, 3)
,('Controller.php', 7353.15, 4, 4)
,('Find.java', 9957.86, 5, 5)
,('Controller.json', 14034.87, 3, 6)
,('Operate.xix', 7662.92, 7, 7)

INSERT INTO [Issues]([Title], [IssueStatus], [RepositoryId], [AssigneeId]) VALUES
('Critical Problem with HomeController.cs file', 'open', 1, 4)
,('Typo fix in Judge.html', 'open', 4, 3)
,('Implement documentation for UsersService.cs', 'closed', 8, 2)
,('Unreachable code in Index.cs', 'open', 9, 8)

--Problem 3. Update
UPDATE [Issues]
SET [IssueStatus] = 'closed'
WHERE [AssigneeId] = 6

--Problem 4. Delete
DELETE FROM [Issues]
WHERE [RepositoryId] = 3

DELETE FROM [RepositoriesContributors]
WHERE [RepositoryId] = 3

--Problem 5. Commits
SELECT
[Id], [Message], [RepositoryId], [ContributorId]
FROM [Commits]
ORDER BY [Id], [Message], [RepositoryId], [ContributorId]

--Problem 6.	Front-end
SELECT
[Id], [Name], [Size]
FROM [Files]
WHERE [Size] >1000
AND [Name] LIKE '%html%'
ORDER BY [Size] DESC, [Id], [Name]

--Problem 7.	Issue Assignment
SELECT
i.[Id],
CONCAT(u.[Username], ' : ', i.[Title]) AS [IssueAssignee]
FROM [Issues] AS i
JOIN [Users] AS u ON i.[AssigneeId] = u.[Id]
WHERE i.[AssigneeId] = u.[Id]
ORDER BY i.[Id] DESC, [IssueAssignee]

--Problem 8.	Single Files
SELECT
[Id], [Name], CONCAT([Size],'KB') AS [Size]
FROM [Files] AS f
WHERE NOT EXISTS (SELECT ParentId FROM Files AS f2 WHERE f.[Id] = f2.[ParentId])
ORDER BY f.[Id], f.[Name], [Size] DESC

--Problem 9.	Commits in Repositories
SELECT TOP 5
r.[Id], r.[Name], COUNT(*) AS [Commits]
FROM [RepositoriesContributors] AS rc
JOIN [Repositories] AS r ON rc.[RepositoryId] = r.[Id]
JOIN [Commits] AS c ON r.[Id] = c.[RepositoryId]
JOIN [Users] AS u ON c.[ContributorId] = u.[Id]
GROUP BY r.[Id], r.[Name]
ORDER BY [Commits] DESC, r.[Id], r.[Name]

--Problem 10.	Average Size
SELECT
u.[Username], AVG(f.[Size]) AS [Size]
FROM [Users] AS u
JOIN [Commits] AS c ON c.[ContributorId] = u.[Id]
JOIN [Files] AS f ON f.[CommitId] = c.[Id]
GROUP BY u.[Id], u.[Username]
ORDER BY AVG(f.[Size]) DESC, u.[Username]

GO
--Problem 11.	All User Commits
CREATE FUNCTION udf_AllUserCommits(@username VARCHAR(30))
RETURNS INT
AS
BEGIN
	RETURN
		(SELECT COUNT(c.[Id]) FROM [Users] AS u
		JOIN [Commits] AS c ON c.[ContributorId] = u.[Id]
		WHERE u.[Username] = @username)
END

GO
--Problem 12.	 Search for Files
CREATE PROC usp_SearchForFiles(@fileExtension VARCHAR(15))
AS
SELECT
f.[Id], f.[Name], CONCAT(f.[Size], 'KB') AS [Size]
FROM [Files] AS f
WHERE f.[Name] LIKE ('%' + @fileExtension)
ORDER BY f.[Id], f.[Name], f.[Size] DESC