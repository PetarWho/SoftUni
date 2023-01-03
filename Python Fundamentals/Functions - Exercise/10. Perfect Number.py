def perfect_number(num):
    x = 1
    sum = 0
    while x <= num:
        if num % x == 0:
            sum += x

        x += 1

    if sum / 2 == num:
        print("We have a perfect number!")
    else:
        print("It's not so perfect.")


perfect_number(int(input()))
