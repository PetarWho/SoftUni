import re

line = input()

user_pattern = r"( |^)[a-z0-9]+([\.\-_][a-z0-9]+)*"
host_pattern = r"[a-z]+(-[a-z]+)*(\.[a-z]+(-[a-z]+)*)+"
pattern = rf"{user_pattern}@{host_pattern}"

matches = re.finditer(pattern, line)

for match in matches:
    print(match[0].strip())
    