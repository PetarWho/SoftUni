from collections import deque

total = 0
maximum = 300

caffeine_list = list(map(int, input().split(', ')))
drinks = deque(map(int, input().split(', ')))

while caffeine_list and drinks:
    caffeine = caffeine_list.pop()
    drink = drinks.popleft()
    intake = caffeine * drink

    if total + intake <= maximum:
        total += intake
    else:
        drinks.append(drink)
        total -= 30
        if total < 0:
            total = 0

print(f"Drinks left: {', '.join(map(str, drinks))}") if drinks else print("At least Stamat wasn't exceeding the maximum caffeine.")
print(f"Stamat is going to sleep with {total} mg caffeine.")
