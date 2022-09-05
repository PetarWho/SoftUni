N = int(input())

for x in range(1111, 10000):
    stringy_num = str(x)
    is_valid = True

    for y in range(0, 4):
        if int(stringy_num[y]) == 0 or N % int(stringy_num[y]) != 0:
            is_valid = False
            break

    if is_valid:
        print(str(x) + " ", end="")
