days = int(input())

total_sum = 0

win_days = 0

for x in range(0, days):
    wins = 0
    loses = 0
    money = 0

    sport = input()
    while sport != "Finish":
        match_result = input()

        if match_result == "win":
            wins += 1
            money += 20
        elif match_result == "lose":
            loses += 1

        sport = input()

    if wins > loses:
        win_days += 1
        money *= 1.1

    total_sum += money

if win_days > days / 2:
    total_sum *= 1.2
    print(f"You won the tournament! Total raised money: {total_sum:.2f}")
else:
    print(f"You lost the tournament! Total raised money: {total_sum:.2f}")