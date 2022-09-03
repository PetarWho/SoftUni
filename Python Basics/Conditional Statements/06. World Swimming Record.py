import math

record = float(input())
distance = float(input())
time_per_meter = float(input())

personal = distance * time_per_meter + math.floor((distance / 15)) * 12.5

if record > personal:
    print(f"Yes, he succeeded! The new world record is {personal:.2f} seconds.")
else:
    print(f"No, he failed! He was {personal - record:.2f} seconds slower.")