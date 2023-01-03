import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export function CustomAlert(props) {
  const [show, setToastShow] = useState(false);

  const handleClick = () => setToastShow(true);

  return (
    <Row>
      <Col xs={6}>
        <ToastContainer>
          <Toast
            className="toast-styles"
            bg="success"
            onClose={() => setToastShow(false)}
            show={show}
            delay={1000}
            autohide>
            <Toast.Body>Changes successful!</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>

      <Col xs={6}>
        <Button onClick={handleClick} type="submit" variant="primary" form="editStudentForm">
          Submit
        </Button>
      </Col>
    </Row>
  );
}
