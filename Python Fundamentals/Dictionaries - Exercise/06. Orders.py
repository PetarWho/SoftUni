line = input()

result = {}

while line != 'buy':
    item = line.split(' ')[0]
    price = float(line.split(' ')[1])
    quantity = int(line.split(' ')[2])

    if result.keys().__contains__(item):
        result[item][0] = price
        result[item][1] += quantity
    else:
        result[item] = [price, quantity]

    line = input()

for k, v in result.items():
    print(f"{k} -> {v[0] * v[1]:.2f}")
