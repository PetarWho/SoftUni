N = int(input())
total = 0

for i in range(0, N):
    price = float(input())
    days = int(input())
    needed = int(input())

    if not(0.01 <= price <= 100 and 1 <= days <= 31 and 1 <= needed <= 2000):
        continue

    today = price * days * needed
    total += today
    print(f"The price for the coffee is: ${today:.2f}")

print(f"Total: ${total:.2f}")
