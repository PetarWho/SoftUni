budget = float(input())
count_actors = int(input())
suit_price = float(input())
decor = budget * 0.1

if count_actors > 150:
    suit_price *= 0.9

result = budget - (decor + count_actors * suit_price)

if result >= 0:
    print(f"Action!\nWingard starts filming with {result:.2f} leva left.")
else:
    print(f"Not enough money!\nWingard needs {abs(result):.2f} leva more.")