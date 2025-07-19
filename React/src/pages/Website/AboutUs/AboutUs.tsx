import React, { useEffect } from "react";
import cx from "./AboutUs.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import {
  aboutNew,
  aboutPurple,
  aboutorange,
  ownerImg,
} from "../../../assets/images";

const AboutUs = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={`${cx.bannerSection} ${cx.section_padding}`}>
        <img
          src={aboutNew}
          className={`${cx.backgroundImg}`}
          alt="aboutImage"
        />

        <Container>
          <Row>
            <Col md={10} lg={8} xl={8} xxl={8} className={` ${cx.contentBox}`}>
              <div className={`${cx.contentHeading}`}>
                <h1>a bit about us</h1>
              </div>
              {/* <div className={`m-a ${cx.coFounder}`}>
                <div className={`${cx.FounderImg}`}>
                  <img
                    src={Carlos}
                    style={{ marginRight: "15px" }}
                    alt="carlos"
                  />
                  <img src={Haley} alt="haley" />
                </div>
                <h5>Carlos Guisado & Haley Grant</h5>
                <p>Co-Founders</p>

                <div className={`${cx.starIconLogo}`}>
                  <img src={aboutBlue} alt="aboutBlue" />
                </div>
              </div> */}
            </Col>

            <Col md={10} lg={8} xl={8} xxl={8} className={`m-auto`}>
              <div className={`${cx.blogText}`}>
                <h3
                  className="mb-2"
                  style={{
                    wordSpacing: "2px",
                    fontSize: "24px",
                  }}
                >
                  After a few years of working remotely and traveling to
                  different countries, we realized how much of a hassle it is to
                  find coffee shops and other laptop-friendly places that met
                  our needs as remote workers – WiFi quality, how noisy a place
                  is, how long you can work from there, charger outlets, etc.{" "}
                </h3>
                <p>
                  We knew there had to be an easier way to find places to work
                  from and also connect with others during the workday. Since we
                  couldn’t find a solution that met our needs, we decided to
                  create the solution: Sync.
                </p>
                <div className="position-relative">
                  {/* <p>
                    Sure, you can always search online for nearby coffee shops,
                    but how do you know if they have reliable WiFi, charging
                    outlets, comfortable tables, and proper lighting? Since we
                    couldn’t find any solution, we decided to create one. And
                    that’s when Sync was born. 
                  </p> */}
                  <img
                    src={aboutorange}
                    className={`${cx.imgLayer}`}
                    alt="aboutRange"
                  />
                </div>
                <div className="position-relative">
                  <img
                    className="mt-2"
                    src={ownerImg}
                    alt="Owner"
                    style={{ width: "100%" }}
                  />
                  <h5>what we do</h5>
                  <p>
                    From the beginning, our goal was simple: to make it easy for
                    everyone to find a coffee shop that meets their needs. But
                    as we started to connect with people and share our idea, we
                    realized that we were actually addressing a much bigger
                    need. The need to connect with others during the workday –
                    something that has been very much missing as a result of
                    remote work. 
                  </p>
                  <img
                    src={aboutPurple}
                    className={`${cx.imgLayer2}`}
                    alt="aboutPurple"
                  />
                </div>
                <h5>why we do it</h5>
                <p>
                  This realization laid the foundation for what our vision is
                  today: to make remote work feel less remote. By bridging the
                  gap between remote workers and coffee shops, we’re helping to
                  make remote work feel less isolating while supporting local
                  businesses. 
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;
