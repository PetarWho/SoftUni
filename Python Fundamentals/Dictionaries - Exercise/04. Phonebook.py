data = input()

result = {}

while not data.isdigit():
    name = data.split('-')[0]
    number = data.split('-')[1]

    result[name] = number

    data = input()


for x in range (0, int(data)):
    search = input()
    if result.keys().__contains__(search):
        print(f"{search} -> {result[search]}")
    else:
        print(f"Contact {search} does not exist.")
