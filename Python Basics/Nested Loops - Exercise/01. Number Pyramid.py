n = int(input())

num = 1

for x in range(1, n+1):
    for y in range(1, x+1):
        if num > n:
            break
        print(str(num) + " ", end="")
        num += 1
    print()
