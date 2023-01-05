import { CustomAlert } from "../../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FacultyCourses } from "./FacultyCourses";

// ! Add gender

export function FacultyCard(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [person, setPerson] = useState("");
  const urlParams = useParams();
  const personId = urlParams.id;

  useEffect(() => {
    setPerson(...props.data.filter((student) => student.id === parseInt(personId)));
  }, [personId, props.data]);

  // ! Doesn't work anymore. Needs to be fixed! When submit is clicked, resets to initial data
  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    setPerson(person);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateFaculty(person);
  };

  const submitButton = isEditable ? <CustomAlert /> : <></>;

  return (
    <>
      <Card className="text-black p-3 mt-4 me-3 person-card">
        <Row className="border-bottom d-flex">
          <Col xs={4} className="d-flex justify-content-start">
            <h3>{person.role}</h3>
          </Col>
          <Col xs={6} className="d-flex justify-content-end">
            {submitButton}
          </Col>
          <Col xs={2}>
            <Button
              onClick={handleEditable}
              className="mb-2 d-flex align-items-center justify-content-center enable-edit-btn">
              {isEditable ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Col>
        </Row>
        <Form id="editStudentForm" onSubmit={onSubmit}>
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
        <FacultyCourses faculty={person} />
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
            <Form.Control type="date" value={student.dob.full} readOnly disabled />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Form.Group controlId="studentGender">
            <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
            <Form.Control
              type="text"
              value={capitalizeFirstLetter(student.gender)}
              disabled={isEditable ? "" : "disabled"}
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
