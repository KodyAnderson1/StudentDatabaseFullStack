import random

COURSE_NAMES = [
    "Client-Side Programming", "Data Structures & Algorithms I",
    "Software Engineering I", "C++ Programming",
    "Advanced Computer Programming", "Computer Organization",
    "Programming Languages", "Calculus", "Server-Side Programming"
]

COURSE_IDS = random.sample(range(4000, 9999), len(COURSE_NAMES))


class Course:

    def __init__(self, course_id: int, name: str) -> None:
        self.course_id: int = course_id
        self.name: str = name
        self.classes: list[Class] = []

    def __str__(self):
        return f"{self.course_id} {self.name}"


class Class:

    def __init__(
            self,
            course: Course,
            instructor_id: int = 0,
            enrolled_students: set = set(),
    ) -> None:
        self.course_name: str = course.name
        self.course_id: int = course.course_id
        self.instructor_id: int = instructor_id
        self.enrolled_students: list = enrolled_students
        self.section_id: int = random.randint(100_000, 999_999)

    def __str__(self) -> str:
        return f"{self.course_name} {self.course_id} {self.instructor_id} {self.section_id} {self.enrolled_students}"

    def encoder_json(self):
        return {
            "course_name": self.course_name,
            "instructor_id": self.instructor_id,
            "enrolled_students": list(self.enrolled_students),
            "section_id": self.section_id,
            "course_id": self.course_id,
        }


class ClassData:

    def __init__(self) -> None:
        self.courses: list = self.__init_courses()
        self.__init_classes()

    def __init_courses(self) -> list:
        c = []
        for i in range(len(COURSE_NAMES)):
            c.append(Course(COURSE_IDS[i], COURSE_NAMES[i]))
        return c

    def __init_classes(self) -> None:
        for c in self.courses:
            randNum = random.randint(1, 3)
            c.classes = [Class(c) for _ in range(randNum)]
