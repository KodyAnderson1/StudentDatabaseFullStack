import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

import { ListOfPeople } from "../ListOfPeople";
import { StudentCourses } from "./StudentCourses";
import { PersonCard } from "../PersonCard";
import { NewPersonForm } from "../NewPersonForm";

export function AdminStudents(props) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [useNewForm, setUseNewForm] = useState("");

  const handleOnClick = (student) => {
    setUseNewForm(false);
    setSelectedStudent(student);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.setAllStudents(
      props.allStudents.map((student) => {
        if (student.id === selectedStudent.id) return selectedStudent;
        else return student;
      })
    );
  };

  const componentsToDisplay = useNewForm ? (
    <NewPersonForm addNew={props.addNewStudent} />
  ) : (
    <>
      <PersonCard
        setSelectedPerson={setSelectedStudent}
        selectedPerson={selectedStudent}
        courseData={props.courseData}
        handleOnSubmit={handleOnSubmit}
        allPeople={props.allStudents}
      />

      <StudentCourses
        setSelectedStudent={setSelectedStudent}
        selectedStudent={selectedStudent}
        courseData={props.courseData}
      />
    </>
  );

  return (
    <div className="col-10">
      <Container>
        <Row>
          <Col xl={3}>
            <ListOfPeople
              handleOnClick={handleOnClick}
              data={props.allStudents}
              setUseNewForm={setUseNewForm}
            />
          </Col>
          <Col xl={9}>{componentsToDisplay}</Col>
        </Row>
      </Container>
    </div>
  );
}
