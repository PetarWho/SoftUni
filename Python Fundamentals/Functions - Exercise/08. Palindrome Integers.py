def palindrome(nums):
    for x in nums:
        y = list(str(x))
        z = list(reversed(y))
        print(y == z)


palindrome(list(map(lambda x: int(x), input().split(', '))))
