pen_price = 5.80
marker_price = 7.20
chemical_price = 1.20

pen_count = int(input())
marker_count = int(input())
chemical_litres = int(input())
discount = float(int(input())/100)

sum = (pen_count*pen_price + marker_count * marker_price + chemical_litres * chemical_price) * (1 - discount)

print(sum)
