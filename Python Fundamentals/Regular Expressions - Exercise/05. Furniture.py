import re

data = input()

pattern = r"(^>>)(?P<name>\w+)<<(?P<price>\d+(\.\d+)?)\!(?P<quantity>\d+)($|\s)"
names = []
total_price = 0

while not data == "Purchase":
    match = re.match(pattern, data)
    if match:
        obj = match.groupdict()
        names.append(obj["name"])
        total_price += float(obj["price"]) * int(obj["quantity"])
    data = input()

print("Bought furniture:")

for name in names:
    print(name)
print(f"Total money spend: {total_price:.2f}")