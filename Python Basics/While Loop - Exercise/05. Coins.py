inserted_amount = int(float(input()) * 100)
coins_count = 0

while inserted_amount > 0:
    if inserted_amount >= 200:
        inserted_amount -= 200

    elif inserted_amount >= 100:
        inserted_amount -= 100

    elif inserted_amount >= 50:
        inserted_amount -= 50

    elif inserted_amount >= 20:
        inserted_amount -= 20

    elif inserted_amount >= 10:
        inserted_amount -= 10

    elif inserted_amount >= 5:
        inserted_amount -= 5

    elif inserted_amount >= 2:
        inserted_amount -= 2

    elif inserted_amount >= 1:
        inserted_amount -= 1

    coins_count += 1

print(coins_count)
