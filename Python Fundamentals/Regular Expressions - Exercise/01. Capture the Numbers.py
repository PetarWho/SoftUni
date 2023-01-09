import re
line = input()

while line:
    nums = re.findall(r"\d+", line)
    if nums:
        [print(x, end=' ') for x in nums]
    line = input()
