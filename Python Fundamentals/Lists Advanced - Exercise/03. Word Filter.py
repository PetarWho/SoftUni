words = list(input().split(' '))

print('\n'.join([x for x in words if len(x) % 2 == 0]))
