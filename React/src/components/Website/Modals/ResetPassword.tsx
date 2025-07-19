import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassState,
  changePassword,
  resetPassword,
} from "../../../redux_toolkit/reducer/cafeReducer";

export default function ResetPassword(props: any) {
  let { showPopup, handlePopupClose } = props;
  const passwordState = useSelector((state: any) => state.cafeReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [activeButton, setActiveButton] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (
      password?.oldPassword !== "" &&
      password?.newPassword !== "" &&
      password?.confirmPassword !== ""
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [password]);
  const [fieldError, setFieldError] = useState<any>();
  const [passwordError, setPasswordError] = useState("");
  const removeError = () => {
    setFieldError({});
    setPasswordError("");
  };
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
      if (fields[e] !== "" && password?.newPassword?.length < 8) {
        fieldErr.newPassword = (
          <p className={`${cm.error}`}> Password must be 8 characters </p>
        );
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (password.newPassword === password.confirmPassword) {
        dispatch(
          changePassword({
            oldPassword: password?.oldPassword,
            newPassword: password?.newPassword,
          })
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
      passwordState.changePasswordState === 1 &&
      resetPassword.success === true
    ) {
      handlePopupClose();
      removeError();
      dispatch(changePassState());
    } else {
      setPasswordError(resetPassword.message);
      dispatch(changePassState());
    }
  }, [dispatch, handlePopupClose, passwordState.changePasswordState]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={showPopup}
        onHide={() => {
          handlePopupClose();
          removeError();
        }}
        className={`${m.modalCts} ${m.modalSmall} ${m.loginPopup}`}
      >
        <Modal.Header>
          <Modal.Title>Reset Password</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handlePopupClose();
              removeError();
            }}
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
                    type={show2 ? "password" : "text"}
                    onChange={(e: any) => {
                      setPasswordError("");
                      fillFields("oldPassword", e.target.value);
                    }}
                  />
                  {show2 ? (
                    <AiFillEye
                      className={`${st.eyeIcon}`}
                      onClick={() => {
                        setShow2(false);
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className={`${st.eyeIcon}`}
                      onClick={() => {
                        setShow2(true);
                      }}
                    />
                  )}
                  {fieldError?.oldPassword}
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <div className="position-relative">
                  <input
                    className="form-control"
                    placeholder="New password"
                    type={show1 ? "password" : "text"}
                    onChange={(e: any) => {
                      setPasswordError("");
                      fillFields("newPassword", e.target.value);
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
                  {fieldError?.newPassword}
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
                className={
                  activeButton === true
                    ? `btn ${st.btn2} ${st.active2} mt-3`
                    : `btn ${st.btn2} mt-3`
                }
                style={{ width: "100%" }}
                onClick={() => checkPassword(password)}
              >
                Submit
              </button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
