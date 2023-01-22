n = int(input())
result = []

for _ in range(n):
    line = input().split('-')
    first = line[0].split(',')
    second = line[1].split(',')
    set1 = set([x for x in range(int(first[0]), int(first[1])+1)])
    set2 = set([x for x in range(int(second[0]), int(second[1])+1)])

    if len(result) < len(set1.intersection(set2)):
        result = list(set1.intersection(set2))

print(f"Longest intersection is {result} with length {len(result)}")
