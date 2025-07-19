import React, { useEffect } from "react";
import cx from "./PrivacyPolicy.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { aboutBlue, aboutorange } from "../../../assets/images";
import { NavLink } from "react-router-dom";

const PrivacyPolicy = (props: any) => {
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
                  Privacy Policy and Cookies Statement
                </h1>
                <p>Effective: June 1, 2023</p>
              </div>
              <div className={`${cx.blogText}`}>
                <div className="col-md-12 position-relative">
                  <img
                    src={aboutBlue}
                    className={`${cx.shape1}`}
                    alt="aboutBlue"
                  />
                  <p>
                    Sync Remote LLC, hereinafter referred to as "Sync" or "we,"
                    is the lawful proprietor and operator of a software platform
                    specifically designed to offer a wide range of services (the
                    “Services”). These Services include, but are not limited to,
                    various functionalities such as the dissemination of
                    relevant information regarding potential workspaces,
                    recommendations for suitable places to work, the offering of
                    products that may be of interest to users, and facilitating
                    user-to-user/user-to-business communication through chat
                    functionality, real-time location sharing, workspace
                    preference sharing, as well as the exchange of information
                    or content through the platform. In the context of this
                    Agreement, the terms "you" and "your" shall refer to the
                    Users of Sync, including both individuals and businesses.
                  </p>
                  <p>
                    The term "Content" shall include any information, text,
                    links, graphics, photos, audio, videos, data, code, location
                    tracking, or other materials or arrangements of materials
                    that are accessible for viewing, accessing, or interacting
                    with through the Services.
                  </p>
                  <p>
                    This document constitutes our official Statement, providing
                    comprehensive information on the collection, utilization,
                    and management of your personal information. Our objective
                    is to ensure utmost clarity and comprehension. It
                    additionally outlines your rights, the appropriate manner of
                    exercising them, and methods of contacting our organization.
                    We kindly request your thorough review of this Statement, as
                    it elucidates our practices concerning information and
                    privacy. By accessing our websites, applications, and
                    affiliated social media platforms, inclusive of computer,
                    phone, tablet, or similar electronic devices (collectively
                    referred to as "Devices"), you acknowledge and confirm that
                    you have perused and comprehended the contents of this
                    Statement.
                  </p>
                </div>
                <h5>Information we collect and process</h5>
                <p>
                  By using our Services, we collect and process information from
                  and about you. The type of information we collect depends on
                  the kind of services that you are accessing. We gather certain
                  information in different ways. Some of it is collected
                  automatically when you interact with our servers or through
                  cookies and similar tracking technologies. We also collect
                  information from various sources, including you, business
                  partners, and independent third-party sources. If you access
                  our Services by clicking on a link from another website or use
                  our Services to visit third-party websites, those websites may
                  share information with us about how you use their services.
                </p>
                <p>
                  The information we may collect encompasses a range of data
                  points, including but not limited to: your name, age, gender,
                  phone number, email address, physical address, geolocation,
                  preferences, photographs, reviews, videos, device information
                  (such as IP address, browser type, connection characteristics,
                  device specifications, etc.), online activity, historical
                  records of interactions with our Services, billing details,
                  payment information, and information obtained from third-party
                  entities for the purpose of social media login. Furthermore,
                  we acquire location information when your Device transmits
                  such data to us.{" "}
                </p>
                <p>
                  For the businesses registered in our platform, as part of our
                  business operations we collect pertinent data that we believe
                  will facilitate the provision of our Services. Such
                  information may comprise the appellation and geographical
                  situation of the business, its opening hours, menu selection,
                  table layout and seating arrangement, and the quality and
                  accessibility of Wi-Fi, among other information.
                </p>
                <p>
                  For the purposes of this agreement, the term "Information"
                  shall encompass all of the data points mentioned above.
                </p>
                <div className="position-relative">
                  <img
                    src={aboutorange}
                    className={`${cx.shape2}`}
                    alt="aboutRange"
                  />
                  <h5>Information Uses and Purposes</h5>
                  <p>
                    Sync Remote utilizes the Information for the primary
                    objective of delivering the Services in an efficient and
                    effective manner. This includes but is not limited to
                    enhancing the functionality and usability of our Services,
                    tailoring them to meet individual preferences and
                    requirements, facilitating seamless communication between
                    users and stakeholders, as well as ensuring compliance with
                    applicable legal obligations and regulations.
                  </p>
                  <p>
                    Furthermore, we may employ the Information for marketing and
                    promotional purposes, such as informing users about new
                    features, updates, or relevant offers that may be of
                    interest to them. This enables us to personalize user
                    experiences, provide targeted recommendations, and optimize
                    the overall user engagement with our Services.
                  </p>
                  <p>
                    The Information is instrumental in enabling us to
                    personalize user experiences, optimize the performance of
                    our Services, and maintain transparency and accountability
                    in our operations. Additionally, we may employ the
                    Information for the purposes of legal compliance, risk
                    management, dispute resolution, and the enforcement of
                    rights and obligations as outlined in our contractual
                    agreements and governing laws.
                  </p>
                  <p>
                    By utilizing the Information in this manner, we strive to
                    uphold the integrity of our Services and provide users with
                    a secure and satisfactory experience. Rest assured that any
                    marketing or promotional activities involving the
                    Information will be conducted in accordance with applicable
                    laws and regulations, as well as industry best practices to
                    protect user privacy and ensure compliance with relevant
                    consent requirements.
                  </p>
                  <p>
                    Sync Remote LLC respects the privacy and safety of
                    individuals under the age of 13 and does not knowingly
                    collect their information. We reserve the right, at our sole
                    discretion, to deny access to the Services to anyone, at any
                    time, and for any reason, including violations of this
                    Agreement. We also reserve the right to take steps to verify
                    your identity and Right to deny access to anyone.
                  </p>

                  <h5>Information Sharing</h5>
                  <p>
                    In accordance with our privacy practices, we reserve the
                    right to disclose the Information to select entities,
                    including but not limited to suppliers, business partners,
                    social media websites, advertising networks, fraud detection
                    companies, and other third parties. This sharing of
                    Information is conducted within the parameters defined by
                    applicable laws and regulations, and it serves various
                    purposes aimed at optimizing our Services and promoting a
                    seamless user experience. It is important to note that we
                    undertake reasonable measures to ensure that any sharing of
                    Information is done in a manner consistent with legal
                    requirements and industry standards to safeguard user
                    privacy and maintain data security.
                  </p>
                  <p>
                    Additionally, if you ever want to close your account, you
                    can do so easily by accessing your user profile settings.
                    Just keep in mind that if you choose to close your account,
                    we'll deactivate it and make sure your profile information
                    is no longer visible to others.
                  </p>
                  <p>
                    However, it's worth mentioning that we may retain some
                    information related to your account, like past transactions,
                    for internal use. This includes purposes such as backups,
                    fraud prevention, dispute resolution, investigations, our
                    own legitimate business interests, and compliance with legal
                    requirements. We'll keep this information for as long as
                    it's necessary to fulfill the purposes stated in this
                    Statement.
                  </p>

                  <h5>Data Security </h5>
                  <p>
                    Sync diligently implements reasonable measures to safeguard
                    the Information. Nevertheless, it is important to
                    acknowledge that despite our best efforts, we cannot provide
                    an absolute guarantee of the security of information against
                    unauthorized access, use, or disclosure. Factors beyond our
                    control, such as unauthorized entry or use, hardware or
                    software failure, or other unforeseen circumstances, may
                    compromise the security and confidentiality of the
                    information. We strive to adopt industry-standard security
                    practices and regularly update our systems to mitigate
                    potential risks. However, users should be aware that the
                    transmission and storage of information over the internet
                    inherently involve certain risks, and it is advisable to
                    exercise caution when sharing sensitive or confidential
                    information through our Services.
                  </p>

                  <h5>Cookies Statement</h5>
                  <p>
                    In our commitment to provide you with a seamless and
                    valuable experience while accessing our Services, we employ
                    cookies and similar technologies to enhance browsing
                    efficiency, fortify website security, and deliver targeted
                    advertising. These cookies, which are small text files
                    placed on your Device during your visit to almost any
                    website, store essential information pertaining to your
                    internet usage. Subsequently, when you revisit the website,
                    your browser transmits this information back, facilitating
                    recognition of your Device and the provision of personalized
                    content. Furthermore, we utilize additional tracking
                    technologies such as pixels, SDKs, or server logs, which
                    perform similar functions. Cookies and tracking technologies
                    are instrumental in remembering your login details and
                    streamlining your preferences.
                  </p>
                  <p>
                    To afford you control over the deployment of these
                    technologies, we provide a Cookie Consent Tool accessible
                    via the "Cookie consent" link present on every page. Through
                    this tool, you possess the authority to customize and adjust
                    your cookie settings. Additionally, you may exercise cookie
                    management through the settings of your internet browser,
                    thereby enabling acceptance or rejection of specific
                    cookies. You retain the right to withdraw your consent to
                    cookies at any time by accessing the "Cookie consent" link,
                    modifying your preferences, and saving the changes made. It
                    is crucial to acknowledge that declining certain cookies may
                    result in restricted access to particular functionalities or
                    areas of our Services. Be assured that our utilization of
                    the information collected through cookies adheres to the
                    stipulations set forth in this Statement, which can be
                    accessed through a link available on every page of our
                    website.
                  </p>

                  <h5>Statement Changes</h5>
                  <p>
                    We reserve the right to modify this Statement in the future.
                    By continuing to access or use the Services after such
                    changes, you indicate your acceptance of the updated
                    Statement. Registered users of our Services, referred to as
                    "Account Holders," will be notified of significant changes
                    to these statements either through email sent to the
                    associated account or by displaying a notice on our
                    websites.
                  </p>

                  <h5>Contact</h5>
                  <p>
                    For any inquiries or assistance that we may be able to
                    provide, please contact us via email at <a href="mailto:carlos.guisado@syncremote.co." style={{textDecoration:"none", color:"black"}}>carlos.guisado@syncremote.co.</a>
                  </p>
                  <p>
                    For supplementary information on users from California,
                    Nevada, Virginia, Colorado, and Connecticut please check the
                    following{" "}
                    <NavLink
                      to="/us-notice"
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      Privacy Notice.
                    </NavLink>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicy;
