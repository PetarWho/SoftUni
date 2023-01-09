line = list(input())
print(''.join([letter for index, letter in enumerate(line) if index == 0 or letter != line[index-1]]))
