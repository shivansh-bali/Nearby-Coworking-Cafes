import React, { useEffect } from "react";
import { createStyles, Title, Text, Container } from "@mantine/core";
import { Col, Form } from "react-bootstrap";
import { comingSoon } from "../../../assets/images";
import cx from "../../../pages/Website/CafeStep/CafeStep.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Checkbox } from "../Forms";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  subscribeToConnect,
} from "../../../redux_toolkit/reducer/profileReducer";
import { Login } from "../Modals";
import { useDispatch, useSelector } from "react-redux";
import Signup from "../Modals/Signup";
const useStyles = createStyles((theme) => ({
  root: {
    fontFamily: `Plus Jakarta Sans`,
    padding: "120px 100px 0",
    display: "flex",
    justifyContent: "center",
  },
  rightContainer: {
    marginLeft: "40px",
    padding: "20px 0",
    [theme.fn.smallerThan("sm")]: {
      margin: "0px",
      padding: "30px",
    },
  },
  label: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1,
    marginBottom: "10px",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },

  title: {
    fontFamily: `Plus Jakarta Sans`,
    fontWeight: 400,
    fontSize: 50,
    marginBottom: "20px",
    [theme.fn.smallerThan("sm")]: {
      fontSize: 36,
    },
  },

  description: {
    fontWeight: 400,
    margin: "auto",
    fontSize: 16,
  },
  error: {
    fontSize: "12px",
    color: "red",
    margin: "0",
    position: "relative",
    top: "-14px",
  },
}));

export function ComingSoon() {
  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  // const handleSignupShow = () => setSignupShow(true);
  const [error, setError] = useState(0);
  const [showThanks, setShowThanks] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    terms: false,
  });
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const { classes } = useStyles();
  const getActive = (name: any, stepName: any, value: any) => {
    setError(0);
    setData((prev: any) => {
      return { ...prev, terms: !data.terms };
    });
  };
  const handleData = (e: any) => {
    setError(0);
    setData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (profileState.subscribeState > 0) {
      setShowThanks(true);
    }
  }, [profileState.subscribeState]);
  return (
    <>
      <Container className={`container ${classes.root}`}>
        <div
          className={`d-flex align-items-center flex-row flex-column-reverse flex-lg-row flex-xs-column-reverse`}
        >
          <Col lg={6} className={`my-5`}>
            <img src={comingSoon} alt="" width="100%" />
          </Col>
          <Col lg={5} className={classes.rightContainer}>
            <div className={classes.label}>coming soon</div>
            <Title className={classes.title}>
              Connect with friends, check out their favorite work spots!
            </Title>
            <Text className={classes.description}>
              Sync isn't just about finding incredible workspaces in your city.
              It's a platform that brings together friends, coworkers, and
              fellow students to share their preferred places to work from.
            </Text>
            <Text className={classes.description} style={{ marginTop: "20px" }}>
              Drop your email below to be one of the first to experience this
              amazing feature as soon as we launch:
            </Text>
            {!showThanks && (
              <Form
                onSubmit={(e: any) => {
                  e.preventDefault();
                    if (data.name.length < 2) {
                      setError(1);
                    } else if (data.email.length < 2) {
                      setError(2);
                    } else if (!data.email.match(regex)) {
                      setError(3);
                    } else if (!data.terms) {
                      setError(4);
                    } else {
                      setError(0);
                      dispatch(subscribeToConnect(data));
                    }
                  } 
                }
              >
                <Form.Group className={`${cx.formBox} mt-4`}>
                  <Form.Label style={{ top: "5px", background: "transparent" }}>
                    Full Name*
                  </Form.Label>
                  <Form.Control
                    style={{ height: "70px", padding: "30px 20px 20px" }}
                    type="type"
                    placeholder="Type your email address"
                    name="name"
                    value={data?.name}
                    onChange={handleData}
                  />
                </Form.Group>
                {error === 1 && (
                  <p className={classes.error}>
                    Please fill the required fields.
                  </p>
                )}
                <Form.Group className={`${cx.formBox}`}>
                  <Form.Label style={{ top: "5px", background: "transparent" }}>
                    Email Address*
                  </Form.Label>
                  <Form.Control
                    style={{ height: "70px", padding: "30px 20px 20px" }}
                    type="type"
                    placeholder="Type your email address"
                    name="email"
                    value={data?.email}
                    onChange={handleData}
                  />
                </Form.Group>
                {error === 2 && (
                  <p className={classes.error}>
                    Please fill the required fields.
                  </p>
                )}
                {error === 3 && (
                  <p className={classes.error}>
                    Please enter a correct email address.
                  </p>
                )}
                <div style={{ padding: "0 10px" }}>
                  <label className={`${st.checkbox}`}>
                    <Checkbox
                      nameCheckbox={"isNotifyByEmail"}
                      step={"step4"}
                      fillFields={getActive}
                      checked={data.terms}
                    />
                    <p style={{ fontSize: "14px" }}>
                      By clicking this checkbox, you agree to our{" "}
                      <NavLink
                        to="/privacy-policy"
                        style={{
                          textDecoration: "underline",
                          color: "black",
                          textUnderlineOffset: "3px",
                        }}
                      >
                        privacy policy{" "}
                      </NavLink>{" "}
                      and{" "}
                      <NavLink
                        to="/terms-conditions"
                        style={{
                          textDecoration: "underline",
                          color: "black",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        terms and conditions.
                      </NavLink>
                    </p>
                  </label>
                </div>
                {error === 4 && (
                  <p className={classes.error}>Please check the box.</p>
                )}
                <button
                  type="submit"
                  className={
                    data?.name?.trim() !== "" &&
                    data?.email?.trim() !== "" &&
                    data?.terms === true
                      ? ` ${cx.submitBtn} ${cx.active}`
                      : ` ${cx.submitBtn}`
                  }
                >
                  Submit
                </button>
              </Form>
            )}
            {showThanks && (
              <p style={{color:"green"}}>You're all set! We'll notify you ASAP.</p>
            )}
          </Col>
        </div>
      </Container>
      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
      <Signup
        showSignup={showSignup}
        handleSignupClose={handleSignupClose}
        handleLoginShow={handleLoginShow}
      />
    </>
  );
}
