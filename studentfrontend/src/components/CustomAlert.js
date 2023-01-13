import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

export function CustomAlert(props) {
  const [show, setToastShow] = useState(false);

  const handleClick = () => setToastShow(true);

  return (
    <>
      <Col xs={6} className="d-flex justify-content-end">
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
      <Col xs={3} className="d-flex justify-content-end">
        <ConfirmationModal removePerson={props.removePerson} titleData={props.title} />
      </Col>
      <Col xs={3} className="d-flex align-items-center justify-content-start mb-2 ms-2">
        <Button
          onClick={handleClick}
          type="submit"
          variant="success"
          form="editForm"
          className="enable-edit-btn d-flex align-items-center justify-content-center">
          <AiOutlineCheck />
        </Button>
      </Col>
    </>
  );
}

function ConfirmationModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const itemBeingDeleted = props.titleData;

  return (
    <>
      <Button
        variant="danger"
        className="d-flex align-items-center justify-content-center enable-edit-btn"
        onClick={handleShow}>
        <BsFillTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            About to delete {itemBeingDeleted ? itemBeingDeleted : "record"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to permanently delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={props.removePerson} variant="danger">
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
