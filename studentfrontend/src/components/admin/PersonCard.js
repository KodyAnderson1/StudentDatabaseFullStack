import { CustomAlert } from "../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

// ! Add gender
export function PersonCard(props) {
  const [isEditable, setIsEditable] = useState(false);

  if (!props.selectedPerson) return <></>;

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    props.setSelectedPerson(
      ...props.allPeople.filter((student) => student.id === props.selectedPerson.id)
    );
  };

  const submitButton = isEditable ? (
    <CustomAlert show={props.show} setToastShow={props.setToastShow} />
  ) : (
    <></>
  );

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Row className="border-bottom mb-3">
          <Col className="d-flex justify-content-start display-6">{props.selectedPerson.role}</Col>
          <Col className="d-flex justify-content-end">
            {submitButton}
            <Button onClick={handleEditable} className="ms-5 mb-3">
              {isEditable ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Col>
        </Row>
        <Form id="editStudentForm" onSubmit={props.handleOnSubmit}>
          <RowPersonalData
            selectedPerson={props.selectedPerson}
            setSelectedPerson={props.setSelectedPerson}
            isEditable={isEditable}
          />
          <RowLocationData
            selectedPerson={props.selectedPerson}
            setSelectedPerson={props.setSelectedPerson}
            isEditable={isEditable}
          />
          <RowIdContactData
            selectedPerson={props.selectedPerson}
            setSelectedPerson={props.setSelectedPerson}
            isEditable={isEditable}
          />
        </Form>
      </Card>
    </>
  );
}

function RowPersonalData(props) {
  const student = props.selectedPerson;
  const setStudent = props.setSelectedPerson;
  const isEditable = props.isEditable;

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
