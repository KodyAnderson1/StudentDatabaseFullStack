import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import "./components/css/App.css";

import Login from "./components/Login";

// import { CoursesData } from "./model/CoursesData";
// import { SectionData } from "./model/SectionData";

import AdminCourses from "./components/admin/courses/AdminCourses";
import { ListOfPeople } from "./components/admin/ListOfPeople";
import { AdminNavbar } from "./components/admin/AdminNavbar";
import { FacultyCard } from "./components/admin/faculty/FacultyCard";
import { StudentCard } from "./components/admin/students/StudentCard";
import { NewStudentForm } from "./components/admin/students/NewStudentForm";
import { NewFacultyForm } from "./components/admin/faculty/NewFacultyForm";
import {
  axios_addPerson,
  axios_deletePerson,
  axios_fetchAll,
  axios_updateExistingPerson,
} from "./services/APICalls";

/**
 * ! Removing any data does not update state properly and auto rerender
 *
 * ! useEffect grabs all data then the specific cards also make db calls.
 * !    Keep as is? Or just update state and pass as props?
 *
 * ? Make one DB call and get all data for student/fac/courses OR make several with the top level
 * ? Call being bare minimum info and subsequent calls being made to grab specific data
 */
function App() {
  const [allStudents, setAllStudents] = useState("");
  const [allFaculty, setAllFaculty] = useState("");
  const [allCourses, setAllCourses] = useState("");

  const { data: studentData, isLoading } = useQuery(["all-students", "student"], () =>
    axios_fetchAll("student")
  );
  const { data: facultyData, isSuccess } = useQuery(["all-faculty", "faculty"], () =>
    axios_fetchAll("faculty")
  );

  const { data: courseData, isSuccess: courseSuccess } = useQuery(["all-courses", "course"], () =>
    axios_fetchAll("course")
  );

  useEffect(() => {
    if (!isLoading) setAllStudents(studentData);
    if (isSuccess) setAllFaculty(facultyData);
    if (courseSuccess) setAllCourses(courseData);
  }, [isLoading, isSuccess, courseSuccess, studentData, facultyData, courseData]);

  const addNewStudent = (student) => {
    axios_addPerson(student, "student");
    setAllStudents([...allStudents, student]);
  };

  const addNewFaculty = (faculty) => {
    axios_addPerson(faculty, "faculty");
    setAllFaculty([...allFaculty, faculty]);
  };

  function updateStudent(student) {
    axios_updateExistingPerson(student, "student");
    setAllStudents(allStudents.map((stud) => (stud.id === student.id ? student : stud)));
  }

  function updateFaculty(faculty) {
    axios_updateExistingPerson(faculty, "faculty");
    setAllFaculty(allFaculty.map((fac) => (fac.id === faculty.id ? faculty : fac)));
  }

  const removeStudent = (id) => {
    axios_deletePerson(id, "student");
    setAllStudents(allStudents.filter((student) => student.id !== id));
  };

  const removeFaculty = (id) => {
    axios_deletePerson(id, "faculty");
    setAllFaculty(allFaculty.filter((faculty) => faculty.id !== id));
  };

  function removeStudentSection(id, student_id) {
    let [studentWithDelete] = allStudents.filter((student) => student.id === student_id);
    const remainingSections = studentWithDelete.sections.filter((c) => c.section_id !== id);
    const updatedStudent = { ...studentWithDelete, sections: remainingSections };

    setAllStudents(
      allStudents.map((student) => {
        if (student.id === student_id) return updatedStudent;
        else return student;
      })
    );
  }

  if (isLoading || !isSuccess) return <h2>Loading...</h2>;

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
          <Route path="admin/courses" element={<ListOfPeople data={allCourses} role={"course"} />}>
            <Route path=":id" element={<AdminCourses CoursesData={allCourses} />} />
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
