import React from "react";
import m from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const ShowDescription = ({ show, handleClose, message }: any) => {
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        className={`${m.modalCts}`}
      >
        <Modal.Header>
          <Modal.Title>User message</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>{message}</Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowDescription;
