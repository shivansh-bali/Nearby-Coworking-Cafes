import React, { useCallback, useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdArrowBackIosNew, MdClose, MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import {
  changeForgotPasswordState,
  changeLoginState,
  forgotPasswordMessage,
  getFcmToken,
  loginMessage,
  userForgotPassword,
  userLogin,
  userSocialLogin,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { myData, profile } from "../../../redux_toolkit/reducer/profileReducer";
import { auth, provider } from "../../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Logo, signup, signupPeople } from "../../../assets/images";
import { getToken } from "firebase/messaging";
import { messaging } from "../../../services/firebaseConfig"

const Login = (props: any) => {
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state: any) => state.registrationReducer);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const handleSignupShow = () => setSignupShow(true);
  let { showLogin, handleLoginClose, handleLoginShow } = props;
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [userSocialStatus, setUserSocialStatus] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [show, setShow] = useState(true);
  const [fcmToken, setFcmToken] = useState("");

  const [showSign, setShowSign] = useState(false);
  const [loginFields, setLoginFields] = useState<any>({
    email: "",
    password: "",
    fcmToken: fcmToken
  });
  const [fieldError, setFieldError] = useState<any>();
  const [loginError, setLoginError] = useState("");
  const removeError = () => {
    setFieldError({});
    setLoginError("");
  };
  // const responseFacebook = (response: any) => {
  //   if (response?.email?.match(regex)) {
  //     dispatch(
  //       userSocialLogin({
  //         email: response?.email,
  //         name: response?.name,
  //         isVerified: true,
  //         status: true,
  //       })
  //     );
  //     setUserSocialStatus(true);
  //   }
  // };

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      dispatch(
        userSocialLogin({
          email: data?.user?.email,
          name: data?.user?.displayName,
          mobileNumber: data?.user?.phoneNumber,
          isVerified: data?.user?.emailVerified,
          fcmToken: fcmToken,
          status: true,
        })
      );
      setUserSocialStatus(true);
    });
  };
  const fillFields = (key: any, value: String) => {
    setLoginFields((prev: any) => {
      return { ...prev, [key]: value };
    });
    if (fieldError !== undefined && fieldError[key]) {
      fieldError[key] = "";
    }
  };


  useEffect(() => {
    getToken(messaging, { vapidKey: "BBNPj4M-9_7AZaMySMEGDwu4N3Ti_yBlDTbH0rs0MB08bjE6ol7tsapqhL-7adLBEjvthcIW1pvnqV-R6neN2oc" })
  .then((currentToken) => {
    console.log(currentToken, "currentToken")
    setFcmToken(currentToken)
    dispatch(getFcmToken(currentToken))
    setLoginFields((prev:any)=>{
      return {...prev, fcmToken: currentToken}
    })
  })
  .catch((err) => {
    // Handle error
    console.log(err, "dasdasdasd")
  });
  }, [dispatch]);

  const checkFields = useCallback(
    (fields: any) => {
      const fieldErr: any = {};
      Object.keys(fields).forEach((e: any) => {
        if (fields[e].trim() === "" && e !== "fcmToken") {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.email.match(regex)) {
          dispatch(userLogin(loginFields));
          setUserLoginStatus(true);
        } else {
          fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
          setFieldError(fieldErr);
        }
      } else {
        setFieldError(fieldErr);
      }
    },
    [dispatch, loginFields]
  );
  const checkEmail = () => {
    const fieldErr: any = {};
    if (loginFields.email === "") {
      fieldErr.email = (
        <p className={`${cm.error}`}> This field is required </p>
      );
      setFieldError(fieldErr);
    } else if (!loginFields.email.match(regex)) {
      fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
      setFieldError(fieldErr);
    } else {
      dispatch(userForgotPassword({ email: loginFields.email }));
    }
  };

  useEffect(() => {
    if (loginState.loginState === 1) {
      if (loginMessage.success === true) {
        if (profile.data.role === "user") {
          dispatch(changeLoginState());
        } else if (
          profile.data.role === "cafe" ||
          profile.data.role === "cafeClaim"
        ) {
          if (profile?.data?.isSubmitted === true) {
            navigate("/cafepanel");
          } else {
            navigate("/cafe-step");
          }
          dispatch(changeLoginState());
        } else {
          navigate("/admin");
        }
      } else {
        if (loginMessage.message !== "User already verified") {
          setLoginError(loginMessage.message);
        }
        dispatch(changeLoginState());
      }
    }
    if (loginState.forgotPasswordState === 1) {
      setLoginError(forgotPasswordMessage.message);
      dispatch(changeForgotPasswordState());
    }
  }, [
    dispatch,
    navigate,
    showLogin,
    handleLoginShow,
    handleLoginClose,
    loginState.loginState,
    loginState.forgotPasswordState,
  ]);

  const useKeyPress = (targetKey: any) => {
    const [keyPressed, setKeyPressed] = React.useState(false);

    React.useEffect(() => {
      const downHandler = (e: any) => {
        if (e.key === targetKey) setKeyPressed(true);
      };

      const upHandler = ({ key }: any) => {
        if (key === targetKey) setKeyPressed(false);
      };
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    }, [targetKey]);
    return keyPressed;
  };
  const enterPressed = useKeyPress("Enter");

  useEffect(() => {
    if (enterPressed === true) {
      checkFields(loginFields);
    }
  }, [enterPressed, checkFields, loginFields]);

  useEffect(() => {
    if (
      loginState.loginState === 1 &&
      loginMessage.success === true &&
      userLoginStatus === true
    ) {
      dispatch(myData());
      handleLoginClose();
      removeError();
      setUserLoginStatus(false);
    }
    if (loginState.socialState === 1 && userSocialStatus === true) {
      setLoginError(loginMessage.message);
      dispatch(myData());
      setUserSocialStatus(false);
      if (loginMessage.success === true) {
        removeError();
        handleLoginClose();
      }
    }
  }, [
    dispatch,
    handleLoginClose,
    userLoginStatus,
    userSocialStatus,
    loginState.loginState,
    loginState.socialState,
  ]);

  return (
    <>
      <Modal
        centered
        scrollable
        show={showLogin}
        onHide={() => {
          handleLoginClose();
          removeError();
          setShowSign(false);
          setForgotPassword(false)
        }}
        className={`${m.modalCts} ${m.loginPopup} ${m.signupPopupFull}`}
      >
        <Modal.Body>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleLoginClose();
              removeError();
              setShowSign(false);
              setForgotPassword(false)
            }}
          >
            <MdClose />
          </button>
          <Row>
            <Col md={7}>
              <img src={props.peopleImage==="setPeopleImage" ? signupPeople : signup} className={`${m.imgLeft}`} alt="signup" />
            </Col>

            {showSign ? forgotPassword ? <Col md={5}>
                <button
                  className={`${m.backArrow}`}
                  onClick={() => {
                    setFieldError({});
                    setLoginError("");
                    setForgotPassword(false)
                  }}
                >
                  <MdArrowBackIosNew />
                </button>
                <img src={Logo} className={`${m.logoright}`} alt="logo" />
                <h5 className={`${m.signupTitle}`}>Forgot Your Password</h5>
                <p className={`${m.signupText} mb-2`}>No problem, just enter your email address below and we’ll send you a link to reset it.</p>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      value={loginFields.email}
                      onChange={(e: any) => {
                        fillFields("email", e.target.value);
                        setLoginError("");
                      }}
                    />
                    {fieldError?.email}
                <p className={`${cm.error}`}>{loginError}</p>
                  </div>
                </Col>
                <Col lg={12} className="text-center">
                  <button
                    className={
                      loginFields?.email !== "" && loginFields.password !== ""
                        ? `btn ${st.btn2} mt-3 ${st.active2}`
                        : `btn ${st.btn2} mt-3`
                    }
                    onClick={checkEmail}
                  >
                    Send link
                  </button>
                </Col>
                <p
                  className="text-center mb-0 mt-4"
                  style={{ fontSize: "12px", color: "grey", fontWeight: 500 }}
                >
                  By proceeding, you agree to our{" "}
                  <NavLink
                    to="/terms-conditions"
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                    onClick={() => handleLoginClose()}
                  >
                    Terms and Conditions
                  </NavLink>{" "}
                  and confirm that you have read our{" "}
                  <NavLink
                    to="/privacy-policy"
                    onClick={() => handleLoginClose()}
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                  >
                    Privacy and Cookie Statement
                  </NavLink>
                  .
                </p>
              </Col> : (
              <Col md={5}>
                <button
                  className={`${m.backArrow}`}
                  onClick={() => setShowSign(false)}
                >
                  <MdArrowBackIosNew />
                </button>
                <img src={Logo} className={`${m.logoright}`} alt="logo" />
                <h5 className={`${m.signupTitle}`}>Sign in to Sync Remote</h5>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <Form.Control
                      type="email"
                      placeholder="Your email"
                      onChange={(e: any) => {
                        fillFields("email", e.target.value);
                        setLoginError("");
                      }}
                    />
                    {fieldError?.email}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        placeholder="Your password"
                        type={show ? "password" : "text"}
                        onChange={(e: any) => {
                          fillFields("password", e.target.value);
                          setLoginError("");
                        }}
                      />
                      {show ? (
                        <AiFillEye
                          className={`${st.eyeIcon}`}
                          onClick={() => {
                            setShow(false);
                          }}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          className={`${st.eyeIcon}`}
                          onClick={() => {
                            setShow(true);
                          }}
                        />
                      )}
                      {fieldError?.password}
                      <p className={`${cm.error}`}>{loginError}</p>
                    </div>
                    <p className={`${m.forgotPassword}`}>
                      <NavLink to="#" onClick={()=> {
                        setLoginError("");
                        setFieldError({});
                        setForgotPassword(true)
                        }}>
                        Forgot Password ?
                      </NavLink>
                    </p>
                  </div>
                </Col>
                <Col lg={12} className="text-center">
                  <button
                    className={
                      loginFields?.email !== "" && loginFields.password !== ""
                        ? `btn ${st.btn2} mt-3 ${st.active2}`
                        : `btn ${st.btn2} mt-3`
                    }
                    onClick={() => {
                      checkFields(loginFields);
                    }}
                  >
                    Log in
                  </button>
                </Col>
                <p
                  className="text-center mb-0 mt-4"
                  style={{ fontSize: "12px", color: "grey", fontWeight: 500 }}
                >
                  By proceeding, you agree to our{" "}
                  <NavLink
                    to="/terms-conditions"
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                    onClick={() => handleLoginClose()}
                  >
                    Terms and Conditions
                  </NavLink>{" "}
                  and confirm that you have read our{" "}
                  <NavLink
                    to="/privacy-policy"
                    onClick={() => handleLoginClose()}
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                  >
                    Privacy and Cookie Statement
                  </NavLink>
                  .
                </p>
              </Col>
            ) : (
              <Col md={5}>
                <img src={Logo} className={`${m.logoright}`} alt="logo" />
                <h5 className={`${m.signupTitle} mb-2`}>
                {props.peopleImage==="setPeopleImage" ? "Connect with friends and other remote professionals!" :  "Get the most out of Sync!"}
                </h5>
                <p className={`${m.signupText} mb-2`}>
                {props.peopleImage==="setPeopleImage" ? "See where your friends like to work from and network with others in our community based on mutual interests." : "Sign up and create your map of places you like to work from."}
                </p>

                <div className={`${m.socialBox}`}>
                  <ul className={`${m.socialSignup}`}>
                    {/* <li>
                      <NavLink to="#">
                        <FacebookLogin
                          appId="706916154574373"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={responseFacebook}
                          render={(renderProps) => (
                            <FaFacebookF onClick={renderProps.onClick} />
                          )}
                        />
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to="#" onClick={handleClick}>
                        <FaGoogle /> Continue with Google
                      </NavLink>
                    </li>
                    <p className={`${cm.error}`}>{loginError}</p>
                    <li>
                      <NavLink to="#" onClick={() => setShowSign(true)}>
                        <MdEmail /> Continue with email
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <p className={`${m.linkS}`}>
                  Don't have an account?{" "}
                  <NavLink
                    to="#"
                    onClick={() => {
                      handleSignupShow();
                      handleLoginClose();
                      removeError();
                    }}
                    style={{ color: "#738801" }}
                  >
                    Sign up
                  </NavLink>
                </p>
                <p
                  className="text-center mb-0 mt-4"
                  style={{ fontSize: "12px", color: "grey", fontWeight: 500 }}
                >
                  By proceeding, you agree to our{" "}
                  <NavLink
                    to="/terms-conditions"
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                    onClick={() => handleLoginClose()}
                  >
                    Terms and Conditions
                  </NavLink>{" "}
                  and confirm that you have read our{" "}
                  <NavLink
                    to="/privacy-policy"
                    onClick={() => handleLoginClose()}
                    style={{
                      textDecoration: "underline",
                      color: "inherit",
                      textUnderlineOffset: "1px",
                    }}
                  >
                    Privacy and Cookie Statement
                  </NavLink>
                  .
                </p>
              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>

      <Signup
        showSignup={showSignup}
        handleSignupClose={handleSignupClose}
        handleLoginShow={props.handleLoginShow}
        peopleImage={props.peopleImage}
      />
    </>
  );
};

export default Login;
