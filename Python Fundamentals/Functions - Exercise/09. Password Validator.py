def pass_validator(password):
    password = str(password)
    has_length = 6 <= len(password) <= 10
    has_digit_letter = password.isalnum()
    has_two_digits = sum([c.isdigit() for c in password]) >= 2

    if not has_length:
        print("Password must be between 6 and 10 characters")
    if not has_digit_letter:
        print('Password must consist only of letters and digits')
    if not has_two_digits:
        print('Password must have at least 2 digits')

    if has_length and has_digit_letter and has_two_digits:
        print("Password is valid")


pass_validator(input())
