line = input().lower()

inventory = {
    "shards": 0,
    "fragments": 0,
    "motes": 0
}

end = False

while True:
    data = line.split(' ')

    for x in range(1, len(data), 2):
        if inventory.keys().__contains__(data[x]):
            inventory[data[x]] += int(data[x-1])
        else:
            inventory[data[x]] = int(data[x-1])

        if inventory['shards'] >= 250:
            inventory['shards'] -= 250
            print('Shadowmourne obtained!')
            end = True
            break
        elif inventory['fragments'] >= 250:
            inventory['fragments'] -= 250
            print('Valanyr obtained!')
            end = True
            break
        elif inventory['motes'] >= 250:
            inventory['motes'] -= 250
            print('Dragonwrath obtained!')
            end = True
            break

    if end:
        break

    line = input().lower()

for k, v in inventory.items():
    print(f'{k}: {v}')
