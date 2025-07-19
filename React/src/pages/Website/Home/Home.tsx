import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cx from "./Home.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import {
  card1,
  card2,
  card3,
  card4,
  coworking,
  moon,
  slVector,
  star,
  star2,
} from "../../../assets/images";
import { Blog, CoffeeShop } from "../../../components/Website";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FaArrowRight } from "react-icons/fa";
import {
  changeLogoutState,
  changeSocialState,
  loginMessage,
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProfileData,
  myData,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import AdminLogin from "../../Admin/Login/AdminLogin";
import { blogData } from "../Blog/Blogdata";
import PinnedMap from "../../../components/Website/Modals/PinnedMap";

const Home = (props: any) => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(allCafe());
  }, [dispatch]);
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const cafeClaimState = useSelector((state: any) => state.cafeClaimReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (registrationState.socialState === 1) {
      if (loginMessage.success === true && profile.data.role === "user") {
        navigate("/");
        dispatch(changeSocialState());
      } else if (
        loginMessage.success === true &&
        profile.data.role === "admin"
      ) {
        navigate("/admin");
        dispatch(changeSocialState());
      } else {
        if (
          profile.data.role === "cafe" &&
          profile?.data?.isSubmitted === true
        ) {
          navigate("/");
        } else {
          if (profile.data.role === "cafe") {
            navigate("/cafe-step");
          }
        }
        dispatch(changeSocialState());
      }
    }

    if (registrationState.logoutState === 1) {
      setShowToast(true);
      dispatch(changeProfileData());
      dispatch(changeLogoutState());
    }
  }, [
    dispatch,
    navigate,
    registrationState.logoutState,
    registrationState.socialState,
  ]);

  useEffect(() => {
    if (showToast === true) {
      navigate("/");
      setShowToast(false);
    }
  }, [navigate, showToast]);
  const options = {
    dots: false,
    nav: true,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
  };
  const options3 = {
    dots: false,
    nav: true,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      },
    },
  };
  const options2 = {
    loop: true,
    items: 3,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1700,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  };

  useEffect(() => {
    const isAdminToken = param?.token?.includes("admin");
    const isAdminRole = profile?.data?.role === "admin";
    const isCafeRole = profile?.data?.role === "cafe";
    const isSubmitted = profile?.data?.isSubmitted === true;
    const isPasswordReset = window.location.pathname.includes("password");
    const adminLogin = window.location.pathname.endsWith("/admin/login");
    if (isAdminToken && isAdminRole) {
      navigate("/admin/");
    } else {
      if (isAdminRole && (!isAdminToken || !param?.token)) {
        navigate("/admin");
      } else if (isCafeRole) {
        navigate(isSubmitted ? "/" : "/cafe-step");
      } else {
        if (adminLogin) {
          navigate("/admin/login");
        } else if (!isPasswordReset) {
          navigate("/");
        }
      }
    }
  }, [dispatch, navigate, param?.token, profileState.profileState]);

  useEffect(() => {
    if (registrationState.verifyState === 1) {
      dispatch(myData());
    }
  }, [dispatch, registrationState.verifyState, param?.token]);

  useEffect(() => {
    if (cafeClaimState.verifyClaimState === 1) {
      setLookshow(true);
    }
  }, [dispatch, cafeClaimState.verifyClaimState, param?.token]);

  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafe, setCafe] = useState<any[]>([]);
  const featuredCafe = ["64a024d930a011985ed3883c", "64ad93c4d46e7656658b3ab5", "64af188622793491e37eba80", "64a024de30a011985ed388d1"]
  const trendingCafe = ["64a024de30a011985ed388d5", "64adb0f5c4b9daaf2daf3965", "64a024d830a011985ed38826", "64a024da30a011985ed38884", "64a024da30a011985ed38894", "64a024d830a011985ed38830"]
  useEffect(() => {
    if(cafeState.allCafeState > 0){
    let cafeData = cafeList.filter((item: any) => item?.isAccepted === "Approved" && item?.status === true);
    setCafe(cafeData);
    }
  }, [cafeState.allCafeState]);

  const mapState = useSelector((state: any) => state.mapReducer);
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: saveLocation.lat,
    lng: saveLocation.lng,
  });
  useEffect(() => {
    setDistancePoint({
      lat: saveLocation.lat,
      lng: saveLocation.lng,
    });
  }, [mapState.mapState]);
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
      <div className={`${cx.spaceBox}`}>
        <section className={`${cx.bannerSection}`}>
          <div className={`${cx.shapeTouch}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 170">
              <path
                fill="#fefcfc"
                id="startp"
                d="M41.40094,132.5l-.04614,.04163c-21.13678,.79645-38.35895,16.84418-40.99341,37.45837h-.36139V0H270c-24.40985,1.70758-43.93091,21.74066-45.83258,46.09766l-.16742,36.40234c0,27.61426-22.38574,50-50,50H41.40094Z"
                data-original="M0,0H0V0Z"
              ></path>
            </svg>
          </div>
          <Container>
            <Row className="align-items-end">
              <Col md={7} lg={7} xl={7} xxl={7}>
                <div className={`${cx.contentBox}`}>
                  <h1 className={`${cx.slTitle} `}>
                    find laptop-friendly coffee shops
                    <br /> near you
                  </h1>
                  <p className=" ">
                    Need great WiFi, big tables, charging outlets, and lots of
                    light?
                    <br /> You got it! Discover cafes near you that tick all
                    your <br />
                    work-from-home boxes – and check out which spots
                    <br /> your friends like to work from.
                  </p>
                  <NavLink
                    className={`btn ${st.btn1} `}
                    to="/cafe-listing"
                  >
                    Start searching now
                  </NavLink>
                  {/* <ul className={`${cx.downloads} wow slideInLeft`}>
                  <li><NavLink to="#" title="App Store"><img src={appStore}/></NavLink></li>
                  <li><NavLink to="#" title="Google Play"><img src={googlePlay}/></NavLink></li>
                 </ul> */}
                </div>
              </Col>
            </Row>
          </Container>
          <div className={`${cx.imgBox}`}>
            <img src={slVector} alt="vector" />
          </div>
        </section>
      </div>
      <section className={`${cx.featuredSection} ${st.sectionPadding}`}>
        <Container>
          <Col lg={12} className={`${st.title} text-center`}>
            <h2 className={`${st.heading} `}>
              featured <br />
              coffee shops
              <span>Our top picks!</span>
            </h2>
          </Col>
         {cafe.length>0 && <OwlCarousel className="owl-theme" {...options}>
            {cafe.length>0 && cafe?.map((item: any, index: number) => {
              const distance = mapFunc(distancePoint, {
                lat: +item?.latitude,
                lng: +item?.longitude,
              });
              return (
                (item?.images?.length > 0 ||
                  item?.pictures?.some((a: any) => a?.imageUrl !== "")) && 
                  featuredCafe?.some((e:any) => e===item?._id) &&
                  (
                  <div className="item" key={`${index}`}>
                    <CoffeeShop
                      status="inactive"
                      data={item}
                      distance={distance}
                    />
                  </div>
                )
              );
            })}
          </OwlCarousel>}

          <Col lg={12} className={`text-center mt-4`}>
            <NavLink
              to="/cafe-listing"
              className={`btn ${st.btn2} ${st.active2}`}
            >
              See more cafes
            </NavLink>
          </Col>
        </Container>
      </section>

      <section className={`${cx.workSpaceSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Col lg={12} className={`${st.title} ${cx.title2} text-left`}>
            <h2 className={`${st.heading}`}>
              <div style={{ position: "relative", zIndex: "1" }}>
                need a break from
                <br /> your home office?
              </div>
              <img src={moon} className={`${cx.moon}`} alt="moon" />
              <img src={star} className={`${cx.star}`} alt="star" />
            </h2>
          </Col>
          <Row className={`${cx.sliderRow}`}>
            <OwlCarousel className="owl-theme" {...options2}>
              <div className="item">
                <div className={`${cx.spaceCard}`}>
                  <img src={card1} alt="card1" />
                  <p>
                    Filter your coffee shop search to find the perfect work spot
                    for your needs. 
                  </p>
                </div>
              </div>
              <div className="item">
                <div className={`${cx.spaceCard}`}>
                  <img src={card2} alt="card2" />
                  <p>
                    Mark your personal map with your fave cafes and impress your
                    connections with your coffee cred. 
                  </p>
                </div>
              </div>
              <div className="item">
                <div className={`${cx.spaceCard}`}>
                  <img src={card3} alt="card3" />
                  <p>
                    Join forces with friends and colleagues to find your next
                    coworking oasis.  
                  </p>
                </div>
              </div>
              <div className="item">
                <div className={`${cx.spaceCard}`}>
                  <img src={card4} alt="card4" />
                  <p>
                    See which coffee shops your connections like to work
                    from.   
                  </p>
                </div>
              </div>
            </OwlCarousel>
          </Row>
        </Container>
      </section>

      <section
        className={`${cx.featuredSection}  ${cx.checkOutSection} ${st.sectionPaddingBottom}`}
      >
        <Container>
          <Col lg={12} className={`${st.title} text-center `}>
            <h2 className={`${st.heading}`}>
              check out our <br />
              trending cafes
              <span style={{ backgroundColor: "#CEDCF4", color: "#3B5A8E" }}>
                The hottest hangouts
              </span>
            </h2>
          </Col>
          <Row>
            {cafe.length>0 && <OwlCarousel className="owl-theme" {...options3}>
              {cafe
                ?.map((item: any, index: number) => {
                  const distance = mapFunc(distancePoint, {
                    lat: +item?.latitude,
                    lng: +item?.longitude,
                  });
                  return trendingCafe.some((e:any) => e===item?._id) && (
                    <div className="item " key={`${index}`}>
                      <CoffeeShop
                        status="inactive"
                        data={item}
                        distance={distance}
                      />
                    </div>
                  );
                })}
            </OwlCarousel>}
          </Row>

          <Col lg={12} className={`text-center mt-4 `}>
            <NavLink
              to="/cafe-listing"
              className={`btn ${st.btn2} ${st.active2}`}
            >
              Check out all the cafes
            </NavLink>
          </Col>
        </Container>
      </section>

      <section className={`${cx.cardSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Row>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <div className={`${cx.cardBox} `}>
                <NavLink to="/cafe-owner" className={`${cx.nextBtn}`}>
                  <img
                    src={coworking}
                    className={`${cx.icon}`}
                    alt="coworking"
                  />
                  <h5>
                    join the coworking <br />
                    craze and list your
                    <br /> cafe on Sync!
                  </h5>
                </NavLink>
                <div className={`${cx.overlay}`}>
                  <NavLink to="/cafe-owner" className={`${cx.nextBtn}`}>
                    <FaArrowRight />
                  </NavLink>
                  <svg
                    className={`${cx.bgShape}`}
                    width="91"
                    height="89"
                    viewBox="0 0 91 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0.499915C0.413197 0.489838 0.852842 0.489388 1.31458 0.499915H89.5C90 35.1666 90.7 100.8 89.5 86C88.3 71.2 73 67.8333 65.5 68C59.3333 67.6667 44.8 67.2 36 68C27.2 68.8 24.3333 62.3333 24 59V50C24.1667 42.6666 24.1 25.1999 22.5 13.9999C20.9967 3.47716 8.48891 0.663489 1.31458 0.499915H0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </Col>
            <Col md={6} lg={6} xl={6} xxl={6}>
              <div className={`${cx.cardBox} ${cx.cardBox2} `}>
                <NavLink to="/about-us" className={`${cx.nextBtn}`}>
                  <img src={star2} className={`${cx.icon}`} alt="star2" />
                  <h5>
                    meet the people <br />
                    behind the platform
                  </h5>
                </NavLink>
                <div className={`${cx.overlay}`}>
                  <NavLink to="/about-us" className={`${cx.nextBtn}`}>
                    <FaArrowRight />
                  </NavLink>
                  <svg
                    className={`${cx.bgShape}`}
                    width="91"
                    height="89"
                    viewBox="0 0 91 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0.499915C0.413197 0.489838 0.852842 0.489388 1.31458 0.499915H89.5C90 35.1666 90.7 100.8 89.5 86C88.3 71.2 73 67.8333 65.5 68C59.3333 67.6667 44.8 67.2 36 68C27.2 68.8 24.3333 62.3333 24 59V50C24.1667 42.6666 24.1 25.1999 22.5 13.9999C20.9967 3.47716 8.48891 0.663489 1.31458 0.499915H0Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${cx.featuredSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Col lg={12} className={`${st.title} text-center`}>
            <h2 className={`${st.heading} `}>
              read up on our <br />
              latest articles
              <span style={{ backgroundColor: "#D2BCF4", color: "#8A4AED" }}>
                The buzzzz
              </span>
            </h2>
          </Col>
          <Row>
            {blogData?.map((item: any, index: number) => {
              return (
                index < 4 && (
                  <Col
                    md={6}
                    lg={3}
                    xl={3}
                    xxl={3}
                    className=""
                    key={item?._id}
                  >
                    <Blog item={item} />
                  </Col>
                )
              );
            })}
          </Row>

          <Col lg={12} className={`text-center mt-4`}>
            <NavLink to="/blog" className={`btn ${st.btn2} `}>
              See all articles
            </NavLink>
          </Col>
        </Container>
      </section>
      {window.location.pathname.endsWith("/admin/login") && <AdminLogin />}
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={
          "Your Email is verified successfully. We have received your request, you will receive an email as soon as we have an update for you."
        }
      />
    </>
  );
};

export default Home;
