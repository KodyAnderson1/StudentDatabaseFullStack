import { Row, Col, Container, Card, Form, Badge } from "react-bootstrap";
import { useState } from "react";

import { ListOfStudents } from "./ListOfStudents";

// ! REMOVE THESE
import { SpecificCourseData } from "../../../model/SpecificCourseData";
import { FacultyData } from "../../../model/FacultyData";

export function AllStudents(props) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentChanged, setStudentChanged] = useState(false);
  const [courseView, setCourseView] = useState(0);

  const handleOnClick = (student) => {
    setSelectedStudent(student);
    setStudentChanged(true);
  };
  const handleCourseViewChange = (sectionId) => {
    setStudentChanged(false);
    setCourseView(sectionId);
  };

  return (
    <Container>
      <Row>
        <Col xl={3} className="overflow-auto left-col">
          <ListOfStudents
            handleOnClick={handleOnClick}
            data={props.StudentData}
            setStudentChanged={setStudentChanged}
          />
        </Col>
        <Col xl={9}>
          <SpecificStudentCard
            student={selectedStudent}
            handleCourseViewChange={handleCourseViewChange}
            studentChanged={studentChanged}
          />
          <CourseDetails
            courseView={courseView}
            studentData={props.StudentData}
            studentChanged={studentChanged}
          />
        </Col>
      </Row>
    </Container>
  );
}

function CourseDetails(props) {
  if (props.courseView === 0 || props.studentChanged === true) return <></>;

  const courseWrap = SpecificCourseData.filter((course) => course.section_id === props.courseView);
  const course = courseWrap ? courseWrap[0] : [];
  const instructor = FacultyData.filter((data) => data.id === course.instructor_id);
  const { name: instructorName, email: instructorEmail } = instructor[0];

  const studentsInCourse = props.studentData.filter((student) =>
    course.enrolled_students.includes(student.id)
  );

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
            <Row className="pb-2">
              <Col xs={8} className="d-flex justify-content-start">
                Students
              </Col>
              <Col xs={4} className="d-flex justify-content-end pe-3">
                {studentsInCourse.length}
              </Col>
            </Row>
            <div className="overflow-auto left-col-bleh">
              {studentsInCourse.map((student) => (
                <Col
                  key={student.id}
                  className="d-flex">{`${student.firstName} ${student.lastName}\n`}</Col>
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}

function SpecificStudentCard(props) {
  const student = props.student;
  if (student === "") return <></>;
  const currentCourses = student.current_courses || [];
  const name = student.firstName + " " + student.lastName;
  const courseDeets = currentCourses
    ? SpecificCourseData.filter((course) => currentCourses.includes(course.section_id))
    : [];

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Form>
          <Row>
            <RowNameIDPhone name={name} student={student} />
          </Row>
          <Row>
            <RowDOBCityState student={student} />
          </Row>
          <Row>
            <RowEmailCourses
              student={student}
              courseDeets={courseDeets}
              handleCourseViewChange={props.handleCourseViewChange}
            />
          </Row>
        </Form>
      </Card>
    </>
  );
}

function RowNameIDPhone(props) {
  const name = props.name;
  const student = props.student;
  if (name === "" || student === "") return <></>;

  return (
    <>
      <Col xs={4}>
        <Form.Group controlId="studentName">
          <Form.Label className="d-flex justify-content-start">Name</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder={name} disabled />
        </Form.Group>
      </Col>
      <Col xs={4}>
        <Form.Group controlId="studentId">
          <Form.Label className="d-flex justify-content-start">Student ID</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder={student.id} disabled />
        </Form.Group>
      </Col>
      <Col xs={4}>
        <Form.Group controlId="studentPhone">
          <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
          <Form.Control className="mb-2" type="text" placeholder={student.phone} disabled />
        </Form.Group>
      </Col>
    </>
  );
}

function RowDOBCityState(props) {
  const student = props.student;
  if (student === "") return <></>;

  return (
    <>
      <Col xs={4}>
        <Form.Group controlId="studentDOB">
          <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
          <Form.Control
            className="mb-2 overflow-auto"
            type="text"
            placeholder={student.dob.full}
            disabled
          />
        </Form.Group>
      </Col>
      <Col xs={4}>
        <Form.Group controlId="studentCity">
          <Form.Label className="d-flex justify-content-start">City</Form.Label>
          <Form.Control
            className="mb-2 overflow-auto"
            type="text"
            placeholder={student.city}
            disabled
          />
        </Form.Group>
      </Col>
      <Col xs={4}>
        <Form.Group controlId="studentState">
          <Form.Label className="d-flex justify-content-start">State</Form.Label>
          <Form.Control
            className="mb-2 overflow-auto"
            type="text"
            placeholder={student.state}
            disabled
          />
        </Form.Group>
      </Col>
    </>
  );
}

function RowEmailCourses(props) {
  const student = props.student;
  const courseDeets = props.courseDeets;

  if (courseDeets === [] || student === "") return <></>;
  return (
    <>
      <Col xs={8}>
        <Form.Group controlId="studentEmail">
          <Form.Label className="d-flex justify-content-start">Email</Form.Label>
          <Form.Control
            className="mb-2 overflow-auto"
            type="email"
            placeholder={student.email}
            disabled
          />
        </Form.Group>
      </Col>
      <Col xs={4} className="overflow-badge-area">
        {courseDeets.map((course, index) => (
          <Badge
            key={index}
            onClick={() => props.handleCourseViewChange(course.section_id)}
            className="m-1">
            {course.course_name}
          </Badge>
        ))}
      </Col>
    </>
  );
}
