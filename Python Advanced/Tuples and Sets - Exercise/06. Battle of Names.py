cnt = int(input())

odd = set()
even = set()

for n in range(1, cnt + 1):
    name = list(input())
    current = sum([ord(x) for x in name]) // n
    even.add(current) if current % 2 == 0 else odd.add(current)

if sum(odd) > sum(even):
    print(', '.join(map(str, odd.difference(even))))
elif sum(odd) < sum(even):
    print(', '.join(map(str, odd.symmetric_difference(even))))
else:
    print(', '.join(map(str, odd.union(even))))
