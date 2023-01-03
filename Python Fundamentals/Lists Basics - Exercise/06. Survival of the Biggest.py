nums = list(map(int, input().split(' ')))
n = int(input())

for _ in range(0, n):
    nums.remove(min(nums))

result = list(map(lambda num: str(num), nums))
print(str.join(', ', result))
