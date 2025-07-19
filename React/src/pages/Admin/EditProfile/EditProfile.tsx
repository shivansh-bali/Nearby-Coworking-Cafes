import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./EditProfile.module.scss";
import { Card, Row, Col, Form, Tab, Tabs } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { myData, profile } from "../../../redux_toolkit/reducer/profileReducer";
import {
  adminPasswordMessage,
  adminUpdate,
  adminUpdatePassword,
  changeAdminPasswordState,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch, useSelector } from "react-redux";

export default function EditProfile() {
  const dispatch = useDispatch();
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const [profileData, setProfileData] = useState({
    name: profile?.data?.name,
    email: profile?.data?.email,
    mobileNumber: profile?.data?.mobileNumber,
  });

  const [passwordReset, setPasswordReset] = useState<any>({
    oldPassword: { error: "", value: "", status: true },
    newPassword: { error: "", value: "", status: true },
    confirmPassword: { error: "", value: "", status: true },
  });
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (registrationState.adminUpdateState > 0) {
      setSuccessMessage(true);

      dispatch(myData());
      // dispatch(changeAdminState());
    }
    if (registrationState.adminPasswordState > 0) {
      if (adminPasswordMessage.success === true) {
        dispatch(changeAdminPasswordState());
        setSuccessMessage(true);
        setPasswordReset({
          oldPassword: { error: "", value: "", status: true },
          newPassword: { error: "", value: "", status: true },
          confirmPassword: { error: "", value: "", status: true },
        });
      } else if (
        adminPasswordMessage.success === false &&
        adminPasswordMessage.message === "Old password is incorrect"
      ) {
        setPasswordReset((prev: any) => {
          return {
            ...prev,
            oldPassword: {
              ...prev.oldPassword,
              error: adminPasswordMessage.message,
            },
          };
        });
      } else {
        dispatch(changeAdminPasswordState());
      }
    }
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  }, [
    dispatch,
    registrationState.adminUpdateState,
    registrationState.adminPasswordState,
  ]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Profile</h5>
            </div>
            <div className={`${st.rowTitleRight}`}></div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body className={`${cx.editProfile}`}>
              <Tabs
                defaultActiveKey="profile"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="profile" title="Profile">
                  <div className={`${cx.contentBox}`}>
                    <Row>
                      <Col lg={7}>
                        <div className={`${st.formBox}`}>
                          <label>Name</label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={profileData?.name}
                            onChange={(e: any) =>
                              setProfileData((prev: any) => {
                                return { ...prev, name: e.target.value };
                              })
                            }
                          />
                        </div>
                      </Col>
                      <Col lg={7}>
                        <div className={`${st.formBox}`}>
                          <label>Email</label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={profileData?.email}
                            disabled
                          />
                        </div>
                      </Col>
                      {/* <Col lg={7}>
                        <div className={`${st.formBox}`}>
                          <label>Phone Number</label>
                          <Form.Control
                            type="number"
                            className={`${st.removeArrow}`}
                            value={profileData?.mobileNumber}
                            placeholder=""
                            onChange={(e: any) =>
                              setProfileData((prev: any) => {
                                return {
                                  ...prev,
                                  mobileNumber: e.target.value,
                                };
                              })
                            }
                          />
                        </div>
                      </Col> */}
                      <Col lg={12}>
                        <div className={`${st.formBox}`}>
                          <button
                            className={`btn ${st.submitBtn}`}
                            onClick={() => {
                              dispatch(
                                adminUpdate({
                                  id: profile?.data?._id,
                                  body: profileData,
                                })
                              );
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="changepassword" title="Change Password">
                  <div className={`${cx.contentBox}`}>
                    <Row>
                      <Col lg={7}>
                        <p style={{ fontSize: "12px", color: "green" }}>
                          {successMessage &&
                            "Successfully changed your password!"}
                        </p>
                        <div className={`${st.formBox}`}>
                          <label>Old Password</label>
                          <div className="position-relative">
                            <input
                              id="inputField"
                              className="form-control"
                              type={
                                passwordReset?.oldPassword?.status
                                  ? "password"
                                  : "text"
                              }
                              value={passwordReset?.oldPassword?.value}
                              onChange={(e: any) => {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    oldPassword: {
                                      ...prev.oldPassword,
                                      value: e.target.value,
                                      error: "",
                                    },
                                  };
                                });
                              }}
                            />
                            {passwordReset?.oldPassword?.value ? (
                              <AiFillEye
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      oldPassword: {
                                        ...prev.oldPassword,
                                        status: false,
                                      },
                                    };
                                  });
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      oldPassword: {
                                        ...prev.oldPassword,
                                        status: true,
                                      },
                                    };
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "red" }}>
                          {passwordReset?.oldPassword?.error}
                        </p>
                      </Col>
                      <Col lg={7}>
                        <div className={`${st.formBox}`}>
                          <label>Password</label>
                          <div className="position-relative">
                            <input
                              id="inputField1"
                              className="form-control"
                              type={
                                passwordReset?.newPassword?.status
                                  ? "password"
                                  : "text"
                              }
                              value={passwordReset?.newPassword?.value}
                              onChange={(e: any) => {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    newPassword: {
                                      ...prev.newPassword,
                                      value: e.target.value,
                                      error: "",
                                    },
                                    confirmPassword: {
                                      ...prev.confirmPassword,
                                      error: "",
                                    },
                                  };
                                });
                              }}
                            />
                            {passwordReset?.newPassword?.status ? (
                              <AiFillEye
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      newPassword: {
                                        ...prev.newPassword,
                                        status: false,
                                      },
                                    };
                                  });
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      newPassword: {
                                        ...prev.newPassword,
                                        status: true,
                                      },
                                    };
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "red" }}>
                          {passwordReset?.newPassword?.error}
                        </p>
                      </Col>

                      <Col lg={7}>
                        <div className={`${st.formBox}`}>
                          <label>Confirm Password</label>
                          <div className="position-relative">
                            <input
                              id="inputField2"
                              className="form-control"
                              type={
                                passwordReset?.confirmPassword?.status
                                  ? "password"
                                  : "text"
                              }
                              value={passwordReset?.confirmPassword?.value}
                              onChange={(e: any) => {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    confirmPassword: {
                                      ...prev.confirmPassword,
                                      value: e.target.value,
                                      error: "",
                                    },
                                    newPassword: {
                                      ...prev.newPassword,
                                      error: "",
                                    },
                                  };
                                });
                              }}
                            />
                            {passwordReset?.confirmPassword?.status ? (
                              <AiFillEye
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      confirmPassword: {
                                        ...prev.confirmPassword,
                                        status: false,
                                      },
                                    };
                                  });
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                className={`${st.eyeIcon}`}
                                onClick={() => {
                                  setPasswordReset((prev: any) => {
                                    return {
                                      ...prev,
                                      confirmPassword: {
                                        ...prev.confirmPassword,
                                        status: true,
                                      },
                                    };
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "red" }}>
                          {passwordReset?.confirmPassword?.error}
                        </p>
                      </Col>
                      <Col lg={12}>
                        <div className={`${st.formBox}`}>
                          <button
                            className={`btn ${st.submitBtn}`}
                            onClick={() => {
                              if (
                                passwordReset?.newPassword?.value !==
                                passwordReset?.confirmPassword?.value
                              ) {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    confirmPassword: {
                                      ...prev.confirmPassword,
                                      error:
                                        "New password and confirm password does not match",
                                    },
                                  };
                                });
                              } else if (
                                passwordReset?.newPassword?.value.length < 8
                              ) {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    newPassword: {
                                      ...prev.newPassword,
                                      error:
                                        "Password must be 8 or more than 8 characters",
                                    },
                                  };
                                });
                              } else if (
                                passwordReset?.oldPassword?.value ===
                                passwordReset?.newPassword?.value
                              ) {
                                setPasswordReset((prev: any) => {
                                  return {
                                    ...prev,
                                    newPassword: {
                                      ...prev.newPassword,
                                      error:
                                        "Your new password should be different than your current password.",
                                    },
                                  };
                                });
                              } else {
                                dispatch(
                                  adminUpdatePassword({
                                    oldPassword:
                                      passwordReset?.oldPassword.value,
                                    newPassword:
                                      passwordReset?.newPassword.value,
                                  })
                                );
                              }
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
