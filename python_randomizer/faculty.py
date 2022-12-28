import random
import names

EMAIL = "@uwf.edu"


class Instructor:
    def __init__(self) -> None:
        self.firstName = names.get_first_name()
        self.lastName = names.get_last_name()
        self.id: int = random.randint(10_000, 99_999)
        self.email: str = f"{self.firstName[0].lower()}{self.lastName.lower()}{random.randint(10, 99)}{EMAIL}"
        self.phone: str = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        self.current_courses: list = []

    def __str__(self) -> str:
        return f"{self.firstName} {self.lastName}\n{self.id}\n{self.email}\n{self.phone}\n{self.current_courses}\n"

    def encoder_json(self):
        return {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "phone": self.phone,
            "email": self.email,
            "current_courses": self.current_courses,
        }
