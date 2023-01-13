import { CustomAlert } from "../../CustomAlert";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StudentCourses } from "./StudentCourses";
import { TbPencil, TbPencilOff } from "react-icons/tb";

import { capitalizeFirstLetter, PersonJsonToOjbect } from "../../../utils";
import { axios_getSpecificPerson } from "../../../services/APICalls";
import { useQuery } from "@tanstack/react-query";

/**
 * Called in App.js
 * Two functions get passed into props to update and delete a student.
 * useEffect calls the database with the student ID from the URL to get specific student data
 * @param {*} props functions updateStudent && removeStudent to PUT or DELETE data in DB
 * @returns component that shows a specific student's information in a Bootstrap Card
 */
export function StudentCard(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [student, setStudent] = useState("");

  const urlParams = useParams();
  const studentId = urlParams.id;

  const { data, isLoading } = useQuery(["single-student", studentId, "student"], () =>
    axios_getSpecificPerson(studentId, "student")
  );

  useEffect(() => {
    if (!isLoading) setStudent(PersonJsonToOjbect(data));
  }, [data, isLoading]);

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    setStudent(student);
  };

  const onFormSubmitUpdate = (e) => {
    e.preventDefault();
    props.updateStudent(student);
  };

  const removeStudentSubmit = (e) => {
    e.preventDefault();
    props.removeStudent(student.id);
    setStudent("");
  };

  if (student === "" || isLoading) return <></>;

  const handleFirstNameChange = (e) => setStudent({ ...student, firstName: e.target.value });
  const handleLastNameChange = (e) => setStudent({ ...student, lastName: e.target.value });
  const handleCityChange = (e) => setStudent({ ...student, location: { city: e.target.value } });
  const handleStateChange = (e) => setStudent({ ...student, location: { state: e.target.value } });
  const handleEmailChange = (e) => setStudent({ ...student, email: e.target.value });
  const handlePhoneChange = (e) => setStudent({ ...student, phone: e.target.value });
  const handleAddressChange = (e) =>
    setStudent({ ...student, location: { address: e.target.value } });

  return (
    <Card className="text-black p-3 mt-4 me-3 person-card">
      <Row className="border-bottom d-flex">
        <Col xs={9} className="d-flex justify-content-start">
          <h3>{student.role}</h3>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          {isEditable ? (
            <CustomAlert
              removePerson={removeStudentSubmit}
              title={`${student.firstName} ${student.lastName}`}
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
                // disabled={isEditable ? "" : "disabled"}
                disabled
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="studentGender">
              <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
              <Form.Control
                type="text"
                value={capitalizeFirstLetter(student.gender)}
                disabled={isEditable ? "" : "disabled"}
              />
            </Form.Group>
          </Col>
        </Row>
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
        <Row>
          <Col xs={4}>
            <Form.Label className="d-flex justify-content-start">Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={student.email}
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
      </Form>
      <StudentCourses
        student={student}
        sections={student.sections}
        removeSection={props.removeSection}
      />
    </Card>
  );
}

// function RowPersonalData(props) {
//   const student = props.selectedPerson;
//   const setStudent = props.setSelectedPerson;
//   const isEditable = props.isEditable;

//   if (!student) return <></>;

//   const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

//   const handleFirstNameChange = (e) => setStudent({ ...student, firstName: e.target.value });
//   const handleLastNameChange = (e) => setStudent({ ...student, lastName: e.target.value });

//   return (
//     <Row className="mb-1">
//       <Col xs={4}>
//         <Form.Group controlId="studentFirstName">
//           <Form.Label className="d-flex justify-content-start">First Name</Form.Label>
//           <Form.Control
//             aria-label="First name"
//             value={student.firstName}
//             onChange={handleFirstNameChange}
//             disabled={isEditable ? "" : "disabled"}
//           />
//         </Form.Group>
//       </Col>
//       <Col xs={4}>
//         <Form.Group controlId="studentLastName">
//           <Form.Label className="d-flex justify-content-start mt-1">Last Name</Form.Label>
//           <Form.Control
//             aria-label="Last name"
//             value={student.lastName}
//             onChange={handleLastNameChange}
//             disabled={isEditable ? "" : "disabled"}
//           />
//         </Form.Group>
//       </Col>
//       <Col xs={2}>
//         <Form.Group controlId="studentDOB">
//           <Form.Label className="d-flex justify-content-start">DOB</Form.Label>
//           <Form.Control
//             type="date"
//             value={student.dob.full}
//             // disabled={isEditable ? "" : "disabled"}
//             disabled
//           />
//         </Form.Group>
//       </Col>
//       <Col xs={2}>
//         <Form.Group controlId="studentGender">
//           <Form.Label className="d-flex justify-content-start">Gender</Form.Label>
//           <Form.Control
//             type="text"
//             value={capitalizeFirstLetter(student.gender)}
//             disabled={isEditable ? "" : "disabled"}
//           />
//         </Form.Group>
//       </Col>
//     </Row>
//   );
// }

// function RowLocationData(props) {
//   const student = props.selectedPerson;
//   const setStudent = props.setSelectedPerson;
//   const isEditable = props.isEditable;

//   if (!student) return <></>;

//   const handleCityChange = (e) => setStudent({ ...student, location: { city: e.target.value } });
//   const handleStateChange = (e) => setStudent({ ...student, location: { state: e.target.value } });
//   const handleAddressChange = (e) =>
//     setStudent({ ...student, location: { address: e.target.value } });

//   return (
//     <>
//       <Row className="mb-1">
//         <Col xs={4}>
//           <Form.Group controlId="studentCity">
//             <Form.Label className="d-flex justify-content-start">City</Form.Label>
//             <Form.Control
//               type="text"
//               value={student.location.city}
//               onChange={handleCityChange}
//               disabled={isEditable ? "" : "disabled"}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={4}>
//           <Form.Group controlId="studentState">
//             <Form.Label className="d-flex justify-content-start">State</Form.Label>
//             <Form.Control
//               type="text"
//               value={student.location.state}
//               onChange={handleStateChange}
//               disabled={isEditable ? "" : "disabled"}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={4}>
//           <Form.Group controlId="studentAddress">
//             <Form.Label className="d-flex justify-content-start">Address</Form.Label>
//             <Form.Control
//               type="text"
//               value={student.location.address}
//               onChange={handleAddressChange}
//               disabled={isEditable ? "" : "disabled"}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//     </>
//   );
// }

// function RowIdContactData(props) {
//   const student = props.selectedPerson;
//   const setStudent = props.setSelectedPerson;
//   const isEditable = props.isEditable;
//   let email;

//   if (student.email) email = student.email.split("@") ? student.email.split("@") : "default email";
//   else email = "default email";

//   if (!student) return <></>;

//   const formatEmail = (e) => e.target.value.concat("@students.uwf.edu");
//   const handleEmailChange = (e) => setStudent({ ...student, email: formatEmail(e) });
//   const handlePhoneChange = (e) => setStudent({ ...student, phone: e.target.value });

//   return (
//     <>
//       <Row>
//         <Col xs={4}>
//           <Form.Label className="d-flex justify-content-start">Email</Form.Label>
//           <InputGroup>
//             <Form.Control
//               type="text"
//               value={email[0]}
//               onChange={handleEmailChange}
//               disabled={isEditable ? "" : "disabled"}
//             />
//             <InputGroup.Text>@</InputGroup.Text>
//           </InputGroup>
//         </Col>
//         <Col xs={4}>
//           <Form.Group controlId="studentPhone">
//             <Form.Label className="d-flex justify-content-start">Phone Number</Form.Label>
//             <Form.Control
//               type="text"
//               value={student.phone}
//               onChange={handlePhoneChange}
//               disabled={isEditable ? "" : "disabled"}
//             />
//           </Form.Group>
//         </Col>
//         <Col xs={4}>
//           <Form.Group controlId="studentId">
//             <Form.Label className="d-flex justify-content-start">ID</Form.Label>
//             <Form.Control type="text" value={student.id} disabled />
//           </Form.Group>
//         </Col>
//       </Row>
//     </>
//   );
// }
