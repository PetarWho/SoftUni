pumps = int(input())
tank = 0
index = 0

for x in range(0, pumps):
    line = list(map(int, input().split(' ')))
    tank += line[0]

    if tank < line[1]:
        tank = 0
        index = x + 1
        continue

    else:
        tank -= line[1]

print(index)
