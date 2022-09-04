import math

tournaments = int(input())
points_available = int(input())
points_won = 0
wins = 0

for x in range(0, tournaments):
    stage = input()
    if stage == "W":
        points_won += 2000
        wins += 1
    elif stage == "F":
        points_won += 1200
    elif stage == "SF":
        points_won += 720

print(f"Final points: {points_available + points_won}")
print(f"Average points: {math.floor(points_won / tournaments)}")
print(f"{wins / tournaments * 100:.2f}%")