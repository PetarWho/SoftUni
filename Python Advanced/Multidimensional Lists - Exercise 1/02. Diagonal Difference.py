matrix = [[int(y) for y in input().split()] for x in range(int(input()))]
print(abs(sum([matrix[i][i] for i in range(len(matrix))]) - sum([matrix[i][-i-1] for i in range(len(matrix))])))
