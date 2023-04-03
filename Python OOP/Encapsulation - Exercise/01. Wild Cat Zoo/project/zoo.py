from project.animal import Animal
from project.worker import Worker
from project.tiger import Tiger
from project.lion import Lion
from project.cheetah import Cheetah
from project.keeper import Keeper
from project.vet import Vet
from project.caretaker import Caretaker

class Zoo:
    def __init__(self, name: str, budget: int, animal_capacity: int, workers_capacity: int):
        self.name = name
        self.__budget = budget
        self.__animal_capacity = animal_capacity
        self. __workers_capacity = workers_capacity
        self. animals = []
        self.workers = []

    def add_animal(self, animal: Animal, price: int):
        if self.__budget < price:
            return "Not enough budget"
        elif self.__animal_capacity <= 0:
            return "Not enough space for animal"
        else:
            self.animals.append(animal)
            self.__budget -= price
            self.__animal_capacity -= 1
            return f"{animal.name} the {animal.__class__.__name__} added to the zoo"

    def hire_worker(self, worker: Worker):
        if self.__workers_capacity <= len(self.workers):
            return "Not enough space for worker"
        else:
            self.workers.append(worker)
            return f"{worker.name} the {worker.__class__.__name__} hired successfully"

    def fire_worker(self, worker_name: str):
        for w in self.workers:
            if w.name == worker_name:
                self.workers.remove(w)
                return f"{worker_name} fired successfully"

        return f"There is no {worker_name} in the zoo"

    def pay_workers(self):
        salaries = sum([x.salary for x in self.workers])
        if self.__budget >= salaries:
            self.__budget -= salaries
            return f"You payed your workers. They are happy. Budget left: {self.__budget}"
        else:
            return "You have no budget to pay your workers. They are unhappy"

    def tend_animals(self):
        cares = sum([x.money_for_care for x in self.animals])
        if self.__budget >= cares:
            self.__budget -= cares
            return f"You tended all the animals. They are happy. Budget left: {self.__budget}"
        else:
            return "You have no budget to tend the animals. They are unhappy."

    def profit(self, amount: int):
        self.__budget += amount

    def animals_status(self):
        lions = [animal for animal in self.animals if isinstance(animal, Lion)]
        tigers = [animal for animal in self.animals if isinstance(animal, Tiger)]
        cheetahs = [animal for animal in self.animals if isinstance(animal, Cheetah)]

        amount_of_lions = len(lions)
        amount_of_tigers = len(tigers)
        amount_of_cheetahs = len(cheetahs)
        total_animals_count = len(self.animals)

        lion_repr = "\n".join([f"{lion}" for lion in lions])
        tiger_repr = "\n".join([f"{tiger}" for tiger in tigers])
        cheetah_repr = "\n".join([f"{cheetah}" for cheetah in cheetahs])

        return f"You have {total_animals_count} animals\n" \
               f"----- {amount_of_lions} Lions:\n" \
               f"{lion_repr}\n" \
               f"----- {amount_of_tigers} Tigers:\n" \
               f"{tiger_repr}\n" \
               f"----- {amount_of_cheetahs} Cheetahs:\n" \
               f"{cheetah_repr}"

    def workers_status(self):
        keepers = []
        caretakers = []
        vets = []

        for worker in self.workers:
            if isinstance(worker, Keeper):
                keepers.append(worker)
            elif isinstance(worker, Caretaker):
                caretakers.append(worker)
            elif isinstance(worker, Vet):
                vets.append(worker)

        amount_of_keepers = len(keepers)
        amount_of_caretakers = len(caretakers)
        amount_of_vets = len(vets)
        total_workers_count = len(self.workers)

        keepers_str = "\n".join([f"{keeper}" for keeper in keepers])
        caretakers_str = "\n".join([f"{caretaker}" for caretaker in caretakers])
        vets_str = "\n".join([f"{vet}" for vet in vets])

        result = f"You have {total_workers_count} workers\n"
        result += f"----- {amount_of_keepers} Keepers:\n{keepers_str}\n"
        result += f"----- {amount_of_caretakers} Caretakers:\n{caretakers_str}\n"
        result += f"----- {amount_of_vets} Vets:\n{vets_str}"
        return result

