import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Appbar from "./components/Appbar";
import Login from "./components/login";
import Student from "./components/Student";

function App() {
  return (
    <div className="App">
      <Appbar />
      <Routes>
        {/* <Route path="" element={<Student />} /> */}
        <Route path="" element={<Login />} />
      </Routes>
      {/* <Route path="/login" element={<Login />} /> */}
    </div>
  );
}

export default App;
