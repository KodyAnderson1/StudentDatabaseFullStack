import { Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";

export function StudentCourses(props) {
  const [courses, setCourses] = useState([]);

  function courseHelper(result) {
    setCourses(
      result.map((res) => {
        return {
          section_id: res[0],
          course_id: res[1],
          instructor_id: res[2],
          course_name: res[3],
        };
      })
    );
  }

  useEffect(() => {
    if (props.student.id) {
      fetch(`http://localhost:8080/section/student/${props.student.id}`)
        .then((response) => response.json())
        .then((result) => courseHelper(result));
    } else {
      setCourses([]);
    }
  }, [props.student.id]);

  if (!props.student || props.student === "") return <></>;
  if (!courses || courses.length === 0) return <h4 className="mt-4">No Assigned Courses</h4>;

  return (
    // <h4 className="mt-4">No Enrolled Courses</h4>
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
        <TableBody courses={courses} />
      </Table>
    </Row>
  );
}

function TableBody(props) {
  return (
    <tbody>
      {props.courses.map((course) => {
        // const instructorData = FacultyData.filter((faculty) => faculty.id === course.instructor_id);
        // const [instructor] = instructorData;

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
              <Button variant="danger" className="course-remove-btn">
                <AiFillMinusCircle className="mb-2" />
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
