import React from "react";
import m from "./Modal.module.scss";

import { Modal, Row, Col } from "react-bootstrap";

import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { singleUser } from "../../../redux_toolkit/reducer/connectionReducer";

const UserContactDetails = (props: any) => {
  let { contactshow, handlecontactClose } = props;

  return (
    <>
      <Modal
        centered
        scrollable
        show={contactshow}
        onHide={handlecontactClose}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>{singleUser?.name}</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlecontactClose}
            style={{ right: "9px", top: "15px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.contact_detail}`}>
                    <h5>Contact Info</h5>
                    {/* <NavLink
                      to="#"
                      onClick={() => {
                        handleeditShow();
                        handlecontactClose();
                      }}
                    >
                      <img src={EditProfileIcon} alt="profileIcon" />
                    </NavLink> */}
                  </div>
                  <div className={`${m.contact_user_detail}`}>
                    <p>Email Address</p>
                    <NavLink to="#" style={{ textDecoration: "underline" }}>
                      {singleUser?.email}
                    </NavLink>
                    <p className="mt-2">Contact number</p>
                    <NavLink to="#" style={{ textDecoration: "underline" }}>
                      {singleUser?.mobileNumber}
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

export default UserContactDetails;
