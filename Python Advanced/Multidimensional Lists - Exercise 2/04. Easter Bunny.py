rows_count = int(input())
matrix = [[x for x in input().split()] for _ in range(rows_count)]
bunny_movings = {(-1, 0), (1, 0), (0, -1), (0, 1)}
bunny_position = [ [i, j] for i in range(rows_count) for j in range(rows_count) if matrix[i][j] == "B" ]
max_collected_eggs = 0
max_collected_eggs_direction = ""
max_collected_eggs_indexes = []

for move in bunny_movings:
    collected_eggs = 0
    collected_eggs_indexes = []
    current_position = [bunny_position[0][0], bunny_position[0][1]]
    while True:
        if (
            current_position[0] + move[0] >= 0
            and current_position[0] + move[0] < rows_count
            and current_position[1] + move[1] >= 0
            and current_position[1] + move[1] < rows_count
        ):
            if matrix[current_position[0] + move[0]][current_position[1] + move[1]] != "X":
                if matrix[current_position[0] + move[0]][current_position[1] + move[1]] != "B":
                    collected_eggs += int(matrix[current_position[0] + move[0]][current_position[1] + move[1]])
                    collected_eggs_indexes.append([current_position[0] + move[0], current_position[1] + move[1]])
                    current_position = [current_position[0] + move[0], current_position[1] + move[1]]
                else:
                    break
            else:
                break
        else:
            break
    if collected_eggs > max_collected_eggs:
        max_collected_eggs = collected_eggs
        max_collected_eggs_direction = move
        max_collected_eggs_indexes = collected_eggs_indexes

for move in bunny_movings:
    if move == max_collected_eggs_direction:
        if move == (-1, 0):
            print("up")
        elif move == (1, 0):
            print("down")
        elif move == (0, -1):
            print("left")
        elif move == (0, 1):
            print("right")

print(*max_collected_eggs_indexes, sep="\n")
print(max_collected_eggs)
