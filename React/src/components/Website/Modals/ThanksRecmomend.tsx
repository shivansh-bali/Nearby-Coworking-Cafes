import React from "react";
import m from "./Modal.module.scss";

import { Modal, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ThanksRecommend = (props: any) => {
  let { lookshow } = props;

  return (
    <>
      <Modal
        centered
        scrollable
        show={lookshow}
        aria-labelledby="example-modal-sizes-title-lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-0">
          {/* <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlelookClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button> */}
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.reviewCafeList} text-center`}>
                    <h5 className="pb-4">Thanks for the recommendation!</h5>
                  </div>
                  <div className={`${m.actionBtnsSuccessfull} text-center`}>
                    <NavLink to="/cafe-listing">Search places</NavLink>
                    <NavLink to="/recommend" className="btn">
                      Recommend another
                    </NavLink>
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

export default ThanksRecommend;
