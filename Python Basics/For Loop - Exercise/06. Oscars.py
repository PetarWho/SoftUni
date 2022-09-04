actor_name = input()
points = float(input())
judges = int(input())

for x in range(0, judges):
    judge_name = input()
    judge_points = float(input())

    points += (len(judge_name) * judge_points) / 2

    if points >= 1250.5:
        print(f"Congratulations, {actor_name} got a nominee for leading role with {points:.1f}!")
        quit()

print(f"Sorry, {actor_name} you need {1250.5 - points:.1f} more!")