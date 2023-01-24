from collections import deque

initial_expression = input().split()
numbers = deque()

operators = {
    "*": lambda x, y: x * y,
    "/": lambda x, y: x // y,
    "+": lambda x, y: x + y,
    "-": lambda x, y: x - y,
}

for token in initial_expression:
    if token in operators:
        while len(numbers) > 1:
            numbers.appendleft(operators[token](numbers.popleft(), numbers.popleft()))
    else:
        numbers.append(int(token))

print(numbers.popleft())
