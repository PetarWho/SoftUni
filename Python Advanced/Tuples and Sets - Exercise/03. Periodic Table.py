n = int(input())

result = set(x for _ in range(n) for x in input().split())
print('\n'.join(result))
