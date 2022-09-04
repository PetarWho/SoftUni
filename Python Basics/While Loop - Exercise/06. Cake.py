cake_width = int(input())
cake_length = int(input())
cake_pieces = cake_length * cake_width

while cake_pieces > 0:
    command = input()

    if command == "STOP":
        break

    cake_pieces -= int(command)

if cake_pieces > 0:
    print(f"{cake_pieces} pieces are left.")
else:
    print(f"No more cake left! You need {abs(cake_pieces)} pieces more.")