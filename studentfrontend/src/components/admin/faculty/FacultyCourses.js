import { Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

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
        <h4 className="mt-4">Current Courses</h4>
        <Table striped bordered hover className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Section ID</th>
              <th>Instructor ID</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              return (
                <tr key={course.section_id}>
                  <td>{course.course_name}</td>
                  <td>{course.section_id}</td>
                  <td>{course.instructor_id}</td>
                  <td>{course.enrolled_students.length}</td>
                  <td>
                    <Link
                      to={`/admin/courses/${course.course_id}`}
                      className="btn btn-outline-success current-courses-table-button">
                      Course Page
                    </Link>
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
