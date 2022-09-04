GPU_price = 250
discount = 0

budget = float(input())
GPU_count = int(input())
CPU_count = int(input())
RAM_count = int(input())

if GPU_count > CPU_count:
    discount = 0.15

GPU_total = GPU_price * GPU_count

sum = (GPU_total + (GPU_total * 0.35) * CPU_count + (GPU_total * 0.1) * RAM_count) * (1 - discount)

if budget >= sum:
    print(f"You have {budget - sum:.2f} leva left!")
else:
    print(f"Not enough money! You need {sum - budget:.2f} leva more!")