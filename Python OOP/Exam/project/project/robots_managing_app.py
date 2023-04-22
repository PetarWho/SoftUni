from project.services.main_service import MainService
from project.services.secondary_service import SecondaryService
from project.robots.male_robot import MaleRobot
from project.robots.female_robot import FemaleRobot


class RobotsManagingApp:
    def __init__(self):
        self.robots = []
        self.services = []

    def add_service(self, service_type: str, name: str) -> str:
        if service_type == "MainService":
            service = MainService(name)
        elif service_type == "SecondaryService":
            service = SecondaryService(name)
        else:
            raise Exception("Invalid service type!")
        self.services.append(service)
        return f"{service_type} is successfully added."

    def add_robot(self, robot_type: str, name: str, kind: str, price: float) -> str:
        if robot_type == "MaleRobot":
            robot = MaleRobot(name, kind, price)
        elif robot_type == "FemaleRobot":
            robot = FemaleRobot(name, kind, price)
        else:
            raise Exception("Invalid robot type!")
        self.robots.append(robot)
        return f"{robot_type} is successfully added."

    def add_robot_to_service(self, robot_name: str, service_name: str) -> str:
        robot = next((r for r in self.robots if r.name == robot_name), None)
        service = next((s for s in self.services if s.name == service_name), None)
        if isinstance(robot, FemaleRobot) and not isinstance(service, SecondaryService):
            return "Unsuitable service."
        if isinstance(robot, MaleRobot) and not isinstance(service, MainService):
            return "Unsuitable service."
        if robot in service.robots:
            return f"{robot_name} is already in {service_name}."
        if len(service.robots) >= service.capacity:
            raise Exception("Not enough capacity for this robot!")
        self.robots.remove(robot)
        service.robots.append(robot)
        return f"Successfully added {robot_name} to {service_name}."

    def remove_robot_from_service(self, robot_name: str, service_name: str) -> str:
        service = next((s for s in self.services if s.name == service_name), None)
        robot = next((r for r in service.robots if r.name == robot_name), None)
        if robot is None:
            raise Exception("No such robot in this service!")
        service.robots.remove(robot)
        self.robots.append(robot)
        return f"Successfully removed {robot_name} from {service_name}."

    def feed_all_robots_from_service(self, service_name: str) -> str:
        service = next((s for s in self.services if s.name == service_name), None)
        if service is None:
            raise Exception("Service does not exist!")
        num_fed = 0
        for robot in service.robots:
            robot.eating()
            num_fed += 1
        return f"Robots fed: {num_fed}."

    def service_price(self, service_name: str) -> str:
        service = next((s for s in self.services if s.name == service_name), None)
        if service is None:
            raise Exception("Service does not exist!")
        total_price = sum([robot.price for robot in service.robots])
        return f"The value of service {service_name} is {total_price:.2f}."

    def __str__(self):
        result = ""
        for service in self.services:
            result += f"{service.details()}\n"
        return result.rstrip()

