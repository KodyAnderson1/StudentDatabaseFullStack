import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Appbar from "./components/Appbar";
import Login from "./components/Login";
import Student from "./components/Student";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Appbar />}>
            <Route path="/students" element={<Student />} />
            <Route index element={<Student />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/students" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
