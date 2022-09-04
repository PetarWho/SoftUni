type = input()
rows = int(input())
cols = int(input())

cost = 7.5

if type == "Premiere":
    cost = 12
elif type == "Discount":
    cost = 5

sum = (rows * cols) * cost

print(f'{sum:.2f}')