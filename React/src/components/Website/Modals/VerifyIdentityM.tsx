import React, { useState } from "react";
import m from "./Modal.module.scss";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdClose, MdOutlinePermPhoneMsg } from "react-icons/md";
import { coffeeShop1 } from "../../../assets/images";
import { ClaimYourListing } from ".";

const VerifyIdentityM = (props: any) => {
  let { Veiifyshow, handleVeiifyClose } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const verifyModuleF = () => {
    handleShow();
    handleVeiifyClose();
  };

  return (
    <>
      <Modal
        centered
        scrollable
        show={Veiifyshow}
        onHide={handleVeiifyClose}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-0">
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleVeiifyClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 15px" }}>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.ClaimYourListing}`}>
                    <img src={coffeeShop1} alt="coffeeShop" />
                    <div>
                      <h5>James Brews & Coffee</h5>
                      <p>Boston, United States</p>
                    </div>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className={`${m.verifyIdenty}`}>
                    <h5>Verify your identity</h5>
                    <p>
                      Identity verification ensures the highest levels of
                      security and helps us to prevent fraud. Please choose one
                      of the options below to confirm your identity.
                    </p>
                    <div className={`${m.listingFormBox}`}>
                      <Form.Group className="mb-3 position-relative ">
                        <input
                          type="number"
                          placeholder="Type your phone/mobile number"
                          className="border-0"
                          style={{ paddingLeft: "40px" }}
                          onClick={verifyModuleF}
                        />
                        <MdOutlinePermPhoneMsg className={`${m.callIcon}`} />
                      </Form.Group>
                    </div>
                    <p style={{ fontSize: "10px", lineHeight: "14px" }}>
                      For verification using the phone/mobile number, please
                      expect a phone call with one of our representatives.
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ClaimYourListing show={show} handleClose={handleClose} />
    </>
  );
};

export default VerifyIdentityM;
