class Dough:
    def __init__(self, flour_type: str, baking_technique: str, weight: float):
        if not flour_type:
            raise ValueError("The flour type cannot be an empty string")
        if not baking_technique:
            raise ValueError("The baking technique cannot be an empty string")
        if weight <= 0:
            raise ValueError("The weight cannot be less or equal to zero")

        self.flour_type = flour_type
        self.baking_technique = baking_technique
        self.weight = weight
