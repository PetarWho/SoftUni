rows = int(input())
matrix = [[int(x) for x in input().split()] for _ in range(rows)]

while True:
    command = input().split()
    if command[0] == "END":
        break
    command, row, col, value = command
    row, col, value = int(row), int(col), int(value)

    if not (0 <= row < rows) or not (0 <= col < len(matrix[row])):
        print("Invalid coordinates")
        continue

    if command == "Add":
        matrix[row][col] += value
    elif command == "Subtract":
        matrix[row][col] -= value

for row in matrix:
    print(*row)
    