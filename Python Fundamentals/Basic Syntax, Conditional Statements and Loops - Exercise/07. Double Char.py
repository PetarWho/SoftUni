command = input()

while command != "End":
    if command == "SoftUni":
        command = input()
        continue

    result = ""

    for i in range(0, command.__len__()):
        result += command[i]
        result += command[i]

    print(result)
    command = input()
