first = int(input())
second = int(input())
third = int(input())

total_time = first + second + third

mins = int(total_time / 60)
secs = total_time % 60

if secs >= 10:
    print(f'{mins}:{secs}')
else:
    print(f'{mins}:0{secs}')