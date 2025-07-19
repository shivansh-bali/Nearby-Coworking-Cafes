import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import cx from "../../../pages/Cafe/Dashboard/Dashboard.module.scss";
import UploadDocuments from "../../../components/Cafe/Modals/UploadDocuments";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../redux_toolkit/reducer/cafeReducer";
import { useDispatch } from "react-redux";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";
import { useNavigate } from "react-router-dom";

const AccountSetting = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const [reset, setReset] = useState<any>(false);
  const [passwordReset, setPasswordReset] = useState<any>({
    oldPassword: { error: "", value: "", status: false },
    newPassword: { error: "", value: "", status: false },
    confirmPassword: { error: "", value: "", status: false },
  });
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <Col className={cx.dashboard}>
        <Col className={cx.buttonsContainer}>
          <button
            type="button"
            onClick={() => {
              navigate("/cafepanel");
            }}
          >
            Home
          </button>
          /
          <button type="button" className={cx.active}>
            Account Setting
          </button>
        </Col>
        <h2>Account Settings</h2>
        <div className={cx.businessInformation}>
          <div
            className={`d-flex justify-content-between my-2 ${cx.businessInformationTitle}`}
          >
            <h5>Account Setting Info</h5>
          </div>

          <Col className={` ${cx.businessList}`}>
            <div>
              <label>Email Address</label>
              <p>{profile?.data?.email}</p>
            </div>
            <div>
              {/* <label> Password</label>
              <p>***********</p> */}

              <>
                <button
                  className={cx.settingBtn}
                  onClick={() => {
                    setReset(!reset);
                  }}
                >
                  Set a new password
                </button>
                {reset && (
                  <>
                    <div className="col-md-4">
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
                                ? "text"
                                : "password"
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
                          {passwordReset?.oldPassword?.status ? (
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
                    </div>
                    <div className="col-md-4">
                      <div className={`${st.formBox}`}>
                        <label>Password</label>
                        <div className="position-relative">
                          <input
                            className="form-control"
                            type={
                              passwordReset?.newPassword?.status
                                ? "text"
                                : "password"
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
                                };
                              });
                            }}
                          />
                          {passwordReset?.newPassword?.status ? (
                            <AiFillEye
                              className={`${st.eyeIcon}`}
                              onClick={(e: any) => {
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
                              onClick={(e: any) => {
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
                    </div>

                    <div className="col-md-4">
                      <div className={`${st.formBox}`}>
                        <label>Confirm Password</label>
                        <div className="position-relative">
                          <input
                            className="form-control"
                            type={
                              passwordReset?.confirmPassword?.status
                                ? "text"
                                : "password"
                            }
                            value={passwordReset.confirmPassword.value}
                            onChange={(e: any) => {
                              setPasswordReset((prev: any) => {
                                return {
                                  ...prev,
                                  confirmPassword: {
                                    ...prev.confirmPassword,
                                    value: e.target.value,
                                    error: "",
                                  },
                                };
                              });
                            }}
                          />
                          {passwordReset?.confirmPassword?.status ? (
                            <AiFillEye
                              className={`${st.eyeIcon}`}
                              onClick={(e: any) => {
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
                    </div>
                  </>
                )}
              </>
            </div>
          </Col>
          {reset && (
            <div className={`my-3`}>
              <button
                className={cx.themeBtn}
                onClick={async () => {
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
                  } else if (passwordReset?.newPassword?.value.length < 8) {
                    setPasswordReset((prev: any) => {
                      return {
                        ...prev,
                        newPassword: {
                          ...prev.newPassword,
                          error: "Password must be 8 or more than 8 characters",
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
                    await dispatch(
                      changePassword({
                        oldPassword: passwordReset?.oldPassword?.value,
                        newPassword: passwordReset?.newPassword?.value,
                      })
                    ).then((res: any) => {
                      if (res.payload.success === true) {
                        setPasswordReset({
                          oldPassword: { error: "", value: "", status: false },
                          newPassword: { error: "", value: "", status: false },
                          confirmPassword: {
                            error: "",
                            value: "",
                            status: false,
                          },
                        });
                        setSuccessMessage(true);
                        setTimeout(() => {
                          setSuccessMessage(false);
                        }, 3000);
                      } else
                        setPasswordReset((prev: any) => {
                          return {
                            ...prev,
                            oldPassword: {
                              ...prev.oldPassword,
                              error: "Old password is incorrect.",
                            },
                          };
                        });
                    });
                  }
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </Col>

      <UploadDocuments show={show} handleClose={handleClose} />
    </>
  );
};

export default AccountSetting;
