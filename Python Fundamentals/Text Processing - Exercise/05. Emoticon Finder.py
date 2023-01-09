line = input()
[print(f":{line[i + 1]}") for i in range(len(line)) if line[i] == ':']
