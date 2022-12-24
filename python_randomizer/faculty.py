import random
import names

EMAIL = "@uwf.edu"


class Instructor:

    def __init__(self) -> None:
        firstName = names.get_first_name()
        lastName = names.get_last_name()

        self.id: int = random.randint(10_000, 99_999)
        self.name: str = f"{firstName} {lastName}"
        self.email: str = f"{lastName.lower()}{random.randint(10, 99)}{EMAIL}"
        self.phone: str = f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
        self.current_courses: list = []

    def __str__(self) -> str:
        return f"{self.name}\n{self.id}\n{self.email}\n{self.phone}\n{self.current_courses}\n"

    def encoder_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "current_courses": self.current_courses
        }
