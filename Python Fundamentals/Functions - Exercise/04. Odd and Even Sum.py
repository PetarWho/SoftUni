def odd_even_sum(num):
    nums = list(str(num))
    odd = 0
    even = 0

    for x in nums:
        x = int(x)
        if x % 2 == 0:
            even += x
        else:
            odd += x

    print(f'Odd sum = {odd}, Even sum = {even}')


a = int(input())
odd_even_sum(a)
