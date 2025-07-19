import React, { useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { ThanksRecommendationM } from ".";

const LookCorrectM = (props: any) => {
  let { lookshow, handlelookClose } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmatiomF = () => {
    handleShow();
    handlelookClose();
  };

  return (
    <>
      <Modal
        centered
        scrollable
        show={lookshow}
        onHide={handlelookClose}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-0">
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlelookClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.reviewCafeList}`}>
                    <h5>Does everything look correct?</h5>
                    <p>Please review this information before submitting</p>

                    <ul>
                      <li>
                        <span>Name of the cafe</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Are you affiliated with this place?</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>
                          Does this place already have a listing on Sync Remote
                        </span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>What’s your role in the business?</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Is this place currently open?</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Description of the cafe</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>City, Town, State, Province, Region</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Country</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Address</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>Telephone number</span>
                        <span>Answer goes here</span>
                      </li>
                      <li>
                        <span>
                          Get notified by email about new reviews, best
                          practices , <br /> and more to help you improve your
                          online reputation <br /> and buiild your business
                        </span>
                        <span>Yes</span>
                      </li>
                    </ul>

                    <div className={`mt-5`}>
                      <NavLink to="#" className={`${m.backLink}`}>
                        No, go back
                      </NavLink>
                      <NavLink
                        to="#"
                        className={`btn ${st.btn2}`}
                        onClick={confirmatiomF}
                      >
                        Yes, Confirm
                      </NavLink>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ThanksRecommendationM show={show} handleClose={handleClose} />
    </>
  );
};

export default LookCorrectM;
