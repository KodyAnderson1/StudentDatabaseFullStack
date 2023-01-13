import { Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

/**
 * Called in StudentCard.js
 * Component that renders a specific student's current courses
 * @param {*} props the specific student courses
 * @returns react component for the "Current Courses" section of the admin student view Card
 */
export function StudentCourses(props) {
  const sections = props.sections;

  if (!sections || sections.length === 0)
    return (
      <Row>
        <Col className="d-flex justify-content-end">
          <h4 className="mt-4">No Assigned Courses</h4>
        </Col>
        <Col className="d-flex justify-content-start">
          <Button className="mt-3 course-add-btn d-flex align-items-center">Add Class</Button>
        </Col>
      </Row>
    );

  return (
    <Row className="text-black d-flex justify-content-center">
      <Row className="">
        <Col xs={6} className="d-flex justify-content-end mt-3">
          <h4>Current Courses</h4>
        </Col>
        <Col xs={6} className="d-flex justify-content-start">
          <Button className="course-add-btn d-flex align-items-center">Add Class</Button>
        </Col>
      </Row>
      <Table striped bordered hover className="course-table">
        <thead>
          <tr>
            <th>Course name</th>
            <th>Course ID</th>
            <th>Section ID</th>
            <th>Instructor</th>
            <th>Course Page</th>
            <th>Remove Course</th>
          </tr>
        </thead>
        <TableBody
          student_id={props.student.id}
          sections={sections}
          removeSection={props.removeSection}
          facultyTeachingStudent={props.facultyTeachingStudent}
        />
      </Table>
    </Row>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {props.sections.map((course) => {
        return (
          <tr key={course.section_id}>
            <td>{course.course_name}</td>
            <td>{course.course_id}</td>

            <td>{course.section_id}</td>
            {/* <td>{`${instructor.firstName} ${instructor.lastName}`}</td> */}
            <td>{course.instructor_id}</td>

            <td>
              <Link
                to={`/admin/courses/${course.course_id}`}
                className="btn btn-outline-success current-courses-table-button">
                Course Page
              </Link>
            </td>
            <td className="d-flex justify-content-center">
              <ConfirmationModal
                titleData={course.course_name}
                removeSection={props.removeSection}
                table_id={course.id}
                student_id={props.student_id}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function ConfirmationModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemBeingDeleted = props.titleData;

  return (
    <>
      <Button
        variant="danger"
        className="d-flex align-items-center justify-content-center course-remove-btn"
        onClick={handleShow}>
        <BsFillTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            About to delete {itemBeingDeleted ? itemBeingDeleted : "record"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to permanently delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => props.removeSection(props.table_id, props.student_id)}
            variant="danger">
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
