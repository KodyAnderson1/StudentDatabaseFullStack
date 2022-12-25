export default function AdminCourses() {
  return (
    <>
      <div className="col-10 admin-card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Edit Courses
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              View Courses
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Courses
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
