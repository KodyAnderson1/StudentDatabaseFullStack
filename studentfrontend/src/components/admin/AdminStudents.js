import React, { useState, useEffect } from "react";
import { StudentData } from "../../model/StudentData";
import { AllStudents } from "./studentViews/AllStudents";

export default function AdminStudents() {
  // console.log(StudentData);
  const [view, setView] = useState("");
  const [determineView, setDetermineView] = useState("Students View");

  useEffect(() => {
    if (determineView === "adminStudentEdit") setView(<h2>Students Edit</h2>);
    else if (determineView === "adminStudentView")
      setView(<AllStudents StudentData={StudentData} />);
    else if (determineView === "adminStudentCourses") setView(<h2>Students Courses</h2>);
    else setView("");
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
          <div className="nav-link active" onClick={(e) => handleClick(e, "adminStudentView")}>
            Students
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link text-white" onClick={(e) => handleClick(e, "adminStudentEdit")}>
            Edit Students
          </div>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-white"
            onClick={(e) => handleClick(e, "adminStudentCourses")}>
            Student Courses
          </div>
        </li>
      </ul>
    </>
  );
}
