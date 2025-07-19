import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import cx from './Home.module.scss'
import st from '../../../assets/stylesheet/style.module.scss'
import { Container, Col, Row } from 'react-bootstrap'
import {
  slVector,
  HomeFrame1,
  HomeFrame2,
  HomeFrame3,
  HomeFrame4,
  HomeWork1,
  HomeWork2,
  HomeWork3,
  HomeWork4
} from '../../../assets/images'
import {
  Bar,
  Brewery,
  Book,
  Gym,
  Hotel,
  Museum,
  CoWorkingSpace,
  Restaurants,
  CoffeeShopIcon
} from '../../../assets/svgs'

import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import {
  changeLogoutState,
  changeSocialState,
  loginMessage,
  userLogout
} from '../../../redux_toolkit/reducer/registrationReducer'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeProfileData,
  myData,
  profile
} from '../../../redux_toolkit/reducer/profileReducer'
import { allCafe } from '../../../redux_toolkit/reducer/cafeReducer'
import AdminLogin from '../../Admin/Login/AdminLogin'
import { blogData } from '../Blog/Blogdata'
import PinnedMap from '../../../components/Website/Modals/PinnedMap'
import { changeVerifyClaim } from '../../../redux_toolkit/globalReducer/cafeClaimReducer'
import {
  allBlogList,
  allBlogs
} from '../../../redux_toolkit/globalReducer/blogReducer'
import ForgotPassword from '../../../components/Website/Modals/ForgotPassword'
import { Login } from '../../../components/Website/Modals'
import Signup from '../../../components/Website/Modals/Signup'
import InfiniteLooper from './SlideShow'
import { Blog } from '../../../components/Website'
// import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
// import 'swiper/swiper.scss'
// import SwiperCore, { Mousewheel, Controller, Autoplay } from 'swiper'

// SwiperCore.use([Controller, Mousewheel, Autoplay])
const Home = (props) => {
  const param = useParams()
  // const history = useHistory()
  const screenWidth = window.innerWidth
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [lookshow, setLookshow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(1)

  const handlelookClose = () => {
    setLookshow(false)
    dispatch(changeVerifyClaim())
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(allCafe())
    dispatch(allBlogs())
  }, [dispatch])
  const registrationState = useSelector((state) => state.registrationReducer)
  const cafeClaimState = useSelector((state) => state.cafeClaimReducer)
  const profileState = useSelector((state) => state.profileReducer)
  const blogState = useSelector((state) => state.blogReducer)
  const [showToast, setShowToast] = useState(false)
  const [showPopup, setPopupShow] = useState(false)
  const handlePopupClose = () => setPopupShow(false)
  const handlePopupShow = () => setPopupShow(true)
  const [showLogin, setLoginShow] = useState(false)
  const handleLoginClose = () => setLoginShow(false)
  const handleLoginShow = () => setLoginShow(true)
  const [showSignup, setSignupShow] = useState(false)
  const handleSignupClose = () => setSignupShow(false)
  const handleSignupShow = () => setSignupShow(true)
  const swiperRef = useRef(null)
  const navigationRef = useRef(null)
  const blogSwiperRef = useRef(null)

  useEffect(() => {
    if (window.location.pathname.includes('password/reset')) {
      handlePopupShow()
    }
  }, [])

  // useEffect(() => {
  //   if (navigationRef && swiperRef) {
  //     if (window.innerWidth <= 1120)
  //       navigationRef.current.swiper?.slideTo?.(activeIndex - 1)
  //     swiperRef.current.swiper?.slideTo?.(activeIndex)
  //   }
  // }, [activeIndex])

  // useEffect(() => {
  //   if (screenWidth <= 1120) {
  //     navigationRef.current.swiper.allowTouchMove = true
  //     navigationRef.current.swiper.draggable = true
  //   } else {
  //     navigationRef.current.swiper.allowTouchMove = false
  //     navigationRef.current.swiper.draggable = false
  //   }
  // }, [screenWidth])

  useEffect(() => {
    if (registrationState.socialState === 1) {
      if (loginMessage.success === true && profile.data.role === 'user') {
        navigate('/')
        dispatch(changeSocialState())
      } else if (
        loginMessage.success === true &&
        profile.data.role === 'admin'
      ) {
        navigate('/admin')
        dispatch(changeSocialState())
      } else {
        if (
          (profile.data.role === 'cafe' || profile.data.role === 'cafeClaim') &&
          profile?.data?.isSubmitted === true
        ) {
          navigate('/')
        } else {
          if (
            profile.data.role === 'cafe' ||
            profile.data.role === 'cafeClaim'
          ) {
            navigate('/cafe-step')
          }
        }
        dispatch(changeSocialState())
      }
    }

    if (registrationState.logoutState === 1) {
      setShowToast(true)
      dispatch(changeProfileData())
      dispatch(changeLogoutState())
    }
  }, [
    dispatch,
    navigate,
    registrationState.logoutState,
    registrationState.socialState
  ])

  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const data = [...blogData, ...allBlogList]
    setBlogs(data.reverse())
  }, [blogState.allBlogState])

  useEffect(() => {
    if (showToast === true) {
      navigate('/')
      setShowToast(false)
    }
  }, [navigate, showToast])

  useEffect(() => {
    const isAdminToken = param?.token?.includes('admin')
    const isAdminRole = profile?.data?.role === 'admin'
    const isCafeRole =
      profile?.data?.role === 'cafe' || profile?.data?.role === 'cafeClaim'
    const isSubmitted = profile?.data?.isSubmitted === true
    const isPasswordReset = window.location.pathname.includes('password')
    const adminLogin = window.location.pathname.endsWith('/admin/login')
    if (isAdminToken && isAdminRole) {
      navigate('/admin/')
    } else {
      if (isAdminRole && (!isAdminToken || !param?.token)) {
        navigate('/admin')
      } else if (isCafeRole) {
        navigate(isSubmitted ? '/' : '/cafe-step')
      } else {
        if (adminLogin) {
          navigate('/admin/login')
        } else if (!isPasswordReset) {
          if (window.location.pathname.includes('/businessdashboard')) {
            dispatch(userLogout(profile?.data?._id))
          } else {
            if (profileState.profileState > 0 && !profile?.data?._id)
              navigate('/')
          }
        }
      }
    }
  }, [dispatch, navigate, param?.token, profileState.profileState])

  useEffect(() => {
    if (
      registrationState.logoutState === 1 &&
      window.location.pathname.includes('businessdashboard')
    ) {
      dispatch(myData())
      handleSignupShow()
    }
  }, [dispatch, registrationState.logoutState])

  useEffect(() => {
    if (registrationState.verifyState === 1) {
      dispatch(myData())
    }
  }, [dispatch, registrationState.verifyState, param?.token])

  useEffect(() => {
    if (cafeClaimState.verifyClaimState === 1) {
      setLookshow(true)
    }
  }, [dispatch, cafeClaimState.verifyClaimState, param?.token])

  return (
    <>
      <section className={`${cx.bannerSection}`}>
        <div className={`${cx.shapeTouch}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 157"
            fill="none"
          >
            <path
              d="M0 157C0 145.954 8.95431 137 20 137H166C204.66 137 236 105.66 236 67V20C236 8.95429 244.954 0 256 0H0V157Z"
              fill="#fefefe"
            />
          </svg>
        </div>
        <div className={`${cx.containerBox}`}>
          <div className={`${cx.contentBox}`}>
            <div className={`${cx.slTitleBox}`}>
              <h1>
                imagine your ideal workspace.
                <br />
                now find it on Sync.
              </h1>
            </div>
            <div className={`${cx.descriptionBox}`}>
              <p>
                Sync is a completely free platform where you can find
                laptop-friendly places to work from and connect with other
                people in the community.
              </p>
            </div>
            <NavLink className={`btn ${st.btn1} `} to="/map-view">
              Start searching now
            </NavLink>
          </div>
          <div className={`${cx.imagebox}`}>
            <img className={`${cx.vector}`} src={slVector} alt="vector" />
          </div>
        </div>
        <div className={`${cx.footerBox}`}>
          <InfiniteLooper direction="left" speed={30}>
            <div className={`${cx.item}`}>
              <img src={CoffeeShopIcon} alt="Coffee Shops" />
              <span>coffee shops</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Restaurants} alt="restaurants" />
              <span>restaurants</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={CoWorkingSpace} alt="co-working space" />
              <span>co-working space</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Bar} alt="bars" />
              <span>coffee shops</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Museum} alt="Coffee Shops" />
              <span>museum</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Hotel} alt="Hotels" />
              <span>hotels</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Gym} alt="Gyms" />
              <span>gyms</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Book} alt="Bookshops" />
              <span>bookshops</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Brewery} alt="Breweries" />
              <span>breweries</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={CoffeeShopIcon} alt="Coffee Shops" />
              <span>coffee shops</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={Restaurants} alt="restaurants" />
              <span>restaurants</span>
            </div>
            <div className={`${cx.item}`}>
              <img src={CoWorkingSpace} alt="co-working space" />
              <span>co-working space</span>
            </div>
          </InfiniteLooper>
        </div>
      </section>
      <section className={`${cx.worksSection}`}>
        <div className={`${cx.mainBox}`}>
          <h1>how it works</h1>
          {/* <div className={`${cx.navigationBox}`}>
            <Swiper
              className={`${cx.navigationSwiper}`}
              loop={true}
              slidesPerView={4}
              direction="horizontal"
              ref={navigationRef}
            >
              <SwiperSlide>
                <li
                  className={activeIndex % 4 === 1 ? `${cx.active}` : ''}
                  onClick={() =>
                    activeIndex > 1 ? setActiveIndex(5) : setActiveIndex(1)
                  }
                >
                  Sign up to create your profile
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={activeIndex % 4 === 2 ? `${cx.active}` : ''}
                  onClick={() => setActiveIndex(2)}
                >
                  Search for laptop-friendly places
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={activeIndex % 4 === 3 ? `${cx.active}` : ''}
                  onClick={() => setActiveIndex(3)}
                >
                  Fill up your personal map
                </li>
              </SwiperSlide>
              <SwiperSlide>
                <li
                  className={activeIndex % 4 === 0 ? `${cx.active}` : ''}
                  onClick={() => setActiveIndex(4)}
                >
                  Connect with others
                </li>
              </SwiperSlide>
            </Swiper>
          </div>
          <Swiper
            loop={true}
            slidesPerView={1}
            draggable={true}
            direction="horizontal"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            mousewheel
            touchRatio={1}
            allowTouchMove={true}
            ref={swiperRef}
          >
            <SwiperSlide>
              <div className={`${cx.swiperSlide}`}>
                <div className={`${cx.imageBox}`}>
                  <img src={HomeWork1} alt="sign up" />
                </div>
                <div className={`${cx.descriptionBox}`}></div>
                <div className={`${cx.descriptionBox}`}>
                  <h5>Sign up to create your profile</h5>
                  <p>
                    Sign up using your email, tell our community what you're
                    interested in, and start using Sync!
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${cx.swiperSlide}`}>
                <div className={`${cx.imageBox}`}>
                  <img src={HomeWork2} alt="home-work-2" />
                </div>
                <div className={`${cx.descriptionBox}`}>
                  <div>
                    <h5>Search for places that meet your needs</h5>
                    <p>
                      Go to the map to find laptop-friendly places using the
                      filters to personalize your search based on your
                      preferences.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${cx.swiperSlide}`}>
                <div className={`${cx.imageBox}`}>
                  <img src={HomeWork3} alt="home-work-3" />
                </div>
                <div className={`${cx.descriptionBox}`}>
                  <div>
                    <h5>Fill up your personal map</h5>
                    <p>
                      Pin your favorite laptop-friendly spots to create a
                      customized map, allowing others to explore your
                      recommendations. This feature is especially useful for
                      business travelers to make sure you never lose track of
                      your favorite places!
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${cx.swiperSlide}`}>
                <div className={`${cx.imageBox}`}>
                  <img src={HomeWork4} alt="home-work-4" />
                </div>
                <div className={`${cx.descriptionBox}`}>
                  <div>
                    <h5>Connect with others</h5>
                    <p>
                      Start adding your friends and fellow professionals to your
                      Sync network! You can then see each other’s preferred
                      workspots, share recommendations, and even plan coworking
                      sessions together.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper> */}
          <p>
            Join our community by creating your Sync profile
            <br />- It’s quick and free!
          </p>
          {profile?.data?._id ? (
            <NavLink
              to={`/userprofile/${profile?.data?._id}`}
              className={`btn ${st.btn2} ${st.active2}`}
            >
              join Sync
            </NavLink>
          ) : (
            <NavLink
              onClick={() => handleSignupShow()}
              className={`btn ${st.btn2} ${st.active2}`}
            >
              join Sync
            </NavLink>
          )}
        </div>
      </section>
      <section className={`${cx.featuredSection}  ${cx.checkOutSection}`}>
        <Container>
          <Col lg={12} className={`${st.title} text-center `}>
            <h2 className={`${st.heading}`}>
              build a community in a <br />
              “work-from-home” world.
            </h2>
            <div className={`${cx.descriptionBox}`}>
              <p>
                Join our community today to find amazing places <br />
                to work from, wherever you are! Find your ideal workspace,
                connect with others, and help us make remote work feel less
                remote.
              </p>
            </div>
            {profile?.data?._id ? (
              <NavLink
                to={`/userprofile/${profile?.data?._id}`}
                className={`btn ${st.btn2} ${st.active2}`}
              >
                join Sync
              </NavLink>
            ) : (
              <NavLink
                onClick={() => handleSignupShow()}
                className={`btn ${st.btn2} ${st.active2}`}
              >
                join Sync
              </NavLink>
            )}
          </Col>

          <Col lg={12} className={`text-center mt-4 ${cx.imageBox}`}>
            <div className={`${cx.imagesLeft}`}>
              <img
                src={HomeFrame1}
                alt="Recommend your favorite place to work from"
                className={`${cx.images_left_1}`}
              />
              <img
                src={HomeFrame2}
                alt="Complete your profile with your personal interests"
                className={`${cx.images_left_2}`}
              />
            </div>
            <div className={`${cx.imagesRight}`}>
              <img
                src={HomeFrame3}
                alt="Chat with like minded people around you"
                className={`${cx.images_right_1}`}
              />
              <img
                src={HomeFrame4}
                alt="See where others like to work from"
                className={`${cx.images_right_2}`}
              />
            </div>
          </Col>
        </Container>
      </section>
      <section className={`${cx.workSpaceSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Row>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <div className={`${cx.slTitleBox}`}>
                <h1>find your workspace and professional community,</h1>
                <h1>anywhere you go!</h1>
              </div>
              <div className={`${cx.descriptionBox}`}>
                <p>
                  Need a change of scenery from your home office? Traveling on
                  business in a new city? Looking for a quiet place to study off
                  campus? Or maybe you just enjoy a bit of people watching
                  during the workday.
                  <br /> <br />
                  Whatever your reason, Sync is here to make it as easy as
                  possible to find amazing places to work from that meet your
                  needs and preferences.
                </p>
              </div>
              <NavLink
                to="/map-view"
                className={`btn ${st.btn2} ${st.active2}`}
              >
                start searching!
              </NavLink>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${cx.articleSection} ${st.sectionPaddingBottom}`}>
        <div>
          <section
            className={`${cx.articleSection} ${st.sectionPaddingBottom}`}
          >
            <div>
              <Col lg={12} className={`${st.title} text-center`}>
                <h2 className={`${st.heading} `}>
                  read up on our <br />
                  latest articles
                </h2>
              </Col>
              {/* <div className={`${cx.blogBox}`}>
                <Swiper
                  loop={true}
                  autoplay={{ delay: 1000, disableOnInteraction: true }}
                  speed={1000}
                  modules={[Autoplay, Mousewheel, Controller]}
                  slidesPerView={4}
                  touchRatio={1}
                  allowTouchMove={true}
                  draggable={true}
                  direction="horizontal"
                  ref={blogSwiperRef}
                >
                  {blogs?.map((item, index) => {
                    return (
                      index < 4 && (
                        <SwiperSlide
                          className={`${cx.blogItem}`}
                          key={item?._id}
                        >
                          <Blog item={item} className={`${cx.blogItem}`} />
                        </SwiperSlide>
                      )
                    )
                  })}
                </Swiper>
              </div> */}
              <Col lg={12} className={`text-center mt-4`}>
                <NavLink to="/blog" className={`btn ${st.btn2} ${st.active2}`}>
                  See all articles
                </NavLink>
              </Col>
            </div>
          </section>
        </div>
      </section>
      {window.location.pathname.endsWith('/admin/login') && <AdminLogin />}
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={
          'Your Email is verified successfully. We have received your request, you will receive an email as soon as we have an update for you.'
        }
      />
      <ForgotPassword
        showPopup={showPopup}
        handlePopupClose={handlePopupClose}
        handlePopupShow={handlePopupShow}
      />
      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
      <Signup
        showSignup={showSignup}
        handleSignupClose={handleSignupClose}
        handleLoginShow={handleLoginShow}
      />
    </>
  )
}

export default Home
