set1 = set(map(int, input().split()))
set2 = set(map(int, input().split()))
n = int(input())

for _ in range(n):
    command, position, *items = input().split()

    if command == "Add":
        if position == "First":
            ([set1.add(int(x)) for x in items])
        elif position == "Second":
            ([set2.add(int(x)) for x in items])

    elif command == "Remove":
        if position == "First":
            [set1.remove(int(x)) if set1.__contains__(int(x)) else None for x in items]
        elif position == "Second":
            [set2.remove(int(x)) if set2.__contains__(int(x)) else None for x in items]
    elif command == "Check" and position == "Subset":
        if set1.issubset(set2) or set2.issubset(set1):
            print(True)
        else:
            print(False)

print(', '.join(map(str, sorted(set1))))
print(', '.join(map(str, sorted(set2))))
