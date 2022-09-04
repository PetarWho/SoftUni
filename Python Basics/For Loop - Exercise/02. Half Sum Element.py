import sys

n = int(input())

max = -sys.maxsize
sum = 0

for x in range(0, n):
    num = int(input())
    if max < num:
        max = num
    sum += num

sum -= max

if sum == max:
    print(f"Yes\nSum = {sum}")
else:
    print(f"No\nDiff = {abs(sum - max)}")
