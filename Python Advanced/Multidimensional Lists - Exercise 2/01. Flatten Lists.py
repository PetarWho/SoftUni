initial_string = input()
sublist = []

for i in initial_string.split("|"):
    sublist.append(i.split())
sublist.reverse()

print(" ".join([j for i in sublist for j in i]))
