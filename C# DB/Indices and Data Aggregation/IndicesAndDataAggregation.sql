--Problem 1. Records’ Count
SELECT 
COUNT(*)
FROM [WizzardDeposits]

--Problem 2. Longest Magic Wand
SELECT 
MAX(wd.[MagicWandSize]) AS [LongestMagicWand]
FROM [WizzardDeposits] AS wd

--Problem 3. Longest Magic Wand Per Deposit Groups
SELECT 
wd.[DepositGroup],
MAX(wd.[MagicWandSize]) AS [LongestMagicWand]
FROM [WizzardDeposits] AS wd
GROUP BY wd.[DepositGroup]

--Problem 4. * Smallest Deposit Group Per Magic Wand Size
SELECT TOP 2 
wd.[DepositGroup] 
FROM [WizzardDeposits] AS wd
GROUP BY wd.[DepositGroup]
ORDER BY AVG(wd.[MagicWandSize])

--Problem 5. Deposits Sum
SELECT
wd.[DepositGroup], SUM(wd.[DepositAmount]) AS [TotalSum]
FROM [WizzardDeposits] AS wd
GROUP BY wd.[DepositGroup]

--Problem 6. Deposits Sum for Ollivander Family
SELECT
wd.[DepositGroup], SUM(wd.[DepositAmount]) AS [TotalSum]
FROM [WizzardDeposits] AS wd
WHERE wd.[MagicWandCreator] = 'Ollivander family'
GROUP BY wd.[DepositGroup]

--Problem 7. Deposits Filter
SELECT
wd.[DepositGroup], SUM(wd.[DepositAmount]) AS [TotalSum]
FROM [WizzardDeposits] AS wd
WHERE wd.[MagicWandCreator] = 'Ollivander family'
GROUP BY wd.[DepositGroup]
HAVING SUM(wd.[DepositAmount])<150000
ORDER BY [TotalSum] DESC

--Problem 8.  Deposit Charge
SELECT
wd.[DepositGroup], wd.[MagicWandCreator], MIN(wd.[DepositCharge])
FROM [WizzardDeposits] AS wd
GROUP BY wd.[DepositGroup], wd.[MagicWandCreator]
ORDER BY wd.[MagicWandCreator], wd.[DepositGroup]

--Problem 9. Age Groups
SELECT [AgeByGroup] [AgeGroup], COUNT([AgeByGroup])
FROM (SELECT 
		CASE 
			WHEN [Age] BETWEEN 0 AND 10 THEN '[0-10]'
			WHEN [Age] BETWEEN 11 AND 20 THEN '[11-20]'
			WHEN [Age] BETWEEN 21 AND 30 THEN '[21-30]'
			WHEN [Age] BETWEEN 31 AND 40 THEN '[31-40]'
			WHEN [Age] BETWEEN 41 AND 50 THEN '[41-50]'
			WHEN [Age] BETWEEN 51 AND 60 THEN '[51-60]'
			ELSE '[61+]'
		END AS [AgeByGroup]
		FROM [WizzardDeposits]) AS [AgeByGroupTable]
GROUP BY [AgeByGroup]

--Problem 10. First Letter
SELECT DISTINCT
SUBSTRING(wd.[FirstName],1,1) AS [FirstLetter]
FROM [WizzardDeposits] AS wd
GROUP BY wd.[DepositGroup], wd.[FirstName]
HAVING wd.[DepositGroup] = 'Troll Chest'
ORDER BY [FirstLetter]

--Problem 11. Average Interest 
SELECT 
[DepositGroup], [isDepositExpired], AVG([DepositInterest]) AS [AverageInterest]
FROM [WizzardDeposits]
WHERE [DepositStartDate] > '1985-01-01'
GROUP BY [DepositGroup], [IsDepositExpired]
ORDER BY [DepositGroup] DESC, [IsDepositExpired]

--Problem 12. * Rich Wizard, Poor Wizard
SELECT SUM([Difference]) [SumDifference]
FROM (SELECT [FirstName][Host Wizard], 
	[DepositAmount][Host Wizard Deposit],
	LEAD([FirstName]) OVER(ORDER BY [Id]) AS [Guest Wizard],
	LEAD([DepositAmount]) OVER(ORDER BY [Id])AS [Guest Wizard Deposit],
	([DepositAmount] - LEAD([DepositAmount]) OVER(ORDER BY [Id])) AS [Difference]
	FROM [WizzardDeposits]) AS [SumTable]

--Problem 13. Departments Total Salaries
SELECT
e.[DepartmentID], SUM(e.[Salary]) AS [TotalSalary]
FROM [Employees] AS e
GROUP BY e.[DepartmentID]
ORDER BY e.[DepartmentID]

--Problem 14. Employees Minimum Salaries
SELECT
e.[DepartmentID], MIN(e.[Salary]) AS [MinimumSalary]
FROM [Employees] AS e
WHERE e.[HireDate] > '01/01/2000'
GROUP BY e.[DepartmentID]
HAVING e.[DepartmentID] IN (2,5,7)

--Problem 15. Employees Average Salaries
SELECT * 
INTO [NewTable]
FROM [Employees]
WHERE [Salary] > 30000 

DELETE FROM [NewTable]
WHERE [ManagerID] = 42

UPDATE [NewTable]
SET [Salary] = [Salary] + 5000
WHERE [DepartmentID] = 1

SELECT [DepartmentID], AVG([Salary])
FROM [NewTable]
GROUP BY [DepartmentID]

--Problem 16. Employees Maximum Salaries
SELECT
e.[DepartmentID], MAX(e.[Salary])
FROM [Employees] AS e
GROUP BY e.[DepartmentID]
HAVING MAX(e.[Salary]) NOT BETWEEN 30000 AND 70000

--Problem 17. Employees Count Salaries
SELECT
COUNT(*) AS [Count]
FROM [Employees]
WHERE [ManagerID] IS NULL


--Problem 18. *3rd Highest Salary
SELECT [DepartmentID], [RankedTable].[Salary] [ThirdHighestSalary]
FROM (SELECT [DepartmentID], 
			 [Salary], 
			 DENSE_RANK() OVER(PARTITION BY [DepartmentID] ORDER BY [Salary] DESC) AS [Rank]
		FROM [Employees]
		GROUP BY [DepartmentID],[Salary]) AS [RankedTable]
WHERE [Rank] = 3

--Problem 19. **Salary Challenge
SELECT TOP 10
[FirstTable].[FirstName], [FirstTable].[LastName], [FirstTable].[DepartmentID]
FROM [Employees] AS [FirstTable]
JOIN (SELECT [DepartmentID], AVG([Salary]) AS[AvgSalary]
					  FROM [Employees] 
					  GROUP BY [DepartmentID]) AS[SecondTable]
		  ON [FirstTable].[DepartmentID] = [SecondTable].[DepartmentID]
WHERE [Salary] > [AvgSalary]
ORDER BY [FirstTable].[DepartmentID]