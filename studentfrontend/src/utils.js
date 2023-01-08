import { SectionData } from "./model/SectionData";

export function readyPersonForJson(person) {
  const dobString = person.dob.full;
  const { address, city, state } = person.location;
  const loc = `${address},${city},${state}`;

  const personReadyForJson = {
    ...person,
    dob: dobString,
    sections: jsonCurrentCoursesToArray(person.current_courses, person.id),
    address: loc,
  };
  return personReadyForJson;
}

function jsonCurrentCoursesToArray(courses, id) {
  if (!courses || courses.length === 0) return [];
  let retList = [];
  let tempList = SectionData.filter((ele) => courses.includes(ele.section_id));
  tempList.forEach((element) => {
    retList.push({
      student_id: id,
      course_name: element.course_name,
      section_id: element.section_id,
      course_id: element.course_id,
      instructor_id: element.instructor_id,
    });
  });
  return retList;
}

export function PersonJsonToOjbect(faculty) {
  const obj = {
    firstName: faculty.firstName,
    lastName: faculty.lastName,
    gender: faculty.gender,
    role: faculty.role,
    phone: faculty.phone,
    sections: faculty.sections,
    email: faculty.email,
    id: faculty.id,
    location: jsonAddressToObject(faculty.address),
    dob: jsonDOBToObject(faculty.dob),
  };
  return obj;
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
