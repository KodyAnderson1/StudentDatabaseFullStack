import { Row, Card, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { SectionView } from "./SectionView";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { axios_getSectionsForCourse } from "../../../services/APICalls";

export default function AdminCourses(props) {
  const [course, setCourse] = useState("");

  const [activeSections, setActiveSections] = useState("");
  const urlParams = useParams();
  const courseId = urlParams.id;

  //   const { data, isLoading } = useQuery(["single-student", personId, "student"], () =>
  //   axios_getSpecificPerson(personId, "student")
  // );

  const { data, isSuccess } = useQuery(["specific-course", courseId], () =>
    axios_getSectionsForCourse(courseId)
  );
  useEffect(() => {
    if (isSuccess) setCourse(data);
    // setActiveSections(course.active_sections);
    console.log("FIRST ATTEMPT\n", course);
  }, [data, isSuccess]);

  if (!course || course.length === 0) return <>Error! No Course by this ID</>;

  return (
    <>
      <Row className="admin-courses mt-2">
        <Col xs={10}>
          <h2>{course.name} Overview</h2>
        </Col>
        <Col xs={1} className="d-flex justify-content-end ms-5">
          <Button variant="danger mb-2">
            <AiFillMinusCircle />
          </Button>
        </Col>
      </Row>
      <Row className="admin-courses-navbar-tabs">
        <CoursesNavbarTabs activeSections={course} />
      </Row>
    </>
  );
}

function CoursesNavbarTabs(props) {
  const activeSections = props.activeSections;
  if (!activeSections || activeSections.length === 0) return <></>;

  return (
    <>
      <Card className="admin-courses-card">
        <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey={"overview"} title={"Overview"} className="text-black">
            <h2>OVERVIEW HERE</h2>
          </Tab>
          {activeSections.map((section) => {
            return (
              <Tab key={section.id} eventKey={section.id} title={section.id}>
                <SectionView section={section} />
              </Tab>
            );
          })}
          <Tab
            eventKey="newSection"
            title={<AiFillPlusCircle className="text-black" />}
            className="text-black">
            <h3>New Section Form</h3>
          </Tab>
        </Tabs>
      </Card>
    </>
  );
}
