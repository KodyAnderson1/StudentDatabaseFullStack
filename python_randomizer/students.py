import random
import names
from location import LocationData

ROAD_ENDING = ["Lane", "Road", "Drive", "Circle", "Place"]
EMAIL = "@students.uwf.edu"
getLocation = LocationData()


class Student:
    def __init__(self) -> None:
        self.firstName: str = names.get_first_name()
        self.lastName: str = names.get_last_name()
        self.current_courses = []
        self.id: int = random.randint(100_000_000, 999_999_999)
        self.dob: DOB = DOB()
        self.location = getLocation.get_random_data()
        self.phone: str = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        self.address: str = f"{random.randint(1000, 9999)} {names.get_last_name()} {random.choice(ROAD_ENDING)}"
        self.email: str = f"{self.lastName.lower()}{random.randint(100, 999)}{EMAIL}"

    def __str__(self) -> str:
        return f"{self.firstName} {self.lastName}\n{self.phone}\n{self.email}\n{self.id}\n{self.dob}\n{self.location}\n{self.address}\n{self.current_courses}\n{self.dob.form}\n"

    def encoder_json(self):
        return {
            "firstName": self.firstName,
            "lastName": self.lastName,
            "phone": self.phone,
            "current_courses": self.current_courses,
            "email": self.email,
            "id": self.id,
            "address": self.address,
            "dob": {
                "month": self.dob.month,
                "day": self.dob.day,
                "year": self.dob.year,
                "full": self.dob.full,
                # "form": self.form,
            },
            "city": self.location.city_name,
            "state": self.location.state_name,
        }


class DOB:
    def __init__(self) -> None:
        self.month: int = random.randint(1, 12)
        self.day: int = random.randint(1, 31)
        self.year: int = random.randint(1990, 2005)
        self.full: str = f"{self.year}-{self.month:02d}-{self.day:02d}"
        # self.form: str = f"{self.year}-{self.month:02d}-{self.day:02d}"

    def __str__(self) -> str:
        return f"{self.month}/{self.day}/{self.year}"


def main() -> None:
    students = []

    for i in range(5):
        students.append(Student())

    for stud in students:
        print(stud)


# main()
