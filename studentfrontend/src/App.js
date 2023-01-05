import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./components/css/App.css";

import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Student from "./components/Student";

import { CoursesData } from "./model/CoursesData";
import { StudentData } from "./model/StudentData";
import { SectionData } from "./model/SectionData";
import { FacultyData } from "./model/Faculty";
import AdminCourses from "./components/admin/courses/AdminCourses";

import { ListOfPeople } from "./components/admin/ListOfPeople";
import { AdminNavbar } from "./components/admin/AdminNavbar";
import { FacultyCard } from "./components/admin/faculty/FacultyCard";
import { StudentCard } from "./components/admin/students/StudentCard";
import { NewStudentForm } from "./components/admin/students/NewStudentForm";
import { NewFacultyForm } from "./components/admin/faculty/NewFacultyForm";
/**
 * ! Each submenu (Students, Faculty, Courses) has a hamburger menu next to admin
 */

// ! useEffect to grab "database" data
// ! right now just filters list of stuff
function App() {
  const [allStudents, setAllStudents] = useState(StudentData);
  const [allFaculty, setAllFaculty] = useState(FacultyData);

  const addNewStudent = (student) => setAllStudents([...allStudents, student]);
  const addNewFaculty = (faculty) => setAllFaculty([...allFaculty, faculty]);

  function updateStudent(student) {
    setAllStudents(allStudents.map((stud) => (stud.id === student.id ? student : stud)));
  }

  function updateFaculty(faculty) {
    setAllFaculty(allFaculty.map((fac) => (fac.id === faculty.id ? faculty : fac)));
  }
  // const removeStudent = (id) => setAllStudents(allStudents.filter((student) => student.id !== id));
  // const removeFaculty = (id) => setAllFaculty(allFaculty.filter((faculty) => faculty.id !== id));

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="" element={<Appbar />}>
            <Route path="students" element={<Student />} />
            <Route index element={<Login />} />
            <Route path="admin" element={<AdminNavbar />} />

            <Route path="admin/students" element={<ListOfPeople data={allStudents} />}>
              <Route
                path=":id"
                element={<StudentCard data={allStudents} updateStudent={updateStudent} />}
              />
              <Route path="newstudent" element={<NewStudentForm addNew={addNewStudent} />} />
            </Route>

            <Route path="admin/faculty" element={<ListOfPeople data={allFaculty} />}>
              <Route
                path=":id"
                element={<FacultyCard data={allFaculty} updateFaculty={updateFaculty} />}
              />
              <Route path="newfaculty" element={<NewFacultyForm addNew={addNewFaculty} />} />
            </Route>
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
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
