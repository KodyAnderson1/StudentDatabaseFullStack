import React from "react";

import { EditStudents } from "./EditStudents";

import { StudentData } from "../../../model/StudentData";
import { SpecificCourseData } from "../../../model/SpecificCourseData";

export default function AdminStudents() {
  return (
    <>
      <div className="col-10">
        <EditStudents StudentData={StudentData} courseData={SpecificCourseData} />
      </div>
    </>
  );
}
