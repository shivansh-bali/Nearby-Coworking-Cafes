import React, { useEffect, useState } from "react";
import cx from "./ContactUs.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Container, Form, Col, Row } from "react-bootstrap";
import { ContactHeader } from "../../../assets/images";

import { ThankYou } from "../../../components/Website/Modals";
import {
  changeContactState,
  contactFunc,
} from "../../../redux_toolkit/globalReducer/contactUsReducer";
import { useDispatch, useSelector } from "react-redux";

const ContactUs = (props: any) => {
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const dispatch = useDispatch();
  const contactState = useSelector((state: any) => state.contactUsReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [fieldError, setFieldError] = useState<any>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fillFields = (key: any, value: any) => {
    setContactData((prev: any) => {
      return { ...prev, [key]: value };
    });
    if (fieldError?.[key]) {
      fieldError[key] = "";
    }
  };
  const checkFields = (fields: any) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (fields[e].trim() === "" && e !== "lastName") {
        fieldErr[e] = <p className={`${cm.error}`}> This field is required </p>;
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (contactData.email.match(regex)) {
        dispatch(contactFunc(fields));
      } else {
        fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
        setFieldError(fieldErr);
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  useEffect(() => {
    if (contactState.contactState > 0) {
      handleShow();
      dispatch(changeContactState());
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    }
  }, [dispatch, contactState.contactState]);
  return (
    <>
      <div className={`${cx.spaceBox}`}>
        <section className={`${cx.bannerSection}`}>
          <img src={ContactHeader} alt="contactHeader" />
          <Container>
            <Row>
              <Col md={8} className={`m-auto ${cx.contentBox}`}>
                <div className={`${cx.contentHeading}`}>
                  <h1>Contact Us</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <section className={`${cx.contactForm}`}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={`${cx.contactMessage}`}>
                <h3>
                  Got any questions? Just wanna say hey? We’d love to hear from
                  you!
                </h3>
                <p>
                  We’re not creating this platform for you. We’re creating it
                  with you. Please reach out with any feedback, comments, or
                  questions you have so that we can build the best community of
                  laptop-friendly places – together.
                </p>
                <p>Let’s Sync!</p>
              </div>
            </Col>

            <Col md={6}>
              <div className={`${cx.formContact}`}>
                <p>* Answer required</p>
                <div className={`${cx.formBox}`}>
                  <Form>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>First Name*</Form.Label>
                      <Form.Control
                        type="type"
                        placeholder="Your Name"
                        value={contactData.firstName}
                        onChange={(e: any) =>
                          fillFields("firstName", e.target.value)
                        }
                      />
                      {fieldError?.firstName}
                    </Form.Group>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="type"
                        placeholder="Your Last Name"
                        value={contactData.lastName}
                        onChange={(e: any) =>
                          fillFields("lastName", e.target.value)
                        }
                      />
                      {fieldError?.lastName}
                    </Form.Group>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Your Email"
                        value={contactData.email}
                        onChange={(e: any) =>
                          fillFields("email", e.target.value)
                        }
                      />
                      {fieldError?.email}
                    </Form.Group>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Control
                        as="textarea"
                        placeholder="Type your message here*"
                        value={contactData.message}
                        rows={3}
                        onChange={(e: any) =>
                          fillFields("message", e.target.value)
                        }
                      />
                      {fieldError?.message}
                    </Form.Group>
                  </Form>
                  <div className={` ${cx.btnSubmit}`}>
                    <button
                      className={contactData?.firstName?.trim() !== "" && 
                      contactData?.email?.trim() !== "" && contactData?.message?.trim() !== ""
                      ? `btn ${st.btn2} ${st.active2}` : `btn ${st.btn2}`}
                      onClick={() => checkFields(contactData)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ThankYou show={show} handleClose={handleClose} />
    </>
  );
};

export default ContactUs;
