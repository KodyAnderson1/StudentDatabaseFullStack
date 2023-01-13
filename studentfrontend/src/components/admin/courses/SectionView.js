import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

// import { StudentData } from "../../../model/StudentData";
// import { SectionData } from "../../../model/SectionData";

/**
 *
 *
 * ! THIS IS WHERE student_sections comes into play! THAT DB CALL WILL GO HERE!
 * ! Call that DB "SELECT * FROM student_sections WHERE section_id == props.id"
 *
 * ! "SELECT * FROM student.firstName, student.lastName, student.id, student.email, student_sections.section_id
 * ! FROM student, student_sections WHERE student_sections.course_id == props.course_id" SOMETHING CLOSE TO THAT
 */
export function SectionView(props) {
  const [section, setSection] = useState("");
  const [studentsInSection, setStudentsInSection] = useState("");
  const idForSection = props.section;

  // useEffect(() => {
  //   setSection(...SectionData.filter((section) => section.section_id === idForSection));
  //   if (section) {
  //     setStudentsInSection(
  //       StudentData.filter((student) => section.enrolled_students.includes(student.id))
  //     );
  //   }

  // }, [idForSection, section.enrolled_students]);

  if (!studentsInSection || studentsInSection.length === 0) return <h1>NO STUDS</h1>;

  return (
    <>
      <StudentsTable students={studentsInSection} />
    </>
  );
}

function StudentsTable(props) {
  return (
    <>
      <Table bordered className="admin-courses-students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Student Page</th>
            <th>Remove Student</th>
          </tr>
          {props.students.map((student) => {
            return (
              <tr key={student.id} className="table-row-admin">
                <td className="d-flex">{`${student.firstName} ${student.lastName}`}</td>
                <td>{student.id}</td>
                <td>{student.email}</td>
                <td>
                  <Link
                    to={`/admin/students/${student.id}`}
                    className="btn btn-outline-secondary current-courses-table-button">
                    Student Page
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
        </thead>
      </Table>
    </>
  );
}
