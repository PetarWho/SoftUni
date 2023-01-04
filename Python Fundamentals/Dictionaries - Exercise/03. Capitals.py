countries = input().split(', ')
capitals = input().split(', ')

result = {country: capital for country, capital in zip(countries, capitals)}

for k, v in result.items():
    print(f"{k} -> {v}")
