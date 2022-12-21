import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import { Paper } from "@mui/material";

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const FieldStyle = { paddingBottom: "0.5rem" };

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then(() => console.log("POST completed for: " + JSON.stringify(student)))
      .catch((error) => console.log(error));
    setName("");
    setAddress("");
  };

  return (
    <Container>
      <Paper elevation={3} className="paper-style">
        <h1 className="students-heading">Add Student</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            style={FieldStyle}
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Paper>

      <DisplayStudents />
    </Container>
  );
}

function DisplayStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((response) => response.json())
      .then((result) => setStudents(result));
  }, []);

  return (
    <div className="container">
      <h2>Students</h2>
      {/* <div className=" paper-style"> */}
      {students.map((student) => (
        <>
          <div className="card mb-2">
            <div className="row p-5">
              <div className="col-2">ID: {student.id} </div>
              <div className="col-5">Name: {student.name}</div>
              <div className="col-5">Address: {student.address}</div>
            </div>
          </div>
        </>
        // <Paper elevation={6} className="specific-student" key={student.id}>
        //   ID: {student.id} <br />
        //   Name: {student.name} <br />
        //   Address: {student.address}
        // </Paper>
      ))}
      {/* </div> */}
    </div>
  );
}
