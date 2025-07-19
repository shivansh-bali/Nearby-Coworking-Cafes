import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'
import cx from './Header.module.scss'
import { NavLink, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Logo, profileImg } from '../../../assets/images'
import { Login } from '../Modals'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFcmToken,
  userLogout,
  verifyRegistration
} from '../../../redux_toolkit/reducer/registrationReducer'
import {
  ENDPOINT,
  myData,
  profile,
  updateNotification,
  updateNotificationLength
} from '../../../redux_toolkit/reducer/profileReducer'
import { verifyClaim } from '../../../redux_toolkit/globalReducer/cafeClaimReducer'
import IconGenerator from '../../Shared/IconGenerator'
import Signup from '../Modals/Signup'
import io from 'socket.io-client'
import { getToken } from 'firebase/messaging'
import { messaging } from '../../../services/firebaseConfig'

let socket: any

interface headerMain {
  showHeaderClass?: string
}
export default function Header(props: headerMain) {
  const cafeHeader =
    profile?.data?.role === 'cafe' || profile?.data?.role === 'cafeClaim'
  const param = useParams()
  const dispatch = useDispatch()
  const profileState = useSelector((state: any) => state.profileReducer)
  const [showLogin, setLoginShow] = useState(false)
  const handleLoginClose = () => setLoginShow(false)
  const handleLoginShow = () => setLoginShow(true)
  let { showHeaderClass } = props
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [showClass, setShowClass] = useState(false)
  const [showSignup, setSignupShow] = useState(false)
  const handleSignupClose = () => setSignupShow(false)
  const handleSignupShow = () => setSignupShow(true)
  const [scroll, setScroll] = useState(false)
  const [profileData, setProfileData] = useState<any>()
  const [peopleImage, setPeopleImage] = useState<any>()
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50)
    })
  }, [])
  window.addEventListener('click', () => {
    setShowClass(false)
  })
  useEffect(() => {
    if (profileState.profileState === 1 && profile.success === true) {
      setProfileData(profile?.data)
    }
    if (profileState.profileState === 0) {
      setProfileData({})
    }
    if (
      param?.token &&
      !param?.token?.includes('admin') &&
      !param?.token?.includes('cafedashboard') &&
      profile?.data?.role === undefined &&
      !window.location.pathname.includes('password') &&
      !window.location.pathname.includes('cafeclaim')
    ) {
      getToken(messaging, {
        vapidKey:
          'BBNPj4M-9_7AZaMySMEGDwu4N3Ti_yBlDTbH0rs0MB08bjE6ol7tsapqhL-7adLBEjvthcIW1pvnqV-R6neN2oc'
      })
        .then((currentToken: any) => {
          // console.log(currentToken, "current")
          dispatch(getFcmToken(currentToken))
          dispatch(
            verifyRegistration({ param: param?.token, fcmToken: currentToken })
          )
        })
        .catch((err) => {
          // Handle error
        })
    }
    if (param?.token && window.location.pathname.includes('cafeclaim')) {
      dispatch(verifyClaim(param?.token))
    }
  }, [dispatch, param?.token, profileState.profileState])

  useEffect(() => {
    if (profile?.data?.role === 'user' && profile?.data?._id) {
      socket = io(ENDPOINT)
      socket.emit('setup', profile?.data)
    }
  }, [profileState.profileState])
  return (
    <>
      <header
        className={`${cx.main_header}  ${
          scroll ? cx.affix : ''
        } ${showHeaderClass}`}
        onClick={() => setShowClass(false)}
      >
        <Navbar className={`navbar navbar-expand-lg ${cx.ak_menu}`}>
          <div className={`${cx.mobile_topbar}`}></div>
          <Container fluid>
            <NavLink className="navbar-brand" to="/">
              <img src={Logo} className={` ${cx.logo}`} alt="logo" />
            </NavLink>
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={` ${show && cx.slide_effect}`}
            >
              <div className={`${cx.menu_box}`}>
                <div className={`${cx.mobile_logo}`}>
                  <NavLink to="/">
                    <img src={Logo} className={` ${cx.logo}`} alt="logo" />
                  </NavLink>
                  <button
                    className={`${cx.mobile_close}`}
                    onClick={handleClose}
                  >
                    <MdOutlineClose />
                  </button>
                </div>
                <Nav className="navbar-nav float-start">
                  <li className="nav-item">
                    <NavLink to="/cafe-listing" onClick={handleClose}>
                      Places
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/map-view" onClick={handleClose}>
                      My Map
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={
                        profileData && profileData?.role === 'user'
                          ? '/people'
                          : '#'
                      }
                      onClick={() => {
                        handleClose()
                        if (!profileData?.role) {
                          setPeopleImage('setPeopleImage')
                          handleSignupShow()
                        } else {
                          dispatch(myData())
                        }
                      }}
                    >
                      People
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/blog" onClick={handleClose}>
                      Blog
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/about-us" onClick={handleClose}>
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contact-us" onClick={handleClose}>
                      let's chat
                    </NavLink>
                  </li>
                </Nav>
                {!cafeHeader && (
                  <Nav className={`navbar-nav float-end ${cx.headerMenu}`}>
                    <li className="nav-item">
                      <NavLink
                        to="/recommend"
                        className={`${cx.rightLink}`}
                        onClick={handleClose}
                      >
                        Recommend
                      </NavLink>
                    </li>
                    {profileData?.role !== 'user' && (
                      <li className="nav-item">
                        <NavLink
                          to="/cafe-owner"
                          className={`${cx.rightLink}`}
                          onClick={handleClose}
                        >
                          For Business
                        </NavLink>
                      </li>
                    )}
                    <li className="nav-item"></li>
                    {profileData && profileData?.role === 'user' ? (
                      <>
                        {/* After Login  */}
                        <li className={`nav-item ${cx.mobileBtns}`}>
                          <NavLink
                            to={
                              profile
                                ? `/userprofile/${profile?.data?._id}`
                                : ''
                            }
                            className="btn"
                            onClick={handleClose}
                          >
                            My Profile
                          </NavLink>
                          <NavLink
                            to="#"
                            className={`btn2 ${cx.mobileShowing}`}
                            onClick={() => {
                              dispatch(userLogout())
                              handleClose()
                            }}
                          >
                            Log out
                          </NavLink>
                        </li>

                        <li>
                          <div
                            className={`${
                              showClass ? 'show dropdown' : 'dropdown'
                            }`}
                          >
                            <button
                              className="btn btn-primary dropdown-toggle"
                              id="dropdown-basic"
                              onClick={(e: any) => {
                                e.stopPropagation()
                                if (showClass === true) {
                                  setShowClass(false)
                                } else {
                                  setShowClass(true)
                                }
                              }}
                            >
                              <div className={`${cx.imgUser}`}>
                                {profile?.data?.profileImage ? (
                                  <>
                                    <img
                                      src={
                                        profile?.data?.profileImage
                                          ? profile?.data?.profileImage
                                          : profileImg
                                      }
                                      className={` ${cx.profileImg}`}
                                      alt="profile"
                                    />
                                    {profile?.data?.notification?.length >
                                      profile?.data?.lastNotification && (
                                      <span className={`${cx.bullet}`}></span>
                                    )}
                                  </>
                                ) : (
                                  <IconGenerator
                                    name={profile?.data?.name}
                                    data={'true'}
                                  />
                                )}
                              </div>
                            </button>

                            {showClass && (
                              <div
                                className={
                                  showClass
                                    ? 'dropdown-menu show'
                                    : 'dropdown-menu'
                                }
                              >
                                <ul>
                                  <li>
                                    <NavLink
                                      to={
                                        profile
                                          ? `/userprofile/${profile?.data?._id}`
                                          : ''
                                      }
                                      onClick={() => {
                                        dispatch(myData())
                                        handleClose()
                                        setShowClass(false)
                                      }}
                                    >
                                      My Profile
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/saved-cafes"
                                      onClick={() => {
                                        handleClose()
                                        setShowClass(false)
                                      }}
                                    >
                                      Saved Cafes
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/notifications"
                                      onClick={() => {
                                        handleClose()
                                        setShowClass(false)
                                        dispatch(
                                          updateNotificationLength({
                                            notificationLength:
                                              profile?.data?.notification
                                                ?.length
                                          })
                                        )
                                        dispatch(updateNotification())
                                      }}
                                    >
                                      Notifications
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/edit-account"
                                      onClick={() => {
                                        handleClose()
                                        setShowClass(false)
                                      }}
                                    >
                                      Account Settings
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/"
                                      onClick={() =>
                                        dispatch(userLogout(profile?.data?._id))
                                      }
                                    >
                                      Logout
                                    </NavLink>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className={`nav-item ${cx.mobileBtns}  ${cx.loginBtns}`}
                        >
                          <NavLink
                            to="#"
                            className={`btn ${cx.mobileShowing}`}
                            onClick={() => {
                              handleLoginShow()
                              setPeopleImage(undefined)
                              handleClose()
                            }}
                          >
                            Login
                          </NavLink>
                          <NavLink
                            to="#"
                            className={`btn ${cx.mobileShowing}`}
                            onClick={() => {
                              handleSignupShow()
                              setPeopleImage(undefined)
                              handleClose()
                            }}
                          >
                            Signup
                          </NavLink>
                        </li>
                        <li
                          className={`nav-item ${cx.mobileBtns}  ${cx.loginBtns}`}
                        ></li>
                      </>
                    )}
                  </Nav>
                )}
                {cafeHeader && (
                  <Nav className="navbar-nav float-end">
                    <li>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <div className={`${cx.imgUser}`}>
                            {profile?.data?.profileImage ? (
                              <img
                                src={
                                  profile?.data?.profileImage
                                    ? profile?.data?.profileImage
                                    : profileImg
                                }
                                className={` ${cx.profileImg}`}
                                alt="profile"
                              />
                            ) : (
                              <IconGenerator
                                name={profile?.data?.name}
                                data={'true'}
                              />
                            )}
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <ul>
                            <li>
                              <NavLink to="/cafepanel" onClick={handleClose}>
                                Business Dashboard
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/cafepanel/reviews"
                                onClick={handleClose}
                              >
                                reviews
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/cafepanel/profile"
                                onClick={() => {
                                  handleClose()
                                  dispatch(myData())
                                }}
                              >
                                My Profile
                              </NavLink>{' '}
                            </li>
                            <li>
                              <NavLink
                                to="/cafepanel/setting"
                                onClick={handleClose}
                              >
                                Account Settings
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/"
                                onClick={() =>
                                  dispatch(userLogout(profile?.data?._id))
                                }
                              >
                                Logout
                              </NavLink>
                            </li>
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  </Nav>
                )}{' '}
              </div>

              <div
                className={`${cx.hide_box} ${cx.mobile_close}`}
                onClick={handleClose}
              ></div>
            </Navbar.Collapse>

            <div className={cx.rightMenu}>
              {!(profileData && profileData?.role === 'user') && (
                <li className={`nav-item ${cx.mobileBtns}  ${cx.loginBtns}`}>
                  <NavLink
                    to="#"
                    className={`btn ${cx.desktopShowing}`}
                    onClick={() => {
                      handleLoginShow()
                      setPeopleImage(undefined)
                      handleClose()
                    }}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="#"
                    className={`btn ${cx.desktopShowing}`}
                    onClick={() => {
                      handleSignupShow()
                      setPeopleImage(undefined)
                      handleClose()
                    }}
                  >
                    Signup
                  </NavLink>
                </li>
              )}
              <button
                className={`navbar-toggler ${cx.mobile_menu}`}
                onClick={handleShow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <rect width="40" height="40" rx="8" fill="#738801" />
                  <rect
                    x="10"
                    y="13"
                    width="20"
                    height="2"
                    rx="1"
                    fill="#DDE9A3"
                  />
                  <rect
                    x="14"
                    y="19"
                    width="16"
                    height="2"
                    rx="1"
                    fill="#DDE9A3"
                  />
                  <rect
                    x="10"
                    y="25"
                    width="20"
                    height="2"
                    rx="1"
                    fill="#DDE9A3"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </Navbar>
      </header>

      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
        peopleImage={peopleImage}
      />
      <Signup
        showSignup={showSignup}
        handleSignupClose={handleSignupClose}
        handleLoginShow={handleLoginShow}
        peopleImage={peopleImage}
      />
    </>
  )
}
