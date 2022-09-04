bad_grades_needed = int(input())

problem_name = ""
bad_grades = 0
problems_count = 0
sum_of_grades = 0

command = input()

while command != "Enough":
    problem_name = command
    grade = int(input())
    sum_of_grades += grade
    problems_count += 1

    if grade <= 4:
        bad_grades += 1

    if bad_grades == bad_grades_needed:
        print(f"You need a break, {bad_grades} poor grades.")
        quit()

    command = input()

print(f"Average score: {sum_of_grades / problems_count :.2f}")
print(f"Number of problems: {problems_count}")
print(f"Last problem: {problem_name}")
