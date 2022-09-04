import math

movie_name = input()
movie_duration = int(input())
rest_duration = int(input())
lunch_duration = rest_duration / 8
chill_duration = rest_duration / 4

free_time = rest_duration - (lunch_duration + chill_duration)

if free_time >= movie_duration:
    print(f"You have enough time to watch {movie_name} and left with {math.ceil(free_time - movie_duration)} minutes free time.")
else:
    print(f"You don't have enough time to watch {movie_name}, you need {math.ceil(movie_duration - free_time)} more minutes.")