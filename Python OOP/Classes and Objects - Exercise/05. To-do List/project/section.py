from task import Task


class Section:
    def __init__(self, name: str):
        self.name = name
        self.tasks = []

    def add_task(self, new_task: Task):
        if new_task in self.tasks:
            return f"Task is already in the section {self.name}"
        self.tasks.append(new_task)
        return f"Task {new_task.details()} is added to the section"

    def complete_task(self, task_name: str):
        if not any(x.name == task_name for x in self.tasks):
            return f"Could not find task with the name {task_name}"
        for x in self.tasks:
            if x.name == task_name:
                x.completed = True
        return f"Completed task {task_name}"

    def clean_section(self):
        completed_tasks = [x for x in self.tasks if x.completed]
        count = len(completed_tasks)
        self.tasks = [x for x in self.tasks if x not in completed_tasks]
        return f"Cleared {count} tasks."

    def view_section(self):
        new_line = '\n'
        return f"Section {self.name}:\n{new_line.join([x.details() for x in self.tasks])}"


task = Task("Make bed", "27/05/2020")
print(task.change_name("Go to University"))
print(task.change_due_date("28.05.2020"))
task.add_comment("Don't forget laptop")
print(task.edit_comment(6, "Don't forget laptop and notebook"))
print(task.details())
section = Section("Daily tasks")
print(section.add_task(task))
second_task = Task("Make bed", "27/05/2020")
section.add_task(second_task)
print(section.clean_section())
print(section.view_section())
