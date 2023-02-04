row_count, col_count = map(int, input().split())
for i in range(row_count):
    row = [chr(ord("a") + i) + chr(ord("a") + i + j) + chr(ord("a") + i) for j in range(col_count)]
    print(*row)
