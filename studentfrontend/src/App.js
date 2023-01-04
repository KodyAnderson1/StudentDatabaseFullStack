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
import { PersonCard } from "./components/admin/PersonCard";
import { AdminNavbar } from "./components/admin/AdminNavbar";
/**
 *
 * ! Make each admin page a route!!
 * ! use router more for look ups use params to grab id and then return the data
 * ! Make Admin menu
 * ! Each submenu (Students, Faculty, Courses) has a hamburger menu next to admin
 * ! List of people / searchbar under Admin + Navbar
 */

// ! useEffect to grab "database" data
// ! right now just filters list of stuff
function App() {
  const [allStudents, setAllStudents] = useState(StudentData);
  const [allFaculty, setAllFaculty] = useState(FacultyData);

  const addNewStudent = (student) => setAllStudents([...allStudents, student]);
  const addNewFaculty = (faculty) => setAllFaculty([...allFaculty, faculty]);
  // const removeStudent = (id) => setAllStudents(allStudents.filter((student) => student.id !== id));
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="" element={<Appbar />}>
            <Route path="students" element={<Student />} />
            <Route index element={<Login />} />
            <Route path="admin" element={<AdminNavbar />} />

            <Route path="admin/students" element={<ListOfPeople data={allStudents} />}>
              <Route path=":id" element={<PersonCard data={allStudents} />} />
            </Route>

            <Route
              path="admin/faculty"
              element={
                <ListOfPeople data={allFaculty} />
                // <AdminFaculty
                //   FacultyData={FacultyData}
                //   SpecificCourseData={SectionData}
                //   allFaculty={allFaculty}
                //   setAllFaculty={setAllFaculty}
                //   addNewFaculty={addNewFaculty}
                // />
              }>
              <Route path=":id" element={<PersonCard data={allFaculty} />} />
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
            {/* <Route index element={<AdminHome />} /> */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
