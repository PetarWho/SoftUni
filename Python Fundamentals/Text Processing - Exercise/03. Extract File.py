route = input()

fileIndex = route.rindex('\\')
file = route[fileIndex + 1:]

print(f"File name: {file.split('.')[0]}")
print(f"File extension: {file.split('.')[1]}")
