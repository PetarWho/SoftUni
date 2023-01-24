import math

line = input().split()
colors = []
possible_colors = ["red", "blue", "yellow", "green", "orange", "purple"]

while line:
    if len(line) == 1:
        if line[0] in possible_colors:
            colors.append(line.pop())
        elif line[0] == "":
            line.pop()
        else:
            line.insert(math.ceil(len(line)/2), line.pop()[:-1])

    elif line[0] + line[-1] in possible_colors:
        color = line.pop(0) + line.pop()
        colors.append(color)

    elif line[-1] + line[0] in possible_colors:
        color = line.pop() + line.pop(0)
        colors.append(color)

    elif all(x == "" for x in line):
        break
    else:
        color = line.pop(0)
        color2 = line.pop()
        line.insert(math.ceil(len(line)/2), color[:-1])
        line.insert(math.ceil(len(line) / 2), color2[:-1])

if colors.__contains__("purple") and not (colors.__contains__("blue") and colors.__contains__("red")):
    colors.remove("purple")
elif colors.__contains__("orange") and not (colors.__contains__("red") and colors.__contains__("yellow")):
    colors.remove("orange")
elif colors.__contains__("green") and not (colors.__contains__("blue") and colors.__contains__("yellow")):
    colors.remove("green")

print(colors)
