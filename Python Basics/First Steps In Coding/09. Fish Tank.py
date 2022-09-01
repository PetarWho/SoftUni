length = int(input())
width = int(input())
height = int(input())
percent = float(input())/100

volume_tank = length * width * height
volume_litres = volume_tank / 1000

result = volume_litres * (1 - percent)

print(result)
