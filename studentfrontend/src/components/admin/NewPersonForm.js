import { CustomAlert } from "../CustomAlert";
import { Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";

const defaultPerson = {
  firstName: "",
  lastName: "",
  gender: "",
  role: "",
  phone: "",
  current_courses: [],
  email: "",
  id: "",
  location: { address: "", city: "", state: "" },
  dob: { month: 1, day: 1, year: 1900, full: "1900-01-01" },
};

export function NewPersonForm(props) {
  const [newPerson, setNewPerson] = useState(defaultPerson);

  const submitButton = <CustomAlert show={props.show} setToastShow={props.setToastShow} />;

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Row className="border-bottom mb-3">
          <Col className="d-flex justify-content-start display-6">{props.selectedPerson.role}</Col>
          <Col className="d-flex justify-content-end">{submitButton}</Col>
        </Row>
        <Form id="editStudentForm" onSubmit={props.handleOnSubmit}>
          <RowPersonalData selectedPerson={newPerson} setSelectedPerson={setNewPerson} />
          <RowLocationData selectedPerson={newPerson} setSelectedPerson={setNewPerson} />
          <RowIdContactData selectedPerson={newPerson} setSelectedPerson={setNewPerson} />
        </Form>
      </Card>
    </>
  );
}

function RowPersonalData(props) {
  const person = props.selectedPerson;
  const setPerson = props.setSelectedPerson;

  if (!person) return <></>;

  const handleFirstNameChange = (e) => setPerson({ ...person, firstName: e.target.value });
  const handleLastNameChange = (e) => setPerson({ ...person, lastName: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentFirstName">
            <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
            <Form.Control
              aria-label="First name"
              value={person.firstName}
              onChange={handleFirstNameChange}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentLastName">
            <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
            <Form.Control
              aria-label="Last name"
              value={person.lastName}
              onChange={handleLastNameChange}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentDOB">
            <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
            <Form.Control type="date" value={person.dob.full} readOnly disabled />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowLocationData(props) {
  const person = props.selectedPerson;
  const setPerson = props.setSelectedPerson;

  if (!person) return <></>;

  const handleCityChange = (e) => setPerson({ ...person.location, city: e.target.value });
  const handleStateChange = (e) => setPerson({ ...person.location, state: e.target.value });
  const handleAddressChange = (e) => setPerson({ ...person.location, address: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="studentCity">
            <Form.Label className="d-flex justify-content-start">City</Form.Label>
            <Form.Control type="text" value={person.location.city} onChange={handleCityChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentState">
            <Form.Label className="d-flex justify-content-start">State</Form.Label>
            <Form.Control type="text" value={person.location.state} onChange={handleStateChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentAddress">
            <Form.Label className="d-flex justify-content-start">Address</Form.Label>
            <Form.Control
              type="text"
              value={person.location.address}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowIdContactData(props) {
  const person = props.selectedPerson;
  const setPerson = props.setSelectedPerson;
  const email = person.email.split("@");

  if (!person) return <></>;

  const formatEmail = (e) => e.target.value.concat("@students.uwf.edu");
  const handleEmailChange = (e) => setPerson({ ...person, email: formatEmail(e) });
  const handlePhoneChange = (e) => setPerson({ ...person, phone: e.target.value });

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
            <Form.Control type="text" value={person.phone} onChange={handlePhoneChange} />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="studentId">
            <Form.Label className="d-flex justify-content-start">ID</Form.Label>
            <Form.Control type="text" value={person.id} disabled />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
