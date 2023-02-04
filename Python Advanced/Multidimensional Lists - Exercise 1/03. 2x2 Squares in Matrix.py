rows, cols = map(int, input().split())
matrix = [[y for y in input().split()] for x in range(rows)]

squares = [[matrix[x][y] == matrix[x][y+1] == matrix[x+1][y] == matrix[x+1][y+1] for y in range(cols-1)] for x in range(rows-1)]
print(sum([sum(x) for x in squares]))
