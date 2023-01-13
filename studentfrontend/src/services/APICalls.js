import axios from "axios";
import { readyPersonForJson } from "../utils";

const DB_URL = "http://localhost:8080";

/**
 * Function makes a call to the database and returns a JSON object of the records on that route
 * @param {String} route route of entity { student, faculty, course }
 * @returns JSON formatted data for all records from a specific entity
 */
export const axios_fetchAll = (route) =>
  axios
    .get(`${DB_URL}/${route}/getAll`)
    .then((res) => res.data)
    .catch((error) => console.log("PERSON_GET_ALL_API_ERROR\n", error));

/**
 * Function makes a call to the database and adds a person {student, faculty} to the DB
 * @param {Object} person entity getting added to DB
 * @param {String} route route of entity { student, faculty }
 * @returns "Success" if successful
 */
export const axios_addPerson = (person, route) =>
  axios
    .post(`${DB_URL}/${route}/add`, readyPersonForJson(person))
    .catch((error) => console.log("PERSON_ADD_API_ERROR\n", error));

/**
 *
 * @param {*} person
 * @param {*} route
 * @returns
 */
export const axios_updateExistingPerson = (person, route) =>
  axios
    .post(`${DB_URL}/${route}/add`, readyPersonForJson(person))
    .catch((error) => console.log("PERSON_UPDATE_API_ERROR\n", error));

/**
 *
 * @param {*} id
 * @param {*} route
 * @returns
 */
export const axios_deletePerson = (id, route) =>
  axios
    .delete(`${DB_URL}/${route}/delete/${id}`)
    .catch((error) => console.log("PERSON_DELETE_API_ERROR\n", error));

/**
 * Function makes a call to the database and returns a JSON object of the entity
 * @param {Number} id id of entity getting called from DB
 * @param {String} route route of entity { student, faculty, course }
 * @returns JSON formatted data for a specific entity
 */
export const axios_getSpecificPerson = (id, route) =>
  axios
    .get(`${DB_URL}/${route}/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log("GET_PERSON_API_FAIL\n", error));

export const axios_removeSection = (table_id) =>
  axios
    .delete(`${DB_URL}/student/sections/${table_id}`)
    .catch((error) => console.log("DELETE_SECTION_API_FAIL\n", error));

export const axios_getSectionsForCourse = (course_id) =>
  axios
    .get(`${DB_URL}/section/${course_id}`)
    .then((res) => res.data)
    .catch((error) => console.log("GET_COURSE_SECTIONS_API_FAIL\n", error));

// export const fetchAllStudents = () =>
//   axios
//     .get(`${DB_URL}/student/getAll`)
//     .then((res) => res.data)
//     .catch((error) => console.log("STUDENTS_GET_ALL_API_ERROR\n", error));

// export const fetchAllFaculty = () =>
//   axios
//     .get(`${DB_URL}/faculty/getAll`)
//     .then((res) => res.data)
//     .catch((error) => console.log("FACULTY_GET_ALL_API_ERROR\n", error));

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
