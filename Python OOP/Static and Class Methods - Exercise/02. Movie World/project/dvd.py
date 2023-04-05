import calendar


class DVD:
    def __init__(self, name: str, id: int, creation_year: int, creation_month: str, age_restriction: int):
        self.id = id
        self.name = name
        self.creation_year = creation_year
        self.creation_month = creation_month
        self.age_restriction = age_restriction
        self.is_rented = False

    @staticmethod
    def from_date(id: int, name: str, date: str, age_restriction: int):
        date_split = date.split('.')
        return DVD(name, id, int(date_split[2]), calendar.month_name[int(date_split[1])], age_restriction)

    def __repr__(self):
        return f"{self.id}: {self.name} ({self.creation_month} {self.creation_year}) has age restriction {self.age_restriction}. Status: {'rented'if self.is_rented else 'not rented'}"
