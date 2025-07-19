import React, { useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import cx from "./People.module.scss";
// import { Container, Col, Row } from "react-bootstrap";
// import { PeopleCard, PeopleSidebar } from "../../../components/Website";
// import { NadineLustre } from "../../../assets/images";
import { ComingSoon } from "../../../components/Website/People/ComingSoon";

const People = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ComingSoon />
      {/* <section className={`${cx.peopleSection}`}>
        <Container>
          <Row>
            <Col lg={4}>
              <div>
                <PeopleSidebar />
              </div>
            </Col>

            <Col lg={8}>
              <div className={` ${cx.contentBox}`}>
                <div className={` ${cx.contentBox_head}`}>
                  <h5>Pending invitations</h5>
                  <NavLink to="#">Manage</NavLink>
                </div>

                <div className={` ${cx.invitation_list}`}>
                  <div>
                    <NavLink to="#" className={`${cx.replyMessages}`}>
                      <img src={NadineLustre} alt="NadineLustre" />
                      <h5>Nadine Lustre</h5>

                      <p>Student @ New York State University</p>
                    </NavLink>
                  </div>
                  <div className={`mt-3 ${cx.revieBtn}`}>
                    <button className={`btn ${cx.btn2}`}>Ignore</button>
                    <button className={`btn ${cx.btn1}`}>Accept</button>
                  </div>
                </div>
              </div>

              <div className={` ${cx.contentBox} mt-4`}>
                <div className={` ${cx.contentBox_head}`}>
                  <h5>People you may know from name of company</h5>
                  <NavLink to="#">See all</NavLink>
                </div>
                <div>
                  <Row>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className={` ${cx.contentBox_head} mt-5`}>
                  <h5>People you may know from name of school/university</h5>
                  <NavLink to="#">See all</NavLink>
                </div>
                <div>
                  <Row>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                    <Col lg={4} md={6} className="mt-4">
                      <div>
                        <PeopleCard />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}
    </>
  );
};

export default People;
