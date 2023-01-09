data = input().split(', ')

for name in data:
    if 3 <= len(name) <= 16 and set(name) <= set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'):
        print(name)
