import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./BusinessProfile.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Form, Col, Row } from "react-bootstrap";
import { MdOutlineChevronLeft } from "react-icons/md";
// images
import {
  time,
  number,
  menu,
  webbrowser,
  reviewImg,
  review_icon,
  location,
  location2,
  cafeImg,
  upload,
  cWifi,
  cAcceptCards,
  cBigTables,
  cCashlessPayment,
  cFreeParking,
  cLargeGroups,
  cQuietVibe,
  cOutsideDining,
  cSmallGroups,
  cMultipleSockets,
} from "../../../assets/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsFillStarFill } from "react-icons/bs";
import { AiFillStar, AiTwotoneStar } from "react-icons/ai";
import { ReviewC } from "../../../components/Website";
import { ShareLocationM } from "../../../components/Website/Modals";

const BusinessProfile = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);
  const [toggle, setToggle] = useState(false);
  const [reviewButtons, setReviewButtons] = useState<any>({
    step1: true,
    step2: false,
    step3: false,
  });

  const options = {
    loop: true,
    items: 4,
    dots: false,
    nav: true,
    autoplay: false,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 3,
      },
    },
  };
  const option1 = {
    loop: true,
    items: 3,
    dots: false,
    nav: true,
    autoplay: false,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 1,
      },
    },
  };
  return (
    <>
      <div className={`${cx.fixSpace}`}></div>
      <div className={`${cx.space}`}>
        <section className={`${cx.sliderSection}`}>
          <OwlCarousel className="owl-theme" {...option1}>
            <div className="item">
              <img src={cafeImg} alt="cafeImg" />
            </div>
            <div className="item">
              <img src={cafeImg} alt="cafeImage" />
            </div>
          </OwlCarousel>
          <div className={`${cx.overlay}`}>
            <div className={`${cx.visitorRating}`}>
              <p>
                Visitor
                <br />
                Ratings
              </p>
              <AiFillStar className={`${cx.starIcon}`} />
              <h4>4.5 </h4>
              {/* <span>153 Reviews</span> */}
            </div>
            <svg
              className={`${cx.bgShape}`}
              viewBox="0 0 199 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M198 0.5C198.22 1.77817 198.275 3.39435 198 5.08038V135.5C128.167 136 -9.00019 136.7 0.999812 135.5C10.9998 134.3 12.1666 125.667 11.5 121.5C11.3333 99.1667 11.1 50.6 11.5 35C11.9 19.4 24.6666 15.1667 31 15H49H184.5C193.915 15 197.234 9.76999 198 5.08038V0.5Z"
                fill="#FBFBFB"
              />
            </svg>
          </div>
          <div>
            <NavLink to="/cafe-listing" className={`${cx.left_arrow}`}>
              <MdOutlineChevronLeft />
            </NavLink>
          </div>
        </section>
      </div>
      <section className={`${cx.bannerSection} ${cx.section_padding}`}>
        <Container>
          <Row>
            <Col lg={8} className="mt-4">
              <div className={` ${cx.contentBox}`}>
                <Row>
                  <div className={`${cx.visited_cafe}`}>
                    <NavLink to="#">See who visited the cafe</NavLink>
                    <div className="d-flex">
                      <button
                        className={`${cx.locationIcon} ${
                          toggle === true ? cx.active : ""
                        }`}
                        onClick={() => setToggle(!toggle)}
                      >
                        <img
                          src={toggle === true ? location2 : location}
                          alt="location"
                        />
                      </button>
                      <button
                        className={`${cx.Cafe_icons}`}
                        onClick={handlelocationShow}
                      >
                        <img src={upload} alt="" />
                      </button>
                    </div>
                  </div>

                  <div className={`${cx.contentHeading}`}>
                    <h1> James Coffee &Brews</h1>
                    <p>
                      Greater Boston, Boston .15 km . <span>Open</span>
                    </p>
                  </div>

                  <Col className="col-6" lg={6} md={12}>
                    <div className={`${cx.content_btn}`}>
                      <button> Save for later</button>
                    </div>
                  </Col>
                  <Col className="col-6" lg={6} md={12}>
                    <div className={`${cx.content_btn}`}>
                      <button>Get directions</button>
                    </div>
                  </Col>
                  <Col lg={12} className={`${cx.content_detail} mt-4`}>
                    <div className="d-flex flex-wrap">
                      <p>
                        <img src={time} alt="time" /> <span>09:00 - 19:00</span>
                      </p>
                      <p>
                        <NavLink to="#">
                          <img src={number} alt="number" />{" "}
                          <span>+43 663 302 192</span>
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="#">
                          <img src={webbrowser} alt="webbrowser" />
                          <span>Jamescoffeebrew.com</span>
                        </NavLink>
                      </p>
                    </div>
                    <div>
                      <p style={{ paddingRight: "0px" }}>
                        <NavLink to="#">
                          <img src={menu} alt="" /> <span>Download Menu</span>
                        </NavLink>
                      </p>
                    </div>
                  </Col>
                  <hr />
                  <Col lg={12} className={`${cx.about_detil} my-3`}>
                    <div>
                      <h3>About</h3>
                      <p>
                        James Brews & Coffee is a cafe is designed with the
                        modern, mobile workforce in mind. We provide a cozy,
                        welcoming atmosphere where you can work comfortably for
                        hours on end. We understand that working remotely can be
                        a challenge
                      </p>

                      <ul>
                        <li>
                          Free Wi-Fi: Stay connected with high-speed internet
                          access throughout the cafe.
                        </li>
                        <li>
                          ower Outlets: We have plenty of outlets available for
                          you to charge your devices.
                        </li>
                        <li>
                          Comfortable Seating: Choose from a variety of seating
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <hr />
                  <Col lg={12} className={`${cx.top_amenties} mt-4`}>
                    <h3> Top Amenities</h3>

                    <ul>
                      <li>
                        <img src={cWifi} alt="wifi" />
                        <span>Wifi</span>
                      </li>
                      <li>
                        <img src={cAcceptCards} alt="acceptCards" />
                        <span>Accept Cards</span>
                      </li>
                      <li>
                        <img src={cBigTables} alt="bigTables" />
                        <span>Big Tables</span>
                      </li>
                      <li>
                        <img src={cCashlessPayment} alt="cashlessPayment" />
                        <span>Cashless Payment</span>
                      </li>
                      <li>
                        <img src={cFreeParking} alt="freeParking" />
                        <span>Free Parking</span>
                      </li>
                      <li>
                        <img src={cLargeGroups} alt="largeGroups" />
                        <span>Large Groups</span>
                      </li>
                      <li>
                        <img src={cMultipleSockets} alt="multipleSockets" />
                        <span>Multiple Sockets</span>
                      </li>
                      <li>
                        <img src={cOutsideDining} alt="outsideDining" />
                        <span>Outside Dining</span>
                      </li>
                      <li>
                        <img src={cQuietVibe} alt="quiteVibe" />
                        <span>Quiet Vibe</span>
                      </li>
                      <li>
                        <img src={cSmallGroups} alt="smallGroup" />
                        <span>Small Groups</span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={4} className="mt-4">
              <div className={` ${cx.contentBox}`}>
                {reviewButtons.step1 === true && (
                  <Row>
                    <Col lg={12}>
                      <div className={`${cx.contentHeading2}`}>
                        <p>Leave a review</p>
                        <h1>Have you worked here? Tell us how you like it!</h1>
                      </div>
                      <div className={`${cx.rating_btn}`}>
                        <ul>
                          <li>
                            <button>1</button>
                          </li>
                          <li>
                            <button>2</button>
                          </li>
                          <li>
                            <button>3</button>
                          </li>
                          <li>
                            <button>4</button>
                          </li>
                          <li>
                            <button>5</button>
                          </li>
                        </ul>
                        <p>From 1 (poor) to 5 (Excellent)</p>
                      </div>
                    </Col>
                    <Col lg={12} className={`${cx.form_box}`}>
                      <Form.Group className="text-center mt-2">
                        <Form.Label className="mb-3">
                          Anything you wanna add? (Optional)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          as={"textarea"}
                          rows={4}
                          cols={10}
                          placeholder="Type your message here"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={12} className={`text-center mt-4`}>
                      <button
                        className={`btn ${st.btn2}`}
                        style={{ width: "100%" }}
                        onClick={() => {
                          setReviewButtons((prev: any) => {
                            return { ...prev, step1: false, step2: true };
                          });
                        }}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                )}

                {reviewButtons.step2 === true && (
                  <Row>
                    <Col lg={12}>
                      <div className={`${cx.contentHeading2}`}>
                        <p>Leave a review</p>
                        <h1>Tell us a bit more!</h1>
                      </div>

                      <div className={`${cx.ratingBox}`}>
                        <p>How was the WiFi quality?</p>
                        <div className={`${cx.ratingStar}`}>
                          <button className={`${cx.active}`}>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                        </div>
                      </div>

                      <div className={`${cx.ratingBox}`}>
                        <p>How was the outlet availability?</p>
                        <div className={`${cx.ratingStar}`}>
                          <button className={`${cx.active}`}>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                        </div>
                      </div>

                      <div className={`${cx.ratingBox}`}>
                        <p>How would you rate the overall atmosphere?</p>
                        <div className={`${cx.ratingStar}`}>
                          <button className={`${cx.active}`}>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                          <button>
                            <BsFillStarFill />
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} className={`text-center mt-5`}>
                      <button
                        className={`btn ${st.btn2}`}
                        style={{ width: "100%" }}
                        onClick={() => {
                          setReviewButtons((prev: any) => {
                            return { ...prev, step2: false, step3: true };
                          });
                        }}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                )}

                {reviewButtons.step3 === true && (
                  <Row>
                    <Col lg={12}>
                      <div className={`${cx.contentHeading2} mt-5`}>
                        <h1>
                          🎉 <br />
                          Your review has been added. <br />
                          Thank you!
                        </h1>
                      </div>
                    </Col>
                    <Col lg={12} className={`text-center mt-5`}>
                      <button
                        className={`btn ${st.btn2}`}
                        style={{ width: "100%" }}
                      >
                        Recommend to friends
                      </button>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${cx.featuredSection}  ${cx.padding_top}`}>
        <Container>
          <div className={` ${cx.reviewBg}`}>
            <Col lg={12}>
              <h3>From the community</h3>
            </Col>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <ReviewC />
              </div>
              <div className="item">
                <ReviewC />
              </div>
              <div className="item">
                <ReviewC />
              </div>
              <div className="item">
                <ReviewC />
              </div>
              <div className="item">
                <ReviewC />
              </div>
            </OwlCarousel>
          </div>
        </Container>
      </section>

      <section className={`${cx.padding_top}`}>
        <Row>
          <Col lg={12} className="m-auto">
            <div style={{ width: "96%", margin: "0px auto" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28470.648190513606!2d75.7496977!3d26.877109199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1680524324849!5m2!1sen!2sin"
                width="100%"
                height="350"
                loading="lazy"
                title="googleMap"
              ></iframe>
            </div>
          </Col>
        </Row>
      </section>

      <section className={`${cx.reviewSection} ${cx.padding_top} `}>
        <Container>
          <Row>
            <Col lg={4}>
              <div className={`${cx.reviewImg}`}>
                <img src={reviewImg} alt="reviewImage" />
              </div>
            </Col>
            <Col lg={8}>
              <div className={`${cx.reviewSide}`}>
                <div className={`${cx.allReviews} mt-2`}>
                  <p>
                    <NavLink to="/all-reviews">All reviews</NavLink>
                  </p>
                </div>
                <div className={`${cx.allReviews}`}>
                  <div className={`${cx.reviewFilter}`}>
                    <h5>Filter</h5>
                    <div className={`${cx.reviewDropdonw}`}>
                      <Form.Group>
                        <Form.Select>
                          <option>Date posted</option>
                          <option>Recent</option>
                          <option>Later</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Select>
                          <option>Gallery</option>
                          <option>With Photos</option>
                          <option>Without</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                  </div>
                  <hr />

                  <Row>
                    <Col lg={12}>
                      <div className={`${cx.cardBox_head}`}>
                        <div className={`${cx.reviewComment}`}>
                          <ul>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li style={{ color: "#878787" }}>(5.0)</li>
                          </ul>
                        </div>
                        <h3>Exceptional service!</h3>
                        <p>
                          This cozy restaurant has left the best impressions!
                          Hospitable hosts, delicious dishes, beautiful
                          presentation, wide wine list and wonderful dessert. I
                          recommend to everyone! I would like to come back here
                          again and again.
                        </p>
                        <div className="d-flex pt-3 ">
                          <img src={review_icon} alt="" />
                          <div className={`${cx.cardBox_head2}`}>
                            <h4>Tony Fowler</h4>

                            <p>
                              Social Media Influencer @ ABSCBN New York, United
                              States
                            </p>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </Col>

                    <Col lg={12}>
                      <div className={`${cx.cardBox_head}`}>
                        <div className={`${cx.reviewComment}`}>
                          <ul>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li>
                              <AiTwotoneStar />
                            </li>
                            <li style={{ color: "#878787" }}>(5.0)</li>
                          </ul>
                        </div>
                        <h3>Exceptional service!</h3>
                        <p>
                          This cozy restaurant has left the best impressions!
                          Hospitable hosts, delicious dishes, beautiful
                          presentation, wide wine list and wonderful dessert. I
                          recommend to everyone! I would like to come back here
                          again and again.
                        </p>
                        <div className="d-flex pt-3 ">
                          <img src={review_icon} alt="" />
                          <div className={`${cx.cardBox_head2}`}>
                            <h4>Tony Fowler</h4>

                            <p>
                              Social Media Influencer @ ABSCBN New York, United
                              States
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <ShareLocationM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
      />
    </>
  );
};

export default BusinessProfile;
