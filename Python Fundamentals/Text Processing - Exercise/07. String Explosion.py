line = input()
power = 0
index = 0

while index < len(line):
    char = line[index]

    if char == ">":
        power += int(line[index+1])
    elif power > 0:
        line = line[:index] + line[index+1:]
        index -= 1
        power -= 1

    index += 1

print(line)
