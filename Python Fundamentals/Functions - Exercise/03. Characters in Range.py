def ascii_difference(a, b):
    num1 = ord(a) + 1
    num2 = ord(b)
    result = ''
    for x in range(num1, num2):
        result += chr(x) + ' '

    return result


a = input()
b = input()
print(ascii_difference(a, b))
