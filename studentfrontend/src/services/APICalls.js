import axios from "axios";
import { readyPersonForJson } from "../utils";

const DB_URL = "http://localhost:8080";

export const addPerson = (person, route) =>
  axios
    .post(`${DB_URL}/${route}/add`, readyPersonForJson(person))
    .catch((error) => console.log("PERSON_ADD_API_ERROR\n", error));

export const updateExistingPerson = (person, route) =>
  axios
    .post(`${DB_URL}/${route}/add`, readyPersonForJson(person))
    .catch((error) => console.log("PERSON_UPDATE_API_ERROR\n", error));

export const deletePerson = (id, route) =>
  axios
    .delete(`${DB_URL}/${route}/${id}`)
    .catch((error) => console.log("PERSON_DELETE_API_ERROR\n", error));

export const fetchAllStudents = () =>
  axios
    .get(`${DB_URL}/student/getAll`)
    .then((res) => res.data)
    .catch((error) => console.log("STUDENTS_GET_ALL_API_ERROR\n", error));

export const fetchAllFaculty = () =>
  axios
    .get(`${DB_URL}/faculty/getAll`)
    .then((res) => res.data)
    .catch((error) => console.log("FACULTY_GET_ALL_API_ERROR\n", error));

// export const fetchAll = (route) =>
//   axios
//     .get(`${DB_URL}/${route}/getAll`)
//     .then((res) => res.data)
//     .catch((error) => console.log("PERSON_GET_ALL_API_ERROR\n", error));

// export const addStudent = (student) =>
//   axios
//     .post(`${DB_URL}/student/add`, readyPersonForJson(student))
//     .catch((error) => console.log("STUDENT_ADD_API_ERROR\n", error));

// export const addFaculty = (faculty) =>
//   axios
//     .post(`${DB_URL}/faculty/add`, readyPersonForJson(faculty))
//     .catch((error) => console.log("FACULTY_ADD_API_ERROR\n", error));

// export const updateExistingStudent = (student) =>
//   axios
//     .post(`${DB_URL}/student/add`, readyPersonForJson(student))
//     .catch((error) => console.log("STUDENT_UPDATE_API_ERROR\n", error));

// export const updateExistingFaculty = (faculty) =>
//   axios
//     .post(`${DB_URL}/faculty/add`, readyPersonForJson(faculty))
//     .catch((error) => console.log("FACULTY_UPDATE_API_ERROR\n", error));

// export const deleteStudent = (id) =>
//   axios
//     .delete(`${DB_URL}/student/${id}`)
//     .catch((error) => console.log("STUDENT_DELETE_API_ERROR\n", error));

// export const deleteFaculty = (id) =>
//   axios
//     .delete(`${DB_URL}/faculty/${id}`)
//     .catch((error) => console.log("Faculty_DELETE_API_ERROR\n", error));

export const getSpecificPerson = (id, route) =>
  axios
    .get(`${DB_URL}/${route}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("GET_PERSON_API_FAIL\n", error));
