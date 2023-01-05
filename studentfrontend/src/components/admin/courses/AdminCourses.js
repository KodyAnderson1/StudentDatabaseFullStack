import { Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { SectionView } from "./SectionView";

// ! useEffect for data currently being passed in as props

export default function AdminCourses(props) {
  const [course, setCourse] = useState("");
  const [activeSections, setActiveSections] = useState("");
  const urlParams = useParams();
  const courseId = urlParams.id;

  useEffect(() => {
    try {
      setCourse(...props.CoursesData.filter((course) => course.id === parseInt(courseId)));
      setActiveSections(course.active_sections);
    } catch (error) {
      setCourse({ id: 1000, name: "Error Name", active_sections: [] });
      console.log(error);
    }
  }, [courseId, props.CoursesData, course.active_sections]);

  if (!course || course.length === 0) return <>Error! No Course by this ID</>;

  return (
    <>
      <Row className="admin-courses">
        <h2>{course.name} Overview</h2>
      </Row>
      <Row className="admin-courses-navbar-tabs">
        <CoursesNavbarTabs activeSections={activeSections} />
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
            "OVERVIEW HERE"
          </Tab>
          {activeSections.map((section) => {
            return (
              <Tab key={section} eventKey={section} title={section}>
                <SectionView section={section} />
              </Tab>
            );
          })}
        </Tabs>
      </Card>
    </>
  );
}
