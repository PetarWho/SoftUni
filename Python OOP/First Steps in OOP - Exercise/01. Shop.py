class Shop:
    def __init__(self, _name: str, _items: list):
        self.name = _name
        self.items = _items

    def get_items_count(self):
        return len(self.items)


shop = Shop("My Shop", ["Apples", "Bananas", "Cucumbers"])
print(shop.get_items_count())
