n = int(input())

for i in range(0, n):
    code = int(input())

    if code == 88:
        print("Hello")
    elif code == 86:
        print("How are you?")
    elif code < 88:
        print("GREAT!")
    else:
        print("Bye.")
