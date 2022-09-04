groups = int(input())

group1 = 0
group2 = 0
group3 = 0
group4 = 0
group5 = 0
total_count_of_people = 0

for x in range(0, groups):
    people_in_group = int(input())

    total_count_of_people += people_in_group

    if people_in_group <= 5:
        group1 += people_in_group
    elif 6 <= people_in_group <= 12:
        group2 += people_in_group
    elif 13 <= people_in_group <= 25:
        group3 += people_in_group
    elif 26 <= people_in_group <= 40:
        group4 += people_in_group
    else:
        group5 += people_in_group

print(f"{group1 / total_count_of_people * 100:.2f}%")
print(f"{group2 / total_count_of_people * 100:.2f}%")
print(f"{group3 / total_count_of_people * 100:.2f}%")
print(f"{group4 / total_count_of_people * 100:.2f}%")
print(f"{group5 / total_count_of_people * 100:.2f}%")