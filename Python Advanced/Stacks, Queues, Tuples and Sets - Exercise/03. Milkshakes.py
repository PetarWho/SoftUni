from collections import deque

chocolates = list(map(int, input().split(', ')))
milks = deque(map(int, input().split(', ')))
shakes = 0

while chocolates and milks and shakes != 5:
    choco = chocolates.pop()
    milk = milks.popleft()

    if choco <= 0 and milk <= 0:
        continue
    if choco <= 0:
        milks.appendleft(milk)
        continue

    if milk <= 0:
        chocolates.append(choco)
        continue

    if choco == milk:
        shakes += 1

    else:
        milks.append(milk)
        chocolates.append(choco - 5)

print("Great! You made all the chocolate milkshakes needed!") if shakes == 5 else print("Not enough milkshakes.")
print(f"Chocolate: {', '.join(map(str, chocolates))}") if chocolates else print("Chocolate: empty")
print(f"Milk: {', '.join(map(str, milks))}") if milks else print("Milk: empty")
