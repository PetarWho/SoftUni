from abc import ABC, abstractmethod
from project.services.base_service import BaseService


class MainService(BaseService):
    INITIAL_CAP = 30
    def __init__(self, name: str):
        super().__init__(name, self.INITIAL_CAP)

    def details(self) -> str:
        robot_names = " ".join(robot.name for robot in self.robots) if self.robots else "none"
        return f"{self.name} Main Service:\nRobots: {robot_names}"
