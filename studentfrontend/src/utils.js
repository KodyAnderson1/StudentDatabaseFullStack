export function readyFaculty(faculty) {
  console.log(faculty);
  const dobString = faculty.dob.full;
  const currentCoursesString = faculty.current_courses.join(",");
  const { address, city, state } = faculty.location;
  const loc = `${address},${city},${state}`;
  const facultyReadyForJson = {
    ...faculty,
    dob: dobString,
    current_courses: currentCoursesString,
    address: loc,
  };
  return facultyReadyForJson;
}

export function FacultyJsonToOjbect(faculty) {
  const obj = {
    firstName: faculty.firstName,
    lastName: faculty.lastName,
    gender: faculty.gender,
    role: faculty.role,
    phone: faculty.phone,
    current_courses: jsonCurrentCoursesToArray(faculty.current_courses),
    email: faculty.email,
    id: faculty.id,
    location: jsonAddressToObject(faculty.address),
    dob: jsonDOBToObject(faculty.dob),
  };
  return obj;
}

// ! dont need?
export function jsonCurrentCoursesToArray(courses) {
  return courses.split(",");
}

// YYYY-MM-DD
export function jsonDOBToObject(dob) {
  const DobSplit = dob.split("-");
  return { month: DobSplit[1], day: DobSplit[2], year: DobSplit[0], full: dob };
}

export function jsonAddressToObject(address) {
  const addressSplit = address.split(",");
  return { address: addressSplit[0], city: addressSplit[1], state: addressSplit[2] };
}
