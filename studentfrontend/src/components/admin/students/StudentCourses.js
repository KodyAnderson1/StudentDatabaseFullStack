import { Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { useState } from "react";

/**
 * Called in StudentCard.js
 * Component that renders a specific student's current courses
 * @param {*} props the specific student courses
 * @returns react component for the "Current Courses" section of the admin student view Card
 */
export function StudentCourses(props) {
  const sections = props.sections;
  // console.log(sections);

  if (!sections || sections.length === 0) return <h4 className="mt-4">No Assigned Courses</h4>;

  return (
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
            <th>Course name</th>
            <th>Course ID</th>
            <th>Section ID</th>
            <th>Instructor</th>
            <th>Course Page</th>
            <th>Remove Course</th>
          </tr>
        </thead>
        <TableBody
          student_id={props.student_id}
          sections={sections}
          removeSection={props.removeSection}
          facultyTeachingStudent={props.facultyTeachingStudent}
        />
      </Table>
    </Row>
  );
}

function TableBody(props) {
  // console.log(props);
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
            <td>
              <Button
                onClick={() => props.removeSection(course.id, props.student_id)}
                variant="danger"
                className="course-remove-btn">
                <AiFillMinusCircle className="mb-2" />
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
