from collections import deque

bees = deque(map(int, input().split()))
nectars = list(map(int, input().split()))
symbols = deque(input().split())
honey = 0

while bees and nectars:
    bee = bees.popleft()
    nectar = nectars.pop()

    if nectar < bee:
        bees.appendleft(bee)
        continue

    symbol = symbols.popleft()

    if nectar == 0 and symbol == '/':
        continue

    honey += abs(eval(f"{bee} {symbol} {nectar}"))

print(f"Total honey made: {honey}")
print(f"Bees left: {', '.join(map(str, bees))}") if bees else None
print(f"Nectar left: {', '.join(map(str, nectars))}") if nectars else None
