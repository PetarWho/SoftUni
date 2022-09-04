age = int(input())
price = float(input())
toy_price = int(input())

toys = 0
money = 0

for x in range(1, age + 1):
    if x % 2 == 0:
        money += (5 * x) - 1
    else:
        toys += 1

money += toys * toy_price

if money >= price:
    print(f"Yes! {money - price:.2f}")
else:
    print(f"No! {price - money:.2f}")