import React from "react";
import cx from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import { LogoFooter } from "../../../assets/images";
import { AppleStore, GoogleStore } from '../../../assets/svgs';

const Footer = (props: any) => {
  return (
    <>
      <footer
        className={
          window.location.pathname.includes("/blog-item")
            ? `${cx.spaceBox}`
            : window.location.pathname.includes("/recommend")
            ? `${cx.spaceBox}`
            : window.location.pathname.includes("/blog/blog-details")
            ? `${cx.spaceBox}`
            : `${cx.spaceBox} ${cx.fixedFooter}`
        }
      >
        <div className={`${cx.footer}`}>
            <div className={`${cx.mainFooter}`}>
                <div className={`${cx.footerLeft}`}>
                <img src={LogoFooter} alt="logoFooter" />
                  <h3>making remote<br />work feel less<br />remote.</h3>
                  <span>
                    Have an account?<br/>
                    <NavLink to="/#" className={`${cx.navLink}`}>
                      {"sign in here"}
                    </NavLink>
                    {" or "} 
                    <NavLink to="/#" className={`${cx.navLink}`}>
                      {"login"}
                    </NavLink>
                  </span>
                </div>
                <div className={`${cx.footerCenter}`}>
                <div>
                      <NavLink to="/#" className={`${cx.navLink}`}>places</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>my map</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>people</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>blog</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>about</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>let's talk</NavLink>
                  </div>
                    <div>
                      <NavLink to="/#" className={`${cx.navLink}`}>recommend</NavLink>
                      <NavLink to="/#" className={`${cx.navLink}`}>for business</NavLink>
                    </div>
                    </div>
                <div className={`${cx.footerRight}`}>
                <div className={`${cx.newsSection}`}>
                    <NavLink to="/#" className={`${cx.navLink}`}>sign up for newsletter</NavLink>
                    <div className={`${cx.inputBox}`}>
                      <input type="email" id="emailBox" placeholder='type your email' required/>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                          <path d="M13.8673 0.2448C13.6572 0.0272 13.3769 -0.0453333 13.1667 0.0272L0.555169 2.92853C-0.00534308 3.0736 -0.215535 3.87147 0.274913 4.23413L4.1985 7.13547V12.2853C4.1985 12.9381 4.96921 13.2283 5.38959 12.7931L8.05202 10.0368L8.96286 10.7621C9.31318 11.0523 9.87369 10.9072 10.0138 10.472L13.8673 1.04267C14.0775 0.752533 14.0075 0.4624 13.8673 0.2448ZM10.1539 2.13067L5.03927 5.97493L2.37684 3.944L10.1539 2.13067ZM6.931 9.1664L5.59978 10.5445V8.15093C6.02017 8.44107 6.58068 8.87627 6.931 9.1664ZM9.10299 9.02133C6.51062 7.06293 6.931 7.4256 6.23036 6.84533L11.6253 2.78347L9.10299 9.02133Z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={`${cx.linkSection}`}>
                    <span>follow us</span>
                    <div className={`${cx.linkBox}`}>
                      <div className={`${cx.linkItem}`} id="instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 40 41" fill="none">
                          <path d="M17.0836 13.6062C15.0078 13.6062 13.3193 15.2961 13.3193 17.3722V22.7507C13.3193 24.8263 15.0094 26.5146 17.0857 26.5146H22.4648C24.5405 26.5146 26.2291 24.8247 26.2291 22.7486V17.3701C26.2291 15.2945 24.539 13.6062 22.4627 13.6062H17.0836ZM23.5395 15.7576C23.8365 15.7576 24.0774 15.9986 24.0774 16.2955C24.0774 16.5923 23.8365 16.8333 23.5395 16.8333C23.2426 16.8333 23.0016 16.5923 23.0016 16.2955C23.0016 15.9986 23.2426 15.7576 23.5395 15.7576ZM19.7742 16.8333C21.5541 16.8333 23.0016 18.2807 23.0016 20.0604C23.0016 21.8402 21.5541 23.2875 19.7742 23.2875C17.9943 23.2875 16.5468 21.8402 16.5468 20.0604C16.5468 18.2807 17.9943 16.8333 19.7742 16.8333ZM19.7742 17.909C19.2036 17.909 18.6563 18.1357 18.2528 18.5391C17.8493 18.9426 17.6226 19.4898 17.6226 20.0604C17.6226 20.631 17.8493 21.1782 18.2528 21.5817C18.6563 21.9852 19.2036 22.2118 19.7742 22.2118C20.3448 22.2118 20.8921 21.9852 21.2956 21.5817C21.6991 21.1782 21.9258 20.631 21.9258 20.0604C21.9258 19.4898 21.6991 18.9426 21.2956 18.5391C20.8921 18.1357 20.3448 17.909 19.7742 17.909Z" fill="#1C1C1C"/>
                        </svg>
                      </div>
                      <div className={`${cx.linkItem}`} id="twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
                          <path d="M11.4464 6.56628V4.2611C10.4142 4.2611 9.62649 3.97295 9.11816 3.41289C8.59643 2.77371 8.30415 1.96426 8.29164 1.12394V0.957545L6.20787 0.904785V10.2676C6.13639 10.6761 5.94679 11.0518 5.66467 11.344C5.38255 11.6363 5.02149 11.8309 4.63023 11.9018C4.23898 11.9726 3.83637 11.9161 3.47675 11.7401C3.11714 11.564 2.81784 11.2767 2.61925 10.9171C2.42067 10.5575 2.33236 10.1428 2.36626 9.72904C2.40016 9.31527 2.55462 8.92233 2.8088 8.60328C3.06299 8.28424 3.40464 8.05444 3.78766 7.94491C4.17067 7.83537 4.57659 7.85139 4.95062 7.99079V5.75866C4.73254 5.72128 4.51194 5.70228 4.29096 5.70184C3.49586 5.70184 2.71862 5.94843 2.05752 6.41043C1.39642 6.87243 0.881157 7.52908 0.576886 8.29736C0.272616 9.06564 0.193005 9.91102 0.348121 10.7266C0.503236 11.5422 0.886112 12.2914 1.44833 12.8794C2.01055 13.4674 2.72686 13.8679 3.50668 14.0301C4.2865 14.1923 5.0948 14.1091 5.82938 13.7908C6.56395 13.4726 7.1918 12.9337 7.63353 12.2423C8.07527 11.5508 8.31104 10.7379 8.31104 9.90636C8.31061 9.73406 8.30024 9.56194 8.27999 9.39094V5.67749C9.22751 6.29637 10.3299 6.60581 11.4464 6.56628Z" fill="#1C1C1C"/>
                        </svg>
                      </div>
                      <div className={`${cx.linkItem}`} id="facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                          <path d="M22.4742 16.3192H23.883C24.0385 16.3192 24.1647 16.1979 24.1647 16.0485V14.2247C24.1647 14.0829 24.0512 13.9648 23.9041 13.9548C23.4558 13.9242 22.5801 13.8828 21.9504 13.8828C20.2201 13.8828 19.0931 14.879 19.0931 16.6895V18.4849H17.1207C16.9652 18.4849 16.839 18.6062 16.839 18.7556V20.6506C16.839 20.8 16.9652 20.9213 17.1207 20.9213H19.0931V26.0647C19.0931 26.2142 19.2193 26.3355 19.3748 26.3355H21.3471C21.5027 26.3355 21.6289 26.2142 21.6289 26.0647V20.9213H23.6638C23.8075 20.9213 23.9281 20.8176 23.9438 20.6803L24.163 18.7854C24.1816 18.6251 24.0509 18.4849 23.883 18.4849H21.6289V17.1313C21.6289 16.6828 22.0073 16.3192 22.4742 16.3192Z" fill="#111111"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Col lg={12}>
                  <div className={`${cx.newsLetter}`}>
                    {/* <p>Subscribe to newsletter</p> */}
                    {/* <h3>Let’s Sync!</h3> */}
                    {/* <div className={`${cx.subscription}`}>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Type your email here"
                      />
                      <button className={`btn ${cx.submitBtn}`}>
                        <img src={PlaneIcon} alt="palnIcon" />
                      </button>  
                    </div> */}
                  {/* </div>
                  <div className={`${cx.footerCenter}`}>
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "white",
                      }}
                    ></div>
                    <Row>
                      <Col md={4} lg={4}>
                        <div className={`${cx.footerCenterText}`}>
                          <h2>
                            making remote <br />
                            work feel less
                            <br /> remote.
                          </h2>
                          <img src={LogoFooter} alt="logoFooter" />
                        </div>
                      </Col>
                      <Col md={8} lg={8} className={`${cx.socialOrder}`}>
                        <div className={`${cx.socialLinks}`}>
                          <ul>
                            <li>
                              <NavLink
                                to="https://www.instagram.com/sync.remote/"
                                target="_blank"
                              >
                                Instagram
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="https://www.tiktok.com/@syncremote"
                                target="_blank"
                              >
                                TikTok
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="https://www.facebook.com/profile.php?id=100090429500130"
                                target="_blank"
                              >
                                Facebook
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="https://www.linkedin.com/company/sync-remote/"
                                target="_blank"
                              >
                                Linkedin
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col> */}         
            </div>
            <div className={`${cx.footerBottom}`}>
              <div className={`${cx.storeBox}`}>
                <div className={`${cx.appStore}`}>
                  <div>
                    <img src={AppleStore} alt="apple store"/>
                  </div>
                  <div>
                    Available on
                    <p>AppStore</p>
                  </div>
                </div>
                <div className={`${cx.appStore}`}>
                  <div>
                    <img src={GoogleStore} alt="google store"/>
                  </div>
                  <div>
                    Available on
                    <p>Google Play</p>
                  </div>
                </div>
              </div>
              <div className={`${cx.socialBox}`}>
                <div className={`${cx.socialLink}`}>
                  <NavLink to="/terms-conditions" className={`${cx.navLink}`}>
                    terms & conditions
                  </NavLink>
                </div>
                <div className={`${cx.socialLink}`}>
                  <NavLink to="/privacy-policy" className={`${cx.navLink}`}>
                    privacy policy & cookies
                  </NavLink>
                </div>
              </div>
              <div className={`${cx.socialLink} ${cx.allRightLink}`}>
                  <NavLink to="/#" className={`${cx.navLink}`}>© all rights reserved. 2023, Sync Remote, LLC</NavLink>
                </div>
            </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
