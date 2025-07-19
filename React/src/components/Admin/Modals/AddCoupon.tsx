import React from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const AddCoupon = (props: any) => {
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
          <Modal.Title>Add Coupon</Modal.Title>
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
                <label>Coupon Title</label>
                <Form.Control type="text" placeholder="" />
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>Coupon Amount ($)</label>
                <Form.Control
                  type="number"
                  placeholder=""
                  className={`${st.removeArrow}`}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>Number of Coupons</label>
                <Form.Control
                  type="number"
                  placeholder=""
                  className={`${st.removeArrow}`}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>Start Date</label>
                <Form.Control
                  type="date"
                  placeholder=""
                  className={`${st.removeArrow}`}
                />
              </div>
            </Col>
            <Col lg={6}>
              <div className={`${st.formBox}`}>
                <label>End Date</label>
                <Form.Control
                  type="date"
                  placeholder=""
                  className={`${st.removeArrow}`}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <label>Coupon Code</label>
                <Form.Control
                  type="text"
                  className={`${st.removeArrow}`}
                  value="ACCTY56Z"
                  disabled
                />
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

export default AddCoupon;
