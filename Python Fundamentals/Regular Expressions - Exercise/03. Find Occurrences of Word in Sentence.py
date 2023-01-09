import re

line = input()
word = input()
print(len(re.findall(fr"\b{word}\b", line, re.IGNORECASE)))
