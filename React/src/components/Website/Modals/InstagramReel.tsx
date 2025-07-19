import React from "react";
import cx from "./Modal.module.scss";

import { Modal, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { InstaStory, userProfile } from "../../../assets/images";
import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const InstagramReel = (props: any) => {

  return (
    <>
      <Modal
        centered
        show={props.show}
        onHide={props.handleClose}
        className={`${cx.modalCts} ${cx.instagramReelsmodel} `}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" ,borderBottom:"none" }}>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={props.handleClose}
            style={{ right: "9px", top: "4px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={cx.instagramReels}>
            <Col className={cx.header}>
              <div className={cx.heading}>
                <h4>James Coffee & Brews</h4>
                <h3>What’s happening</h3>
              </div>
            </Col>
            <div className={cx.storyContainer}>
              <img className={cx.backgroundImg} src={InstaStory} alt="" />
              <NavLink to="#" className={cx.instaUserProfile}>
                <img src={userProfile} alt="userProfile"/>
                itsmenadine
              </NavLink>
              <NavLink to="#" className={cx.openInsta}><FaInstagram /> Open on Instagram</NavLink>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InstagramReel;
