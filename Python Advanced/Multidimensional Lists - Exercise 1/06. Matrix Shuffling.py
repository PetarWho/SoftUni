r, c = [int(x) for x in input().split()]
matrix = [[x for x in input().split()] for _ in range(r)]
while True:
    cmd = input().split()
    if cmd[0] == "END":
        break
    if cmd[0] == "swap" and len(cmd) == 5:
        r1, c1, r2, c2 = [int(x) for x in cmd[1:]]
        if all(0 <= x < c for x in [c1, c2]) and all(0 <= x < r for x in [r1, r2]):
            matrix[r1][c1], matrix[r2][c2] = matrix[r2][c2], matrix[r1][c1]
            for row in matrix:
                print(*row, sep=" ")
        else:
            print("Invalid input!")
    else:
        print("Invalid input!")
