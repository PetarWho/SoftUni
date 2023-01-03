def min_max_sum(nums):
    print(f'The minimum number is {min(nums)}')
    print(f'The maximum number is {max(nums)}')
    print(f'The sum number is: {sum(nums)}')


min_max_sum(list(map(lambda x: int(x), input().split(' '))))
