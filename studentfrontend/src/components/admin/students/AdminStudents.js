import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";
import { ListOfPeople } from "../ListOfPeople";
import { StudentCard } from "./StudentCard";
import { StudentCourses } from "./StudentCourses";

export function AdminStudents(props) {
  const [allStudents, setAllStudents] = useState(props.StudentData);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleOnClick = (student) => setSelectedStudent(student);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAllStudents(
      allStudents.map((student) => {
        if (student.id === selectedStudent.id) return selectedStudent;
        else return student;
      })
    );
  };

  return (
    <div className="col-10">
      <Container>
        <Row>
          <Col xl={3}>
            <ListOfPeople handleOnClick={handleOnClick} data={allStudents} />
          </Col>
          <Col xl={9}>
            <StudentCard
              setSelectedStudent={setSelectedStudent}
              selectedStudent={selectedStudent}
              courseData={props.courseData}
              handleOnSubmit={handleOnSubmit}
              allStudents={allStudents}
            />

            <StudentCourses
              setSelectedStudent={setSelectedStudent}
              selectedStudent={selectedStudent}
              courseData={props.courseData}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
