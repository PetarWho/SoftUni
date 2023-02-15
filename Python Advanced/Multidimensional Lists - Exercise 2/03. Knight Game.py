rows_count = int(input())
matrix = [[x for x in input()] for _ in range(rows_count)]
knight_movings = {(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)}
knights_with_most_attacks = []
removed_knights = 0

while True:
    max_knights = 0
    max_knight = []
    for i in range(rows_count):
        for j in range(rows_count):
            if matrix[i][j] == "K":
                current_knights = 0
                for move in knight_movings:
                    if (
                        i + move[0] >= 0
                        and i + move[0] < rows_count
                        and j + move[1] >= 0
                        and j + move[1] < rows_count
                    ):
                        if matrix[i + move[0]][j + move[1]] == "K":
                            current_knights += 1
                if current_knights > max_knights:
                    max_knights = current_knights
                    max_knight = [i, j]
    if max_knights == 0:
        break
    else:
        matrix[max_knight[0]][max_knight[1]] = "0"
        removed_knights += 1

print(removed_knights)
