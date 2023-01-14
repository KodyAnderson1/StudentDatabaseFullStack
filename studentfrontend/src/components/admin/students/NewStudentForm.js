import { Row, Col, Card, Form } from "react-bootstrap";
import { useReducer } from "react";
import { StateSelect } from "../StatesSelect";
import { INITIAL_STATE, newPersonFormReducer } from "../NewPersonReducer";
import { ACTION_TYPES } from "../../../constants";
import { emailHelper } from "../../../utils";

export function NewStudentForm(props) {
  const [state, dispatch] = useReducer(newPersonFormReducer, INITIAL_STATE);

  function handleFormSubmit(e) {
    e.preventDefault();
    let min = Math.ceil(100_000_000);
    let max = Math.floor(999_999_999);

    const newPerson = {
      ...state,
      email: emailHelper(state.firstName, state.lastName),
      id: Math.floor(Math.random() * (max - min) + min),
    };
    props.addNew(newPerson);
    dispatch({ type: ACTION_TYPES.RESET_STATE, payload: INITIAL_STATE });
  }

  const handleOnFormChange = (e) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_INPUT,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleLocationChange = (e) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_LOCATION,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <>
      <Card className="text-black person-card p-3 mt-4 me-3">
        <Row className="border-bottom mb-3">
          <Col className="d-flex justify-content-start display-6">Add New Student</Col>
        </Row>
        <Form id="newStudentForm" onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={4}>
              <Form.Group controlId="firstName">
                <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  aria-label="First name"
                  value={state.firstName}
                  onChange={handleOnFormChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="lastName">
                <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  aria-label="Last name"
                  onChange={handleOnFormChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="dob">
                <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
                <Form.Control
                  name="dob"
                  type="date"
                  value={state.dob}
                  onChange={handleOnFormChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={4}>
              <Form.Group controlId="address">
                <Form.Label className="d-flex justify-content-start">Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  value={state.address}
                  onChange={handleLocationChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="city">
                <Form.Label className="d-flex justify-content-start">City</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  value={state.city}
                  onChange={handleLocationChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="state">
                <Form.Label className="d-flex justify-content-start">State</Form.Label>
                <StateSelect handleLocationChange={handleLocationChange} required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={4}>
              <Form.Group controlId="phone">
                <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  value={state.phone}
                  onChange={handleOnFormChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group controlId="gender">
                <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
                <Form.Select name="gender" id="gender" onChange={handleOnFormChange} required>
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
