data = input()
teams_scores = list(data.split(' '))

teamA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
teamB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
terminated = False

for x in teams_scores:
    game_results = x.split('-')
    if game_results[0] == 'A':
        if teamA.__contains__(int(game_results[1])):
            teamA.remove(int(game_results[1]))

    elif game_results[0] == 'B':
        if teamB.__contains__(int(game_results[1])):
            teamB.remove(int(game_results[1]))

    if len(teamA) < 7 or len(teamB) < 7:
        terminated = True
        break

print(f'Team A - {len(teamA)}; Team B - {len(teamB)}')

if terminated:
    print('Game was terminated')
