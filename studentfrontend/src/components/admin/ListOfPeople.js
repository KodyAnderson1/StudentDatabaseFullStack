import { Row, Form } from "react-bootstrap";
import { useState, useMemo } from "react";

export function ListOfPeople(props) {
  const dataToFilter = props.data;
  const [filteredPeople, setFilteredPeople] = useState("");

  const filtered = useMemo(() => {
    return dataToFilter.filter((person) => {
      if (person.firstName) {
        return (
          person === "" ||
          person.firstName.toLowerCase().includes(filteredPeople.toLowerCase()) ||
          person.lastName.toLowerCase().includes(filteredPeople.toLowerCase())
        );
      } else {
        return person === "" || person.name.toLowerCase().includes(filteredPeople.toLowerCase());
      }
    });
  }, [filteredPeople, dataToFilter]);

  return (
    <>
      <Row>
        <Form>
          <Form.Control
            placeholder="Search"
            type="text"
            className="search-bar-student"
            onChange={(e) => setFilteredPeople(e.target.value)}
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
  return props.filtered.map((person) => {
    const name = person.firstName ? person.firstName + " " + person.lastName : person.name;
    return (
      <Row
        key={person.id}
        onClick={() => props.handleOnClick(person)}
        className="m-2 student-button btn btn-outline-secondary text-white d-flex">
        {name}
      </Row>
    );
  });
}
