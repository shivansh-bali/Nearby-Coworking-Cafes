import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changeResetPasswordState,
  resetPasswordMessage,
  userResetPassword,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { useNavigate, useParams } from "react-router-dom";
import Login from "./Login";

const ForgotPassword = (props: any) => {
  let { showPopup, handlePopupClose } = props;
  const navigate = useNavigate()
  const passwordState = useSelector((state: any) => state.registrationReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [fieldError, setFieldError] = useState<any>();
  const [passwordError, setPasswordError] = useState("");
  const fillFields = (key: any, value: String) => {
    setPassword((prev: any) => {
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
  const checkPassword = (fields: any) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (fields[e] === "") {
        fieldErr[e] = <p className={`${cm.error}`}> This field is required </p>;
      }
      if (password?.password?.length < 8) {
        fieldErr.password = (
          <p className={`${cm.error}`}> Password must be 8 characters </p>
        );
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (password.password === password.confirmPassword) {
        dispatch(
          userResetPassword({ token: param?.token, password: password })
        );
      } else {
        fieldErr.commonErr = (
          <p className={`${cm.error}`}>
            {" "}
            Password and Confirm Password is not matched.{" "}
          </p>
        );
      }
      setFieldError(fieldErr);
    } else {
      setFieldError(fieldErr);
    }
  };

  useEffect(() => {
    if (
      passwordState.resetPasswordState === 1 &&
      resetPasswordMessage.success === true
    ) {
      handlePopupClose();
      navigate("/")
      handleLoginShow();
      dispatch(changeResetPasswordState());
    } else {
      setPasswordError(resetPasswordMessage.message);
      dispatch(changeResetPasswordState());
    }
  }, [navigate, dispatch, handlePopupClose, passwordState.resetPasswordState]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={showPopup}
        onHide={handlePopupClose}
        className={`${m.modalCts} ${m.modalSmall} ${m.loginPopup}`}
      >
        <Modal.Header>
          <Modal.Title>Forgot Password</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlePopupClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <div className="position-relative">
                  <input
                    className="form-control"
                    placeholder="Your password"
                    type={show1 ? "password" : "text"}
                    onChange={(e: any) => {
                      setPasswordError("");
                      fillFields("password", e.target.value);
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
                  {fieldError?.password}
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <div className="position-relative">
                  <input
                    className="form-control"
                    placeholder="Confirm password"
                    type={show ? "password" : "text"}
                    onChange={(e: any) => {
                      fillFields("confirmPassword", e.target.value);
                      setPasswordError("");
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
                  {fieldError?.confirmPassword}
                </div>
              </div>
            </Col>
            {fieldError?.commonErr}
            <p className={`${cm.error}`}>{passwordError}</p>
            <Col lg={12}>
              <button
                className={password.password!=="" && password.confirmPassword!=="" ? `btn ${st.btn2} ${st.active2} mt-3` : `btn ${st.btn2} mt-3`}
                style={{ width: "100%" }}
                onClick={() => checkPassword(password)}
              >
                Submit
              </button>
              <hr />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
    </>
  );
};

export default ForgotPassword;
