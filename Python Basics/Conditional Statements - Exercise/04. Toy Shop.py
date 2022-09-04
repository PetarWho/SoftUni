puzzle_price = 2.60
doll_price = 3.00
bear_price = 4.10
minion_price = 8.20
truck_price = 2.00

vacation_price = float(input())
puzzle_count = int(input())
doll_count = int(input())
bear_count = int(input())
minion_count = int(input())
truck_count = int(input())

discount = 0

if puzzle_count + doll_count + bear_count + minion_count + truck_count >= 50:
    discount = 0.25

sum = ((puzzle_price * puzzle_count + doll_price * doll_count + bear_price * bear_count
       + minion_price * minion_count + truck_count * truck_price) * (1 - discount)) * 0.9

if sum >= vacation_price:
    print(f'Yes! {sum - vacation_price:.2f} lv left.')
else:
    print(f'Not enough money! {vacation_price - sum:.2f} lv needed.')