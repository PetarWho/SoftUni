from collections import deque

food = int(input())
orders = deque(map(int, input().split(' ')))

print(max(orders))

while orders:
    if orders[0] > food:
        break

    food -= orders[0]
    orders.popleft()

if orders:
    print(f"Orders left: {' '.join(str(x) for x in orders)}")
else:
    print("Orders complete")
