import math

command = input()
prime_sum = 0
non_prime_sum = 0

while command != "stop":
    num = int(command)
    is_prime = True

    if num < 0:
        print("Number is negative.")
        command = input()
        continue

    for x in range(2, int(math.sqrt(num))+1):
        if num % x == 0:
            is_prime = False
            break

    if is_prime:
        prime_sum += num
    else:
        non_prime_sum += num

    command = input()

print(f"Sum of all prime numbers is: {prime_sum}")
print(f"Sum of all non prime numbers is: {non_prime_sum}")