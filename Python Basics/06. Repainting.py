nylon_price = 1.50
paint_price = 14.50
thinner_price = 5.00

nylon_needed = int(input()) + 2
paint_needed = int(input()) * 1.1
thinner_needed = int(input())
time_needed = int(input())

sum = nylon_needed * nylon_price + paint_needed * paint_price + thinner_needed * thinner_price + 0.40
workers_cut = (sum * 0.3) * time_needed

result = sum + workers_cut
print(result)
