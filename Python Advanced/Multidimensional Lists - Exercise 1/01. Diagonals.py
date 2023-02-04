matrix = [[int(y) for y in input().split(', ')] for x in range(int(input()))]

print("Primary diagonal: ", end='')
print(f"{', '.join(map(str, [matrix[i][i] for i in range(len(matrix))]))}. Sum: {sum([matrix[i][i] for i in range(len(matrix))])}")
print("Secondary diagonal: ", end='')
print(f"{', '.join(map(str, [matrix[i][-i-1] for i in range(len(matrix))]))}. Sum: {sum([matrix[i][-i-1] for i in range(len(matrix))])}")
