import { Row, Col, Card } from "react-bootstrap";

export function StudentCourses(props) {
  const studentCourses = props.selectedStudent.current_courses;
  const courseCheck = studentCourses ? studentCourses : [];
  const filteredData = props.courseData.filter((course) => courseCheck.includes(course.section_id));
  const courses = filteredData ? filteredData : [];

  if (!props.selectedStudent) return <></>;

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
