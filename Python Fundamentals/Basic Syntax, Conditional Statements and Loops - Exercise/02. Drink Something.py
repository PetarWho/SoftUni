age = int(input())
drink = "whisky"

if age <= 14:
    drink = "toddy"
elif 13 < age  <= 18:
    drink = "coke"
elif 18 < age <= 21:
    drink = "beer"

print(f"drink {drink}")
