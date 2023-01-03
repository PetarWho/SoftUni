string = input()

mylist = list(map(int, string.split(' ')))
mylist = [number * -1 for number in mylist]

print(mylist)
