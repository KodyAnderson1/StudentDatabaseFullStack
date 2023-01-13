import { CustomAlert } from "../../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { FacultyCourses } from "./FacultyCourses";
import { capitalizeFirstLetter, PersonJsonToOjbect } from "../../../utils";
import { TbPencil, TbPencilOff } from "react-icons/tb";
import { axios_getSpecificPerson } from "../../../services/APICalls";
import { useQuery } from "@tanstack/react-query";
import { ACTION_TYPES, DB_URL } from "../../../constants";
import { formReducer, INITIAL_STATE, INITIAL_STATE_WITH_DATA } from "./FacultyReducer";
import axios from "axios";

// ! Move data fetch to inside useEffect?
// ! CURRENTLY BROKEN. Faculty has no data currently
/**
 * Called in App.js
 * Two functions get passed into props to update and delete a faculty.
 * useEffect calls the database with the student ID from the URL to get specific student data
 * @param {Function} props functions updateFaculty && removeFaculty to PUT or DELETE data in DB
 * @returns component that shows a specific faculty's information in a Bootstrap Card
 */
export function FacultyCard(props) {
  const urlParams = useParams();
  const facultyId = urlParams.id;
  const [isEditable, setIsEditable] = useState(false);
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
    // console.log("Use state enter");
    fetch(`${DB_URL}/faculty/${facultyId}`)
      .then((res) => res.json())
      .then((results) => {
        dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: results });
      })
      .catch((error) => console.log("GET_PERSON_API_FAIL\n", error));

    // console.log("TESTErr");
  }, [facultyId]);

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
  };

  const onFormSubmitUpdate = (e) => {
    e.preventDefault();
    props.updateFaculty(state);
  };

  // !
  const removeFacultySubmit = (e) => {
    e.preventDefault();
    props.removeFaculty(state.id);
    dispatch({ type: ACTION_TYPES.RESET_STATE });
  };

  const handleChange = (e) => {
    console.log("TESTING\n", e.target.name);
    dispatch({
      type: ACTION_TYPES.CHANGE_INPUT,
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
            onClick={handleEditable}
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
                name="location.city"
                type="text"
                value={state.location.city}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="state">
              <Form.Label className="d-flex justify-content-start">State</Form.Label>
              <Form.Control
                name="location.state"
                type="text"
                value={state.location.state}
                onChange={handleChange}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group controlId="address">
              <Form.Label className="d-flex justify-content-start">Address</Form.Label>
              <Form.Control
                name="location.address"
                type="text"
                value={state.location.address}
                onChange={handleChange}
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
      <FacultyCourses
        faculty={state}
        sections={state.sections}
        removeSection={props.removeSection}
      />
    </Card>
  );
}

function TempTester(props) {
  const handleChange = props.handleChange;
  const isEditable = props.isEditable;
  const handleEditable = props.handleEditable;
  const faculty = props.faculty;
  // console.log("WHY\n", faculty);
}

function RowPersonalData(props) {
  const student = props.selectedPerson;
  const setStudent = props.setSelectedPerson;
  const isEditable = props.isEditable;

  if (!student) return <></>;

  const handleFirstNameChange = (e) => setStudent({ ...student, firstName: e.target.value });
  const handleLastNameChange = (e) => setStudent({ ...student, lastName: e.target.value });

  return (
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
  );
}

function RowLocationData(props) {
  const faculty = props.selectedPerson;
  const setFaculty = props.setSelectedPerson;
  const isEditable = props.isEditable;

  if (!faculty) return <></>;

  const handleCityChange = (e) => setFaculty({ ...faculty, location: { city: e.target.value } });
  const handleStateChange = (e) => setFaculty({ ...faculty, location: { state: e.target.value } });
  const handleAddressChange = (e) =>
    setFaculty({ ...faculty, location: { address: e.target.value } });

  return (
    <Row className="mb-1">
      <Col xs={4}>
        <Form.Group controlId="studentCity">
          <Form.Label className="d-flex justify-content-start">City</Form.Label>
          <Form.Control
            type="text"
            value={faculty.location.city}
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
            value={faculty.location.state}
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
            value={faculty.location.address}
            onChange={handleAddressChange}
            disabled={isEditable ? "" : "disabled"}
          />
        </Form.Group>
      </Col>
    </Row>
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
