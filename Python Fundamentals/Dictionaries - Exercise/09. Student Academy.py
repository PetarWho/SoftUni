n = int(input())

result = {}

for x in range(0, n):
    name = input()
    grade = float(input())

    if not result.keys().__contains__(name):
        result[name] = []

    result[name].append(grade)

filtered_students = {k: v for k, v in result.items() if sum(v) / len(v) >= 4.50}

for k, v in filtered_students.items():
    print(f"{k} -> {sum(v) / len(v) :.2f}")
