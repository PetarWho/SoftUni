data = input().split(' ')

str1 = list(data[0])
str2 = list(data[1])
sum = 0

for _ in range(0, min(len(str1), len(str2))):
    sum += ord(str1.pop(0)) * ord(str2.pop(0))

for y in str1 + str2:
    sum += ord(y)

print(sum)
