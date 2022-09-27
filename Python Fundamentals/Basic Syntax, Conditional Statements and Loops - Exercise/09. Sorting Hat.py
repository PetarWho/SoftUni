command = input()

while command != "Welcome!":
    length = len(command)

    if command == "Voldemort":
        print("You must not speak of that name!")
        exit()

    if length < 5:
        print(f"{command} goes to Gryffindor.")
    elif length == 5:
        print(f"{command} goes to Slytherin.")
    elif length == 6:
        print(f"{command} goes to Ravenclaw.")
    else:
        print(f"{command} goes to Hufflepuff.")

    command = input()

print("Welcome to Hogwarts.")
