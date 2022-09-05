days = int(input())
food_amount = float(input())

cat_food_eaten = 0
dog_food_eaten = 0
biscuits = 0

for x in range(1, days+1):
    dog_food_today = int(input())
    cat_food_today = int(input())
    dog_food_eaten += dog_food_today
    cat_food_eaten += cat_food_today

    if x % 3 == 0:
        biscuits += (dog_food_today + cat_food_today) * 0.1

print(f"Total eaten biscuits: {int(biscuits)}gr.")
print(f"{(cat_food_eaten + dog_food_eaten) / food_amount * 100:.2f}% of the food has been eaten.")
print(f"{dog_food_eaten / (cat_food_eaten + dog_food_eaten) * 100:.2f}% eaten from the dog.")
print(f"{cat_food_eaten / (cat_food_eaten + dog_food_eaten) * 100:.2f}% eaten from the cat.")

