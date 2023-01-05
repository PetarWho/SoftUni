line = input()

result = {}

while line != 'end':
    course = line.split(' : ')[0]
    student = line.split(' : ')[1]

    if not result.keys().__contains__(course):
        result[course] = []

    result[course].append(student)

    line = input()

for k, v in result.items():
    print(f"{k}: {len(v)}")
    for name in v:
        print(f"-- {name}")
