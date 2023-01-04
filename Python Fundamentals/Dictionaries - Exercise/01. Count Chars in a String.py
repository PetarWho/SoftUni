data = input()

result = {}

for x in list(data):
    if x != ' ':
        if result.keys().__contains__(x):
            result[x] += 1
        else:
            result[x] = 1

for k, v in result.items():
    print(f"{k} -> {v}")
