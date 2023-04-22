from abc import ABC, abstractmethod


class BaseService(ABC):
    def __init__(self, name: str, capacity: int):
        self.name = name
        self.capacity = capacity
        self.robots = []

    @abstractmethod
    def details(self):
        pass

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if value.strip() == "":
            raise ValueError("Service name cannot be empty!")
        self._name = value

    @property
    def capacity(self):
        return self._capacity

    @capacity.setter
    def capacity(self, value):
        if value <= 0:
            raise ValueError("Service capacity cannot be less than or equal to 0!")
        self._capacity = value

    @property
    def robots(self):
        return self._robots

    @robots.setter
    def robots(self, value):
        self._robots = value
