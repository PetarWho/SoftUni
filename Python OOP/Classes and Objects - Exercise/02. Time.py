class Time:
    max_hours = 23
    max_minutes = 59
    max_seconds = 59

    def __init__(self, hours: int, minutes: int, seconds: int):
        self.hours = hours
        self.minutes = minutes
        self.seconds = seconds

    def set_time(self, hours, minutes, seconds):
        self.hours = hours
        self.minutes = minutes
        self.seconds = seconds

    def get_time(self):
        return "{:02d}:{:02d}:{:02d}".format(self.hours, self.minutes, self.seconds)

    def next_second(self):
        self.seconds += 1
        if self.seconds >= 60:
            self.seconds -= 60
            self.minutes += 1

        if self.minutes >= 60:
            self.minutes -= 60
            self.hours += 1

        if self.hours >= 24:
            self.hours -= 24

        return self.get_time()


time = Time(23, 59, 59)
print(time.next_second())
