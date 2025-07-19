import React from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const AddBranch = (props: any) => {
  let { show, handleClose } = props;
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
          <Modal.Title>Add Branch</Modal.Title>
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
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Branch Name</label>
                <Form.Control type="text" placeholder="" />
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>Country</label>
                <Form.Select aria-label="">
                  <option>---Select---</option>
                </Form.Select>
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>State</label>
                <Form.Select aria-label="">
                  <option>---Select---</option>
                </Form.Select>
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>City</label>
                <Form.Select aria-label="">
                  <option>---Select---</option>
                </Form.Select>
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>Postal Code</label>
                <Form.Control
                  type="number"
                  placeholder=""
                  className={`${st.removeArrow}`}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Address</label>
                <Form.Control type="text" placeholder="" />
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Landmark</label>
                <Form.Control type="text" placeholder="" />
              </div>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button className={`${m.submit}`} onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBranch;
