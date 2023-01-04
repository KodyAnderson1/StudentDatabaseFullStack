import React from "react";
import { Link, Outlet } from "react-router-dom";

import "../css/App.css";
import "../css/Admin.css";

export default function AdminHome() {
  return (
    <>
      <div className="container top-admin-container d-flex justify-content-center">
        <AdminNavbar />
      </div>
    </>
  );
}

function AdminNavbar() {
  return (
    <>
      <div className="col-2 admin-card-navbar">
        <h2>Admin</h2>
        <nav className="nav nav-pills nav-fill flex-column admin-nav-btns">
          <Link className="nav-link active" to={"/admin/students"}>
            Students
          </Link>
          <Link className="nav-link active" to={"/admin/faculty"}>
            Faculty
          </Link>
          <Link className="nav-link active" to={"/admin/courses"}>
            Courses
          </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
