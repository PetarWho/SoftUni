from collections import deque

materials = list(map(int, input().split()))
magic_values = deque(map(int, input().split()))
crafts = {
    "Doll": 150,
    "Wooden train": 250,
    "Teddy bear": 300,
    "Bicycle": 400
}

presents = {
    "Doll": 0,
    "Wooden train": 0,
    "Teddy bear": 0,
    "Bicycle": 0
}

while materials and magic_values:
    material = materials.pop()
    magic = magic_values.popleft()
    mp = material * magic

    if mp in crafts.values():
        toy = next(k for k, v in crafts.items() if v == mp)
        presents[toy] += 1

    elif mp < 0:
        materials.append(material + magic)

    elif mp > 0:
        materials.append(material + 15)

    elif magic == 0 or material == 0:
        if magic > 0:
            magic_values.appendleft(magic)
        elif material > 0:
            materials.append(material)

        continue

done = (presents["Doll"] and presents["Wooden train"]) or (presents["Teddy bear"] and presents["Bicycle"])
print("The presents are crafted! Merry Christmas!") if done else print("No presents this Christmas!")
print(f"Materials left: {', '.join(map(str, reversed(materials)))}") if materials else None
print(f"Magic left: {', '.join(map(str, magic_values))}") if magic_values else None
[print(f"{k}: {v}") for k, v in sorted(presents.items()) if not v == 0]
