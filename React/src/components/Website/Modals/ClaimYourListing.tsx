import React, { useCallback, useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";

import { Modal, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { coffeeShop1 } from "../../../assets/images";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import { cafeForClaim, claimList, claimResult, claimStateFunc } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";
import PinnedMap from "./PinnedMap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { allEmails } from "../../../redux_toolkit/reducer/cafeReducer";

const ClaimYourListing = (props: any) => {
  let { show, handleClose } = props;
  const claimState = useSelector((state:any)=>state.cafeClaimReducer)
  const dispatch = useDispatch();
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
  };
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const [fields, setFields] = useState<any>({
    name: "",
    email: "",
    password: "",
    position: "",
    phone: "",
    dialCode: "",
    countryCode: "",
    cafeId: props?.selectedCafe?._id
  });
  const [fieldError, setFieldError] = useState<any>();
  const [showPassword, setShowPassword] = useState(true)
  const [err, setErr] = useState<any>("");
  const fillFields = (key: any, value: String) => {
    setFields((prev: any) => {
      return { ...prev, [key]: value, cafeId: props?.selectedCafe?._id };
    });
    if (fieldError !== undefined && fieldError[key]) {
      fieldError[key] = "";
    }
    setErr("")
  };
  const checkFields = useCallback((fields: any) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (fields[e] === "") {
        fieldErr[e] = <p className={`${cm.error}`}> This field is required </p>;
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (fields.email.match(regex)) {
        dispatch(claimList(fields))
      } else {
        fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
        setFieldError(fieldErr);
      }
    } else {
      setFieldError(fieldErr);
    }
  }, [dispatch]);
  function phoneInput(value: any, data: any) {
    fillFields("phone", value);
    fillFields("dialCode", data?.dialCode);
    fillFields("countryCode", data?.countryCode);
  }
  useEffect(()=>{
    if(claimState.claimState===1){
      if(claimResult?.status===true){
      setLookshow(true);
      handleClose();
      dispatch(claimStateFunc())
      }else{
      dispatch(claimStateFunc())
      setErr(<p className={`${cm.error}`}>{claimResult?.message}</p>)
      }
    }
  },[dispatch, handleClose, claimState.claimState])
  const [showPass, setShowPass] = useState(false);
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "none",
          }}
        >
          <Modal.Title>Claim your listing</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "0px 14px" }}>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12} className="border-bottom">
                  <div className={`${m.ClaimYourListing}`}>
                    <img src={coffeeShop1} alt="coffeeShop" />
                    <div>
                      <h5>{cafeForClaim?.establishmentName}</h5>
                      <p>{cafeForClaim?.streetAddress}</p>
                    </div>
                  </div>
                </Col>

                <Col lg={12}>
                  <div className={`${m.listingForm}`}>
                    <h3 className="text-center mb-4">
                      Sign up to claim this business
                    </h3>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>Full Name*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type your full name "
                        value={fields?.name}
                        onChange={(e: any) => {
                          fillFields("name", e.target.value);
                        }}
                      />
                    {fieldError?.name}
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>Business Email*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type your business email"
                        value={fields?.email}
                        onChange={(e: any) => {
                          const checkEmail = allEmails?.some((a:any) => a?.email?.toLowerCase()===e.target.value?.toLowerCase())
                          if(!checkEmail){
                            setShowPassword(true)
                          }else{
                            setShowPassword(false)
                            // fillFields("step4", "password", "")
                            setFieldError((prev:any)=>{
                              return {...prev, password: ""}
                            })
                            delete fields.password;
                          }
                          fillFields("email", e.target.value);
                        }}
                      />
                    {fieldError?.email}
                    </Form.Group>
                    {showPassword ? <Form.Group className="mb-3 position-relative">
                      <Form.Label>Create your password*</Form.Label>
                      <div className={`${st.formBox}`}>
                <div className="position-relative">
                      <Form.Control
                        type={!showPass ? "password" : "text"}
                        placeholder="Create your password*"
                        value={fields?.password}
                        onChange={(e: any) => {
                          fillFields("password", e.target.value);
                        }}
                      />
                      {showPass ? (
                    <AiFillEye
                      className={`${st.eyeIcon}`}
                      onClick={() => {
                        setShowPass(false);
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className={`${st.eyeIcon}`}
                      onClick={() => {
                        setShowPass(true);
                      }}
                    />
                  )}
                  </div>
                  </div>
                    {fieldError?.password}
                    </Form.Group> : <p>You're already registered! Please verify your email in the message we sent to your inbox.</p>}
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>What is your role?*</Form.Label>
                      <Form.Select required value={fields?.position}
                            onChange={(e: any) =>
                              fillFields("position", e.target.value)
                            }>
                        <option value="">Select your role</option>
                        <option value="Owner">
                        Owner
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Guest Services">Guest Services</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    {fieldError?.position}
                    </Form.Group>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>Business Phone. No.*</Form.Label>
                      <PhoneNumber phoneInput={phoneInput} />
                    {fieldError?.phone}
                    </Form.Group>
                    <p className="text-center" style={{color:"black"}}>
                      By proceeding, you agree to our{" "}
                      <NavLink to="/" style={{color:"black", textDecoration:"underline"}}>Terms and Conditions</NavLink> and confirm
                      that you have read our {" "}
                      <NavLink to="/" style={{color:"black", textDecoration:"underline"}}>Privacy and Cookie Statement</NavLink>
                    </p>
                {err}
                  </div>
                </Col>
                <Col lg={12} className="text-center mb-4">
                  <div className={` ${m.btnSubmit}`}>
                    <button className={fields?.email?.trim() !== "" && fields?.name?.trim() !== ""
                    && fields?.phone !== "" && fields?.password !== "" && fields?.position?.trim() !== "" ? `btn ${st.btn2} ${st.active2}` : `btn ${st.btn2}`
                  } onClick={()=>checkFields(fields)}>Sign Up</button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={"Thank You! We've sent a link to your email."}
      />
    </>
  );
};

export default ClaimYourListing;
