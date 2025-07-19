import React, { useState } from "react";
import cx from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { FaCheck, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FiLink } from "react-icons/fi";

import { NavLink } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { RiWhatsappFill } from "react-icons/ri";

const ShareLocationM = (props: any) => {
  const [showCopied, setShowCopied] = useState(false)
  return (
    <>
      <Modal
        centered
        scrollable
        show={props.locationshow}
        onHide={props.handlelocationClose}
        className={`${cx.modalCts} ${cx.modalMin}`}
      >
        <Modal.Header
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Modal.Title>{props.title}</Modal.Title>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={props.handlelocationClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${cx.share_Location} `}>
                <ul>
                  <li>
                    <FacebookShareButton url={props.locationUrl}>
                      <span className={`${cx.shareIcon} `}>
                        <FaFacebookF />
                      </span>
                      Share to Facebook
                    </FacebookShareButton>
                  </li>
                  <li>
                    <WhatsappShareButton url={props.locationUrl}>
                      <span className={`${cx.shareIcon} `}>
                        <RiWhatsappFill />
                      </span>
                      Share to WhatsApp
                    </WhatsappShareButton>
                  </li>
                  <li>
                    <TwitterShareButton url={props.locationUrl}>
                      <span className={`${cx.shareIcon} `}>
                        <AiOutlineTwitter />
                      </span>
                      Share to Twitter
                    </TwitterShareButton>
                  </li>
                  <li>
                    <LinkedinShareButton url={props.locationUrl}>
                      <span className={`${cx.shareIcon} `}>
                        <FaLinkedinIn />
                      </span>
                      Share to LinkedIn
                    </LinkedinShareButton>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      title="Copy"
                      onClick={() => {
                        navigator.clipboard.writeText(props.locationUrl);
                        setShowCopied(true)
                        setTimeout(()=>{
                          setShowCopied(false)
                        },2000)
                      }}
                    >
                      <span className={`${cx.shareIcon} `}>
                        <FiLink></FiLink>
                      </span>
                      Copy Link
                    </NavLink>
                  </li>
                  {showCopied && <li>
                    <NavLink
                      to="#"
                    >
                      <span className={`${cx.shareIcon} ${cx.active}`}>
                        <FaCheck></FaCheck>
                      </span>
                      Link Copied
                    </NavLink>
                  </li>}
                  {/* <li>
                    <NavLink to="#">
                      <span className={`${cx.shareIcon} `}>
                        <RiWhatsappFill />
                      </span>
                      Share to Whatsapp
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <span className={`${cx.shareIcon} `}>
                        <FaTelegramPlane />
                      </span>
                      Share to Telegram
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <span className={`${cx.shareIcon} `}>
                        <FaRedditAlien />
                      </span>
                      Share to Reddit
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareLocationM;
