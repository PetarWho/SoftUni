command = input()

result = {}

while command != 'End':
    company = command.split(' -> ')[0]
    employeeId = command.split(' -> ')[1]
    if not result.keys().__contains__(company):
        result[company] = []

    if not result[company].__contains__(employeeId):
        result[company].append(employeeId)

    command = input()

for k, v in result.items():
    print(k)
    for empId in v:
        print(f' -- {empId}')
