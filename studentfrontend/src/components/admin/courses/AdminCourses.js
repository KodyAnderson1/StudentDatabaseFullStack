import { Row, Col, Container, Card, Form, Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import { ListOfPeople } from "../ListOfPeople";
import { CustomAlert } from "../../CustomAlert";

export default function AdminCourses(props) {
  const [allCourses, setAllCourses] = useState(props.GeneralCourseData);
  const [selectedCourse, setSelectedCourse] = useState("");
  // const [selectedSection, setSelectedSection] = useState("");

  const handleOnClick = (student) => setSelectedCourse(student);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAllCourses(
      allCourses.map((student) => {
        if (student.id === selectedCourse.id) return selectedCourse;
        else return student;
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col xl={3}>
          <ListOfPeople
            handleOnClick={handleOnClick}
            data={allCourses}
            determineView={props.determineView}
          />
        </Col>
        <Col xl={9}>
          <CourseCard
            setSelectedCourse={setSelectedCourse}
            selectedCourse={selectedCourse}
            handleOnSubmit={handleOnSubmit}
            allCourses={allCourses}
            allSectionsData={props.SpecificCourseData}
          />
          <CourseSection
            setSelectedCourse={setSelectedCourse}
            selectedCourse={selectedCourse}
            allCourses={allCourses}
            allSectionsData={props.SpecificCourseData}
          />
        </Col>
      </Row>
    </Container>
  );
}

function CourseCard(props) {
  const [isEditable, setIsEditable] = useState(false);

  if (!props.selectedCourse) return <></>;

  const handleEditable = () => {
    setIsEditable(isEditable ? false : true);
    props.setSelectedCourse(
      ...props.allCourses.filter((course) => course.id === props.selectedCourse.id)
    );
  };

  const submitButton = isEditable ? (
    <CustomAlert show={props.show} setToastShow={props.setToastShow} />
  ) : (
    <></>
  );
  return (
    <>
      <Card className="text-black p-3 m-3">
        <Row className="border-bottom mb-3">
          <Col className="d-flex justify-content-start display-6">Course</Col>
          <Col className="d-flex justify-content-end">
            {submitButton}
            <Button onClick={handleEditable} className="ms-5 mb-3">
              {isEditable ? "Disable Edit" : "Enable Edit"}
            </Button>
          </Col>
        </Row>
        <Form id="editStudentForm" onSubmit={props.handleOnSubmit}>
          <CourseForm
            selectedCourse={props.selectedCourse}
            setSelectedCourse={props.setSelectedCourse}
            isEditable={isEditable}
          />
        </Form>
        {/* <RowCoursesDropdown
          selectedCourse={props.selectedCourse}
          setSelectedCourse={props.setSelectedCourse}
          isEditable={isEditable}
          allSectionsData={props.allSectionsData}
        /> */}
      </Card>
    </>
  );
}

// ! Need the data in dropdown function!
function CourseSection(props) {
  const [section, setSection] = useState("");

  function handleSectionChange(section_id) {
    setSection(...props.allSectionsData.filter((section) => section.section_id === section_id));
  }
  return (
    <>
      <Row>
        <Col xs={8}>
          <h3 className="d-flex justify-content-start ms-4">Course Sections Details</h3>
        </Col>
        <Col xs={4} className="d-flex justify-content-end pe-4">
          <RowCoursesDropdown
            selectedCourse={props.selectedCourse}
            setSelectedCourse={props.setSelectedCourse}
            allSectionsData={props.allSectionsData}
            handleSectionChange={handleSectionChange}
          />
        </Col>
      </Row>

      <Card className="text-black p-3 m-3 bottom-card-students">
        <Row>Course Name: {section.course_name}</Row>
        <Row>Instructor ID: {section.instructor_id}</Row>
        <Row>Section ID: {section.section_id}</Row>
        <Row>Course Id: {section.course_id}</Row>
        {/* <Row>Students: {section.enrolled_students}</Row> */}
      </Card>
    </>
  );
}

function CourseForm(props) {
  const course = props.selectedCourse;
  const setCourse = props.setSelectedCourse;
  const isEditable = props.isEditable;

  if (!course) return <></>;

  const handleNameChange = (e) => setCourse({ ...course, name: e.target.value });
  const handleCourseIdChange = (e) => setCourse({ ...course, id: e.target.value });

  return (
    <>
      <Row className="mb-1">
        <Col xs={8}>
          <Form.Group controlId="courseName">
            <Form.Label className="d-flex justify-content-start">Name</Form.Label>
            <Form.Control
              aria-label="Name"
              value={course.name}
              onChange={handleNameChange}
              disabled={isEditable ? "" : "disabled"}
            />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="courseId">
            <Form.Label className="d-flex justify-content-start">Course ID</Form.Label>
            <Form.Control
              aria-label="Name"
              value={course.id}
              onChange={handleCourseIdChange}
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

function RowCoursesDropdown(props) {
  const course = props.selectedCourse;

  if (!course) return <></>;

  const courseSections = course.active_sections;
  const allSections = props.allSectionsData.filter((section) =>
    courseSections.includes(section.section_id)
  );

  return (
    <>
      <Row>
        <Col xs={4}>
          <Dropdown className="d-flex justify-content-start">
            <Dropdown.Toggle id="dropdown-autoclose-true">Course Sections</Dropdown.Toggle>
            <Dropdown.Menu>
              {allSections.map((section) => {
                return (
                  <Dropdown.Item
                    key={section.section_id}
                    onClick={() => props.handleSectionChange(section.section_id)}>
                    {section.section_id}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}
