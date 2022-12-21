import "../../App.css";

export default function AdminHome() {
  return (
    <>
      <div className="container d-flex justify-content-center">
        <AdminNavbar />
        <div className="col-10 admin-card-body"></div>
      </div>
    </>
  );
}

function AdminNavbar() {
  return (
    <>
      <div className="col-2 admin-card-navbar">
        <h2>Navbar</h2>
        <nav class="nav nav-pills nav-fill flex-column">
          <a class="nav-link active" aria-current="page" href="#">
            Students
          </a>
          <a class="nav-link active" href="#">
            Courses
          </a>
          <a class="nav-link active" href="#">
            Faculty
          </a>
          <a class="nav-link active" href="#">
            Misc
          </a>
        </nav>
      </div>
    </>
  );
}
