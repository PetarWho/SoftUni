my_book = input()

book = input()
count = 0

while book != "No More Books":
    if book == my_book:
        break

    count += 1
    book = input()

if book == my_book:
    print(f"You checked {count} books and found it.")
else:
    print(f"The book you search is not here!")
    print(f"You checked {count} books.")