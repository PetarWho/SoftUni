flower = input()
count_flower = int(input())
budget = int(input())

price = 0

if flower == 'Roses':
    price = 5
    if count_flower > 80:
        price *= 0.90

elif flower == 'Dahlias':
    price = 3.80
    if count_flower > 90:
        price *= 0.85

elif flower == 'Tulips':
    price = 2.80
    if count_flower > 80:
        price *= 0.85

elif flower == 'Narcissus':
    price = 3.00
    if count_flower < 120:
        price *= 1.15

elif flower == 'Gladiolus':
    price = 2.50
    if count_flower < 80:
        price *= 1.20

total_money = count_flower * price
result = abs(budget - total_money)

if budget >= total_money:
    print(f'Hey, you have a great garden with {count_flower} {flower} and {result:.2f} leva left.')
else:
    print(f'Not enough money, you need {result:.2f} leva more.')