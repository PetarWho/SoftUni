--I.	Queries for SoftUni Database
--Problem 1.	Employees with Salary Above 35000
CREATE OR ALTER PROCEDURE usp_GetEmployeesSalaryAbove35000 
AS
SELECT 
[FirstName], [LastName]
FROM [Employees] AS e
WHERE e.[Salary]>35000


GO
--Problem 2.	Employees with Salary Above Number
CREATE OR ALTER PROC usp_GetEmployeesSalaryAboveNumber (@Number DECIMAL(18,4))
AS
SELECT
[FirstName], [LastName]
FROM [Employees] AS e
WHERE e.[Salary]>=@Number


GO
--Problem 3.	Town Names Starting With
CREATE OR ALTER PROC usp_GetTownsStartingWith (@String NVARCHAR(10))
AS
SELECT
t.[Name]
FROM [Towns] AS t
WHERE t.[Name] LIKE @String + '%'


GO
--Problem 4.	Employees from Town
CREATE OR ALTER PROC usp_GetEmployeesFromTown (@DesiredTown NVARCHAR(50))
AS
SELECT
e.[FirstName], e.[LastName]
FROM [Employees] AS e
JOIN [Addresses] AS a ON e.[AddressID] = a.[AddressID]
JOIN [Towns] AS t on a.[TownID] = t.[TownID]
WHERE t.[Name] = @DesiredTown


GO
--Problem 5.	Salary Level Function
CREATE OR ALTER FUNCTION ufn_GetSalaryLevel(@Salary DECIMAL(18,4)) 
RETURNS VARCHAR(7)
AS
BEGIN
DECLARE @Result VARCHAR(7) = 'High'
IF(@salary <30000)
BEGIN
	SET @Result = 'Low'
END
ELSE IF (@salary BETWEEN 30000 AND 50000)
BEGIN
	SET @Result = 'Average'
END
RETURN @Result
END


GO
--Problem 6.	Employees by Salary Level
CREATE OR ALTER PROC usp_EmployeesBySalaryLevel (@Level VARCHAR(7))
AS
SELECT
e.[FirstName], e.[LastName]
FROM [Employees] AS e
WHERE dbo.ufn_GetSalaryLevel(e.[Salary]) = @Level


GO
--Problem 7.	Define Function
CREATE OR ALTER FUNCTION ufn_IsWordComprised(@setOfLetters NVARCHAR(100), @word NVARCHAR(100))
RETURNS BIT
AS
BEGIN
	DECLARE @cnt INT = 1;
	DECLARE @foundLetters INT = 0;

	WHILE @cnt <= LEN(@word)
	BEGIN
		IF(@setOfLetters LIKE '%' + SUBSTRING(@word, @cnt, 1) + '%')
		BEGIN
			SET @foundLetters =  @foundLetters+1
		END
		IF(@foundLetters = LEN(@word))
		BEGIN
			RETURN 1
		END
	SET @cnt = @cnt + 1;
	END;

	RETURN 0
END


GO
--Problem 8.	* Delete Employees and Departments
CREATE OR ALTER PROC usp_DeleteEmployeesFromDepartment (@departmentId INT) 
AS
ALTER TABLE [Departments] ALTER COLUMN [ManagerID] INT NULL
DELETE FROM [Employees]
WHERE [DepartmentID] = @departmentId
DELETE FROM [Departments]
WHERE [DepartmentID] = @departmentId
SELECT COUNT(*) FROM [Employees]
WHERE [DepartmentID] = @departmentId


GO
--II.	Queries for Bank Database
--Problem 9.	Find Full Name
CREATE OR ALTER PROC usp_GetHoldersFullName
AS
SELECT
CONCAT([FirstName], ' ', [LastName]) AS [Full Name]
FROM [AccountHolders]


GO
--Problem 10.	People with Balance Higher Than
CREATE OR ALTER PROC usp_GetHoldersWithBalanceHigherThan (@Number MONEY)
AS
SELECT
ah.[FirstName], ah.[LastName]
FROM [Accounts] AS a
JOIN [AccountHolders] AS ah ON a.[AccountHolderId] = ah.[Id]
GROUP BY a.[AccountHolderId], ah.[FirstName], ah.[LastName]
HAVING SUM(a.[Balance]) > @Number
ORDER BY ah.[FirstName], ah.[LastName]


GO
--Problem 11.	Future Value Function
CREATE OR ALTER FUNCTION ufn_CalculateFutureValue (@sum DECIMAL(8,2), @rate FLOAT, @years INT)
RETURNS DECIMAL (10,4)
AS
BEGIN
	RETURN @sum * (POWER((1+@rate), @years))
END


GO
--Problem 12.	Calculating Interest
CREATE OR ALTER PROC usp_CalculateFutureValueForAccount (@AccountId INT, @Interest FLOAT)
AS
SELECT 
a.[Id] AS [Account Id]
, ah.[FirstName] AS [First Name]
, ah.[LastName] AS [Last Name]
, a.[Balance] AS [Current Balance]
, [dbo].[ufn_CalculateFutureValue](a.[Balance], @Interest, 5) AS [Balance in 5 years]
FROM [Accounts] AS a
JOIN [AccountHolders] AS ah ON a.[Id] = ah.[Id]
WHERE a.[Id] = @AccountId


GO

--III.	Queries for Diablo Database
--Problem 13.	*Scalar Function: Cash in User Games Odd Rows
CREATE OR ALTER FUNCTION ufn_CashInUsersGames (@GameName NVARCHAR(100))
RETURNS TABLE
AS
RETURN
	SELECT
	SUM(new.[Cash]) AS [SumCash]
	FROM
	(SELECT
	g.[Id], ug.[Cash]
	, Row_Number() OVER(ORDER BY ug.[Cash] DESC) AS RowNumber
	FROM [UsersGames] AS ug
	JOIN [Games] AS g ON ug.[GameId] = g.[Id]
	WHERE g.[Name] = @GameName) AS new
	WHERE new.[RowNumber] % 2 = 1


GO
--Problem 14.	Create Table Logs
CREATE TABLE [Logs](	 
	 [LogId] INT PRIMARY KEY IDENTITY
	,[AccountId] INT REFERENCES [Accounts]([Id])
	,[OldSum] DECIMAL(10,2)
	,[NewSum] DECIMAL(10,2))
	GO

CREATE TRIGGER tr_AddLogForEachSumChange
ON [dbo].[Accounts] FOR UPDATE
AS
BEGIN
	INSERT INTO [Logs]([AccountId], [OldSum], [NewSum])  
		SELECT [i].[Id], [d].[Balance] AS [OldSum], [i].[Balance] AS [NewSum]
		FROM [inserted] AS [i]
		JOIN [deleted] AS [d] ON [i].[Id] = [d].[Id]
END


GO
--Problem 15.	Create Table Emails
CREATE TABLE [NotificationEmails](
	[Id] INT PRIMARY KEY IDENTITY,
	[Recipient] INT REFERENCES [Accounts]([Id]),
	[Subject] NVARCHAR(MAX),
	[Body] NVARCHAR(MAX)
)
GO

CREATE OR ALTER TRIGGER tr_createNewEmailWhenLogIsInserted
ON [Logs] FOR INSERT
AS
BEGIN
	INSERT INTO [NotificationEmails]([Recipient], [Subject], [Body])  
		SELECT [i].[AccountId], 
		CONCAT('Balance change for account: ', [i].[AccountId]) AS [Subject],
		CONCAT('On '
		, CAST(GETDATE() AS DATE)
		, ' your balance was changed from '
		, [i].[OldSum] ,'to'
		, [i].[NewSum] ,'.') AS [Body]
		FROM [inserted] AS [i]
END


GO
--Problem 16.	Deposit Money
CREATE OR ALTER PROC usp_DepositMoney (@AccountId INT, @MoneyAmount DECIMAL(10,4)) 
AS
BEGIN TRANSACTION
	IF(@MoneyAmount <0)
	BEGIN
		ROLLBACK
	END
	UPDATE [Accounts]
	SET [Balance] +=@MoneyAmount
	WHERE [Id] = @AccountId
COMMIT


GO
--Problem 17.	Withdraw Money
CREATE OR ALTER PROC usp_WithdrawMoney (@AccountId INT, @MoneyAmount DECIMAL(10,4)) 
AS
BEGIN TRANSACTION
	IF(@MoneyAmount<0)
	BEGIN
		ROLLBACK
	END
	UPDATE [Accounts]
	SET [Balance] -= @MoneyAmount
	WHERE [Id] = @AccountId
COMMIT


GO
--Problem 18.	Money Transfer
CREATE OR ALTER PROC usp_TransferMoney(@SenderId INT, @ReceiverId INT, @Amount DECIMAL(10,4)) 
AS
BEGIN TRANSACTION
	IF(@Amount<0)
	BEGIN
		ROLLBACK
	END

	DECLARE @SenderBal DECIMAL(10,4) =
	(SELECT [Balance] FROM [Accounts] WHERE [Id] = @SenderId)
	IF(@SenderBal < @Amount)
	BEGIN
		ROLLBACK
	END
	EXEC usp_DepositMoney @ReceiverId, @Amount
	EXEC usp_WithdrawMoney @SenderId, @Amount
COMMIT


GO
--IV. Queries for SoftUni Database
--Problem 21.	Employees with Three Projects
CREATE OR ALTER PROC usp_AssignProject(@employeeId INT, @projectID INT) 
AS
BEGIN TRANSACTION
	DECLARE @Count INT = (SELECT COUNT([ProjectId]) 
	FROM [EmployeesProjects] AS ep
	WHERE [EmployeeId] = @employeeId
	GROUP BY ep.[EmployeeID])

	IF(@Count >= 3)
	BEGIN
		ROLLBACK
		RAISERROR('The employee has too many projects!', 16, 1) 		
		RETURN	
	END

	INSERT INTO [EmployeesProjects]([EmployeeID], [ProjectID]) VALUES
	(@employeeId, @projectID)
COMMIT


GO
--Problem 22.	Delete Employees
CREATE TABLE [Deleted_Employees](
EmployeeId INT PRIMARY KEY IDENTITY
, FirstName NVARCHAR(MAX)
, LastName NVARCHAR(MAX)
, MiddleName NVARCHAR(MAX)
, JobTitle NVARCHAR(MAX)
, DepartmentId INT REFERENCES [Departments]([DepartmentId])
, Salary DECIMAL(18,4))

GO

CREATE TRIGGER tr_OnDeletedEmployees
ON [Employees] FOR DELETE
AS
BEGIN
	INSERT INTO [Deleted_Employees](
					[FirstName]
					,[LastName]
					,[MiddleName]
					,[JobTitle]
					,[DepartmentId]
					,[Salary])
				(SELECT 
					[FirstName]
					,[LastName]
					,[MiddleName]
					,[JobTitle]
					,[DepartmentId]
					,[Salary] FROM [deleted])
END