money = float(input())
gender = input()
age = int(input())
sport = input()
discount = 0
price = 0

if age <= 19:
    discount = 0.2

if sport == "Gym":
    if gender == 'm':
        price = 42
    elif gender == 'f':
        price = 35
if sport == "Boxing":
    if gender == 'm':
        price = 41
    elif gender == 'f':
        price = 37
if sport == "Yoga":
    if gender == 'm':
        price = 45
    elif gender == 'f':
        price = 42
if sport == "Zumba":
    if gender == 'm':
        price = 34
    elif gender == 'f':
        price = 31
if sport == "Dances":
    if gender == 'm':
        price = 51
    elif gender == 'f':
        price = 53
if sport == "Pilates":
    if gender == 'm':
        price = 39
    elif gender == 'f':
        price = 37

sum = price * (1 - discount)

if money >= sum:
    print(f"You purchased a 1 month pass for {sport}.")
else:
    print(f"You don't have enough money! You need ${sum-money:.2f} more.")