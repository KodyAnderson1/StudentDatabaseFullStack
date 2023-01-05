import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { AiFillMinusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

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
