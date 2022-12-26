import { Row, Col, Container, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { ListOfPeople } from "./ListOfPeople";

// Add a "Add new student" button under the search bar
export function EditStudents(props) {
  const [allStudents, setAllStudents] = useState(props.StudentData);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleOnClick = (student) => {
    setSelectedStudent(student);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAllStudents(
      allStudents.map((student) => {
        if (student.id === selectedStudent.id) return selectedStudent;
        else return student;
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col xl={3} className="overflow-auto left-col">
          <ListOfPeople handleOnClick={handleOnClick} data={allStudents} />
        </Col>
        <Col xl={9}>
          Edit
          <SpecificStudentCard
            setSelectedStudent={setSelectedStudent}
            selectedStudent={selectedStudent}
            courseData={props.courseData}
            handleOnSubmit={handleOnSubmit}
          />
          Stuff
        </Col>
      </Row>
    </Container>
  );
}

function SpecificStudentCard(props) {
  if (!props.selectedStudent) return <></>;

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Form id="editStudentForm" onSubmit={props.handleOnSubmit}>
          <RowPersonalData
            selectedStudent={props.selectedStudent}
            setSelectedStudent={props.setSelectedStudent}
          />
          <RowLocationData
            selectedStudent={props.selectedStudent}
            setSelectedStudent={props.setSelectedStudent}
          />
          <RowIdContactData
            selectedStudent={props.selectedStudent}
            setSelectedStudent={props.setSelectedStudent}
          />
        </Form>
        <Button type="submit" className="mt-2" variant="primary" form="editStudentForm">
          Submit
        </Button>
      </Card>
    </>
  );
}

function RowPersonalData(props) {
  const student = props.selectedStudent;
  const setStudent = props.setSelectedStudent;

  if (!student) return <></>;

  const handleFirstNameChange = (e) => setStudent({ ...student, firstName: e.target.value });
  const handleLastNameChange = (e) => setStudent({ ...student, lastName: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentFirstName">
            <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
            <Form.Control
              aria-label="First name"
              value={student.firstName}
              onChange={handleFirstNameChange}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentLastName">
            <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
            <Form.Control
              aria-label="Last name"
              value={student.lastName}
              onChange={handleLastNameChange}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentDOB">
            <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
            <Form.Control type="date" value={student.dob.full} readOnly disabled />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowLocationData(props) {
  const student = props.selectedStudent;
  const setStudent = props.setSelectedStudent;

  if (!student) return <></>;

  const handleCityChange = (e) => setStudent({ ...student.location, city: e.target.value });
  const handleStateChange = (e) => setStudent({ ...student.location, state: e.target.value });
  const handleAddressChange = (e) => setStudent({ ...student.location, address: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentCity">
            <Form.Label className="d-flex justify-content-start">City</Form.Label>
            <Form.Control type="text" value={student.location.city} onChange={handleCityChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentState">
            <Form.Label className="d-flex justify-content-start">State</Form.Label>
            <Form.Control type="text" value={student.location.state} onChange={handleStateChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentAddress">
            <Form.Label className="d-flex justify-content-start">Address</Form.Label>
            <Form.Control
              type="text"
              value={student.location.address}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowIdContactData(props) {
  const student = props.selectedStudent;
  const setStudent = props.setSelectedStudent;
  const email = student.email.split("@");

  if (!student) return <></>;

  const formatEmail = (e) => e.target.value.concat("@students.uwf.edu");
  const handleEmailChange = (e) => setStudent({ ...student, email: formatEmail(e) });
  const handlePhoneChange = (e) => setStudent({ ...student, phone: e.target.value });

  return (
    <>
      <Row>
        <Col xs={4}>
          <Form.Label className="d-flex justify-content-start">Email</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={email[0]} onChange={handleEmailChange} />
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentPhone">
            <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
            <Form.Control type="text" value={student.phone} onChange={handlePhoneChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentId">
            <Form.Label className="d-flex justify-content-start">Student ID</Form.Label>
            <Form.Control
              type="text"
              disabled
              value={student.id}
              onChange={(e) => e.preventDefault()}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
