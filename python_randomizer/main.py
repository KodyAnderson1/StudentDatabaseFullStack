from students import Student
from faculty import Instructor
from courses import ClassData
import random
import json


def init_students(number: int = 0) -> list:
    return [Student() for _ in range(number)]


def init_faculty(number: int = 0) -> list:
    return [Instructor() for _ in range(number)]


def init_courses_with_instructors() -> list:
    returnCourses = ClassData().courses
    for c in returnCourses:
        for cl in c.classes:
            cl.instructor_id = random.choice(FACULTY).id
    return returnCourses


def assign_instructors():
    for course in COURSES:
        for cl in course.classes:
            for instruc in FACULTY:
                if cl.instructor_id == instruc.id:
                    instruc.current_courses.append(cl.section_id)


def assign_students_to_classes():
    for student in STUDENTS:
        course = random.sample(COURSES, k=random.randint(1, 5))
        for c in course:
            student.current_courses.append(random.choice(c.classes).section_id)


def encode_students() -> None:
    encoded = []
    for item in STUDENTS:
        encoded.append(item.encoder_json())
    with open("./json/students.json", "w") as f:
        json.dump(encoded, f)


def encode_faculty() -> None:
    encoded = []
    for item in FACULTY:
        encoded.append(item.encoder_json())
    with open("./json/faculty.json", "w") as f:
        json.dump(encoded, f)


def encode_courses() -> None:
    encoded = []
    for item in COURSES:
        for spec in item.classes:
            encoded.append(spec.encoder_json())
    with open("./json/classes.json", "w") as f:
        json.dump(encoded, f)


def add_student_to_class(ids: int, studId: int):
    for course in COURSES:
        for cl in course.classes:
            if ids == cl.section_id:
                cl.enrolled_students.append(studId)


NUMBER_STUDENTS: int = 100
NUMBER_FAC: int = 6

STUDENTS = init_students(NUMBER_STUDENTS)
FACULTY = init_faculty(NUMBER_FAC)
COURSES = init_courses_with_instructors()


def get_section_ids():
    retDict = {}
    for c in COURSES:
        for sect in c.classes:
            retDict[sect.section_id] = sect
    return retDict


def get_student_dict():
    retDict: dict[int, list] = {}
    for student in STUDENTS:
        for sectId in student.current_courses:
            if sectId in retDict:
                retDict[sectId].append(student.id)
            else:
                retDict[sectId] = [student.id]
    return retDict


def main() -> None:
    assign_instructors()
    assign_students_to_classes()
    encode_students()
    encode_faculty()

    sect_dict = get_section_ids()
    stud_sect = get_student_dict()

    for student in STUDENTS:
        for curr_class in student.current_courses:
            sect_dict[curr_class]

    for key, value in sect_dict.items():
        if key in stud_sect:
            sect_dict[key].enrolled_students = set(stud_sect[key])
    encode_courses()


main()
