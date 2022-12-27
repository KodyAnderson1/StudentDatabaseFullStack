import { Row, Form } from "react-bootstrap";
import { useState, useMemo } from "react";

export function ListOfPeople(props) {
  const data = props.data;
  const [filteredStudents, setFilteredStudents] = useState("");

  const filtered = useMemo(() => {
    return data.filter((student) => {
      return (
        student === "" ||
        student.firstName.toLowerCase().includes(filteredStudents.toLowerCase()) ||
        student.lastName.toLowerCase().includes(filteredStudents.toLowerCase())
      );
    });
  }, [filteredStudents, data]);

  return (
    <>
      <Row>
        <Form>
          <Form.Control
            placeholder="Search"
            type="text"
            className="search-bar-student"
            onChange={(e) => setFilteredStudents(e.target.value)}
          />
        </Form>
      </Row>
      <Row className="overflow-auto admin-search-results">
        <SpecificPerson filtered={filtered} handleOnClick={props.handleOnClick} />
      </Row>
    </>
  );
}

export function SpecificPerson(props) {
  return props.filtered.map((student) => {
    const name = student.firstName + " " + student.lastName;
    return (
      <Row
        key={student.id}
        onClick={() => props.handleOnClick(student)}
        className="m-2 student-button btn btn-outline-secondary d-flex text-white">
        {name}
      </Row>
    );
  });
}
