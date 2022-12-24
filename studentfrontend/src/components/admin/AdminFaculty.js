import React, { useState, useEffect } from "react";

export default function AdminFaculty() {
  const [view, setView] = useState("");
  const [determineView, setDetermineView] = useState("");

  useEffect(() => {
    if (determineView === "adminFacultyEdit") {
      setView(<h2>Faculty Edit</h2>);
    } else if (determineView === "adminFacultyEdit") {
      setView(<h2>Faculty View</h2>);
    } else if (determineView === "adminFacultyEdit") {
      setView(<h2>Faculty Courses</h2>);
    } else {
      setView("");
    }
  }, [determineView]);
  return (
    <>
      <div className="col-10 admin-card-body">
        <AdminStudentsNavbar setDetermineView={setDetermineView} />
        {view}
      </div>
    </>
  );
}

function AdminStudentsNavbar(props) {
  const handleClick = (e, val) => props.setDetermineView(val);

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <div className="nav-link active" onClick={(e) => handleClick(e, "adminFacultyView")}>
            Faculty
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link text-white" onClick={(e) => handleClick(e, "adminFacultyEdit")}>
            Edit Faculty
          </div>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-white"
            onClick={(e) => handleClick(e, "adminFacultyCourses")}>
            Faculty Courses
          </div>
        </li>
      </ul>
    </>
  );
}
