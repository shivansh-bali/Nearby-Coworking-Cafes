import React, { useCallback, useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { NavLink } from "react-router-dom";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdArrowBackIosNew, MdClose, MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  blankRegistrationMessage,
  changeRegistrationState,
  registrationMessage,
  userRegistration,
  userSocialRegistration,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { auth, provider } from "../../../services/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { myData } from "../../../redux_toolkit/reducer/profileReducer";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import PinnedMap from "./PinnedMap";
import { saveRecommend } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";
import {
  recommend,
  recommendChangeState,
} from "../../../redux_toolkit/globalReducer/recommendReducer";
import { Logo, signup, signupPeople } from "../../../assets/images";
import Signup2 from "./signup2";

const Signup = (props: any) => {
  let { showSignup, handleSignupClose } = props;
  const dispatch = useDispatch();
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const recommendState = useSelector((state: any) => state.recommendReducer);
  const [show, setShow] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
    setPopupMessage("");
  };
  const [lookshow2, setLookshow2] = useState(false);
  const [checkSignup, setCheckSignup] = useState("")
  const handlelookClose2 = () => {
    setLookshow2(false);
  };
  const handlelookOpen = () => setLookshow(true);
  const handlelookOpen2 = () => {
    setLookshow2(true)
  }
  const [registrationFields, setRegistrationFields] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show1, setShow1] = useState(true);
  const [fieldError, setFieldError] = useState<any>();
  const [registrationError, setRegistrationError] = useState("");
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const removeError = () => {
    setFieldError({});
    setRegistrationError("");
  };
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      dispatch(
        userSocialRegistration({
          email: data?.user?.email,
          name: data?.user?.displayName,
          mobileNumber: data?.user?.phoneNumber,
          isVerified: data?.user?.emailVerified,
          status: true,
        })
      );
      setRegistrationFields((prev:any)=>{
        return {...prev, email: data?.user?.email}
      })
      setCheckSignup("google")
      setUserLoginStatus(true);
    });
  };
  // const responseFacebook = (response: any) => {
  //   if (response?.email?.match(regex)) {
  //     dispatch(
  //       userSocialRegistration({
  //         email: response?.email,
  //         name: response?.name,
  //         isVerified: true,
  //         status: true,
  //       })
  //     );
  //     setUserLoginStatus(true);
  //   }
  // };
  const fillFields = (key: any, value: String) => {
    setRegistrationFields((prev: any) => {
      return { ...prev, [key]: value };
    });
    if (
      (fieldError !== undefined && fieldError[key]) ||
      fieldError?.commonErr
    ) {
      fieldError[key] = "";
      fieldError.commonErr = "";
    }
  };
  const checkFields = useCallback(
    (fields: any) => {
      const fieldErr: any = {};
      Object.keys(fields).forEach((e: any) => {
        if (fields[e].trim() === "") {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
          );
        }
      });
      if (Object.keys(fieldErr).length === 0) {
        if (fields.email.match(regex) && fields.password.length > 7) {
          if (
            registrationFields.password === registrationFields.confirmPassword
          ) {
            dispatch(userRegistration(registrationFields));
          } else {
            fieldErr.commonErr = (
              <p className={`${cm.error}`}>
                {" "}
                Password and Confirm Password is not matched.{" "}
              </p>
            );
          }
          setFieldError(fieldErr);
        } else if (fields.email.match(regex)) {
          fieldErr.password = (
            <p className={`${cm.error}`}> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        } else if (fields.password.length > 7) {
          fieldErr.email = <p className={`${cm.error}`}> Email is Invalid </p>;
          setFieldError(fieldErr);
        } else {
          fieldErr.email = <p className={`${cm.error}`}> Email is Invalid </p>;
          fieldErr.password = (
            <p className={`${cm.error}`}> Password must be 8 characters </p>
          );
          setFieldError(fieldErr);
        }
      } else {
        setFieldError(fieldErr);
      }
    },
    [dispatch, registrationFields]
  );

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
      checkFields(registrationFields);
    }
  }, [enterPressed, checkFields, registrationFields]);
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    if (registrationState.registrationState === 1) {
      if (
        registrationMessage ===
        `Email sent to ${registrationFields.email} successfully`
      ) {
        handleSignupClose();
        removeError();
        handlelookOpen2();
        if (saveRecommend) {
          setPopupMessage(
            `Email sent to ${registrationFields.email} successfully and thanks for recommendation`
          );
          dispatch(recommend(saveRecommend));
        } else {
          setPopupMessage("We just sent you an email! Check your inbox to verify your account.");
        }
      } else {
        setRegistrationError(registrationMessage);
      }
      dispatch(changeRegistrationState());
    }
    if (registrationState.socialState === 1 && userLoginStatus === true && registrationMessage === "") {
      handleSignupClose();
      removeError();
      handlelookOpen2();
      dispatch(myData());
      setUserLoginStatus(false);
    } else {
      setRegistrationError(registrationMessage);
    }
  }, [
    registrationFields,
    dispatch,
    handleSignupClose,
    registrationState.registrationState,
    registrationState.socialState,
    userLoginStatus,
    registrationError
  ]);
  useEffect(() => {
    if (recommendState.recommendState > 0) {
      dispatch(recommendChangeState());
    }
  }, [dispatch, recommendState.recommendState]);
  return (
    <>
      <Modal
        centered
        show={showSignup}
        onHide={() => {
          setRegistrationError("")
          handleSignupClose();
          removeError();
          setShowSign(false)
          dispatch(blankRegistrationMessage())
        }}
        className={`${m.modalCts} ${m.loginPopup} ${m.signupPopupFull}`}
      >
        <Modal.Body>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              setRegistrationError("")
              handleSignupClose();
              removeError();
              setShowSign(false);
              dispatch(blankRegistrationMessage())
            }}
          >
            <MdClose />
          </button>
          <Row>
            <Col md={7}>
              <img src={props.peopleImage==="setPeopleImage" ? signupPeople : signup} className={`${m.imgLeft}`} alt="signup" />
            </Col>
            {showSign ? (
              <Col md={5}>
                <button
                  className={`${m.backArrow}`}
                  onClick={() => setShowSign(false)}
                >
                  <MdArrowBackIosNew />
                </button>
                <img src={Logo} className={`${m.logoright}`} alt="logo" />
                <h5 className={`${m.signupTitle}`}>Sign up to Sync Remote</h5>

                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <label className={`${m.formLabel}`}>Full name*</label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name*"
                      onChange={(e: any) => {
                        fillFields("name", e.target.value);
                        setRegistrationError("");
                        dispatch(blankRegistrationMessage())
                      }}
                    />
                    {fieldError?.name}
                  </div>
                </Col>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <label className={`${m.formLabel}`}>Email Address*</label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address*"
                      onChange={(e: any) => {
                        fillFields("email", e.target.value);
                        setRegistrationError("");
                        dispatch(blankRegistrationMessage());
                      }}
                    />
                    {fieldError?.email}
                    <p className={`${cm.error}`}>{registrationError}</p>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <label className={`${m.formLabel}`}>Create Password</label>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        placeholder="Create Password"
                        type={show ? "password" : "text"}
                        onChange={(e: any) => {
                          fillFields("password", e.target.value);
                          setRegistrationError("");
                          dispatch(blankRegistrationMessage())
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
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className={`${st.formBox}`}>
                    <label className={`${m.formLabel}`}>Confirm password</label>
                    <div className="position-relative">
                      <input
                        className="form-control"
                        placeholder="Confirm password"
                        type={show1 ? "password" : "text"}
                        onChange={(e: any) => {
                          fillFields("confirmPassword", e.target.value);
                          setPasswordError("");
                        }}
                      />
                      {show1 ? (
                        <AiFillEye
                          className={`${st.eyeIcon}`}
                          onClick={() => {
                            setShow1(false);
                          }}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          className={`${st.eyeIcon}`}
                          onClick={() => {
                            setShow1(true);
                          }}
                        />
                      )}
                      {fieldError?.confirmPassword}
                      {fieldError?.commonErr}
                      <p className={`${cm.error}`}>{passwordError}</p>
                    </div>
                  </div>
                </Col>

                <Col lg={12} className="text-center">
                  <button
                    className={
                      registrationFields?.name !== "" &&
                        registrationFields?.email !== "" &&
                        registrationFields?.password !== "" &&
                        registrationFields.confirmPassword !== ""
                        ? `btn ${st.btn2} mt-3 ${st.active2}`
                        : `btn ${st.btn2} mt-3`
                    }
                    onClick={() => {
                      checkFields(registrationFields);
                      setCheckSignup("")
                    }}
                  >
                    Sign up
                  </button>

                  {/* <p className={`${m.linkS}`}>
                Already have an account?{" "}
                <NavLink
                  to="#"
                  onClick={() => {
                    props.handleLoginShow();
                    removeError();
                    handleSignupClose();
                  }}
                >
                  Log in here
                </NavLink>
              </p>
              <hr />
              <div className={`${m.socialBox}`}>
                <p>or sign up using</p>
                <ul className={`${m.socialSignup}`}>
                  <li>
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
                  </li>
                  <li>
                    <NavLink to="#" onClick={handleClick}>
                      <FaGoogle />
                    </NavLink>
                  </li>
                </ul>
              </div> */}
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
                    onClick={() => handleSignupClose()}
                  >
                    Terms and Conditions
                  </NavLink>{" "}
                  and confirm that you have read our{" "}
                  <NavLink
                    to="/privacy-policy"
                    onClick={() => handleSignupClose()}
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
                {props.peopleImage==="setPeopleImage" ? "Connect with friends and other remote professionals!" : "Sign up to Sync Remote"}
                </h5>
                <p className={`${m.signupText} mb-2`}>
                {props.peopleImage==="setPeopleImage" ? "See where your friends like to work from and network with others in our community based on mutual interests." : "Sign up and create your map of places you like to work from."}
                </p>

                <div className={`${m.socialBox}`}>
                  <ul className={`${m.socialSignup}`}>
                    <li>
                      <NavLink to="#" onClick={() => {
                        handleClick()
                        setRegistrationError("")
                        dispatch(blankRegistrationMessage())
                      }}>
                        <FaGoogle /> Continue with Google
                      </NavLink>
                    </li>
                    <p className={`${cm.error}`}>{registrationError}</p>
                    <li>
                      <NavLink to="#" onClick={() => {
                        setRegistrationError("")
                        dispatch(blankRegistrationMessage())
                        setShowSign(true)
                      }}>
                        <MdEmail /> Continue with email
                      </NavLink>
                    </li>
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
                      /> Continue with facebook
                    </NavLink>
                  </li> */}
                  </ul>
                </div>


                <p className={`${m.linkS}`}>
                  Already have an account?{" "}
                  <NavLink
                    to="#"
                    onClick={() => {
                      props.handleLoginShow();
                      removeError();
                      handleSignupClose();
                      setRegistrationError("")
                      dispatch(blankRegistrationMessage())
                    }}
                    style={{ color: "#738801" }}
                  >
                    Log in here
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
                    onClick={() => {
                      setRegistrationError("")
                      dispatch(blankRegistrationMessage())
                      handleSignupClose()
                    }}
                  >
                    Terms and Conditions
                  </NavLink>{" "}
                  and confirm that you have read our{" "}
                  <NavLink
                    to="/privacy-policy"
                    onClick={() => {
                      setRegistrationError("")
                      dispatch(blankRegistrationMessage())
                      handleSignupClose()
                    }}
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
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={popupMessage}
        handlelookOpen={handlelookOpen}
      />
      <Signup2
        lookshow2={lookshow2}
        handlelookClose2={handlelookClose2}
        popupMessage={popupMessage}
        email={registrationFields.email}
        checkSignup={checkSignup}
      />
    </>
  );
};

export default Signup;
