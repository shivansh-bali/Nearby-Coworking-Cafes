import React, { useEffect, useState } from "react";
import cx from "./Listitem.module.scss";
import {
  location,
  coffeeShop1,
  location2,
  reelPlay,
} from "../../../assets/images";
import { NavLink } from "react-router-dom";
import {
  FriendListM,
  InstagramReel,
  Login,
  ShareLocationM,
} from "../../../components/Website/Modals";
import {
  changePinState,
  myData,
  pinCafe,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import PinnedMap from "../../../components/Website/Modals/PinnedMap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Signup from "../../../components/Website/Modals/Signup";

const ListItem = (props: any) => {
  const dispatch = useDispatch();
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  // const handlelocationShow = () => setlocationShow(true);

  const [friendshow, setfriendShow] = useState(false);
  const handlefriendClose = () => setfriendShow(false);
  // const handlefriendShow = () => setfriendShow(true);
  const profileState = useSelector((state: any) => state.profileReducer);

  const [instagramshow, setInstagramShow] = useState(false);
  const handleInstagramClose = () => setInstagramShow(false);
  const handleInstagramShow = () => setInstagramShow(true);

  const [clickPin, setClickPin] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const handleSignupShow = () => setSignupShow(true);
  const [lookshow, setLookshow] = useState(false);
  const stars = [1,2,3,4,5]
  let sessionCounter = sessionStorage.getItem("counter");
  const handlelookClose = () => {
    setLookshow(false);
    setPopupMessage("");
  };
  const handlelookOpen = () => setLookshow(true);
  const [popupMessage, setPopupMessage] = useState("");
  useEffect(() => {
    if (popupMessage) handlelookOpen();
  }, [popupMessage]);
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
    if (profileState.pinCafeState > 0 && clickPin === true) {
      dispatch(myData());
      dispatch(changePinState());
    }
  }, [dispatch, clickPin, profileState.pinCafeState]);
  return (
    <>
      <div className={cx.cardListItem}>
        <div className={cx.listImage}>
          <img
            className={cx.imgBox}
            src={
              props?.data?.pictures[0]?.imageUrl
                ? props?.data?.pictures[0]?.imageUrl
                : props?.data?.images?.length > 0
                ? props?.data?.images[0]
                : coffeeShop1
            }
            alt=""
          />
          <NavLink
            to="#"
            className={cx.playIcon}
            onClick={() => handleInstagramShow()}
          >
            <img src={reelPlay} alt="reelPlay" />
          </NavLink>
          <div className={cx.overlay}>
            {profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?._id
            ) && (
              <NavLink
                to="#"
                onClick={() => {
                  if (profile?.data?.role) {
                    setClickPin(true);
                    dispatch(pinCafe(props?.data?._id));
                  } else {
                    handleSignupShow()
                  }
                }}
                className={`${cx.viewBtn} ${cx.active}`}
                style={{ color: "orange" }}
              >
                <img src={location2} alt="deactiveLocation" />
              </NavLink>
            )}
            {!profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?._id
            ) && (
              <NavLink
                to="#"
                onClick={() => {
                  if (!profile?.data?.role) {
                    setLoginShow(true);
                  } else {
                    setClickPin(true);
                    dispatch(pinCafe(props?.data?._id));
                    if (!sessionCounter) {
                      setPopupMessage(`You just pinned a place to your map!`);
                      sessionStorage.setItem("counter", JSON.stringify("1"));
                    }
                  }
                }}
                className={`${cx.viewBtn}`}
              >
                <img src={location} alt="activeLocation" />
              </NavLink>
            )}
            <svg
              className={cx.shape}
              viewBox="0 0 83 77"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.0876543C1.02954 -0.0188502 2.27839 -0.0391463 3.6064 0.0876543H83C82.8333 28.5877 82.3 83.5876 81.5 75.5876C80.7 67.5876 72.8333 65.921 69 66.0876C57.8333 65.921 33.3 65.6876 24.5 66.0876C15.7 66.4876 14.1667 57.921 14.5 53.5876V10.5877C14.5 3.03254 8.5129 0.556137 3.6064 0.0876543H0Z"
                fill="#FEFCFC"
              />
            </svg>
          </div>
        </div>
        <div className={cx.itemDetails}>
          <div>
            <div>
              <p>
              <span className={`${cx.rating}`}>
          {(overallRating > 0 || props?.data?.stars > 0) && (
            overallRating > 0 ? stars?.map((item:any, index:number)=>{
              return item <= overallRating ? 
              <BsStarFill /> : <BsStar />
            }) : stars?.map((item:any, index:number)=>{
              const cal = item - +props?.data?.stars
              return (item <= props?.data?.stars && cal !== 0.5) ? 
              <BsStarFill /> : (item > props?.data?.stars && cal !== 0.5) ?
              <BsStar /> : 
              <BsStarHalf />})  
          )}
          </span>
                <span className={cx.reviewCount}>
                  .{" "}
                  {props?.data?.ratingReviews?.length +
                    +props?.data?.reviewsNumber >
                    0 &&
                    `${
                      props?.data?.ratingReviews?.length +
                      +props?.data?.reviewsNumber
                    } ${
                      props?.data?.ratingReviews?.length +
                        +props?.data?.reviewsNumber ===
                      1
                        ? "Review"
                        : "Reviews"
                    }`}
                </span>
              </p>
            </div>
            {/* <NavLink to="#" onClick={handlelocationShow}>
              <img src={upload} alt="" />
            </NavLink> */}
          </div>
          <div className={cx.itemDetailsTitle}>
            <h3>
             <NavLink to={profile?.data?.role && `/cafe-details/${props?.data?._id}`} onClick={()=>{
   if (!profile?.data?.role) {
    handleSignupShow()
  }
}}>
                {props?.data?.establishmentName}
              </NavLink>
            </h3>
            <span>
             <NavLink to={profile?.data?.role && `/cafe-details/${props?.data?._id}`} onClick={()=>{
   if (!profile?.data?.role) {
    handleSignupShow()
  }
}}>
                {props?.data?.streetAddress
                  ? `${props?.data?.streetAddress}`
                  : ""}
              </NavLink>
              <li>
                {/* <span style={{ color: "#45D6AD" }}>Open</span> */}
              </li>
            </span>
            {/* <div className={cx.profileIcons}>
              <ul>
                <li>
                  <img src={userProfile} alt="" />
                </li>
                <li>
                  <img src={userProfile} alt="" />
                </li>
                <li>
                  <img src={userProfile} alt="" />
                </li>
                <li>
                  <img src={userProfile} alt="" />
                </li>
                <li>
                  <span>+10</span>
                </li>
                <button onClick={handlefriendShow}>
                  Friends were here
                </button>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      <InstagramReel show={instagramshow} handleClose={handleInstagramClose} />

      <ShareLocationM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
      />

      <FriendListM
        friendshow={friendshow}
        handlefriendClose={handlefriendClose}
        text="Your mutual connections"
      />
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={popupMessage}
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
  );
};

export default ListItem;
