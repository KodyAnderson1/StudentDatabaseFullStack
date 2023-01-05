import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { CoursesData } from "../../../model/CoursesData";
import { StudentData } from "../../../model/StudentData";
import { SectionData } from "../../../model/SectionData";
import { FacultyData } from "../../../model/Faculty";

export function SectionView(props) {
  const [section, setSection] = useState("");
  const [studentsInSection, setStudentsInSection] = useState("");
  const idForSection = props.section;

  useEffect(() => {
    setSection(...SectionData.filter((section) => section.section_id === idForSection));
    try {
      setStudentsInSection(
        StudentData.filter((student) => section.enrolled_students.includes(student.id))
      );
    } catch (error) {
      console.log("ERROR\n", error);
    }
  }, [idForSection, section.enrolled_students]);

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
          </tr>
          {props.students.map((student) => {
            return (
              <tr key={student.id} className="table-row-admin">
                <td className="d-flex">{`${student.firstName} ${student.lastName}`}</td>
                <td>{student.id}</td>
                <td>{student.email}</td>
              </tr>
            );
          })}
        </thead>
      </Table>
    </>
  );
}
