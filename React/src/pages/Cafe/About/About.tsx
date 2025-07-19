import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import cx from "../../../pages/Cafe/Dashboard/Dashboard.module.scss";

import UploadDocuments from "../../../components/Cafe/Modals/UploadDocuments";
import {} from "../../../redux_toolkit/reducer/profileReducer";
import { useOutletContext } from "react-router-dom";

const About = () => {
  const [show, setShow] = useState(false);

  const { cafeData, updateData, updateCafeData } = useOutletContext<any>();
  // const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [editable, setEditable] = useState(false);

  return (
    <>
      <div className={cx.businessInformation}>
        <div
          className={`d-flex space-between my-2 ${cx.businessInformationTitle}`}
        >
          <h6>About</h6>
          <button onClick={() => setEditable(!editable)}>
            {editable ? (
              "Cancel"
            ) : (
              <>
                Edit <FaEdit style={{ marginLeft: "10px" }} />
              </>
            )}
          </button>
        </div>

        <Col className={` ${cx.businessList}`}>
          <div>
            {/* <span>Introduction</span> */}
            {editable ? (
              <>
                <h6>Tell our community a bit about your establishment!</h6>
                <textarea
                  style={{ background: "#ebebeb2d" }}
                  rows={10}
                  name="shortDescription"
                  className={cx.textareaField}
                  defaultValue={cafeData?.shortDescription}
                  onChange={(e: any) => {
                    updateData({
                      key: ["shortDescription"],
                      value: e.target.value,
                    });
                  }}
                ></textarea>
              </>
            ) : !cafeData?.shortDescription ? (
              <h6 style={{ marginBottom: "50px ", color: "var(--Color5)" }}>
                Click Edit to make changes here
              </h6>
            ) : (
              <div
                style={{ height: "300px", padding: "10px 0", overflow: "auto" }}
              >
                <h6>{cafeData?.shortDescription}</h6>
              </div>
            )}
          </div>
          <div className={cx.businessInformationTitle}>
            <h6>Additional Information</h6>
          </div>

          {editable ? (
            <Col
              md={5}
              style={{
                border: "1px solid #dedede",
                borderRadius: "15px",
                padding: "10px 0",
                marginTop: "20px",
                position: "relative",
                background: "#ebebeb2d",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  fontSize: "10px",
                  background: "white",
                  top: "-13px",
                  left: "20px",
                  padding: "5px 10px",
                  fontWeight: "600",
                }}
              >
                Time limit for customers with laptop (If any)
              </div>
              <select
                className={`form-select form-select-lg ${cx.selectDropdown}`}
                aria-label=".form-select-lg example"
                name="timeLimitation"
                defaultValue={cafeData?.timeLimitation}
                onChange={(e: any) => {
                  updateData({
                    key: ["timeLimitation"],
                    value: e.target.value,
                  });
                }}
              >
                <option value="1 hour"> 1 hour</option>
                <option value="3 hours">3 hours </option>
                <option value="5 hours">5 hours</option>
                <option selected value={"No time limit"}>
                  No time limit
                </option>
              </select>
            </Col>
          ) : (
            <div
              style={{
                padding: "10px 0",
              }}
            >
              <h6>Time limit for remote workers</h6>
              <p>
                {cafeData?.timeLimitation
                  ? cafeData?.timeLimitation
                  : "Click on Edit button to add in the field"}
              </p>
            </div>
          )}

          {editable ? (
            <>
              <Col
                md={5}
                style={{
                  border: "1px solid #dedede",
                  borderRadius: "15px",
                  padding: "10px 0",
                  marginTop: "20px",
                  position: "relative",
                  background: "#ebebeb2d",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    fontSize: "10px",
                    background: "white",
                    top: "-13px",
                    left: "20px",
                    padding: "5px 10px",
                    fontWeight: "600",
                  }}
                >
                  Any restrictions?
                </div>
                <textarea
                  style={{ background: "transparent" }}
                  name="limitations"
                  className={cx.textareaField}
                  rows={10}
                  defaultValue={cafeData?.limitations}
                  onChange={(e: any) => {
                    updateData({ key: ["limitations"], value: e.target.value });
                  }}
                  placeholder="Please describe any restrictions or requirements for customers to work from your place"
                ></textarea>
              </Col>
              <Col
                md={5}
                style={{
                  fontSize: "10px",
                  background: "white",
                  padding: "10px 20px",
                  fontWeight: "600",
                }}
              >
                (E.g. Customers with laptops can only sit at the bar or
                customers only have WiFi access for one hour.)
              </Col>
            </>
          ) : (
            <Col style={{ padding: "10px 0" }}>
              <h6>Restrictions</h6>
              <h6
                style={cafeData?.limitations ? {} : { color: "var(--Color5)" }}
              >
                {cafeData?.limitations
                  ? cafeData?.limitations
                  : "Click Edit to make changes here"}
              </h6>
            </Col>
          )}
        </Col>

        {editable && (
          <div className="my-2">
            <button
              className={cx.themeBtn}
              onClick={() => {
                updateCafeData({
                  limitations: cafeData?.limitations,
                  shortDescription: cafeData?.shortDescription,
                  timeLimitation: cafeData?.timeLimitation,
                });
                setEditable(false);
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <UploadDocuments show={show} handleClose={handleClose} />
    </>
  );
};

export default About;
