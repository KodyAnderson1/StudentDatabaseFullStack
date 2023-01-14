export function emailHelper(firstName, lastName) {
  let min = Math.ceil(10);
  let max = Math.floor(99);
  let randNum = Math.floor(Math.random() * (max - min) + min);
  return `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${randNum}@uwf.edu`;
}

export function readyPersonForJson(person) {
  let dobFull;

  if (person.dob.full) dobFull = person.dob.full;
  else dobFull = person.dob;

  const { address, city, state } = person.location;
  const loc = `${address},${city},${state}`;

  const personReadyForJson = {
    ...person,
    dob: dobFull,
    address: loc,
  };
  return personReadyForJson;
}

// function jsonCurrentCoursesToArray(courses, id) {
//   if (!courses || courses.length === 0) return [];
//   let retList = [];
//   let tempList = SectionData.filter((ele) => courses.includes(ele.section_id));
//   tempList.forEach((element) => {
//     retList.push({
//       student_id: id,
//       course_name: element.course_name,
//       section_id: element.section_id,
//       course_id: element.course_id,
//       instructor_id: element.instructor_id,
//     });
//   });
//   return retList;
// }

// export function PersonJsonToOjbect(person) {
//   const obj = {
//     firstName: person.firstName,
//     lastName: person.lastName,
//     gender: person.gender,
//     role: person.role,
//     phone: person.phone,
//     sections: person.sections,
//     email: person.email,
//     id: person.id,
//     location: jsonAddressToObject(person.address),
//     dob: jsonDOBToObject(person.dob),
//   };
//   return obj;
// }

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
