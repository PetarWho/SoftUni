def shop_from_grocery_list(budget, grocery_list, *products):
    purchased_products = set()
    remaining_budget = budget

    for product, price in products:
        if product not in grocery_list:
            continue
        if product in purchased_products:
            continue
        if price > remaining_budget:
            break

        purchased_products.add(product)
        remaining_budget -= price

    if len(purchased_products) == len(grocery_list):
        return f"Shopping is successful. Remaining budget: {remaining_budget:.2f}."
    else:
        missing_products = set(grocery_list) - purchased_products
        return f"You did not buy all the products. Missing products: {', '. join(missing_products)}."


print(shop_from_grocery_list(
    100,
    ["tomato", "cola", "chips", "meat"],
    ("cola", 5.8),
    ("tomato", 10.0),
    ("meat", 22),
))
