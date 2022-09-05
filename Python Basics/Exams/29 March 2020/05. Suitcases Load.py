trunk_space = float(input())

command = input()
i = 0
has_space = True
suitcases = 0

while command != "End":
    load = float(command)
    i += 1

    if i % 3 == 0:
        load *= 1.1

    if trunk_space - load < 0:
        print("No more space!")
        has_space = False
        break

    trunk_space -= load

    suitcases += 1

    command = input()

if has_space:
    print("Congratulations! All suitcases are loaded!")

print(f"Statistic: {suitcases} suitcases loaded.")