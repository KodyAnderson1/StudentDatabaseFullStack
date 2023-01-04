import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState } from "react";

import "./components/css/App.css";
import AdminHome from "./components/admin/AdminHome";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Student from "./components/Student";

import { CoursesData } from "./model/CoursesData";
import { StudentData } from "./model/StudentData";
import { SectionData } from "./model/SectionData";
import { FacultyData } from "./model/Faculty";
import { AdminStudents } from "./components/admin/students/AdminStudents";
import AdminCourses from "./components/admin/courses/AdminCourses";
import AdminFaculty from "./components/admin/faculty/AdminFaculty";
/**
 *
 * Make each admin page a route!!
 */
function App() {
  const [allStudents, setAllStudents] = useState(StudentData);
  const [allFaculty, setAllFaculty] = useState(FacultyData);

  const addNewStudent = (student) => setAllStudents([...allStudents, student]);
  // const removeStudent = (id) => setAllStudents(allStudents.filter((student) => student.id !== id));
  const addNewFaculty = (faculty) => setAllFaculty([...allFaculty, faculty]);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="" element={<Appbar />}>
            <Route path="students" element={<Student />} />
            <Route index element={<Login />} />
            <Route path="admin" element={<AdminHome />}>
              <Route
                path="students"
                element={
                  <AdminStudents
                    FacultyData={FacultyData}
                    courseData={SectionData}
                    allStudents={allStudents}
                    setAllStudents={setAllStudents}
                    addNewStudent={addNewStudent}
                  />
                }
              />
              <Route
                path="faculty"
                element={
                  <AdminFaculty
                    FacultyData={FacultyData}
                    SpecificCourseData={SectionData}
                    allFaculty={allFaculty}
                    setAllFaculty={setAllFaculty}
                    addNewFaculty={addNewFaculty}
                  />
                }
              />
              <Route
                path="courses"
                element={
                  <AdminCourses
                    FacultyData={FacultyData}
                    SpecificCourseData={SectionData}
                    StudentData={StudentData}
                    GeneralCourseData={CoursesData}
                  />
                }
              />
              {/* <Route index element={<AdminHome />} /> */}
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
