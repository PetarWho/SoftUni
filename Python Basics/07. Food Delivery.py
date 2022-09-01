chicken_meal = 10.35
fish_meal = 12.40
vegetarian_meal = 8.15
delivery = 2.50

chicken_orders = int(input())
fish_orders = int(input())
vegetarian_orders = int(input())

sum = chicken_orders * chicken_meal + fish_orders * fish_meal + vegetarian_orders * vegetarian_meal
dessert_price = sum * 0.2

result = sum + dessert_price + delivery

print(result)
