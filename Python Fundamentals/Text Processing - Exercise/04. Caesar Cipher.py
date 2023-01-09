line = input()
print(''.join([(chr(ord(x) + 3)) for x in list(line)]))
