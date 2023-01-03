def even_nums(str_nums):
    nums = list(map(lambda x: int(x), str_nums.split(' ')))

    print(list(filter(lambda x: x % 2 == 0, nums)))


even_nums(input())
