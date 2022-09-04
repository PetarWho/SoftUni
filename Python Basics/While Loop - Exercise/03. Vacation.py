money_needed = float(input())
money_available = float(input())

spend_counter = 0
days_gone = 0

while money_available < money_needed:
    command = input()
    amount = float(input())

    if command == "spend":
        if money_available < amount:
            money_available = 0
        else:
            money_available -= amount

        spend_counter += 1

    elif command == "save":
        money_available += amount
        spend_counter = 0

    days_gone += 1

    if spend_counter == 5:
        print("You can't save the money.")
        print(days_gone)
        quit()

print(f"You saved the money for {days_gone} days.")
