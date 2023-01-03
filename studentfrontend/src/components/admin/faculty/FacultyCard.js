import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";
import { CustomAlert } from "../../CustomAlert";

export function FacultyCard(props) {
  const [isEditable, setIsEditable] = useState(false);

  if (!props.selectedFaculty) return <></>;

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    props.setSelectedFaculty(
      ...props.allFaculty.filter((student) => student.id === props.selectedFaculty.id)
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
          <Col className="d-flex justify-content-start display-6">Faculty</Col>
          <Col className="d-flex justify-content-end">
            {submitButton}
            <Button onClick={handleEditable} className="ms-5 mb-3">
              {isEditable ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Col>
        </Row>
        <Form id="editStudentForm" onSubmit={props.handleOnSubmit}>
          <RowPersonalData
            selectedFaculty={props.selectedFaculty}
            setSelectedFaculty={props.setSelectedFaculty}
            isEditable={isEditable}
          />
          <RowIdContactData
            selectedFaculty={props.selectedFaculty}
            setSelectedFaculty={props.setSelectedFaculty}
            isEditable={isEditable}
          />
        </Form>
      </Card>
    </>
  );
}

function RowPersonalData(props) {
  const faculty = props.selectedFaculty;
  const setFaculty = props.setSelectedFaculty;
  const isEditable = props.isEditable;

  if (!faculty) return <></>;

  const handleFirstNameChange = (e) => setFaculty({ ...faculty, firstName: e.target.value });
  const handleLastNameChange = (e) => setFaculty({ ...faculty, lastName: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={4}>
          <Form.Group controlId="facultyFirstName">
            <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
            <Form.Control
              aria-label="First name"
              value={faculty.firstName}
              onChange={handleFirstNameChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="facultyLastName">
            <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
            <Form.Control
              aria-label="Last name"
              value={faculty.lastName}
              onChange={handleLastNameChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowIdContactData(props) {
  const faculty = props.selectedFaculty;
  const setFaculty = props.setSelectedFaculty;
  const isEditable = props.isEditable;
  const email = faculty.email.split("@");

  if (!faculty) return <></>;

  const formatEmail = (e) => e.target.value.concat("@uwf.edu");
  const handleEmailChange = (e) => setFaculty({ ...faculty, email: formatEmail(e) });
  const handlePhoneChange = (e) => setFaculty({ ...faculty, phone: e.target.value });

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
          <Form.Group controlId="facultyPhone">
            <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
            <Form.Control
              type="text"
              value={faculty.phone}
              onChange={handlePhoneChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="facultyId">
            <Form.Label className="d-flex justify-content-start">Faculty ID</Form.Label>
            <Form.Control type="text" value={faculty.id} disabled />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}
