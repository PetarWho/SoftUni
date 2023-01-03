rooms = int(input())
free = 0
flag = True

for room in range(1, rooms + 1):
    line = list(input().split(' '))
    chairs = list(line[0])
    people = int(line[1])

    diff = len(chairs) - people
    if diff < 0:
        flag = False
        print(f'{abs(diff)} more chairs needed in room {room}')
    else:
        free += diff

if flag:
    print(f'Game On, {free} free chairs left')
