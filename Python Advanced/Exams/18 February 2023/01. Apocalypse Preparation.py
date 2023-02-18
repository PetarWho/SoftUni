from collections import deque

textiles = deque(map(int, input().split()))
medicaments = list(map(int, input().split()))
items = {"Patch": 0, "Bandage": 0, "MedKit": 0}

while textiles and medicaments:
    textile = textiles.popleft()
    med = medicaments.pop()
    heal = textile + med
    if heal == 30:
        items["Patch"] += 1
    elif heal == 40:
        items["Bandage"] += 1
    elif heal >= 100:
        items["MedKit"] += 1
        remaining = heal - 100
        if medicaments:
            medicaments[-1] += remaining
    else:
        med += 10
        medicaments.append(med)

if not medicaments and not textiles:
    print("Textiles and medicaments are both empty.")
else:
    print("Textiles are empty.") if medicaments else print("Medicaments are empty.")

for key, value in sorted(items.items(), key=lambda x: (-x[1], x[0])):
    if value > 0:
        print(f'{key} - {value}')

print(f"Medicaments left: {', '.join(map(str, reversed(medicaments)))}") if medicaments else None
print(f"Textiles left: {', '.join(map(str, textiles))}") if textiles else None
