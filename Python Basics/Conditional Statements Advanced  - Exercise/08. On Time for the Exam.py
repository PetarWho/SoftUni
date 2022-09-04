exam_hours = int(input())
exam_mins = int(input())
arrive_hour = int(input())
arrive_mins = int(input())

exam_mins += exam_hours * 60
arrive_mins += arrive_hour * 60

difference = arrive_mins - exam_mins

if -30 <= difference <= 0:
    print("On time")
elif difference < -30:
    print("Early")
else:
    print("Late")

if 0 > difference > -60:
    print(f"{abs(difference)} minutes before the start")
elif difference <= -60:
    if abs(difference) % 60 < 10:
        print(f"{int(abs(difference) / 60)}:0{abs(difference) % 60} hours before the start")
    else:
        print(f"{int(abs(difference) / 60)}:{abs(difference) % 60} hours before the start")

elif 0 < difference < 60:
    print(f"{abs(difference)} minutes after the start")
elif difference >= 60:
    if abs(difference) % 60 < 10:
        print(f"{int(abs(difference) / 60)}:0{abs(difference) % 60} hours after the start")
    else:
        print(f"{int(abs(difference) / 60)}:{abs(difference) % 60} hours after the start")