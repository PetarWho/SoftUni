gifts = input().split(' ')

command = input()

while command != 'No Money':
    splits = command.split(' ')
    command = splits[0]
    gift = splits[1]

    if command == 'OutOfStock':
        while gifts.__contains__(gift):
            gifts[gifts.index(gift)] = "None"

    if command == 'Required':
        index = int(splits[2])
        if len(gifts) > index >= 0:
            gifts[index] = gift

    if command == 'JustInCase':
        gifts[len(gifts)-1] = gift

    command = input()

while 'None' in gifts:
    gifts.remove('None')

print(str.join(' ', gifts))
