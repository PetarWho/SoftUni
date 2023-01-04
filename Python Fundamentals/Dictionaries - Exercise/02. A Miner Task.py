line = input()

result = {}

while line != 'stop':
    resource = line
    quantity = int(input())

    if result.keys().__contains__(resource):
        result[resource] += quantity
    else:
        result[resource] = quantity

    line = input()

for k, v in result.items():
    print(f"{k} -> {v}")
