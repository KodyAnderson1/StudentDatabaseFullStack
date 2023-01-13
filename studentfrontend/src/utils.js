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

export function PersonJsonToOjbect(person) {
  const obj = {
    firstName: person.firstName,
    lastName: person.lastName,
    gender: person.gender,
    role: person.role,
    phone: person.phone,
    sections: person.sections,
    email: person.email,
    id: person.id,
    location: jsonAddressToObject(person.address),
    dob: jsonDOBToObject(person.dob),
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

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
