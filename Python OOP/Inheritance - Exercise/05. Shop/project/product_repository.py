from project.product import Product

class ProductRepository:
    def __init__(self):
        self.products = []

    def add(self, product: Product):
        self.products.append(product)

    def find(self, product_name: str):
        return next((p for p in self.products if p.name == product_name))

    def remove(self, product_name: str):
        for i, p in enumerate(self.products):
            if p.name == product_name:
                self.products.pop(i)
                break

    def __repr__(self):
        return '\n'.join([f"{p.name}: {p.quantity}" for p in self.products])
