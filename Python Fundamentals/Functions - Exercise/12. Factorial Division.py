import math


def factorial_division(a, b):
    print(f'{(math.factorial(a) / math.factorial(b)):.2f}')


factorial_division(int(input()), int(input()))
