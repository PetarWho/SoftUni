# THIS PROBLEM CAN BE SOLVED IN 30-40 LINES!
# MINE IS WORKING CORRECTLY BUT I DON'T HAVE THE TIME TO OPTIMIZE IT.
# YOU CAN TRY AND MAKE IT BETTER :)
# HAPPY CODING!

def find_element(matrix_given):
    for i in range(len(matrix_given)):
        for j in range(len(matrix_given[0])):
            if matrix_given[i][j] == 'T':
                return (i, j)
    return None


N = int(input())
car_number = input()
car_position = [0, 0]
kilometers = 0
finish = False

matrix = [[x for x in input().split()] for _ in range(N)]
matrix[0][0] = 'C'

command = input()
while command != "End":
    if command == "down":
        if matrix[car_position[0]+1][car_position[1]] == 'T':
            matrix[car_position[0]+1][car_position[1]] = '.'
            r, c = find_element(matrix)
            car_position[0] = r
            car_position[1] = c
            kilometers += 30
        else:
            if matrix[car_position[0] + 1][car_position[1]] == 'F':
                finish = True
            matrix[car_position[0]][car_position[1]] = '.'
            car_position[0] += 1
            kilometers += 10
    elif command == "left":
        if matrix[car_position[0]][car_position[1] - 1] == 'T':
            matrix[car_position[0]][car_position[1] - 1] = '.'
            r, c = find_element(matrix)
            car_position[0] = r
            car_position[1] = c
            kilometers += 30
        else:
            if matrix[car_position[0]][car_position[1] - 1] == 'F':
                finish = True
            matrix[car_position[0]][car_position[1]] = '.'
            car_position[1] -= 1
            kilometers += 10
    elif command == "right":
        if matrix[car_position[0]][car_position[1] + 1] == 'T':
            matrix[car_position[0]][car_position[1] + 1] = '.'
            r, c = find_element(matrix)
            car_position[0] = r
            car_position[1] = c
            kilometers += 30
        else:
            if matrix[car_position[0]][car_position[1] + 1] == 'F':
                finish = True
            matrix[car_position[0]][car_position[1]] = '.'
            car_position[1] += 1
            kilometers += 10
    elif command == "up":
        if matrix[car_position[0]-1][car_position[1]] == 'T':
            matrix[car_position[0]-1][car_position[1]] = '.'
            r, c = find_element(matrix)
            car_position[0] = r
            car_position[1] = c
            kilometers += 30
        else:
            if matrix[car_position[0] - 1][car_position[1]] == 'F':
                finish = True
            matrix[car_position[0]][car_position[1]] = '.'
            car_position[0] -= 1
            kilometers += 10

    command = input()

    if finish:
        break

matrix[car_position[0]][car_position[1]] = 'C'
print(f"Racing car {car_number} finished the stage!") if finish else print(f"Racing car {car_number} DNF.")
print(f"Distance covered {kilometers} km.")
for row in matrix:
    for element in row:
        print(element, end='')
    print()
