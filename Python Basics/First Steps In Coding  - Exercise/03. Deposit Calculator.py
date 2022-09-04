deposit = float(input())
span = int(input())
interest = float(input())/100

sum = deposit + span * ((deposit * interest)/12)

print(sum)
