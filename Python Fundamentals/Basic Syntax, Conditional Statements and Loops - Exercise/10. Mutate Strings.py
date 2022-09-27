string1 = input()
string2 = input()

previous = string1

for i in range(0, len(string1)):
    new = previous
    new = new[:i] + string2[i] + new[i+1:]

    if new != previous:
        print(new)

    previous = new
