num = int(input())

for a in range(0, num):
    for b in range(0, num):
        for c in range(0, num):
            print(chr(97+a) + chr(97+b) + chr(97 + c))
