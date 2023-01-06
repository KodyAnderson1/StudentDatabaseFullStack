import { FacultyJsonToOjbect, readyFaculty } from "./utils";

export function addFaculty(faculty) {
  fetch("http://localhost:8080/faculty/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(readyFaculty(faculty)),
  })
    .then(() => console.log("POST completed for: " + JSON.stringify(readyFaculty(faculty))))
    .catch((error) => console.log(error));
}
