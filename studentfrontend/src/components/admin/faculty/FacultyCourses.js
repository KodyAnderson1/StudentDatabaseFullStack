import { Row, Button, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";

/**
 *
 * @param {*} props
 * @returns
 */
export function FacultyCourses(props) {
  const [courses, setCourses] = useState("");

  useEffect(() => {
    if (props.faculty.id) {
      fetch(`http://localhost:8080/section/faculty/${props.faculty.id}`)
        .then((response) => response.json())
        .then((result) => setCourses(result));
    } else {
      setCourses([]);
    }
  }, [props.faculty.id]);

  if (!courses || courses.length === 0)
    return (
      <>
        <Row>
          <Col className="d-flex justify-content-end">
            <h4 className="mt-4">No Assigned Courses</h4>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button className="mt-3 course-add-btn d-flex align-items-center">Add Course</Button>
          </Col>
        </Row>
      </>
    );

  return (
    <>
      <Row className="text-black d-flex justify-content-center">
        <Row className="">
          <Col xs={6} className="d-flex justify-content-end mt-3">
            <h4>Current Courses</h4>
          </Col>
          <Col xs={6} className="d-flex justify-content-start">
            <Button className="course-add-btn d-flex align-items-center">Add Course</Button>
          </Col>
        </Row>
        <Table striped bordered hover className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course ID</th>
              <th>Section ID</th>
              <th>Course Page</th>
              <th>Remove Course</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td>{course.course_name}</td>
                  <td>{course.course_id}</td>
                  <td>{course.id}</td>
                  <td>
                    <Link
                      to={`/admin/courses/${course.course_id}`}
                      className="btn btn-outline-success current-courses-table-button">
                      Course Page
                    </Link>
                  </td>
                  <td>
                    <Button variant="danger" className="course-remove-btn">
                      <AiFillMinusCircle className="mb-2" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </>
  );
}
