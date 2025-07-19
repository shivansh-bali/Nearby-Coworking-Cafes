import React, { useState } from "react";
import cx from "./Recommend.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { NavLink } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { cafeFormHeader, reBanner } from "../../../assets/images";

const Recommend = (props: any) => {
  const [error, setError] = useState("");
  const [buttonValue, setButtonValue] = useState<any>("");
  return (
    <>
      <div className={`${cx.topbox}`}> </div>
      <div className={`${cx.spaceBox}`}>
        <section className={`${cx.bannertop}`}>
          <img src={cafeFormHeader} className={`${cx.desktopImg}`} alt="" />
          <img src={reBanner} className={`${cx.mobileImg}`} alt="" />
          <Container>
            <Row>
              <Col lg={12} md={12} className={` ${cx.contenttop1}  `}>
                <div className={`${cx.contenttop}`}>
                  <h1>recommend a place!</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <section className={`${cx.secationText2}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="">
                <div className={`${cx.texttop} mt-5`}>
                  <h3>Know a cool place to work from? Add it to Sync!</h3>
                </div>
                <div className={`${cx.content} mt-4`}>
                  <h3>
                    Are you the owner, employee, or official representative of
                    this place?
                  </h3>
                </div>

                <div className={`${cx.btnGroup}`}>
                  <button
                    className={
                      buttonValue === true
                        ? `btn ${cx.actionBtn} ${cx.active}`
                        : `btn ${cx.actionBtn}`
                    }
                    onClick={() => {
                      setButtonValue(true);
                      setError("");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      buttonValue === false
                        ? `btn ${cx.actionBtn} ${cx.active}`
                        : `btn ${cx.actionBtn}`
                    }
                    onClick={() => {
                      setButtonValue(false);
                      setError("");
                    }}
                  >
                    No
                  </button>
                </div>
                <p className={`${cm.error}`}>{error}</p>
                {buttonValue && (
                  <div className={` mt-5`}>
                    <NavLink to="/cafe-owner" className={buttonValue!=="" ?  `btn ${st.btn2} ${st.active2}` : `btn ${st.btn2}`}>
                      Next
                    </NavLink>
                  </div>
                )}

                {!buttonValue && (
                  <div className={` mt-5`}>
                    <NavLink
                      to={buttonValue === "" ? "#" : "/user-recommend"}
                      className={buttonValue!=="" ?  `btn ${st.btn2} ${st.active2}` : `btn ${st.btn2}`}
                      onClick={() => {
                        if (buttonValue === "") {
                          setError("Please select one");
                        }
                      }}
                    >
                      Next
                    </NavLink>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Recommend;
