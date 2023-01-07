import { CustomAlert } from "../../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StudentCourses } from "./StudentCourses";

// import { tester } from "../../../reeeeee";
// import { CoursesData } from "../../../model/CoursesData";

// import { StudentData } from "../../../model/StudentData";

import { PersonJsonToOjbect } from "../../../utils";

export function StudentCard(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [person, setPerson] = useState("");
  const urlParams = useParams();
  const personId = urlParams.id;

  useEffect(() => {
    fetch(`http://localhost:8080/student/${personId}`)
      .then((response) => response.json())
      .then((result) => setPerson(PersonJsonToOjbect(result)));
  }, [personId]);

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    setPerson(person);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateStudent(person);
  };

  const removeStudentSubmit = (e) => {
    e.preventDefault();
    props.removeStudent(person.id);
    setPerson("");
  };

  return (
    <>
      <Card className="text-black p-3 mt-4 me-3 person-card">
        <Row className="border-bottom d-flex">
          <Col xs={4} className="d-flex justify-content-start">
            <h3>{person.role}</h3>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            {isEditable ? <CustomAlert removePerson={removeStudentSubmit} /> : <></>}
          </Col>
          <Col xs={2}>
            <Button
              onClick={handleEditable}
              className="mb-2 d-flex align-items-center justify-content-center enable-edit-btn">
              {isEditable ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Col>
        </Row>
        <Form id="editStudentForm" onSubmit={onSubmit} className="mt-3">
          <RowPersonalData
            selectedPerson={person}
            setSelectedPerson={setPerson}
            isEditable={isEditable}
          />
          <RowLocationData
            selectedPerson={person}
            setSelectedPerson={setPerson}
            isEditable={isEditable}
          />
          <RowIdContactData
            selectedPerson={person}
            setSelectedPerson={setPerson}
            isEditable={isEditable}
          />
        </Form>
        <StudentCourses student={person} />
      </Card>

      {/* </Col> */}
    </>
  );
}

function RowPersonalData(props) {
  const student = props.selectedPerson;
  const setStudent = props.setSelectedPerson;
  const isEditable = props.isEditable;

  if (!student) return <></>;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
              disabled={isEditable ? "" : "disabled"}
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
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="studentDOB">
            <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
            <Form.Control
              type="date"
              value={student.dob.full}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="studentDOB">
            <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
            <Form.Control
              type="text"
              value={capitalizeFirstLetter(student.gender)}
              readOnly
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowLocationData(props) {
  const student = props.selectedPerson;
  const setStudent = props.setSelectedPerson;
  const isEditable = props.isEditable;

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
            <Form.Control
              type="text"
              value={student.location.city}
              onChange={handleCityChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentState">
            <Form.Label className="d-flex justify-content-start">State</Form.Label>
            <Form.Control
              type="text"
              value={student.location.state}
              onChange={handleStateChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentAddress">
            <Form.Label className="d-flex justify-content-start">Address</Form.Label>
            <Form.Control
              type="text"
              value={student.location.address}
              onChange={handleAddressChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowIdContactData(props) {
  const student = props.selectedPerson;
  const setStudent = props.setSelectedPerson;
  const isEditable = props.isEditable;
  let email;
  if (student.email) {
    email = student.email.split("@") ? student.email.split("@") : "default email";
  } else {
    email = "default email";
  }

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
            <Form.Control
              type="text"
              value={email[0]}
              onChange={handleEmailChange}
              disabled={isEditable ? "" : "disabled"}
            />
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentPhone">
            <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={student.phone}
              onChange={handlePhoneChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentId">
            <Form.Label className="d-flex justify-content-start">ID</Form.Label>
            <Form.Control type="text" value={student.id} disabled />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
