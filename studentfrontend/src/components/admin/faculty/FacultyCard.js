import { CustomAlert } from "../../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FacultyCourses } from "./FacultyCourses";
import { capitalizeFirstLetter } from "../../../utils";
import { TbPencil, TbPencilOff } from "react-icons/tb";
import { ACTION_TYPES, DB_URL } from "../../../constants";
import { formReducer, INITIAL_STATE } from "../PersonReducer";

/**
 * Called in App.js
 * Two functions get passed into props to update and delete a faculty.
 * useEffect calls the database with the student ID from the URL to get specific student data
 * @param {Function} props functions updateFaculty && removeFaculty to PUT or DELETE data in DB
 * @returns component that shows a specific faculty's information in a Bootstrap Card
 */
export function FacultyCard(props) {
  const navigate = useNavigate();
  const urlParams = useParams();
  const facultyId = urlParams.id;
  const [isEditable, setIsEditable] = useState(false);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
    fetch(`${DB_URL}/faculty/${facultyId}`)
      .then((res) => res.json())
      .then((results) => dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: results }))
      .catch((error) => console.log("GET_PERSON_API_FAIL\n", error));
  }, [facultyId]);

  const onFormSubmitUpdate = (e) => {
    e.preventDefault();
    props.updateFaculty(state);
  };

  const removeFacultySubmit = (e) => {
    e.preventDefault();
    props.removeFaculty(state.id);
    dispatch({ type: ACTION_TYPES.RESET_STATE });
    navigate("/admin/faculty");
  };

  const handleChange = (e) => {
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
    <Card className="text-black p-3 mt-4 me-3 person-card">
      <Row className="border-bottom d-flex">
        <Col xs={9} className="d-flex justify-content-start">
          <h3>{state.role}</h3>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          {isEditable ? (
            <CustomAlert
              removePerson={removeFacultySubmit}
              title={`${state.firstName} ${state.lastName}`}
            />
          ) : (
            <></>
          )}
        </Col>
        <Col xs={1}>
          <Button
            onClick={() => setIsEditable(isEditable ? false : true)}
            className="mb-2 d-flex align-items-center justify-content-center enable-edit-btn">
            {isEditable ? <TbPencilOff /> : <TbPencil />}
          </Button>
        </Col>
      </Row>
      <Form id="editForm" onSubmit={onFormSubmitUpdate} className="mt-3">
        <Row className="mb-1">
          <Col xs={4}>
            <Form.Group controlId="firstName">
              <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
              <Form.Control
                name="firstName"
                aria-label="First name"
                value={state.firstName}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="lastName">
              <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
              <Form.Control
                name="lastName"
                aria-label="Last name"
                value={state.lastName}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="dob">
              <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
              <Form.Control
                name="dob"
                type="date"
                onChange={handleChange}
                value={state.dob}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="gender">
              <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
              <Form.Control
                name="gender"
                type="text"
                value={capitalizeFirstLetter(state.gender)}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>
            <Form.Group controlId="city">
              <Form.Label className="d-flex justify-content-start">City</Form.Label>
              <Form.Control
                name="city"
                type="text"
                value={state.location.city}
                onChange={handleLocationChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="state">
              <Form.Label className="d-flex justify-content-start">State</Form.Label>
              <Form.Control
                name="state"
                type="text"
                value={state.location.state}
                onChange={handleLocationChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="address">
              <Form.Label className="d-flex justify-content-start">Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                value={state.location.address}
                onChange={handleLocationChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Form.Label className="d-flex justify-content-start">Email</Form.Label>
            <InputGroup>
              <Form.Control
                name="email"
                type="text"
                value={state?.email}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="phone">
              <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                value={state?.phone}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="id">
              <Form.Label className="d-flex justify-content-start">ID</Form.Label>
              <Form.Control type="text" placeholder={state?.id} disabled />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <FacultyCourses sections={state.sections} />
    </Card>
  );
}
