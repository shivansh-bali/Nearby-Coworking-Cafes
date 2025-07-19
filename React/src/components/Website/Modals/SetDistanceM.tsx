import React, { useState } from "react";
import cx from "./Modal.module.scss";

import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  increaseMapState,
  sliderMiles,
  sliderValue,
} from "../../../redux_toolkit/globalReducer/mapReducer";
import {
  increaseLocalLocation,
  localLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import {
  profile,
  searchLocate,
} from "../../../redux_toolkit/reducer/profileReducer";

const SetDistanceM = (props: any) => {
  let { distanceShow, handledistanceShowClose } = props;
  const dispatch = useDispatch();
  const [slider, setSlider] = useState<number>(10);
  function valuetext(value: number): string {
    setSlider(value);
    return String(value);
  }
  return (
    <>
      <Modal
        centered
        show={distanceShow}
        onHide={handledistanceShowClose}
        className={`${cx.modalCts} ${cx.modalMin}`}
        aria-labelledby="example-modal-sizes-title-xl"
        size="xl"
      >
        <Modal.Header style={{ justifyContent: "Left", alignItems: "center" }}>
          <Modal.Title>Set distance</Modal.Title>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={handledistanceShowClose}
            style={{ top: "15px", right: "7px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <div className={`${cx.distanceBox}`}>
                <Form.Label className={`${cx.setDistance} `}>
                  <span>Within 1 mile</span>
                  <span>5 miles</span>
                  <span>10 miles</span>
                </Form.Label>
                <Slider
                  aria-label="Temperature"
                  defaultValue={sliderMiles}
                  getAriaValueText={valuetext}
                  color="secondary"
                  style={{ color: "#738801" }}
                  min={1}
                  max={10}
                />
              </div>
            </Col>
            <Col lg={12}>
              <div className={` ${cx.btnSubmit} text-center mt-4`}>
                <button
                  className={`btn ${st.btn2} ${st.active2}`}
                  onClick={() => {
                    dispatch(sliderValue(slider));
                    handledistanceShowClose();
                    dispatch(increaseLocalLocation());
                    dispatch(increaseMapState());
                    if (profile?.data?.role) {
                      dispatch(searchLocate({ searchLocation: localLocation }));
                    }
                  }}
                  // onClick={() => {

                  //   dispatch(sliderValue(slider));
                  //   handledistanceShowClose();
                  // }}
                >
                  Confirm{" "}
                </button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SetDistanceM;
