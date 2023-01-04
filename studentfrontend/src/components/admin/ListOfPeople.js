import { Row, Form, Container, Col } from "react-bootstrap";
import { useState, useMemo } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
import NavDropdown from "react-bootstrap/NavDropdown";

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
      <Container className="admin-container">
        <Row>
          <Col xs={3}>
            <Row className="display-6">
              <div className="d-flex justify-content-start">
                <HamburgerMenu />
              </div>
            </Row>
            <Row>
              <Form.Control
                placeholder="Search"
                type="text"
                className="search-bar-student"
                onChange={(e) => setFilteredPeople(e.target.value)}
              />
            </Row>
            <Row>
              <button
                // onClick={handleClick}
                className="mt-2 btn btn-outline-secondary text-white d-flex add-new-person-btn">
                <AiOutlinePlusCircle className="add-new-person-btn-icon" />
                <span className="add-new-person-btn-text">ADD NEW</span>
              </button>
            </Row>
            <Row className="overflow-auto admin-search-results">
              <SpecificPerson filtered={filtered} handleOnClick={props.handleOnClick} />
            </Row>
          </Col>
          <Col xs={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export function SpecificPerson(props) {
  return props.filtered.map((person) => {
    const name = person.firstName ? person.firstName + " " + person.lastName : person.name;
    return (
      <Link
        key={person.id}
        className="ms-2 mb-2 student-button btn btn-outline-secondary text-white d-flex"
        to={`${person.id}`}>
        {name}
      </Link>
    );
  });
}

function HamburgerMenu() {
  return (
    <>
      <NavDropdown title="ADMIN" id="basic-nav-dropdown">
        <Link className="dropdown-item" to="/admin/students">
          Students
        </Link>
        <Link className="dropdown-item" to="/admin/faculty">
          Faculty
        </Link>
        <Link className="dropdown-item" to="/admin/courses">
          Courses
        </Link>
      </NavDropdown>
    </>
  );
}
