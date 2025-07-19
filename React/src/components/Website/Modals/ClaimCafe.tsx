import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col, Form } from "react-bootstrap";

import { MdClose } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  changeUpdateData,
} from "../../../redux_toolkit/reducer/profileReducer";
import { FaSearch } from "react-icons/fa";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { claimCafeFunc } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";

const ClaimCafe = (props: any) => {
  let { editshow, handleeditClose } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    dispatch(allCafe());
  }, [dispatch]);
  const cafeState = useSelector((state: any) => state.cafeReducer);
  useEffect(() => {
    if (profileState.updateState) {
      handleeditClose();
      dispatch(changeUpdateData());
    }
  }, [dispatch, handleeditClose, profileState.updateState]);
  const [businessName, setBusinessName] = useState({ establishmentName: "" });
  const [businessListed, setbusinessListed] = useState(false);
  const [cafes, setCafes] = useState(cafeList);
  const businessListedDropdown = () => {
    setbusinessListed(!businessListed);
  };
  useEffect(() => {
    const filteredCafe = cafeList?.filter((a:any) => !a?.isMember || a?.isMember === "no")
    setCafes(filteredCafe);
  }, [cafeState.allCafeState]);
  const [fieldError, setFieldError] = useState("");
  return (
    <>
      <Modal
        centered
        show={editshow}
        onHide={() => {
          handleeditClose();
        }}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>Is your Business already listed?</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleeditClose();
            }}
            style={{ right: "9px", top: "15px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Form>
                <Row>

                  <Col lg={12}>
                    
                  <Form.Group className={`${m.formBox}`}>
                      <span
                        className={`${m.icon}`}
                        style={{ fontSize: "18px" }}
                      >
                        <FaSearch />
                      </span>
                      <Form.Control
                        placeholder="Business name"
                        value={businessName?.establishmentName}
                        onChange={(e: any) => {
                          setbusinessListed(false)
                          setBusinessName((prev: any) => {
                            return {
                              ...prev,
                              establishmentName: e.target.value,
                            };
                          });
                          setFieldError("")
                          let newList = cafeList.filter((item: any) => {
                            return (
                              item?.establishmentName
                                ?.toLowerCase()
                                .indexOf(e.target.value.toLowerCase()) !== -1 && (!item?.isMember || item?.isMember === "no")
                            );
                          });
                          setCafes(newList);
                        }}
                      />
                      {businessListed && (
                        <div className={`${m.dropdownList}`}>
                          <h3>{cafes?.length} Results found</h3>
                          <div className={`${m.userFound}`}>
                            <ul>
                              {cafes?.map((item: any, index: number) => {
                                return(
                                  <li
                                    key={index}
                                    onClick={() => {
                                      dispatch(claimCafeFunc(item));
                                      businessListedDropdown();
                                    }}
                                  >
                                    <div className={`${m.locationList}`}>
                                      <h5>{item?.establishmentName}</h5>
                                      <p>{item?.streetAddress} </p>
                                      <button className={`btn ${m.btnMH}`} onClick={()=>navigate(`/cafe-owner/${item?._id}`)}>Claim</button>
                                    </div>
                                  </li>
                                );
                              })}

                              {cafes?.length < 1 && (
                                <li
                                  style={{
                                    borderTop: "1px solid var(--Main5)",
                                  }}
                                >
                                  <div className={`${m.locationList}`}>
                                    <p>Can't find your business?</p>
                                    <NavLink
                                      to='/cafe-step/addcafe'
                                      style={{
                                        color: "black",
                                        textDecoration: "underline",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      List it Now
                                    </NavLink>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                     
                      {/* user not found */}
                      {/* 
                    <div className={`${m.dropdownList}`}>
                      <h3>No results found</h3>
                      <div className={`${m.notFound}`}>
                       <p>Can’t find your business?</p>
                       <NavLink to="#">List it now</NavLink>
                      </div>
                    </div>   */}
                      {/* user not  found end */}
                    </Form.Group>
                    <p style={{color:"red"}}>{fieldError}</p>
                  </Col>

                  <Col lg={12} className="mt-3">
                    <div className={`${m.btnSubmit} text-end`}>
                      <button
                        className={`btn ${st.btn2} ${st.active2}`}
                        style={{ width:'100%' }}
                        onClick={(e: any) => {
                          e.preventDefault();
                          if(businessName.establishmentName!==""){
                          businessListedDropdown()
                          setFieldError("")
                          }else{
                            setFieldError("This field is required")
                          }
                        }}
                      >
                        Start searching now
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClaimCafe;
