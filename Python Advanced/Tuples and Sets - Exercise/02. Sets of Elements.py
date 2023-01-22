n, m = map(int, input().split(' '))

set1 = set([input() for _ in range(0, n)])
set2 = set([input() for _ in range(0, m)])

result = set1.intersection(set2)

print('\n'.join(result))
