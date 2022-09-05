command = input()

student_tickets = 0
standard_tickets = 0
kid_tickets = 0

while command != "Finish":
    movie_name = command
    seats_available = int(input())

    ticket_type = input()

    sold_tickets = 0

    while ticket_type != "End":
        if ticket_type == "standard":
            standard_tickets += 1
        elif ticket_type == "student":
            student_tickets += 1
        elif ticket_type == "kid":
            kid_tickets += 1

        sold_tickets += 1

        if sold_tickets == seats_available:
            break

        ticket_type = input()

    print(f"{movie_name} - {sold_tickets / seats_available * 100:.2f}% full.")

    command = input()

sum_tickets = standard_tickets + student_tickets + kid_tickets

print(f"Total tickets: {sum_tickets}")
print(f"{student_tickets / sum_tickets * 100:.2f}% student tickets.")
print(f"{standard_tickets / sum_tickets * 100:.2f}% standard tickets.")
print(f"{kid_tickets / sum_tickets * 100:.2f}% kids tickets.")