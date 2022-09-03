hours_input = int(input())
mins_input = int(input())

mins_input += hours_input * 60
mins_input += 15

hours = int(mins_input / 60)
mins = mins_input % 60

if hours == 24:
    hours = 0
if mins == 60:
    mins = 0

if mins >= 10:
    print(f'{hours}:{mins}')
else:
    print(f'{hours}:0{mins}')