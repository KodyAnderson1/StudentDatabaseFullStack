import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { AiFillMinusCircle } from "react-icons/ai";

export function CustomAlert(props) {
  const [show, setToastShow] = useState(false);

  const handleClick = () => setToastShow(true);

  return (
    <>
      <Col xs={4} className="d-flex justify-content-end">
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
      <Col xs={5} className="d-flex justify-content-end">
        <Button
          onClick={props.removePerson}
          variant="danger"
          className="d-flex align-items-center justify-content-center course-remove-btn">
          <AiFillMinusCircle />
        </Button>
      </Col>
      <Col xs={2} className="d-flex align-items-center justify-content-end mb-2 ms-2">
        <Button
          onClick={handleClick}
          type="submit"
          variant="success"
          form="editStudentForm"
          className="course-remove-btn d-flex align-items-center justify-content-center">
          Submit
        </Button>
      </Col>
    </>
  );
}
