export const FacultyBlueprint = {
  firstName: String,
  lastName: String,
  gender: String,
  role: String,
  phone: String,
  current_courses: String || [],
  email: String,
  id: Number,
  location: String || Object,
  dob: String || Object,
};

export const StudentBlueprint = {
  firstName: String,
  lastName: String,
  gender: String,
  role: String,
  phone: String,
  current_courses: String || [],
  email: String,
  id: Number,
  location: String || Object,
  dob: String || Object,
};

export const SectionBlueprint = {
  course_name: String,
  instructor_id: Number,
  enrolled_students: String || [],
  section_id: Number,
  course_id: Number,
};

export const CourseBlueprint = {
  id: Number,
  name: String,
  active_sections: String || [],
};
