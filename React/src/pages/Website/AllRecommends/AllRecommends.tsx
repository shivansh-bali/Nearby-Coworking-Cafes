import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cx from "./AllRecommends.module.scss";

import { Container, Col, Row } from "react-bootstrap";
import { MyRecommendations } from "../../../components/Website";

import { IoIosArrowBack } from "react-icons/io";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, singleUser } from "../../../redux_toolkit/reducer/connectionReducer";

const AllRecommends = (props: any) => {
  const param = useParams()
  const dispatch = useDispatch()
  const connectionState = useSelector((state: any) => state.connectionReducer);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    if(param?.id){
      dispatch(getSingleUser(param?.id))
    }else{
      setUser(profile?.data)
    }
  },[dispatch, param])
  useEffect(() => {
    setUser(singleUser);
  }, [connectionState.singleUserState]);
  return (
    <>
      <div className={`${cx.fixSpace}`}></div>

      <section className={`${cx.featuredSection}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={`${cx.savedCafe}`}>
                <div className={`${cx.backIcon}`}>
                  <NavLink to={profile?`/userprofile/${profile?.data?._id}`:''}>
                    <IoIosArrowBack />
                    <span>Back to my profile</span>
                  </NavLink>
                </div>
                <h5>All Recommends</h5>
              </div>
            </Col>
            {user?.recommandCafes
              ?.reverse()
              ?.map((item: any, index: number) => {
                return (
                  <Col md={4} lg={3} xl={3} xxl={3} key={`${index}`}>
                    <MyRecommendations status="inactive" data={item} />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllRecommends;
