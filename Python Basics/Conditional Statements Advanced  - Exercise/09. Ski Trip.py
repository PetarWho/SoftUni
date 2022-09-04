days = int(input())
type = input()
rating = input()

nights = days - 1
price = 18
discount = 0

if type == "apartment":
    price = 25
    if days < 10:
        discount = 0.3
    elif 10 <= days <= 15:
        discount = 0.35
    else:
        discount = 0.5

elif type == "president apartment":
    price = 35
    if days < 10:
        discount = 0.1
    elif 10 <= days <= 15:
        discount = 0.15
    else:
        discount = 0.2

sum = (nights * price) * (1-discount)

if rating == "positive":
    sum *= 1.25
elif rating == "negative":
    sum *= 0.9

print(f"{sum:.2f}")