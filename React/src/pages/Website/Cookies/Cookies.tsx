import React, { useEffect } from "react";
import cx from "./Cookies.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import {
  Intersect,
  aboutBlue,
  aboutPurple,
  aboutorange,
  iconS,
  star2,
} from "../../../assets/images";

const Cookies = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={`${cx.bannerSection} ${cx.section_padding}`}>
        <Container>
          <Row>
            <Col
              md={10}
              lg={9}
              xl={9}
              xxl={9}
              className={`m-auto ${cx.contentBox}`}
            >
              <div className={`${cx.contentHeading}`}>
                <h1>
                  <img src={iconS} className={`${cx.imgBox}`} alt="icon" />
                  cookies
                </h1>
              </div>
              <div className={`${cx.blogText}`}>
                <div className="col-md-10 position-relative">
                  <img
                    src={aboutBlue}
                    className={`${cx.shape1}`}
                    alt="aboutBlue"
                  />
                  <h3>
                    This page describes what information they gather, how we use
                    it and why we sometimes need to store these cookies.
                  </h3>
                </div>
                <h5>what are cookies</h5>
                <p>
                  As is common practice with almost all professional websites
                  this site uses cookies, which are tiny files that are
                  downloaded to your computer, to improve your experience.This
                  page describes what information they gather, how we use it and
                  why we sometimes need to store these cookies. We will also
                  share how you can prevent these cookies from being stored
                  however this may downgrade or 'break' certain elements of the
                  sites functionality.For more general information on cookies
                  see the Wikipedia article on HTTP Cookies
                  https://en.wikipedia.org/wiki/HTTP_cookie.
                </p>
                <div className="position-relative">
                  <img
                    src={aboutorange}
                    className={`${cx.shape2}`}
                    alt="aboutRange"
                  />
                  <h5>disabling cookies</h5>
                  <p>
                    You can prevent the setting of cookies by adjusting the
                    settings on your browser (see your browser Help for how to
                    do this). Be aware that disabling cookies will affect the
                    functionality of this and many other websites that you
                    visit.Disabling cookies will usually result in also
                    disabling certain functionality and features of this site.
                    Therefore, it is recommended that you do not disable
                    cookies.
                  </p>
                </div>

                <div className="position-relative">
                  <img
                    src={aboutPurple}
                    className={`${cx.shape3}`}
                    alt="aboutPurple"
                  />
                  <h5>the cookies we set</h5>
                  <p>
                    If you create an account with us then we will use cookies
                    for the management of the signup process and general
                    administration. These cookies will usually be deleted when
                    you log out however in some cases they may remain afterwards
                    to remember your site preferences when logged out. We use
                    cookies when you are logged in so that we can remember this
                    fact. This prevents you from having to log in every single
                    time you visit a new page.{" "}
                  </p>
                </div>
                <p>
                  These cookies are typically removed or cleared when you log
                  out to ensure that you can only access restricted features and
                  areas when logged in. This site offers newsletter or email
                  subscription services and cookies may be used to remember if
                  you are already registered and whether to show certain
                  notifications which might only be valid to
                  subscribed/unsubscribed users.{" "}
                </p>
                <p>
                  This site offers e-commerce or payment facilities and some
                  cookies are essential to ensure that your order is remembered
                  between pages so that we can process it properly. When you
                  submit data to through a form such as those found on contact
                  pages or comment forms cookies may be set to remember your
                  user details for future correspondence.
                </p>

                <div className="position-relative">
                  <img
                    src={star2}
                    className={`${cx.shape3}`}
                    alt="aboutPurple"
                  />
                  <img
                    src={Intersect}
                    className={`${cx.shape4}`}
                    alt="aboutPurple"
                  />
                  <h5>third party cookies</h5>
                  <p>
                    In some special cases we also use cookies provided by
                    trusted third parties. The following section details which
                    third party cookies you might encounter through this site.
                    This site uses Google Analytics which is one of the most
                    widespread and trusted analytics solution on the web for
                    helping us to understand how you use the site and ways that
                    we can improve your experience.{" "}
                  </p>
                  <p>
                    These cookies may track things such as how long you spend on
                    the site and the pages that you visit, so we can continue to
                    produce engaging content. For more information on Google
                    Analytics cookies, see the official Google Analytics page.
                    From time to time we test new features and make subtle
                    changes to the way that the site is delivered.{" "}
                  </p>
                  <p>
                    When we are still testing new features these cookies may be
                    used to ensure that you receive a consistent experience
                    whilst on the site whilst ensuring we understand which
                    optimisations our users appreciate the most. The Google
                    AdSense service we use to serve advertising uses a
                    DoubleClick cookie to serve more relevant ads across the web
                    and limit the number of times that a given ad is shown to
                    you.{" "}
                  </p>
                  <p>
                    For more information on Google AdSense see the official
                    Google AdSense privacy FAQ. We also use social media buttons
                    and/or plugins on this site that allow you to connect with
                    your social network in various ways. For these to work the
                    following social media sites including; Facebook, Twitter,
                    will set cookies through our site which may be used to
                    enhance your profile on their site or contribute to the data
                    they hold for various purposes outlined in their respective
                    privacy policies.
                  </p>
                </div>

                <h5>more information</h5>
                <p>
                  Hopefully that has clarified things for you and as was
                  previously mentioned if there is something that you aren't
                  sure whether you need or not it's usually safer to leave
                  cookies enabled in case it does interact with one of the
                  features you use on our site.{" "}
                </p>
                <p>
                  However, if you are still looking for more information then
                  you can contact us through one of our preferred contact
                  methods. Email: info@syncremote.co We also use social media
                  buttons and/or plugins on this site that allow you to connect
                  with your social network in various ways. For these to work
                  the following social media sites including; Facebook, Twitter,
                  will set cookies through our site which may be used to enhance
                  your profile on their site or contribute to the data they hold
                  for various purposes outlined in their respective privacy
                  policies.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cookies;
