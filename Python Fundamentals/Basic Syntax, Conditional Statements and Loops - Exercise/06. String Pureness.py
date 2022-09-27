n = int(input())

for i in range(0, n):
    string = input()
    if string.__contains__(",") or string.__contains__(".") or string.__contains__("_"):
        print(f"{string} is not pure!")
    else:
        print(f"{string} is pure.")
