rows, cols = map(int, input().split())
snake = input()
matrix = [[0 for _ in range(cols)] for _ in range(rows)]
idx = 0
for i in range(rows):
    for j in range(cols):
        matrix[i][j] = snake[idx % len(snake)]
        idx += 1
    if i % 2 == 1:
        matrix[i].reverse()

for row in matrix:
    print(''.join(row))
