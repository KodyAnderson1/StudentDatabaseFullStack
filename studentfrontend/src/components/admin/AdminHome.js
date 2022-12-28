import React, { useState, useEffect } from "react";

import AdminFaculty from "./admin_faculty/AdminFaculty";
import AdminCourses from "./admin_courses/AdminCourses";
import "../css/App.css";

import { StudentData } from "../../model/StudentData";
import { SpecificCourseData } from "../../model/SpecificCourseData";
import { FacultyData } from "../../model/FacultyData";
import { AdminStudents } from "./admin_students/AdminStudents";

export default function AdminHome() {
  const [view, setView] = useState();
  const [determineView, setDetermineView] = useState("");

  useEffect(() => {
    if (determineView === "adminStudent")
      setView(
        <AdminStudents
          FacultyData={FacultyData}
          courseData={SpecificCourseData}
          StudentData={StudentData}
        />
      );
    else if (determineView === "adminFaculty")
      setView(
        <AdminFaculty
          FacultyData={FacultyData}
          SpecificCourseData={SpecificCourseData}
          StudentData={StudentData}
        />
      );
    else if (determineView === "adminCourses")
      setView(
        <AdminCourses
          FacultyData={FacultyData}
          SpecificCourseData={SpecificCourseData}
          StudentData={StudentData}
        />
      );
    else setView("");
  }, [determineView]);

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
  const handleClick = (e, val) => props.setDetermineView(val);

  return (
    <>
      <div className="col-2 admin-card-navbar">
        <h2>Admin</h2>
        <nav className="nav nav-pills nav-fill flex-column admin-nav-btns">
          <div className="nav-link active" onClick={(e) => handleClick(e, "adminStudent")}>
            Students
          </div>
          {/* <div className="nav-link active" onClick={(e) => handleClick(e, "adminCourses")}>
            Courses
          </div> */}
          <div className="nav-link active" onClick={(e) => handleClick(e, "adminFaculty")}>
            Faculty
          </div>
        </nav>
      </div>
    </>
  );
}
