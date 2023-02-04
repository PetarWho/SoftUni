rows, columns = map(int, input().split())
matrix = [[int(y) for y in input().split()] for _ in range(rows)]

max_sum_square = -1000000
square_matrix = []

for i in range(rows - 2):
    for j in range(columns - 2):
        current_sum = sum(matrix[i][j:j+3] + matrix[i+1][j:j+3] + matrix[i+2][j:j+3])
        if current_sum > max_sum_square:
            max_sum_square = current_sum
            square_matrix = [[matrix[i][j], matrix[i][j+1], matrix[i][j+2]], [matrix[i+1][j], matrix[i+1][j+1], matrix[i+1][j+2]], [matrix[i+2][j], matrix[i+2][j+1], matrix[i+2][j+2]]]

print(f"Sum = {max_sum_square}")
[print(*row, sep=' ') for row in square_matrix]
