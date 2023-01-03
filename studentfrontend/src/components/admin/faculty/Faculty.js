import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

import { ListOfPeople } from "../ListOfPeople";
import { FacultyCourses } from "./FacultyCourses";
import { PersonCard } from "../PersonCard";

export default function AdminFaculty(props) {
  const [allFaculty, setAllFaculty] = useState(props.FacultyData);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleOnClick = (student) => setSelectedFaculty(student);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAllFaculty(
      allFaculty.map((student) => {
        if (student.id === selectedFaculty.id) return selectedFaculty;
        else return student;
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col xl={3}>
          <ListOfPeople handleOnClick={handleOnClick} data={allFaculty} />
        </Col>
        <Col xl={9}>
          <PersonCard
            setSelectedPerson={setSelectedFaculty}
            selectedPerson={selectedFaculty}
            courseData={props.courseData}
            handleOnSubmit={handleOnSubmit}
            allPeople={allFaculty}
          />
          <FacultyCourses
            setSelectedFaculty={setSelectedFaculty}
            selectedFaculty={selectedFaculty}
            courseData={props.SpecificCourseData}
          />
        </Col>
      </Row>
    </Container>
  );
}
