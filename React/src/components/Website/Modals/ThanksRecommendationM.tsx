import React from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";

const ThanksRecommendationM = (props: any) => {
  let { show, handleClose } = props;

  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-0">
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: " 0px 35px 25px 35px",
          }}
        >
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.reviewCafeList}`}>
                    <h5>Thanks for sharing your recommendation!</h5>

                    <div className={`mt-4`}>
                      <NavLink to="#" className={`${m.backLink}`}>
                        Search cafes
                      </NavLink>
                      <NavLink to="#" className={`btn ${st.btn2}`}>
                        Recommend another
                      </NavLink>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ThanksRecommendationM;
