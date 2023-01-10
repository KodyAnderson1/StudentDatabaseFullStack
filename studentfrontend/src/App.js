import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./components/css/App.css";

import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Student from "./components/Student";

import { CoursesData } from "./model/CoursesData";
import { SectionData } from "./model/SectionData";

import AdminCourses from "./components/admin/courses/AdminCourses";
import { ListOfPeople } from "./components/admin/ListOfPeople";
import { AdminNavbar } from "./components/admin/AdminNavbar";
import { FacultyCard } from "./components/admin/faculty/FacultyCard";
import { StudentCard } from "./components/admin/students/StudentCard";
import { NewStudentForm } from "./components/admin/students/NewStudentForm";
import { NewFacultyForm } from "./components/admin/faculty/NewFacultyForm";
import { PersonJsonToOjbect, readyPersonForJson } from "./utils";

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
 * ? Currently have two states, one minimal for the ListOfPeople and one with all data for
 * ?    students, and faculty. Keep as is or just pass around state that contains everything?
 */
function App() {
  const [allStudents, setAllStudents] = useState("");
  const [allFaculty, setAllFaculty] = useState("");
  // const [facultyDataForList, setFacultyDataForList] = useState("");
  // const [studentDataForList, setStudentDataForList] = useState("");

  // function helperFaculty(result) {
  //   let resListData = [];
  //   setAllFaculty(
  //     result.map((element) => {
  //       resListData.push({
  //         firstName: element.firstName,
  //         lastName: element.lastName,
  //         id: element.id,
  //       });
  //       return PersonJsonToOjbect(element);
  //     })
  //   );
  //   setFacultyDataForList(resListData);
  // }

  function helperFaculty(result) {
    setAllFaculty(result.map((element) => PersonJsonToOjbect(element)));
  }

  function helperStudent(result) {
    setAllStudents(result.map((element) => PersonJsonToOjbect(element)));
  }

  useEffect(() => {
    fetch(`http://localhost:8080/faculty/getAll`)
      .then((response) => response.json())
      .then((result) => helperFaculty(result))
      .catch((err) => console.log(err));

    fetch(`http://localhost:8080/student/getAll`)
      .then((response) => response.json())
      .then((result) => helperStudent(result))
      .catch((err) => console.log(err));
  }, []);

  const addNewStudent = (student) => {
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readyPersonForJson(student)),
    }).catch((error) => console.log(error));
    setAllStudents([...allStudents, student]);
  };

  const addNewFaculty = (faculty) => {
    fetch("http://localhost:8080/faculty/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readyPersonForJson(faculty)),
    }).catch((error) => console.log(error));
    setAllFaculty([...allFaculty, faculty]);
  };

  function updateStudent(student) {
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readyPersonForJson(student)),
    }).catch((error) => console.log(error));
    setAllStudents(allStudents.map((stud) => (stud.id === student.id ? student : stud)));
    // setStudentDataForList(allStudents.map((stud) => (stud.id === student.id ? student : stud)));
  }

  function updateFaculty(faculty) {
    fetch("http://localhost:8080/faculty/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readyPersonForJson(faculty)),
    }).catch((error) => console.log(error));

    setAllFaculty(allFaculty.map((fac) => (fac.id === faculty.id ? faculty : fac)));
    // setFacultyDataForList(allFaculty.map((fac) => (fac.id === faculty.id ? faculty : fac)));
  }
  const removeStudent = (id) => {
    fetch(`http://localhost:8080/student/delete/${id}`, {
      method: "DELETE",
    }).catch((error) => console.log(error));
    setAllStudents(allStudents.filter((student) => student.id !== id));
  };

  const removeFaculty = (id) => {
    fetch(`http://localhost:8080/faculty/delete/${id}`, {
      method: "DELETE",
    }).catch((error) => console.log(error));
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

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="" element={<Appbar />}>
            <Route path="students" element={<Student />} />
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

            <Route
              path="admin/faculty"
              element={<ListOfPeople data={allFaculty} role={"faculty"} />}>
              <Route
                path=":id"
                element={
                  <FacultyCard updateFaculty={updateFaculty} removeFaculty={removeFaculty} />
                }
              />
              <Route path="newfaculty" element={<NewFacultyForm addNew={addNewFaculty} />} />
            </Route>
            <Route
              path="admin/courses"
              element={<ListOfPeople data={CoursesData} role={"course"} />}>
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
    </>
  );
}

export default App;
