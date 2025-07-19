import React, { useEffect, useState } from "react";
import cx from "./CoffeeShop.module.scss";
import { NavLink } from "react-router-dom";
import { coffeeShop1, Filled, saved } from "../../../assets/images";
import { Location } from "../../../assets/svgs";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  changePinState,
  myData,
  pinCafe,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../Modals";
import PinnedMap from "../Modals/PinnedMap";
import { localLocation } from "../../../redux_toolkit/reducer/registrationReducer";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Signup from "../Modals/Signup";

const CoffeeShop = (props: any) => {
  const dispatch = useDispatch();
  const [cafeStatus, setCafeStatus] = useState<string>(props.status);
  const profileState = useSelector((state: any) => state.profileReducer);
  const [overallRating, setOverallRating] = useState(0);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [lookshow, setLookshow] = useState(false);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const handleSignupShow = () => setSignupShow(true);
  let sessionCounter = sessionStorage.getItem("counter");
  const handlelookClose = () => {
    setLookshow(false);
    setPopupMessage("");
  };
  const stars = [1, 2, 3, 4, 5]
  const handlelookOpen = () => setLookshow(true);
  const [popupMessage, setPopupMessage] = useState("");
  useEffect(() => {
    if (props?.data?.ratingReviews?.length > 0) {
      const overAllReviews = props?.data?.ratingReviews.reduce(
        (acc: any, item: any) => {
          acc += item?.point;
          return acc;
        },
        0
      );
      setOverallRating(
        Math.round(overAllReviews / props?.data?.ratingReviews?.length)
      );
    }
  }, [props?.data?.ratingReviews]);
  useEffect(() => {
    if (popupMessage) handlelookOpen();
  }, [popupMessage]);
  const [clickPin, setClickPin] = useState(false);
  useEffect(() => {
    if (profileState.pinCafeState > 0 && clickPin === true) {
      dispatch(myData());
      dispatch(changePinState());
    }
  }, [dispatch, clickPin, profileState.pinCafeState]);

  const tooltip = (
    <Tooltip id="tooltip">
      Pin this place to your map so that others can see where you like to work from! </Tooltip>
  );

  return (
    <>
      <div className={`${cx.coffeShop}`}>
        <div className={`${cx.coffeShopImg}`}>
          {/* <Carousel interval={null}>
          {props?.data?.images?.length > 0 &&
              props?.data?.images?.map((item: any, index: number) => {
                return (
                  !item?.toLowerCase()?.includes(".mp4") && !item?.toLowerCase()?.includes(".mov") && (
                    <Carousel.Item>
              <NavLink to={`/cafe-details/${props?.data?._id}`}>
                <img
                  src={item}
                  className={`${cx.image}`}
                  alt="coffeeShop"
                />
              </NavLink>
            </Carousel.Item>
                  )
                );
              })}
            {props?.data?.pictures?.map((item: any, index: number) => {
              return (
                item?.imageUrl !== "" && (
                  <Carousel.Item>
              <NavLink to={`/cafe-details/${props?.data?._id}`}>
                <img
                  src={item?.imageUrl}
                  className={`${cx.image}`}
                  alt="coffeeShop"
                />
              </NavLink>
            </Carousel.Item>
                )
              );
            })}
            {props?.data?.images?.length === 0 &&
              props?.data?.pictures?.every((e: any) => e?.imageUrl === "") && (
                <Carousel.Item>
                  <NavLink to="#">
                  <img src={coffeeShop1} className={`${cx.image}`} alt="cafeImage" />
                  </NavLink>
                  </Carousel.Item>
              )}
          </Carousel> */}

          <NavLink to={profile?.data?.role && `/cafe-details/${props?.data?._id}`} onClick={() => {
            if (!profile?.data?.role) {
              handleSignupShow();
            }
          }}>
            <img
              src={
                props?.data?.pictures[0]?.imageUrl
                  ? props?.data?.pictures[0]?.imageUrl
                  : props?.data?.images?.length > 0 ? props?.data?.images[0] : coffeeShop1
              }
              className={`${cx.image}`}
              alt="coffeeShop"
            />
          </NavLink>

          <div className={`${cx.overlay}`}>
            <img src={Filled} className={`${cx.shapeBg}`} alt="Overlay" />
            {!profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?._id
            ) &&
              cafeStatus !== "saved" && (<>

                <OverlayTrigger placement="top" overlay={tooltip}>
                  <NavLink
                    to="#"
                    onClick={() => {
                      if (!profile?.data?.role) {
                        handleSignupShow();
                      } else {
                        setClickPin(true);
                        dispatch(pinCafe(props?.data?._id));
                        if (!sessionCounter) {
                          setPopupMessage(`You just pinned a place to your map!`);
                          sessionStorage.setItem("counter", JSON.stringify("1"));
                        }

                        setCafeStatus("active");
                      }
                    }}
                    className={`${cx.viewBtn}`}
                  >
                    <img src={Location} alt="activeLocation" />
                  </NavLink>
                </OverlayTrigger></>
              )}
            {profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?._id
            ) &&
              cafeStatus !== "saved" && (
                <NavLink
                  to="#"
                  onClick={() => {
                    if (profile?.data?.role) {
                      setClickPin(true);
                      dispatch(pinCafe(props?.data?._id));
                      setCafeStatus("inactive");
                    } else {
                      handleSignupShow();
                    }
                  }}
                  className={`${cx.viewBtn} ${cx.active}`}
                  style={{ color: "orange" }}
                >
                  <img src={Location} alt="deactiveLocation" style={{ filter: "brightness(0)" }} />
                </NavLink>
              )}
            {cafeStatus === "saved" && (<>
              <NavLink
                to="#"
                onClick={() => {
                  setCafeStatus("saved");
                }}
                className={`${cx.viewBtn} ${cx.saved}`}
              >
                <img src={saved} alt="saveLocation" />
              </NavLink></>
            )}
          </div>
        </div>
        <div className={`${cx.coffeShopBody}`}>
          <h3>
            <NavLink to={profile?.data?.role && `/cafe-details/${props?.data?._id}`} onClick={() => {
              if (!profile?.data?.role) {
                handleSignupShow();
              }
            }}>
              {props?.data?.establishmentName}
            </NavLink>
          </h3>
          <p className={`${cx.pText}`}>
            {props?.data?.streetAddress}
            <span className={cx.reviewCount}>
              {props?.data?.ratingReviews?.length +
                +props?.data?.reviewsNumber >
                0 &&
                `${props?.data?.ratingReviews?.length +
                +props?.data?.reviewsNumber
                } ${props?.data?.ratingReviews?.length +
                  +props?.data?.reviewsNumber ===
                  1
                  ? "Review"
                  : "Reviews"
                }`}
            </span>
          </p>
          <span className={`${cx.rating}`}>
            {(overallRating > 0 || props?.data?.stars > 0) && (
              overallRating > 0 ? stars?.map((item: any, index: number) => {
                return item <= overallRating ?
                  <BsStarFill /> : <BsStar />
              }) : stars?.map((item: any, index: number) => {
                const cal = item - +props?.data?.stars
                return (item <= props?.data?.stars && cal !== 0.5) ?
                  <BsStarFill /> : (item > props?.data?.stars && cal !== 0.5) ?
                    <BsStar /> :
                    <BsStarHalf />
              })
            )}
          </span>
          {localLocation?.placeName !== "Boston" && (
            <p>
              {Math.round(props.distance / 1600) < 1
                ? `${(props.distance / 1600).toFixed(1)} mile`
                : Math.round(props.distance / 1600)}{" "}
              {Math.round(props.distance / 1600) === 1
                ? "mile"
                : Math.round(props.distance / 1600) > 1
                  ? "miles"
                  : ""}{" "}
              away
            </p>
          )}
        </div>
      </div>
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
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={popupMessage}
      />
    </>
  );
};

export default CoffeeShop;