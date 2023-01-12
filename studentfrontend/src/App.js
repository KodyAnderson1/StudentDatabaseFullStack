import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./components/css/App.css";

import Login from "./components/Login";

import { CoursesData } from "./model/CoursesData";
import { SectionData } from "./model/SectionData";

import AdminCourses from "./components/admin/courses/AdminCourses";
import { ListOfPeople } from "./components/admin/ListOfPeople";
import { AdminNavbar } from "./components/admin/AdminNavbar";
import { FacultyCard } from "./components/admin/faculty/FacultyCard";
import { StudentCard } from "./components/admin/students/StudentCard";
import { NewStudentForm } from "./components/admin/students/NewStudentForm";
import { NewFacultyForm } from "./components/admin/faculty/NewFacultyForm";
import {
  addPerson,
  deletePerson,
  fetchAllFaculty,
  fetchAllStudents,
  updateExistingPerson,
} from "./services/APICalls";

/**
 * ! useEffect to grab "database" data
 * ! right now just filters list of stuff
 *
 * ! useEffect grabs all data then the specific cards also make db calls.
 * !    Keep as is? Or just update state and pass as props?
 *
 * ! When deleting a faculty/student, the data disappears but the card itself stays
 *
 * ? Find a way for "ListOfPeople" to make a DB call to get data so page reload doesn't break
 *
 * ? Make one DB call and get all data for student/fac/courses OR make several with the top level
 * ? Call being bare minimum info and subsequent calls being made to grab specific data
 */
function App() {
  const [allStudents, setAllStudents] = useState("");
  const [allFaculty, setAllFaculty] = useState("");

  const { data: studentData, isLoading: isLoadingStu } = useQuery(["students"], fetchAllStudents);
  const { data: facultyData, isLoading: isLoadingFac } = useQuery(["faculty"], fetchAllFaculty);

  useEffect(() => {
    if (!isLoadingStu && !isLoadingFac) {
      setAllStudents(studentData);
      setAllFaculty(facultyData);
    }
  }, [isLoadingStu, isLoadingFac, studentData, facultyData]);

  const addNewStudent = (student) => {
    addPerson(student, "student");
    setAllStudents([...allStudents, student]);
  };

  const addNewFaculty = (faculty) => {
    addPerson(faculty, "faculty");
    setAllFaculty([...allFaculty, faculty]);
  };

  function updateStudent(student) {
    updateExistingPerson(student, "student");
    setAllStudents(allStudents.map((stud) => (stud.id === student.id ? student : stud)));
  }

  function updateFaculty(faculty) {
    updateExistingPerson(faculty, "faculty");
    setAllFaculty(allFaculty.map((fac) => (fac.id === faculty.id ? faculty : fac)));
  }

  const removeStudent = (id) => {
    deletePerson(id, "student");
    setAllStudents(allStudents.filter((student) => student.id !== id));
  };

  const removeFaculty = (id) => {
    deletePerson(id, "faculty");
    setAllFaculty(allFaculty.filter((faculty) => faculty.id !== id));
  };

  // ! When deleting sections, does not appear on page til student is refreshed
  function removeStudentSection(id, student_id) {
    fetch(`http://localhost:8080/student/sections/${id}`, {
      method: "DELETE",
    }).catch((error) => console.log(error));

    let [studentWithDelete] = allStudents.filter((student) => student.id === student_id);
    const remainingSections = studentWithDelete.sections.filter((c) => c.id !== id);

    setAllStudents(
      allStudents.map((student) => {
        if (student.id === student_id) {
          return {
            ...student,
            sections: remainingSections,
          };
        } else return student;
      })
    );
  }

  if (isLoadingStu) return <h2>Loading...</h2>;
  if (isLoadingFac) return <h2>Loading...</h2>;

  return (
    <div className="App">
      <Routes>
        <Route
          path=""
          element={
            <>
              <h1>NavBar Here</h1>
              <Outlet />
            </>
          }>
          {/* <Route path="students" element={<Student />} /> */}
          <Route index element={<Login />} />
          <Route path="admin" element={<AdminNavbar />} />

          <Route
            path="admin/students"
            element={<ListOfPeople data={allStudents} role={"student"} />}>
            <Route
              path=":id"
              element={
                <StudentCard
                  updateStudent={updateStudent}
                  removeStudent={removeStudent}
                  removeSection={removeStudentSection}
                />
              }
            />
            <Route path="newstudent" element={<NewStudentForm addNew={addNewStudent} />} />
          </Route>

          <Route path="admin/faculty" element={<ListOfPeople data={allFaculty} role={"faculty"} />}>
            <Route
              path=":id"
              element={<FacultyCard updateFaculty={updateFaculty} removeFaculty={removeFaculty} />}
            />
            <Route path="newfaculty" element={<NewFacultyForm addNew={addNewFaculty} />} />
          </Route>
          <Route path="admin/courses" element={<ListOfPeople data={CoursesData} role={"course"} />}>
            <Route
              path=":id"
              element={<AdminCourses CoursesData={CoursesData} SectionData={SectionData} />}
            />
            <Route path="newcourse" element={<h1>Form Here</h1>} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
