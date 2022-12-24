import { Row, Col, Container, Card, Form, DropdownButton } from "react-bootstrap";
import { useState } from "react";

import { SpecificCourseData } from "../../../model/SpecificCourseData";
import { FacultyData } from "../../../model/FacultyData";

import { MenuItem } from "@mui/material";

export function AllStudents(props) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [courseView, setCourseView] = useState(0);

  const handleOnClick = (student) => setSelectedStudent(student);
  const handleCourseViewChange = (sectionId) => setCourseView(sectionId);

  return (
    <Container>
      <Row>
        <ListOfStudents handleOnClick={handleOnClick} data={props.StudentData} />
        <Col xl={9}>
          <Card className="text-black p-3 m-3">
            <SpecificStudent
              student={selectedStudent}
              handleCourseViewChange={handleCourseViewChange}
            />
          </Card>
          <CourseDetails courseView={courseView} studentData={props.StudentData} />
        </Col>
      </Row>
    </Container>
  );
}

function CourseDetails(props) {
  if (props.courseView === 0) {
    return <></>;
  }
  const courseWrap = SpecificCourseData.filter((course) => course.section_id === props.courseView);
  const course = courseWrap ? courseWrap[0] : [];
  const instructor = FacultyData.filter((data) => data.id === course.instructor_id);
  const { name: instructorName, email: instructorEmail } = instructor[0];

  const studentsInCourse =
    props.studentData.filter((student) => course.enrolled_students.includes(student.id)) || [];

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="facultyNameStudent">
                <Form.Label className="d-flex justify-content-start">Faculty Name</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={instructorName}
                  disabled
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="CourseNameStudent">
                <Form.Label className="d-flex justify-content-start">Course Name</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={course.course_name}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="sectionIdStudent">
                <Form.Label className="d-flex justify-content-start">Section ID</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={course.section_id}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="facultyIdStudent">
                <Form.Label className="d-flex justify-content-start">Faculty ID</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={course.instructor_id}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="courseIdStudent">
                <Form.Label className="d-flex justify-content-start">Course ID</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={course.course_id}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="facultyEmailStudent">
                <Form.Label className="d-flex justify-content-start">Faculty Email</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={instructorEmail}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Form.Group controlId="AllStudentsTextStudent">
              <Form.Label className="d-flex justify-content-start">Students</Form.Label>
              <div className="overflow-auto left-col-bleh">
                {studentsInCourse.map((student) => (
                  <Col
                    key={student.id}
                    className="d-flex">{`${student.firstName} ${student.lastName}\n`}</Col>
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export function ListOfStudents(props) {
  return (
    <Col xl={3} className="overflow-auto left-col">
      {props.data.map((student) => {
        const name = student.firstName + " " + student.lastName;
        return (
          <Row
            key={student.id}
            onClick={() => props.handleOnClick(student)}
            className=" m-2 btn btn-outline-secondary d-flex text-white">
            {name}
          </Row>
        );
      })}
    </Col>
  );
}

function SpecificStudent(props) {
  const student = props.student;
  const currentCourses = student.current_courses || [];
  const name = student.firstName + " " + student.lastName;
  const courseDeets = currentCourses
    ? SpecificCourseData.filter((course) => currentCourses.includes(course.section_id))
    : [];

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col xs={6}>
              <Form.Group controlId="studentName">
                <Form.Label className="d-flex justify-content-start">Name</Form.Label>
                <Form.Control className="mb-2" type="text" placeholder={name} disabled readOnly />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="studentId">
                <Form.Label className="d-flex justify-content-start">Student ID</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder={student.id}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="studentEmail">
            <Form.Label className="d-flex justify-content-start">Email</Form.Label>
            <Form.Control
              className="mb-2"
              type="email"
              placeholder={student.email}
              disabled
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="studentPhone">
            <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
            <Form.Control
              className="mb-2"
              type="text"
              placeholder={student.phone}
              disabled
              readOnly
            />
          </Form.Group>
          <DropdownButton
            id="dropdownCurrentCourses"
            className="d-flex justify-content-start"
            title={"Current Courses:"}>
            {courseDeets.map((course, index) => (
              <MenuItem
                key={index}
                onClick={() => props.handleCourseViewChange(course.section_id)}
                eventkey={index}
                className="btn d-flex">
                {course.course_name}
              </MenuItem>
            ))}
          </DropdownButton>
        </Form>
      </Container>
    </>
  );
}
