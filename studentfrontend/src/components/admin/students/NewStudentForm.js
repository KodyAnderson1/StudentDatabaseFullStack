import { Row, Col, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { StateSelect } from "../StatesSelect";

// ! Submit will generate an ID for the user
// ! Find a way to make sure the correct role is being selected for each Form. Currently if creating a new faculty, you can select student role and it works
export function NewStudentForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fullDate, setFullDate] = useState("");
  const [gender, setGender] = useState("");

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDateChange = (e) => setFullDate(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);

  function emailHelper(firstName, lastName) {
    let min = Math.ceil(10);
    let max = Math.floor(999);
    let randNum = Math.floor(Math.random() * (max - min) + min);
    return `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${randNum}@students.uwf.edu`;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let min = Math.ceil(100_000_000);
    let max = Math.floor(999_999_999);
    let dob = fullDate.split("-");

    const newPerson = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      role: "STUDENT",
      phone: phone,
      current_courses: [],
      email: emailHelper(firstName, lastName),
      id: Math.floor(Math.random() * (max - min) + min),
      location: { address: address, city: city, state: state },
      dob: { month: dob[1], day: dob[2], year: dob[0], full: fullDate },
    };

    props.addNew(newPerson);
  }

  return (
    <>
      <Card className="text-black p-3 m-3">
        <Row className="border-bottom mb-3">
          <Col className="d-flex justify-content-start display-6">Add New Student</Col>
        </Row>
        <Form id="newStudentForm" onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={4}>
              <Form.Group controlId="studentFirstName">
                <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
                <Form.Control
                  aria-label="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="studentLastName">
                <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
                <Form.Control
                  aria-label="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="studentDOB">
                <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
                <Form.Control type="date" value={fullDate} onChange={handleDateChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={4}>
              <Form.Group controlId="studentAddress">
                <Form.Label className="d-flex justify-content-start">Address</Form.Label>
                <Form.Control type="text" value={address} onChange={handleAddressChange} required />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="studentCity">
                <Form.Label className="d-flex justify-content-start">City</Form.Label>
                <Form.Control type="text" value={city} onChange={handleCityChange} required />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="studentState">
                <Form.Label className="d-flex justify-content-start">State</Form.Label>
                <StateSelect setState={setState} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            {/* <Col xs={3}>
              <Form.Label className="d-flex justify-content-start">Email</Form.Label>
              <InputGroup>
                <Form.Control type="text" value={email} onChange={handleEmailChange} required />
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup>
            </Col> */}
            <Col xs={4}>
              <Form.Group controlId="studentPhone">
                <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
                <Form.Control type="text" value={phone} onChange={handlePhoneChange} required />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="studentAddress">
                <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
                <Form.Select onChange={handleGenderChange} required>
                  <option>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row>
          <button form="newStudentForm" className="btn btn-outline-primary mt-3">
            Submit
          </button>
        </Row>
      </Card>
    </>
  );
}
