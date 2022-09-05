judges = int(input())

grades_sum = 0
grades_count = 0

command = input()

while command != "Finish":
    project_name = command

    current_grade = 0.0
    for x in range(0, judges):
        grade = float(input())
        current_grade += grade
        grades_sum += grade
        grades_count += 1

    print(f"{project_name} - {current_grade / judges:.2f}.")
    command = input()

print(f"Student's final assessment is {grades_sum / grades_count:.2f}.")
