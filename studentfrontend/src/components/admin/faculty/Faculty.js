import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

import { ListOfPeople } from "../ListOfPeople";
import { FacultyCourses } from "./FacultyCourses";
import { PersonCard } from "../PersonCard";
import { NewPersonForm } from "../NewPersonForm";

export default function AdminFaculty(props) {
  const [allFaculty, setAllFaculty] = useState(props.FacultyData);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [useNewForm, setUseNewForm] = useState("");

  const handleOnClick = (student) => {
    setUseNewForm(false);
    setSelectedFaculty(student);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAllFaculty(
      allFaculty.map((student) => {
        if (student.id === selectedFaculty.id) return selectedFaculty;
        else return student;
      })
    );
  };

  const componentsToDisplay = useNewForm ? (
    <NewPersonForm />
  ) : (
    <>
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
    </>
  );

  return (
    <Container>
      <Row>
        <Col xl={3}>
          <ListOfPeople
            handleOnClick={handleOnClick}
            data={allFaculty}
            setUseNewForm={setUseNewForm}
          />
        </Col>
        <Col xl={9}>{componentsToDisplay}</Col>
      </Row>
    </Container>
  );
}
