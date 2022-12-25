import { Row, Col, Container, Card, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { ListOfStudents } from "./ListOfStudents";

// Add a "Add new student" button under the search bar
export function EditStudents(props) {
  const [selectedStudent, setSelectedStudent] = useState("");
  // const [studentChanged, setStudentChanged] = useState(false);

  const handleOnClick = (student) => setSelectedStudent(student);

  return (
    <Container>
      <Row>
        <Col xl={3} className="overflow-auto left-col">
          <ListOfStudents handleOnClick={handleOnClick} data={props.StudentData} />
        </Col>
        <Col xl={9}>
          Edit
          <SpecificStudentCard student={selectedStudent} courseData={props.courseData} />
          Stuff
        </Col>
      </Row>
    </Container>
  );
}

function SpecificStudentCard(props) {
  const student = props.student;
  if (student === "") return <></>;
  const name = student.firstName + " " + student.lastName;
  const currentCourses = student.current_courses ? student.current_courses : null;
  const courseDeets = currentCourses
    ? props.courseData.filter((course) => currentCourses.includes(course.section_id))
    : [];

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Form>
          <RowPersonalData name={name} student={student} />
          <RowLocationData student={student} />
          <RowIdContactData student={student} courseDeets={courseDeets} />
        </Form>
      </Card>
    </>
  );
}

function RowPersonalData(props) {
  const name = props.name;
  const student = props.student;
  if (name === "" || student === "") return <></>;

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentFirstName">
            <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
            <Form.Control aria-label="First name" placeholder={student.firstName} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentLastName">
            <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
            <Form.Control aria-label="Last name" placeholder={student.lastName} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentDOB">
            <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
            <Form.Control
              type="date"
              value={student.dob.full}
              onChange={(e) => e.preventDefault()}
            />{" "}
            {/* ! FIX ON CHANGE  */}
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowLocationData(props) {
  const student = props.student;
  if (student === "") return <></>;

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentCity">
            <Form.Label className="d-flex justify-content-start">City</Form.Label>
            <Form.Control type="text" placeholder={student.city} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentState">
            <Form.Label className="d-flex justify-content-start">State</Form.Label>
            <Form.Control type="text" placeholder={student.state} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentAddress">
            <Form.Label className="d-flex justify-content-start">Address</Form.Label>
            <Form.Control type="text" placeholder={student.address} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowIdContactData(props) {
  const student = props.student;
  const courseDeets = props.courseDeets;
  const email = student.email.split("@");
  if (courseDeets === [] || student === "") return <></>;
  return (
    <>
      <Row>
        <Col xs={4}>
          <Form.Label className="d-flex justify-content-start">Email</Form.Label>
          <InputGroup>
            <Form.Control className=" overflow-auto" type="email" placeholder={email[0]} />
            <InputGroup.Text className="">@</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentPhone">
            <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
            <Form.Control type="text" placeholder={student.phone} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentId">
            <Form.Label className="d-flex justify-content-start">Student ID</Form.Label>
            <Form.Control type="text" disabled placeholder={student.id} />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
