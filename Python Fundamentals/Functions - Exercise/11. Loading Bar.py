def loading_bar(percent):
    bar = ['%'] * int(percent / 10)
    remaining = 10 - percent/10
    bar.extend('.' * int(remaining))
    if percent != 100:
        print(f"{percent}% [{str.join('', bar)}]")
        print('Still loading...')
    else:
        print('100% Complete!')
        print(f"[{str.join('', bar)}]")


loading_bar(int(input()))
