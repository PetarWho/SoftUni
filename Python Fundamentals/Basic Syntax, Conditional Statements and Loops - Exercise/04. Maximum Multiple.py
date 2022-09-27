divisor = int(input())
boundary = int(input())

largest = -1

for i in range(1, boundary + 1):
    if i % divisor == 0:
        largest = i

print(largest)
