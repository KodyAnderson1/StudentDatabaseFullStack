import React, { useState, useEffect } from "react";

import AdminFaculty from "./AdminFaculty";
import AdminCourses from "./AdminCourses";
import AdminStudents from "./AdminStudents";
import "../../App.css";

export default function AdminHome() {
  const [view, setView] = useState(<AdminStudents />);
  const [determineView, setDetermineView] = useState("");

  useEffect(() => {
    if (determineView === "adminStudent") setView(<AdminStudents />);
    else if (determineView === "adminFaculty") setView(<AdminFaculty />);
    else if (determineView === "adminCourses") setView(<AdminCourses />);
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
          <div className="nav-link active" onClick={(e) => handleClick(e, "adminCourses")}>
            Courses
          </div>
          <div className="nav-link active" href="#" onClick={(e) => handleClick(e, "adminFaculty")}>
            Faculty
          </div>
        </nav>
      </div>
    </>
  );
}
