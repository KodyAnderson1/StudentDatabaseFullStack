import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import AdminHome from "./components/admin/AdminHome";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Student from "./components/Student";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="" element={<Appbar />}>
            <Route path="students" element={<Student />} />
            <Route index element={<Login />} />
            <Route path="admin" element={<AdminHome />}>
              <Route path="student" element={<Login />} />
              <Route index element={<Login />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
