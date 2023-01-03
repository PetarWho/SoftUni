def sum_numbers(a, b):
    return a+b


def subtract(a, b):
    return a - b


def add_and_subtract(a, b, c):
    sum = sum_numbers(a, b)
    return sum - c


a = int(input())
b = int(input())
c = int(input())

print(add_and_subtract(a, b, c))
