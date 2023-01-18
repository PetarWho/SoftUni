clothes = list(map(int, input().split(' ')))
rack_cap = int(input())
racks_needed = 1
current = rack_cap

while clothes and rack_cap:
    if clothes[-1] > current:
        racks_needed += 1
        current = rack_cap

    current -= clothes.pop()

print(racks_needed)