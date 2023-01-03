import random
import names
from location import LocationData

ROAD_ENDING = ["Lane", "Road", "Drive", "Circle", "Place"]
EMAIL = "@students.uwf.edu"
GENDER = ["male", "female"]
getLocation = LocationData()


class Student:
    def __init__(self) -> None:
        self.gender: str = random.choice(GENDER)
        self.firstName: str = names.get_first_name(self.gender)
        self.lastName: str = names.get_last_name()
        self.current_courses = []
        self.id: int = random.randint(100_000_000, 999_999_999)
        self.dob: DOB = DOB()
        self.location = getLocation.get_random_data()
        self.phone: str = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        self.address: str = f"{random.randint(1000, 9999)} {names.get_last_name()} {random.choice(ROAD_ENDING)}"
        self.email: str = f"{self.firstName[0].lower()}{self.lastName.lower()}{random.randint(10, 999)}{EMAIL}"
        self.role: str = "STUDENT"

    def __str__(self) -> str:
        return f"{self.firstName} {self.lastName}\n{self.phone}\n{self.email}\n{self.id}\n{self.dob}\n{self.location}\n{self.address}\n{self.current_courses}\n"

    def encoder_json(self):
        return {
            "firstName": self.firstName,
            "lastName": self.lastName,
            "gender": self.gender,
            "role": self.role,
            "phone": self.phone,
            "current_courses": self.current_courses,
            "email": self.email,
            "id": self.id,
            "location": {
                "address": self.address,
                "city": self.location.city_name,
                "state": self.location.state_name,
            },
            "dob": {
                "month": self.dob.month,
                "day": self.dob.day,
                "year": self.dob.year,
                "full": self.dob.full,
            },
        }


class DOB:
    def __init__(self) -> None:
        self.month: int = random.randint(1, 12)
        self.day: int = self.__helper_day()
        self.year: int = random.randint(1990, 2005)
        self.full: str = f"{self.year}-{self.month:02d}-{self.day:02d}"

    def __str__(self) -> str:
        return f"{self.month}/{self.day}/{self.year}"

    def __helper_day(self):
        if self.month == 2:
            return random.randint(1, 28)
        else:
            return random.randint(1, 30)


def main() -> None:
    students = []

    for i in range(5):
        students.append(Student())

    for stud in students:
        print(stud)


# main()
