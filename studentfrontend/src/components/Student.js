import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import { Paper } from "@mui/material";

export default function Student() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const h1Style = { color: "blue", marginTop: "-1rem" };
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
      <Paper elevation={3} style={paperStyle}>
        <h1 style={h1Style}>Add Student</h1>
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
          <Button style={{ marginTop: ".5rem" }} variant="contained" onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Paper>

      <DisplayStudents />
    </Container>
  );
}

function DisplayStudents(props) {
  const [students, setStudents] = useState([]);
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((response) => response.json())
      .then((result) => setStudents(result));
  }, []);

  return (
    <Container>
      <h2>Students</h2>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}>
            ID: {student.id} <br />
            Name: {student.name} <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
