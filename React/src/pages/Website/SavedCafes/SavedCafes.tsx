import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./SavedCafes.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { CoffeeShop } from "../../../components/Website";
import { IoIosArrowBack } from "react-icons/io";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { profile } from "../../../redux_toolkit/reducer/profileReducer";
import { saveLocation } from "../../../redux_toolkit/reducer/registrationReducer";
import { useSelector } from "react-redux";

const SavedCafes = (props: any) => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const mapState = useSelector((state: any) => state.mapReducer);
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: saveLocation.lat,
    lng : saveLocation.lng
  })
  useEffect(()=>{
    setDistancePoint({
      lat: saveLocation.lat,
      lng : saveLocation.lng
    })
  },[mapState.mapState])
  function mapFunc(mk1: any, mk2: any) {
    let R = 3958.8; // Radius of the Earth in miles
    let rlat1 = mk1?.lat * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2?.lat * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2?.lng - mk1?.lng) * (Math.PI / 180); // Radian difference (longitudes)
    let d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    let totalDistance = Math.round(d * 1608);
    return totalDistance;
  }
  return (
    <>
    <div className={`${cx.fixSpace}`}></div>
      
      <section className={`${cx.featuredSection}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={`${cx.savedCafe}`}>
                <div className={`${cx.backIcon}`}>
                    <NavLink to={profile?`/userprofile/${profile?.data?._id}`:''} >
                        <IoIosArrowBack/>
                        <span>Back to my profile</span>
                    </NavLink>
                </div>
                <h5>Saved Cafes</h5>
              </div>
            </Col>
            {
              profile?.data?.savedCafe?.map((item:any, index:number)=>{
                const distance = mapFunc(distancePoint, {
                  lat: +item?.latitude,
                  lng: +item?.longitude,
                });
                return  <Col md={4} lg={3} xl={3} xxl={3} className="wow fadeInUp" key={`${index}`}>
                <CoffeeShop status="saved" data={item} distance={distance}/>
              </Col>
              })
            }
          </Row>

        </Container>
      </section>
    </>
  );
};

export default SavedCafes;
