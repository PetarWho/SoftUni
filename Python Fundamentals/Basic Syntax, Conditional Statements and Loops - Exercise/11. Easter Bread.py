budget = float(input())
flour_price_per_kg = float(input())
eggs_price_per_pack = flour_price_per_kg * 0.75
milk_price_per_250g = (flour_price_per_kg * 1.25) / 4

colored_eggs = 0
loaves = 0

money_needed = flour_price_per_kg + eggs_price_per_pack + milk_price_per_250g

while budget >= money_needed:
    loaves += 1
    budget -= money_needed
    colored_eggs += 3

    if loaves % 3 == 0:
        colored_eggs -= loaves - 2

print(f"You made {loaves} loaves of Easter bread! Now you have {colored_eggs} eggs and {budget:.2f}BGN left.")
