import React, { useState, useEffect } from "react";

import AdminFaculty from "./faculty/Faculty";
import AdminCourses from "./courses/AdminCourses";
import "../css/App.css";
import "../css/Admin.css";

import { StudentData } from "../../model/StudentData";
import { SectionData } from "../../model/SectionData";
import { FacultyData } from "../../model/Faculty";
import { AdminStudents } from "./students/Students";
import { CoursesData } from "../../model/CoursesData";

export default function AdminHome() {
  const [view, setView] = useState();
  const [determineView, setDetermineView] = useState("");
  const [allStudents, setAllStudents] = useState(StudentData);
  const [allFaculty, setAllFaculty] = useState(FacultyData);

  useEffect(() => {
    if (determineView === "adminStudent")
      setView(
        <AdminStudents
          FacultyData={FacultyData}
          courseData={SectionData}
          allStudents={allStudents}
          setAllStudents={setAllStudents}
          determineView={determineView}
          addNewStudent={addNewStudent}
        />
      );
    else if (determineView === "adminFaculty")
      setView(
        <AdminFaculty
          FacultyData={FacultyData}
          SpecificCourseData={SectionData}
          determineView={determineView}
          allFaculty={allFaculty}
          setAllFaculty={setAllFaculty}
        />
      );
    else if (determineView === "adminCourses")
      setView(
        <AdminCourses
          FacultyData={FacultyData}
          SpecificCourseData={SectionData}
          StudentData={StudentData}
          GeneralCourseData={CoursesData}
          determineView={determineView}
        />
      );
    else setView("");
  }, [determineView, allStudents, allFaculty]);

  function addNewStudent(student) {
    student.email = student.email.concat("@students.uwf.edu");
    setAllStudents(allStudents.push(student));
  }
  return (
    <>
      <div className="container top-admin-container d-flex justify-content-center">
        <AdminNavbar setDetermineView={setDetermineView} />
        {view}
      </div>
    </>
  );
}

function AdminNavbar(props) {
  const handleClick = (val) => props.setDetermineView(val);

  return (
    <>
      <div className="col-2 admin-card-navbar">
        <h2>Admin</h2>
        <nav className="nav nav-pills nav-fill flex-column admin-nav-btns">
          <div className="nav-link active" onClick={() => handleClick("adminStudent")}>
            Students
          </div>
          <div className="nav-link active" onClick={() => handleClick("adminFaculty")}>
            Faculty
          </div>
          <div className="nav-link active" onClick={() => handleClick("adminCourses")}>
            Courses
          </div>
        </nav>
      </div>
    </>
  );
}
