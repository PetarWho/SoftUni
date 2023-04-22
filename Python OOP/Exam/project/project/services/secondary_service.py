from project.services.base_service import BaseService


class SecondaryService(BaseService):
    INITIAL_CAP = 15
    def __init__(self, name):
        super().__init__(name, self.INITIAL_CAP)

    def details(self):
        robot_names = " ".join([robot.name for robot in self.robots]) if self.robots else "none"
        return f"{self.name} Secondary Service:\nRobots: {robot_names}"
