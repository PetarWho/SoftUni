n1 = int(input())
n2 = int(input())

for x in range(n1, n2+1):
    current_number = str(x)
    odd_sum = 0
    even_sum = 0
    for y in range(0, 6):
        if y % 2 == 0:
            even_sum += int(current_number[y])
        else:
            odd_sum += int(current_number[y])

    if even_sum == odd_sum:
        print(current_number + " ", end="")
