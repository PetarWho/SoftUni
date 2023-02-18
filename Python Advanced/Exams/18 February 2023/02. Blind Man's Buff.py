n, m = map(int, input().split())

playground = [input().split() for _ in range(n)]

row, col = None, None
for i in range(n):
    for j in range(m):
        if playground[i][j] == "B":
            row, col = i, j

touched_opponents = 0
moves_made = 0

while True:
    command = input()
    if command == "Finish":
        break

    new_row, new_col = row, col

    if command == "up":
        new_row -= 1
    elif command == "down":
        new_row += 1
    elif command == "left":
        new_col -= 1
    elif command == "right":
        new_col += 1

    if new_row < 0 or new_row >= n or new_col < 0 or new_col >= m:
        continue

    if playground[new_row][new_col] == "O":
        continue

    if playground[new_row][new_col] == "P":
        touched_opponents += 1
        moves_made += 1
        playground[new_row][new_col] = "-"
        row, col = new_row, new_col
    else:
        moves_made += 1
        row, col = new_row, new_col

    if touched_opponents == 3:
        break

print("Game over!")
print(f"Touched opponents: {touched_opponents} Moves made: {moves_made}")
