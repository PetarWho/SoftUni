substrings = list(input().split(', '))
words = list(input().split(', '))

result = []

while substrings:
    sub = substrings[0]
    found = False
    for word in words:
        if word.__contains__(sub):
            result.append(sub)
            substrings.remove(sub)
            found = True
            break

    if not found:
        substrings.remove(sub)

print(result)
