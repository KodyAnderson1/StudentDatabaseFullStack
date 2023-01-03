import { Row, Form } from "react-bootstrap";
import { useState, useMemo } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export function ListOfPeople(props) {
  // console.log(props.determineView);
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
        <button className=" mt-2 ms-2 student-button btn btn-outline-secondary text-white d-flex">
          <AiOutlinePlusCircle className="mt-1 me-2" /> ADD NEW
        </button>
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
        className=" ms-2 mb-2 student-button btn btn-outline-secondary text-white d-flex">
        {name}
      </Row>
    );
  });
}
