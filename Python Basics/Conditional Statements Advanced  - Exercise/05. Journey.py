budget = float(input())
season = input()

type = "Camp"
destination = "Europe"

if budget <= 100:
    destination = "Bulgaria"
    if season == "winter":
        type = "Hotel"
        budget *= 0.7
    else:
        budget *= 0.3
elif budget <= 1000:
    destination = "Balkans"
    if season == "winter":
        type = "Hotel"
        budget *= 0.8
    else:
        budget *= 0.4
else:
    budget *= 0.9
    type = "Hotel"

print(f"Somewhere in {destination}")
print(f"{type} - {budget:.2f}")