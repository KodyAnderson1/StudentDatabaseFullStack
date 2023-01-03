import { Row, Col, Card } from "react-bootstrap";

// ! Will this handle empty current_courses?
export function FacultyCourses(props) {
  const facultyCourses = props.selectedFaculty.current_courses;

  if (!facultyCourses) return <></>;

  const courseCheck = facultyCourses ? facultyCourses : [];
  const filteredData = props.courseData.filter((course) => courseCheck.includes(course.section_id));
  const courses = filteredData ? filteredData : [];

  return (
    <>
      <Card className="text-black p-3 m-3 bottom-card-students">
        <Row>
          <Col xs={5}>
            <h4>Current Courses</h4>
            {courses.map((course) => {
              return (
                <div key={course.section_id} className="p-1 d-flex btn btn-primary m-2">
                  {course.course_name}
                </div>
              );
            })}
          </Col>
          <Col xs={7}>
            <h4>Course Data</h4>
          </Col>
        </Row>
      </Card>
    </>
  );
}
