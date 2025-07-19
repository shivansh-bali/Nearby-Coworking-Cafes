import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import {
  changeUpdateData,
  profile,
  updateDetails,
} from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";

const EditAboutM = (props: any) => {
  let { aboutshow, handleaboutClose } = props;
  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);
  const [about, setAbout] = useState(profile?.data?.about);
  function fill() {
    setAbout(profile?.data?.about);
  }
  useEffect(() => {
    setAbout(profile?.data?.about);
  }, [profileState.profileState]);
  useEffect(() => {
    if (profileState.updateState) {
      handleaboutClose();
      dispatch(changeUpdateData());
    }
  }, [handleaboutClose, dispatch, profileState.updateState]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={aboutshow}
        onHide={() => {
          handleaboutClose();
          fill();
        }}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>Edit About</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleaboutClose();
              fill();
            }}
            style={{ right: "9px", top: "15px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${m.formContact}`}>
                <div className={`${m.formBox}`}>
                  <Form>
                    <Form.Group className="mb-4 position-relative">
                      <Form.Control
                        as="textarea"
                        placeholder="Type your message here"
                        rows={5}
                        value={about}
                        onChange={(e: any) => {
                          setAbout(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={12} className="text-end">
              <div className={` ${m.btnSubmit}`}>
                <button
                  className={`btn ${st.btn2} ${st.active2}`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    dispatch(updateDetails({ about: about }));
                  }}
                >
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditAboutM;
