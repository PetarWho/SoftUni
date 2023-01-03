factor = int(input())
count = int(input())

result = []

for x in range(1, count+1):
    result.append(x)

result = list(map(lambda y: y*factor, result))
print(result)
