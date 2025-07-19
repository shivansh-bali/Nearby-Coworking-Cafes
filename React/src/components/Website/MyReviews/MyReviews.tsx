import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./MyReviews.module.scss";
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
import {colorMapping} from '../../../constant'
const MyReviews = (props: any) => {
  const dispatch = useDispatch();
  const { status } = props;
  const [cafeStatus, setCafeStatus] = useState<string>(status);
  const [overallRating, setOverallRating] = useState<any[]>([]);
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
    if (props?.data?.point > 0) {
      let arr = [];
      for (let i = 0; i < props?.data?.point; i++) {
        let count = 1 * (i + 1);
        arr.push(count);
      }
      setOverallRating(arr);
      setNumRating(props?.data?.point);
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
          {props?.data?.cafeData ?<NavLink to={`/cafe-details/${props?.data?.cafeData?._id}`}> <img
            src={
              props?.data?.cafeData?.pictures?.[0]?.imageUrl
                ? props?.data?.cafeData?.pictures?.[0]?.imageUrl
                : props?.data?.cafeData?.images?.length > 0 ? props?.data?.cafeData?.images[0] : coffeeShop1
            }
            className={`${cx.image}`}
            alt="coffeeShop"
          /> </NavLink> : <NavLink to={`/cafe-details/${props?.data?.cafeData?._id}`}> <img
            src={coffeeShop1}
            className={`${cx.image}`}
            alt="coffeeShop"
          /> </NavLink>}
          <div className={`${cx.overlay}`}>
            <img src={Filled} className={`${cx.shapeBg}`} alt="Overlay" />
            {!profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?._id
            ) &&
              cafeStatus !== "saved" && (
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
            {profile?.data?.pinnedCafe?.some(
              (e: any) => e?._id === props?.data?.cafeData?._id
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
            <NavLink to={`/cafe-details/${props?.data?.cafeData?._id}`}>
              {props?.data?.cafeData?.establishmentName}
            </NavLink>
          </h3>
          {props?.data?.cafeData?.streetAddress && <p>
            {props?.data?.cafeData?.streetAddress}
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
        <div className={`${cx.reviewRate}`}>
        <div className={`${cx.reviewStar}`}>
            <ul>
                  {props?.data?.amenities?.map((item: any) => {
                  return <li><button style={{ background: colorMapping[item[0]?.toUpperCase()], border: '1px solid #E6F1E3', color: '#709C64', height: "100%", padding:"6px 15px" }}>{item}</button></li>
                })}
                </ul>
          </div>
          </div>
        <NavLink to={`/reviews/${props?.data?.cafeData?._id}`}>
          <p> {props?.data?.message?.length > 100 ? `${props?.data?.message?.slice(0, 100)}...Read More` : props?.data?.message?.slice(0, 100)}</p>
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
        {props?.data?.message?.length > 100 && <div className={`${cx.seeReview}`}>
          <NavLink to={`/reviews/${props?.data?.cafeData?._id}`}>
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
        name={props?.data?.cafeData?.establishmentName}
      />
    </>
  );
};

export default MyReviews;