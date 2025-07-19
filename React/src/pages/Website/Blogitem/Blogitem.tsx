import React from "react";
import cx from "./Blogitem.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { NavLink } from "react-router-dom";
import { Container, Form, Col, Row } from "react-bootstrap";
import {
  BlogImage,
  Filled,
  Haley,
  Logo,
  bannerimg,
} from "../../../assets/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Blog } from "../../../components/Website";

const BlogItem = (props: any) => {
  const options = {
    loop: true,
    items: 4,
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
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  };

  return (
    <>
      <section className={`${cx.cafeHeader}`}>
        <Container>
          <NavLink to="/">
            <img src={Logo} className={`${cx.logo}`} alt="logo" />
          </NavLink>
        </Container>
      </section>
      <div className={`${cx.spaceBox} `}>
        <section className={`${cx.bannerSection}`}>
          <img src={bannerimg} alt="bannerImage" />
          <Container>
            <Col md={8} className={`m-auto ${cx.contentBox}`}>
              <div className={`${cx.contentHeading}`}>
                <h1>
                  find laptop-friendly <br /> coffee shops near you
                </h1>
                <p className="mt-4">
                  Need great WiFi, big tables, charging outlets, and lots of
                  light? You got it! <br /> Discover cafes near you that tick
                  all your work-from-home boxes – and <br /> check out which
                  spotsyour friends like to work from.
                </p>
              </div>
            </Col>

            <div className={`${cx.searchForm}`}>
              <h5>Sign up below to be notified as soon as we launch</h5>
              <Form>
                <div className={`${cx.searchFormBody}`}>
                  <Form.Group className={`${cx.formBox}`}>
                    <Form.Label>Full Name*</Form.Label>
                    <Form.Control type="type" placeholder="Your full name" />
                  </Form.Group>
                  <Form.Group className={`${cx.formBox}`}>
                    <Form.Label>Email address*</Form.Label>
                    <Form.Control
                      type="type"
                      placeholder="Your email address"
                    />
                  </Form.Group>
                  <div className={`${cx.btnSubmit}`}>
                    <NavLink className={`btn ${st.btn2}`} to="#">
                      Sign up!
                    </NavLink>
                  </div>
                </div>
              </Form>
            </div>
          </Container>
        </section>
      </div>

      <section className={`${cx.articleSection}`}>
        <Container>
          <Col lg={12} className={`${st.title} text-left`}>
            <h2 className={`${st.heading}`}>
              catch up on our <br />
              latest articles
              <span
                className="text-center"
                style={{ backgroundColor: "#D2BCF4", color: "#8A4AED" }}
              >
                The buzzzz
              </span>
            </h2>
          </Col>
          <Row className="align-items-center">
            <Col md={7}>
              <div className={`${cx.blog}`}>
                <div className={`${cx.blogImg}`}>
                  <img
                    src={BlogImage}
                    className={`${cx.image}`}
                    alt="blogImage"
                  />
                  <div className={`${cx.overlay}`}>
                    <img
                      src={Filled}
                      className={`${cx.shapeBg}`}
                      alt="filled"
                    />
                    <NavLink
                      to="/blog/blog-details"
                      className={`${cx.viewBtn}`}
                    >
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.49227 17.7434L13.9394 7.2962L13.9394 16.3687C13.9394 17.4685 14.7642 18.2932 15.8639 18.2932C16.9636 18.2932 17.7884 17.4685 17.7884 16.3687L17.7884 2.62246C17.7884 1.52276 16.9636 0.697982 15.8639 0.697982L2.11764 0.697983C1.01794 0.697982 0.193161 1.52276 0.193162 2.62246C0.193162 3.72217 1.01794 4.54694 2.11764 4.54694L11.1902 4.54694L0.743011 14.9941C-0.081767 15.8189 -0.0817671 16.9186 0.74301 17.7434C1.43032 18.4307 2.66749 18.5682 3.49227 17.7434Z"
                          fill="#738801"
                        />
                      </svg>
                    </NavLink>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className={`${cx.blogBody}`}>
                <NavLink to="/blog/blog-details" className={`${cx.category}`}>
                  Blog
                </NavLink>
                <h3>
                  <NavLink to="/blog/blog-details">
                    Best Cafes in New York to work from
                  </NavLink>
                </h3>
                <p>12th March 2023</p>

                <div className={`${cx.regards}`}>
                  <img src={Haley} alt="haley" />
                  <p>
                    by <b>Haley Grant</b> <span></span> CPO & Co-Founder of Sync
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${cx.blogItemSection}`}>
        <Container>
          <Col md={12} className={`${cx.titleS}`}>
            <h5>read more</h5>
          </Col>
          <Row>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <Blog />
              </div>
              <div className="item">
                <Blog />
              </div>
              <div className="item">
                <Blog />
              </div>
              <div className="item">
                <Blog />
              </div>
              <div className="item">
                <Blog />
              </div>
            </OwlCarousel>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogItem;
