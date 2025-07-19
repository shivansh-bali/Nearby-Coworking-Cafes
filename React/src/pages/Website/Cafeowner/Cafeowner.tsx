import React, { useEffect, useState } from "react";
import cx from "./Cafeowner.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { NavLink, useParams } from "react-router-dom";
import { Container, Form, Col, Row } from "react-bootstrap";
import {
  coffeeShop1,
  hand_shake,
  headerBackground,
  image_end,
  image_left,
  image_right,
  join_community_bg,
  people,
  text_message,
} from "../../../assets/images";
import { HiLocationMarker } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { ClaimYourListing } from "../../../components/Website/Modals";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";
import { AddressAutofill } from "@mapbox/search-js-react";
import { allCafe, allEmail, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import { claimCafeFunc } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";

const Cafeowner = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [searchLocation, setSearchLocation] = useState("");
  const [city, setCity] = useState("");
  const [cafes, setCafes] = useState(cafeList);

  // for dropdown
const param = useParams()
  const [businessListed, setbusinessListed] = useState(false);
  const [businessName, setBusinessName] = useState({ establishmentName: "" });
  const [selectedCafe, setSelectedCafe] = useState<any>();
  const businessListedDropdown = () => {
    setbusinessListed(!businessListed);
  };
  const [fieldError, setFieldError] = useState<any>({});
  // for dropdown

  const [afterShowModule, setafterShowModule] = useState(false);
  const [beforeModule, setbeforeModule] = useState(true);
  useEffect(()=>{
    if(param?.id){
      setafterShowModule(true)
      setbeforeModule(false)
      const cafeData = cafeList?.filter((e:any)=>e?._id===param?.id)
      setSelectedCafe(cafeData[0])
    }
  },[param])
  const dispatch = useDispatch();
  const afterShowModulef = () => {
    setafterShowModule(!afterShowModule);
    setbeforeModule(false);
  };
  const beforeShowModulef = () => {
    setafterShowModule(!afterShowModule);
    setbeforeModule(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(allCafe());
  }, [dispatch]);
  useEffect(() => {
    const filteredCafe = cafeList?.filter((a:any) => !a?.isMember || a?.isMember === "no")
    setCafes(filteredCafe);
  }, [cafeState.allCafeState]);
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
  }, [profileState.mapFuncState]);
  return (
    <>
      <div className={`${cx.spaceBox} `}>
        <section className={`${cx.bannerSection}`}>
          <img src={headerBackground} alt="headerBackground" />
          <Container>
            <Col md={8} className={`m-auto ${cx.contentBox}`}>
              <div className={`${cx.contentHeading}`}>
                <h1>expand your reach</h1>
                <p>Become a remote work hub, on your terms</p>
                {/* {!afterShowModule && <NavLink to="/cafe-step" className={`btn ${cx.btnSubmit}`}>
                  Add my place to Sync!
                </NavLink>} */}
              </div>
            </Col>

            {/* before show */}
            {beforeModule && (
              <div className={`${cx.searchForm}`}>
                <h5>Is your business already listed?</h5>
                <Form>
                  <div className={`${cx.searchFormBody}`}>
                    <Form.Group className={`${cx.formBox}`}>
                      <span className={`${cx.icon}`}>
                        <HiLocationMarker />
                      </span>
                      <AddressAutofill accessToken={accessToken}>
                        <Form.Control
                          placeholder="Location"
                          autoComplete="shipping address-line1"
                          value={searchLocation}
                          onChange={(e: any) => {
                            setCafes(cafeList);
                            setSearchLocation(e.target.value);
                            setFieldError((prev: any) => {
                              return { ...prev, searchLocation: "" };
                            });
                          }}
                        />
                      </AddressAutofill>
                      <input
                        autoComplete="shipping address-level2"
                        value={city}
                        onChange={async (e: any) => {
                          setCity(e.target.value);
                          setSearchLocation(
                            searchLocation + " " + e.target.value
                          );
                          const filtered = cafeList.filter(
                            (item: any, index: number) =>
                              item?.streetAddress
                                ?.toLowerCase()
                                .indexOf(e.target.value.toLowerCase()) !== -1 &&
                              item?.isClaimed === false && (!item?.isMember || item?.isMember === "no")
                          );

                          setCafes(filtered);
                        }}
                        style={{
                          visibility: "hidden",
                          height: "0px",
                          width: "0px",
                          position: "absolute",
                        }}
                      />
                    </Form.Group>
                    <Form.Group className={`${cx.formBox}`}>
                      <span
                        className={`${cx.icon}`}
                        style={{ fontSize: "18px" }}
                      >
                        <FaSearch />
                      </span>
                      <Form.Control
                        placeholder="Business name"
                        onClick={businessListedDropdown}
                        value={businessName?.establishmentName}
                        onChange={(e: any) => {
                          setBusinessName((prev: any) => {
                            return {
                              ...prev,
                              establishmentName: e.target.value,
                            };
                          });
                          setFieldError((prev: any) => {
                            return { ...prev, establishmentName: "" };
                          });
                          let newList = cafeList.filter((item: any) => {
                            return (
                              item?.establishmentName
                                ?.toLowerCase()
                                .indexOf(e.target.value.toLowerCase()) !== -1 && (!item?.isMember || item?.isMember === "no")
                            );
                          });
                          setCafes(newList);
                        }}
                      />
                      {businessListed && (
                        <div className={`${cx.dropdownList}`}>
                          <h3>{cafes?.length} Results found</h3>
                          <div className={`${cx.userFound}`}>
                            <ul>
                              {cafes?.map((item: any, index: number) => {
                                return(
                                  <li
                                    key={index}
                                    onClick={() => {
                                      setSelectedCafe(item);
                                      dispatch(claimCafeFunc(item));
                                      setBusinessName({
                                        establishmentName:
                                          item?.establishmentName,
                                      });
                                      businessListedDropdown();
                                      setFieldError((prev: any) => {
                                        return {
                                          ...prev,
                                          establishmentName: "",
                                        };
                                      });
                                    }}
                                  >
                                    <img src={coffeeShop1} alt="coffeeShop1" />
                                    <div className={`${cx.locationList}`}>
                                      <h5>{item?.establishmentName}</h5>
                                      <p>{item?.streetAddress} </p>
                                    </div>
                                  </li>
                                );
                              })}

                              {cafes?.length < 1 && (
                                <li
                                  style={{
                                    borderTop: "1px solid var(--Main5)",
                                  }}
                                >
                                  <div className={`${cx.locationList}`}>
                                    <p>Can't find your business?</p>
                                    <NavLink
                                      to="/cafe-step"
                                      style={{
                                        color: "black",
                                        textDecoration: "underline",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      List it Now
                                    </NavLink>
                                  </div>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* user not found */}
                      {/* 
                    <div className={`${cx.dropdownList}`}>
                      <h3>No results found</h3>
                      <div className={`${cx.notFound}`}>
                       <p>Can’t find your business?</p>
                       <NavLink to="#">List it now</NavLink>
                      </div>
                    </div>   */}
                      {/* user not  found end */}
                    </Form.Group>
                    {fieldError?.establishmentName}
                    <div className={`${cx.btnSubmit}`}>
                      <NavLink
                        to="#"
                        className={`btn ${st.btn2} ${st.active2}`}
                        onClick={(e: any) => {
                          e.preventDefault();
                          dispatch(allEmail())
                         if (
                            businessName?.establishmentName?.trim() === ""
                          ) {
                            setFieldError((prev: any) => {
                              return {
                                ...prev,
                                establishmentName: (
                                  <p className={`${cm.error}`}>
                                    {" "}
                                    This field is required{" "}
                                  </p>
                                ),
                              };
                            });
                          } else {
                            afterShowModulef();
                          }
                        }}
                      >
                        Start searching now
                      </NavLink>
                    </div>
                  </div>
                </Form>
              </div>
            )}

            {/* after show  */}
            {afterShowModule && (
              <div className={`${cx.searchbox}`}>
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <div className={` ${cx.searchtext}`}>
                      <div className={`${cx.searchitem}`}>
                        <div className={`${cx.searchmenu}`}>
                          <img src={coffeeShop1} alt="" />
                          <div className={` ${cx.searchcontent}`}>
                            <h6>{selectedCafe?.establishmentName}</h6>
                            <span>{selectedCafe?.streetAddress}</span>
                          </div>
                        </div>
                        <div className={`${cx.textnumber}`}>
                          {selectedCafe?.image?.length > 0 && (
                            <div className={`${cx.photonumber}`}>
                              <p>{selectedCafe?.image?.length}</p>
                              <span>Photos</span>
                            </div>
                          )}
                          {+selectedCafe?.reviewsNumber +
                            selectedCafe?.ratingReviews?.length >
                            0 && (
                            <div className={`${cx.photonumber1}`}>
                              <p>
                                {+selectedCafe?.reviewsNumber +
                                  selectedCafe?.ratingReviews?.length}
                              </p>
                              <span>Reviews</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className={` ${cx.text_content}`}>
                        <div className="mt-3">
                          <p>
                            {" "}
                            Not the your business? Kindly{" "}
                            <NavLink to="#" onClick={beforeShowModulef}>
                              search again.
                            </NavLink>
                          </p>
                        </div>
                        <div className={`${cx.btnSubmit}`}>
                          <button
                            className={`btn ${st.btn2} ${st.active2}`}
                            onClick={handleShow}
                          >
                            Claim your free listing
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Container>
        </section>
      </div>

      <section className={`${cx.cardSection}`}>
        <Container>
          <Row className={`${cx.cardRow}`}>
            <Col lg={6} md={6}>
              <div className={`${cx.imgBox}`}>
                <img src={image_left} alt="" />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className={`${cx.contentBox}`}>
                <span>Manage</span>
                <h3>Take control of your business profile</h3>
                <p>
                  Customize your profile, upload photos, and include any <br />
                  information that you think people need to know before <br />
                  working from your business.
                </p>
              </div>
            </Col>
          </Row>

          <Row className={`${cx.cardRow}`}>
            <Col lg={6} md={6}>
              <div className={`${cx.contentBox}`}>
                <span>Connect</span>
                <h3>Engage with your customers</h3>
                <p>
                  Join the conversation by responding to reviews and see what
                  people are saying about your business.
                </p>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className={`${cx.imgBox}`}>
                <img src={image_end} alt="" />
              </div>
            </Col>
          </Row>

          <Row className={`${cx.cardRow}`}>
            <Col lg={6} md={6}>
              <div className={`${cx.imgBox}`}>
                <img src={image_right} alt="" />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className={`${cx.contentBox}`}>
                <span>Grow</span>
                <h3>Track your performance</h3>
                <p>
                  Access key insights to see how people are engaging with your
                  business on Sync.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${cx.chooseUsSection}`}>
        <Container>
          <div className={`${cx.titleBox}`}>
            <h2>Why Sync?</h2>
          </div>
          <Row>
            <Col lg={4} md={12}>
              <div className={`${cx.chooseUsCard}`}>
                <img
                  src={hand_shake}
                  className={`${cx.iconBox}`}
                  alt="handShake"
                />
                <div className={`${cx.chooseUsBody}`}>
                  <h4>
                    Let the world – or at least, your city – know that you are
                    remote work-friendly.
                  </h4>
                </div>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <div
                className={`${cx.chooseUsCard}`}
                style={{ background: "#F9EBD7", color: "#B98900" }}
              >
                <img src={people} className={`${cx.iconBox}`} alt="people" />
                <div className={`${cx.chooseUsBody}`}>
                  <h4>
                    More exposure = <br />
                    More customers!
                  </h4>
                </div>
              </div>
            </Col>

            <Col lg={4} md={12}>
              <div
                className={`${cx.chooseUsCard}`}
                style={{ background: "#AEE1EF", color: "#0989AD" }}
              >
                <img
                  src={text_message}
                  className={`${cx.iconBox}`}
                  alt="textMessage"
                />
                <div className={`${cx.chooseUsBody}`}>
                  <h4>Share any updates or promotions you’re offering.</h4>
                </div>
              </div>
            </Col>
          </Row>

          <div className={`${cx.joinCommunity}`}>
            <img
              src={join_community_bg}
              className={`${cx.background}`}
              alt=""
            />
            <div className={`${cx.joinCommunityBody}`}>
              <h4>Join our community of remote work-friendly cafes</h4>
              <p>
                You want people to work from your cafe. People are looking for
                cafes to work from. We’re here to help you both Sync!
              </p>
              <p>
                Sync is a platform that shows which cafes people can work from
                in their city. With both a map and catalog, remote workers can
                search for cafes while filtering by their specific needs, like
                strong WiFi, how loud or quiet the environment is, what the
                table layout looks like, and more.{" "}
              </p>
              {/* {!afterShowModule && <NavLink to="/cafe-step" className={`btn ${cx.btnSubmit}`}>
                Add my place to Sync!
              </NavLink>} */}
            </div>
          </div>
        </Container>
      </section>
      <ClaimYourListing show={show} handleClose={handleClose} selectedCafe={selectedCafe}/>
    </>
  );
};

export default Cafeowner;
