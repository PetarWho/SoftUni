from project.customer import Customer
from project.dvd import DVD


class MovieWorld:
    def __init__(self, name: str):
        self.name = name
        self.customers = []
        self.dvds = []

    @staticmethod
    def dvd_capacity():
        return 15

    @staticmethod
    def customer_capacity():
        return 10

    def add_customer(self, customer: Customer):
        if len(self.customers) < self.customer_capacity():
            self.customers.append(customer)
            return True
        else:
            return False

    def add_dvd(self, dvd: DVD):
        if len(self.dvds) < self.dvd_capacity():
            self.dvds.append(dvd)
            return True
        else:
            return False

    def rent_dvd(self, customer_id: int, dvd_id: int):
        customer = next((customer for customer in self.customers if customer.id == customer_id), None)
        dvd = next((dvd for dvd in self.dvds if dvd.id == dvd_id), None)

        if not customer or not dvd:
            return False

        if dvd in customer.rented_dvds:
            return f"{customer.name} has already rented {dvd.name}"

        if dvd.is_rented:
            return "DVD is already rented"

        if customer.age < dvd.age_restriction:
            return f"{customer.name} should be at least {dvd.age_restriction} to rent this movie"

        dvd.is_rented = True
        customer.rented_dvds.append(dvd)
        return f"{customer.name} has successfully rented {dvd.name}"

    def return_dvd(self, customer_id: int, dvd_id: int):
        customer = next((customer for customer in self.customers if customer.id == customer_id), None)
        dvd = next((dvd for dvd in self.dvds if dvd.id == dvd_id), None)

        if not customer or not dvd:
            return False

        if dvd not in customer.rented_dvds:
            return f"{customer.name} does not have that DVD"

        dvd.is_rented = False
        customer.rented_dvds.remove(dvd)
        return f"{customer.name} has successfully returned {dvd.name}"

    def __repr__(self):
        customers_str = "\n".join([f"{customer}" for customer in self.customers])
        dvds_str = "\n".join([f"{dvd}" for dvd in self.dvds])
        return f"{customers_str}\n{dvds_str}"

