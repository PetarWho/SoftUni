from project.dough import Dough
from project.topping import Topping


class Pizza:
    def __init__(self, name: str, dough: Dough, max_number_of_toppings: int):
        if not name:
            raise ValueError("The name cannot be an empty string")
        if not dough:
            raise ValueError("You should add dough to the pizza")
        if max_number_of_toppings <= 0:
            raise ValueError("The maximum number of toppings cannot be less or equal to zero")

        self.name = name
        self.dough = dough
        self.max_number_of_toppings = max_number_of_toppings
        self.toppings = {}

    def add_topping(self, topping: Topping):
        if self.max_number_of_toppings == len(self.toppings.keys()):
            raise ValueError("Not enough space for another topping")
        if topping.topping_type not in self.toppings.keys():
            self.toppings[topping.topping_type] = topping.weight
        else:
            self.toppings[topping.topping_type] += topping.weight

    def calculate_total_weight(self):
        toppings_weight = sum([v for k, v in self.toppings.items()])
        return toppings_weight + self.dough.weight

