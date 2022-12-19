n = int(input())
capacity = 255

for _ in range(0,n):
    liters = int(input())
    if capacity - liters < 0:
        print("Insufficient capacity!")
    else:
        capacity -= liters

print(255 - capacity)
