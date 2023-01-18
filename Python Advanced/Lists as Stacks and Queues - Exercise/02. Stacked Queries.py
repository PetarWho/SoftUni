n = int(input())

stack = []

for _ in range(0, n):
    line = input().split(' ')

    if line[0] == '1':
        stack.append(int(line[1]))

    elif line[0] == '2' and len(stack) > 0:
        stack.pop()

    elif line[0] == '3' and len(stack) > 0:
        print(max(stack))

    elif line[0] == '4' and len(stack) > 0:
        print(min(stack))

print(', '. join(str(item) for item in reversed(stack)))
