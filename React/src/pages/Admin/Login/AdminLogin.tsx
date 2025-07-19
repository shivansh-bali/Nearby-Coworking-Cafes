import React, { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import m from "../../../components/Website/Modals/Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { adminLogin } from "../../../redux_toolkit/adminReducer/userReducer";
import { useDispatch } from "react-redux";
import { myData } from "../../../redux_toolkit/reducer/profileReducer";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [show, setShow] = useState(true);

  const [data, setData] = useState<any>({
    email: { value: "", message: "" },
    password: { value: "", message: "" },
  });

  const handleData = (e: any) => {
    setData((prev: any) => {
      return {
        ...prev,
        [e.target.name]: { message: "", value: e.target.value },
      };
    });
  };
  const handleLogin = () => {
    if (data?.email?.value?.match(regex)) {
      dispatch(
        adminLogin({ email: data.email.value, password: data.password.value })
      ).then((data: any) => {
        if (data.payload.success) {
          dispatch(myData());
        } else if (data.payload.message === "User not found") {
          setData((prev: any) => {
            return {
              ...prev,
              email: {
                ...prev.email,
                message: "User not registered",
              },
            };
          });
        } else if (data.payload.message === "Invalid email or password") {
          setData((prev: any) => {
            return {
              ...prev,
              password: {
                ...prev.password,
                message: "Invalid email or password",
              },
            };
          });
        }
      });
    } else {
      setData((prev: any) => {
        return {
          ...prev,
          email: {
            ...["email"],
            error: true,
            message: "Enter a valid email",
          },
        };
      });
    }
  };
  return (
    <>
      <Modal
        centered
        scrollable
        show={true}
        className={`${m.modalCts} ${m.modalSmall} ${m.loginPopup}`}
      >
        <Modal.Header>
          <Modal.Title>Log in to Sync Admin!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your email"
                  onChange={(e: any) => {
                    handleData(e);
                  }}
                />

                <p className={`${cm.error}`}>{data?.email?.message} </p>
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <div className="position-relative">
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Your password"
                    type={show ? "password" : "text"}
                    onChange={(e: any) => {
                      handleData(e);
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
                </div>
                <p className={`${cm.error}`}>{data?.password?.message} </p>
                {/* <p className={`${m.forgotPassword}`}>
                  <NavLink to="#">Forgot Password ?</NavLink>
                </p> */}
              </div>
            </Col>

            <Col lg={12}>
              <button
                className={
                  data.email.value && data.password.value
                    ? `btn ${st.btn2} mt-3  ${st.active2}`
                    : `btn ${st.btn2} mt-3  `
                }
                style={{ width: "100%" }}
                type="submit"
                onClick={() => {
                  if (data.email.value && data.password.value) {
                    handleLogin();
                  } else {
                    !data.email.value &&
                      setData((prev: any) => {
                        return {
                          ...prev,
                          email: {
                            ...prev.email,
                            message: "This field is required",
                          },
                        };
                      });
                    !data.password.value &&
                      setData((prev: any) => {
                        return {
                          ...prev,
                          password: {
                            ...prev.password,
                            message: "This field is required",
                          },
                        };
                      });
                  }
                }}
              >
                Log in
              </button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminLogin;
