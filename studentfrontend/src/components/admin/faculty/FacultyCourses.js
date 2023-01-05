import { Row, Button, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";

import { SectionData } from "../../../model/SectionData";

// ! Will this handle empty current_courses?
export function FacultyCourses(props) {
  const facultyCourses = props.faculty.current_courses;

  if (!facultyCourses) return <></>;

  const courseCheck = facultyCourses ? facultyCourses : [];
  const filteredData = SectionData.filter((course) => courseCheck.includes(course.section_id));
  const courses = filteredData ? filteredData : [];

  if (courses.length === 0) return <h4 className="mt-4">No Assigned Courses</h4>;

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
              <th>Students</th>
              <th>Course Page</th>
              <th>Remove Course</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              return (
                <tr key={course.section_id}>
                  <td>{course.course_name}</td>
                  <td>{course.course_id}</td>

                  <td>{course.section_id}</td>
                  <td>{course.enrolled_students.length}</td>
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
