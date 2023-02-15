def forecast(*locations):
    weather_order = {"Sunny": 1, "Cloudy": 2, "Rainy": 3}
    sorted_locs = sorted(locations, key=lambda x: (weather_order[x[1]], x[0]))
    result = ""
    for loc in sorted_locs:
        result += f"{loc[0]} - {loc[1]}\n"
    return result


print(forecast(
    ("Tokyo", "Rainy"),
    ("Sofia", "Rainy")))
