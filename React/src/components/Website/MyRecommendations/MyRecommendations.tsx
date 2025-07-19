import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./MyRecommendations.module.scss";
import {
  coffeeShop1,
  Filled,
} from "../../../assets/images";

import { BsStarFill } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { changePinState, myData, pinCafe, profile } from "../../../redux_toolkit/reducer/profileReducer";
import { Location, Location2 } from "../../../assets/svgs";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../Modals";
import PinnedMap from "../Modals/PinnedMap";
import ImageViewsCafe from "../Modals/ImageViewsCafe";

const MyRecommendations = (props: any) => {
  const dispatch = useDispatch();
  const { status } = props;
  const [cafeStatus, setCafeStatus] = useState<string>(status);
  console.log('cafeStatus:', cafeStatus)
  const [overallRating, setOverallRating] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("")
  const profileState = useSelector((state: any) => state.profileReducer);
  const [numRating, setNumRating] = useState(0);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);
  useEffect(() => {
    if (props?.data?.stars > 0) {
      let arr = [];
      for (let i = 0; i < props?.data?.stars; i++) {
        let count = 1 * (i + 1);
        arr.push(count);
      }
      const myReviewMessage = props?.data?.ratingReviews?.filter((item: { userProfile: { _id: any; }; }) => item?.userProfile?._id === profile?.data?._id)[0]?.message
      setMessage(myReviewMessage)
      setOverallRating(arr);
      setNumRating(props?.data?.stars);

    }
  }, [props?.data]);
  const [clickPin, setClickPin] = useState(false);
  useEffect(() => {
    if (profileState.pinCafeState > 0 && clickPin === true) {
      dispatch(myData());
      dispatch(changePinState());
    }
  }, [dispatch, clickPin, profileState.pinCafeState]);
  const [lookshow, setLookshow] = useState(false);
  const handlelookOpen = () => setLookshow(true);
  const [popupMessage, setPopupMessage] = useState("");
  let sessionCounter = sessionStorage.getItem("counter");
  const handlelookClose = () => {
    setLookshow(false);
    setPopupMessage("");
  };
  useEffect(() => {
    if (popupMessage) handlelookOpen();
  }, [popupMessage]);
  return (
    <>
      <div className={`${cx.coffeShop}`}>
        <div className={`${cx.coffeShopImg}`}>
          {props?.data?.pictures[0].imageUrl ?<NavLink to={`/cafe-details/${props?.data?._id}`}> <img
            src={
              props?.data?.pictures?.[0]?.imageUrl
                ? props?.data?.pictures?.[0]?.imageUrl
                : coffeeShop1
            }
            className={`${cx.image}`}
            alt="coffeeShop"
          /> </NavLink> : <NavLink to={`/cafe-details/${props?.data?._id}`}> <img
            src={coffeeShop1}
            className={`${cx.image}`}
            alt="coffeeShop"
          /> </NavLink>}
          <div className={`${cx.overlay}`}>
            <img src={Filled} className={`${cx.shapeBg}`} alt="Overlay" />
            {   cafeStatus !== "active" && (
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
                      setCafeStatus("active");
                    }
                  }}
                  className={`${cx.viewBtn}`}
                >
                  <img src={Location} alt="activeLocation" />
                </NavLink>
              )}
            {
              cafeStatus === "active" && (
                <NavLink
                  to="#"
                  onClick={() => {
                    if (profile?.data?.role) {
                      setClickPin(true);
                      dispatch(pinCafe(props?.data?._id));
                      setCafeStatus("inactive");
                    } else {
                      setLoginShow(true);
                    }
                  }}
                  className={`${cx.viewBtn} ${cx.active}`}
                  style={{ color: "orange" }}
                >
                  <img src={Location2} alt="deactiveLocation" />
                </NavLink>
              )}
          </div>
        </div>
        <div className={`${cx.coffeShopBody}`}>
          <h3>
            <NavLink to={`/cafe-details/${props?.data?._id}`}>
              {props?.data?.establishmentName}
            </NavLink>
          </h3>
          {props?.data?.streetAddress && <p>
            {props?.data?.streetAddress}
          </p>}
          <span className={`${cx.rating}`}>
            {numRating > 0 && (
              <>
                <BsStarFill />
                {numRating}
              </>
            )}
          </span>
        </div>
      </div>
      <div className={`${cx.reviewBox}`}>
        <div className={`${cx.reviewRate}`}>
          <div className={`${cx.reviewStar}`}>
            <ul>
              {overallRating?.map((item: any, index: number) => {
                return (
                  <li key={`${index}`}>
                    <AiTwotoneStar />
                  </li>
                );
              })}
            </ul>
          </div>
          {numRating > 0 && <div className={`${cx.ratingNumber}`}>
            <span>{numRating}</span>
          </div>}
        </div>
        <NavLink to={`/reviews/${props?.data?._id}`}>
          <p> {message?.length > 100 ? `${message?.slice(0, 100)}...Read More` : message?.slice(0, 100)}</p>
        </NavLink>
        <div className={`${cx.reviewImages}`}>
          {props?.data?.photos?.map((e: any, index: number) => {
            return index < 3 && (
              <img src={e} alt="ReviewImage" key={`${index}`} style={{ cursor: "pointer" }} onClick={() => {
                handleimageShow()
                setImageIndex(index);
              }} />
            );
          })}
        </div>
        {message?.length > 100 && <div className={`${cx.seeReview}`}>
          <NavLink to={`/reviews/${props?.data?._id}`}>
            See review
          </NavLink>
        </div>}
      </div>
      <Login
        showLogin={showLogin}
        handleLoginClose={handleLoginClose}
        handleLoginShow={handleLoginShow}
      />
      <PinnedMap
        lookshow={lookshow}
        handlelookClose={handlelookClose}
        popupMessage={popupMessage}
      />
      <ImageViewsCafe
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={props?.data?.photos}
        name={props?.data?.establishmentName}
      />
    </>
  );
};

export default MyRecommendations;