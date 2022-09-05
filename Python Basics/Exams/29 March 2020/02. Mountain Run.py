record_in_secs = float(input())
distance = float(input())
time_per_meter = float(input())

personal_time = distance * time_per_meter + int(distance / 50) * 30

if personal_time < record_in_secs:
    print(f"Yes! The new record is {personal_time:.2f} seconds.")
else:
    print(f"No! He was {personal_time - record_in_secs:.2f} seconds slower.")