import React from "react";
import { Link } from "react-router-dom";

import "../css/App.css";
import "../css/Admin.css";
import { Container } from "react-bootstrap";

export function AdminNavbar() {
  return (
    <>
      <Container className="d-flex justify-content-center admin-navbar">
        <div className="admin-card-navbar">
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
      </Container>
    </>
  );
}
