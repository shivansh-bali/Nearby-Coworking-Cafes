import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col, Form } from "react-bootstrap";

import { MdClose } from "react-icons/md";

import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUpdateData,
  profile,
  updateDetails,
} from "../../../redux_toolkit/reducer/profileReducer";

const EditContactInformation = (props: any) => {
  let { editshow, handleeditClose } = props;
  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);
  const [fields, setFields] = useState<any>({
    mobileNumber: profile?.data?.mobileNumber,
    dialCode: profile?.data?.dialCode,
    countryCode: profile?.data?.countryCode,
    landline: profile?.data?.landline,
    address: profile?.data?.address,
    birthdayMonth: profile?.data?.birthdayMonth,
    birthdayDate: profile?.data?.birthdayDate,
    website: profile?.data?.website,
  });
  function fill() {
    setFields({
      mobileNumber: profile?.data?.mobileNumber,
      dialCode: profile?.data?.dialCode,
      countryCode: profile?.data?.countryCode,
      landline: profile?.data?.landline,
      address: profile?.data?.address,
      birthdayMonth: profile?.data?.birthdayMonth,
      birthdayDate: profile?.data?.birthdayDate,
      website: profile?.data?.website,
    });
  }
  useEffect(() => {
    fill();
  }, [profileState.profileState]);
  const fillFields = (key: any, value: any) => {
    setFields((prev: any) => {
      return { ...prev, [key]: value };
    });
  };
  function phoneInput(value: any, data: any) {
    fillFields("mobileNumber", +value);
    fillFields("dialCode", +data?.dialCode);
    fillFields("countryCode", data?.countryCode);
  }
  useEffect(() => {
    if (profileState.updateState) {
      handleeditClose();
      dispatch(changeUpdateData());
    }
  }, [dispatch, handleeditClose, profileState.updateState]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={editshow}
        onHide={() => {
          handleeditClose();
          fill();
        }}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>Edit Contact Information</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleeditClose();
              fill();
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
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Phone Number</Form.Label>
                      <PhoneNumber phoneInput={phoneInput} fields={fields} />
                    </Form.Group>
                  </Col>

                  <Col lg={12}>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Landline</Form.Label>
                      <Form.Control
                        className={`${m.removeArrow}`}
                        type="number"
                        placeholder="Type your landline number"
                        value={fields?.landline}
                        onChange={(e: any) =>
                          fillFields("landline", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={12}>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Type your address here"
                        rows={4}
                        value={fields?.address}
                        onChange={(e: any) =>
                          fillFields("address", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Birthday Month</Form.Label>
                      <Form.Control
                        type="number"
                        value={fields?.birthdayMonth}
                        min={0}
                        onChange={(e: any) =>
                          fillFields("birthdayMonth", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Day</Form.Label>
                      <Form.Control
                        type="number"
                        value={fields?.birthdayDate}
                        min={0}
                        max={31}
                        onChange={(e: any) =>
                          fillFields("birthdayDate", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} className="mb-4">
                    <h3>Website</h3>
                  </Col>

                  <Col lg={12}>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        type="text"
                        value={fields?.website}
                        onChange={(e: any) =>
                          fillFields("website", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={12} className="mt-3">
                    <div className={`${m.btnSubmit} text-end`}>
                      <button
                        className={`btn ${st.btn2} ${st.active2}`}
                        style={{ width: "auto" }}
                        onClick={(e: any) => {
                          e.preventDefault();
                          dispatch(
                            updateDetails({ ...props.allFields, ...fields })
                          );
                        }}
                      >
                        Save
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

export default EditContactInformation;
