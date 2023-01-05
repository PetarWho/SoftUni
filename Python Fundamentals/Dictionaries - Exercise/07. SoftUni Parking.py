n = int(input())

result = {}

for x in range(0, n):
    command = input()
    data = command.split(' ')

    if data[0] == 'register':
        if result.keys().__contains__(data[1]):
            print(f"ERROR: already registered with plate number {result[data[1]]}")
        else:
            result[data[1]] = data[2]
            print(f"{data[1]} registered {data[2]} successfully")

    elif data[0] == 'unregister':
        if result.keys().__contains__(data[1]):
            result.pop(data[1])
            print(f"{data[1]} unregistered successfully")
        else:
            print(f"ERROR: user {data[1]} not found")

for k, v in result.items():
    print(f"{k} => {v}")
