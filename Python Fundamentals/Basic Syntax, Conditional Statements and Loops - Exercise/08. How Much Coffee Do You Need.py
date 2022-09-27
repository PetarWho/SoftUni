command = input()
coffee = 0

while command != "END":
    is_lower = command.islower()

    activity = ["coding", "dog", "cat", "movie"]

    if not activity.__contains__(command.lower()):
        command = input()
        continue

    if command.islower():
        coffee += 1
    else:
        coffee += 2

    if coffee > 5:
        print("You need extra sleep")
        exit()

    command = input()

print(coffee)
