import React, { useState, useEffect } from "react";
import { AllStudents } from "./AllStudents";
import { EditStudents } from "./EditStudents";

import { StudentData } from "../../../model/StudentData";
import { SpecificCourseData } from "../../../model/SpecificCourseData";

export default function AdminStudents() {
  const [view, setView] = useState("");
  const [determineView, setDetermineView] = useState("Students View");

  useEffect(() => {
    if (determineView === "adminStudentEdit")
      setView(<EditStudents StudentData={StudentData} courseData={SpecificCourseData} />);
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
  const handleClick = (val) => props.setDetermineView(val);

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <div className="nav-link text-white" onClick={() => handleClick("adminStudentView")}>
            Students
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link text-white" onClick={() => handleClick("adminStudentEdit")}>
            Edit Students
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link text-white" onClick={() => handleClick("adminStudentCourses")}>
            Student Courses
          </div>
        </li>
      </ul>
    </>
  );
}
