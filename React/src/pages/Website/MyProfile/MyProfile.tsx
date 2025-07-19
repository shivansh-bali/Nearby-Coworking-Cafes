import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./MyProfile.module.scss";
// import cm from "../MapView/Listitem.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Col, Row, Nav, Tab } from "react-bootstrap";
// images
import {
  Banner1,
  EditProfileIcon,
  coffeeShop1,
  profile_icon,
} from "../../../assets/images";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { MyReviews, MyRecommendations } from "../../../components/Website";
import {
  ContactDetailsM,
  EditAboutM,
  EditinfoM,
  FriendListM,
  ImageViewsM,
  Interest,
  UploadBanner,
  UploadPhoto,
} from "../../../components/Website/Modals";
import {
  changePinState,
  myData,
  pinCafe,
  profile,
  updateDetails,
} from "../../../redux_toolkit/reducer/profileReducer";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BsCameraFill, BsStar, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import {
  localLocation,
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { accesstoken } from "../../../config";
import ListItem from "../MapView/ListItem";
import IconGenerator from "../../../components/Shared/IconGenerator";
import { HiPlus } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons/lib";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Location2 } from "../../../assets/svgs";

const MyProfile = (props: any) => {
  const dispatch = useDispatch();
  const imageState = useSelector((state: any) => state.imageReducer);
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [viewport, setViewport] = useState<any>({
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 8,
  });
  const onMove = useCallback(({ viewState }: any) => {
    const newCenter = [viewState.latitude, viewState.longitude];
    setViewport(newCenter);
  }, []);
  const updateLatLng = useCallback((coord: any) => {
    setCoordinates(() => {
      return { lat: coord[0], lng: coord[1] };
    });
    setViewport({
      latitude: coord[0],
      longitude: coord[1],
      zoom: 8,
    });
  }, []);
  useEffect(() => {
    if(profile?.data?.pinnedCafe?.length>0){
      updateLatLng([profile?.data?.pinnedCafe?.[0]?.latitude, profile?.data?.pinnedCafe?.[0]?.longitude]);
    }else{
    updateLatLng([localLocation.lat, localLocation.lng]);
    }
  }, [updateLatLng, registrationState.localLocationState]);
  const [imageType, setImageType] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [contactshow, setContactShow] = useState(false);
  const handlecontactClose = () => setContactShow(false);
  const handlecontactShow = () => setContactShow(true);

  const [aboutshow, setAboutShow] = useState(false);
  const handleaboutClose = () => setAboutShow(false);
  const handleaboutShow = () => setAboutShow(true);

  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);

  const [uploadimageshow, setUploadimageShow] = useState(false);
  const handleUploadimageClose = () => setUploadimageShow(false);
  const handleUploadimageShow = () => setUploadimageShow(true);

  const [photoShow, setPhotoShow] = useState(false);
  const handlePhotoClose = () => setPhotoShow(false);
  const handlePhotoShow = () => setPhotoShow(true);


const [interestShow, setIntrestShow] = useState(false);
const [interestTitle, setInterestTitle] = useState("")
const handleIntrestClose = () => setIntrestShow(false);
const handleIntrestShow = () =>{ setIntrestShow(true)
setInterestTitle("Your interests:")
}

  useEffect(() => {
    if (imageState.imageState > 0 && imageType === "profile") {
      dispatch(updateDetails({ profileImage: imageUrl }));
      dispatch(changeImageState());
      setImageType("");
    }
  }, [dispatch, imageState.imageState, imageType]);
  function redirectToGoogleMaps(lat: string, lng: string) {
    var destinationLat = +lat;
    var destinationLng = +lng;

    var origin = saveLocation?.placeName;

    var mapsUrl = "https://www.google.com/maps/dir/?api=1&";
    mapsUrl += "origin=" + encodeURIComponent(origin);
    mapsUrl +=
      "&destination=" +
      encodeURIComponent(destinationLat + "," + destinationLng);

    window.open(mapsUrl, "_blank");
  }
  const mapState = useSelector((state: any) => state.mapReducer);
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: saveLocation.lat,
    lng: saveLocation.lng,
  });
  useEffect(() => {
    setDistancePoint({
      lat: saveLocation.lat,
      lng: saveLocation.lng,
    });
  }, [mapState.mapState]);
  function mapFunc(mk1: any, mk2: any) {
    let R = 3958.8; // Radius of the Earth in miles
    let rlat1 = mk1?.lat * (Math.PI / 180); // Convert degrees to radians
    let rlat2 = mk2?.lat * (Math.PI / 180); // Convert degrees to radians
    let difflat = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon = (mk2?.lng - mk1?.lng) * (Math.PI / 180); // Radian difference (longitudes)
    let d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
          Math.cos(rlat2) *
          Math.sin(difflon / 2) *
          Math.sin(difflon / 2)
        )
      );
    let totalDistance = Math.round(d * 1608);
    return totalDistance;
  }
  const [cafeItem, setCafeItem] = useState<any>({});

  const [itemReviewOffset, setReviewItemOffset] = useState(0);
  const [itemRecommendOffset, setRecommendItemOffest] = useState(0);

  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const [currentRecommendPage, setCurrentRecommendPage] = useState(0);

  const endReviewOffset = itemReviewOffset + 3;
  const [currentRecommendItems, setCurrentRecommendItems] = useState([])
  const currentReviewItems = profile?.data?.ratingReviews?.slice(itemReviewOffset, endReviewOffset);
  const pageReviewCount = Math.ceil(profile?.data?.ratingReviews?.length / 3);
  const pageRecommendCount = Math.ceil(profile?.data?.recommandCafes?.length / 3);

  const stars = [1,2,3,4,5]
  useEffect(() => {
    const newOffset = (0 * 3) % profile?.data?.ratingReviews?.length;
    setReviewItemOffset(newOffset);
    setCurrentReviewPage(0);
    setCurrentRecommendItems(profile?.data?.recommandCafes?.slice(itemRecommendOffset, itemRecommendOffset + 3))
  }, [itemRecommendOffset]);
  // Invoke when user click to request another page.
  const handleReviewPageClick = (event: any) => {
    setCurrentReviewPage(event.selected);
    const newOffset = (event.selected * 3) % profile?.data?.ratingReviews?.length;
    setReviewItemOffset(newOffset);
  };

  const handleRecommendPageClick = (event: any) => {
    setCurrentRecommendPage(event.selected);
    const newOffset = (event.selected * 3) % profile?.data?.recommandCafes?.length;
    setRecommendItemOffest(newOffset);
  }


  let count = 0
  let mutualCon:any[] = []
  // const [toggle, setToggle] = useState(false);
  const [friendshow, setfriendShow] = useState(false);
  const handlefriendClose = () => setfriendShow(false);
  const handlefriendShow = () => setfriendShow(true);
  const profileState = useSelector((state: any) => state.profileReducer);

  useEffect(() => {
    if (profileState.pinCafeState > 0) {
      dispatch(myData());
      dispatch(changePinState());
    }
  }, [dispatch, profileState.pinCafeState]);
  return (
    <>
      <section className={`${cx.bannerSection} ${cx.section_padding}`} onClick={() => setCafeItem({})}>
        <Container>
          <Row>
            <Col md={12} lg={7} xl={8} xxl={8}>
              <div className={`${cx.contentBox}`}>
                <div className={`${cx.topbannerbg}`}>
                  <img
                    src={
                      (profile?.data?.bannerImage === undefined || profile?.data?.bannerImage === '')
                        ? Banner1
                        : profile?.data?.bannerImage
                    }
                    className={`${cx.banner}`}
                    alt="banner"
                  />

                  <NavLink
                    to="#"
                    className={`${cx.editIcon}`}
                    onClick={handleUploadimageShow}
                  >
                    <img src={EditProfileIcon} alt="editProfileIcon" />
                  </NavLink>
                </div>

                <Row>
                  <Col lg={12}>
                    <div className={` ${cx.user_profile}`}>
                      <div className={`${cx.profileImgBox}`}>
                        {
                          profile?.data?.profileImage ? <img
                            src={
                              profile?.data?.profileImage
                                ? profile?.data?.profileImage
                                : profile_icon
                            }
                            className={` ${cx.profileImg}`}
                            alt="profile"
                          /> :
                            <IconGenerator name={profile?.data?.name} data={"false"} />
                        }
                        <button className={`btn ${cx.uploadImg}`}>
                          <BsCameraFill />{" "}
                          <input
                            type="file"
                            onChange={(e: any) => {
                              setImageType("profile");
                              dispatch(addImage({ image: e.target.files[0] }));
                            }}
                          />
                        </button>
                      </div>
                      <div className={` ${cx.user_detail}`}>
                        <h3>{profile?.data?.name}</h3>
                        <div className={` ${cx.edit_icon2}`}>
                          <NavLink to="#" onClick={handleShow}>
                            <img src={EditProfileIcon} alt="editProfileIcon" />
                          </NavLink>
                        </div>
                        <div className={` ${cx.user_details}`}>
                          <h5> {profile?.data?.headline}</h5>
                          {profile?.data?.showEducation && <h5>{profile?.data?.schoolName}</h5>}
                          {profile?.data?.showCompany && <h5> {profile?.data?.position}</h5>}
                            
                          <div className={` ${cx.user_details_body}`}>
                            <p>
                              {profile?.data?.city?.split("-")[0]}
                              {profile?.data?.city && profile?.data?.country
                                ? ","
                                : ""}{" "}
                              {profile?.data?.country?.split("-")[0]}
                              {profile?.data?.city && <span className={`${cx.bullet}`}></span>}
                            </p>
                            <NavLink to="#" onClick={handlecontactShow}>
                              Contact details
                            </NavLink>
                          </div>
                          <p className={` ${cx.intrested}`}>Talk to me about: {profile?.data?.interest.map((item: any, index: number) => {
                            return index < 4 && typeof item==="string" && <span>{`${item}, `}</span>
                          })}{profile?.data?.interest?.length > 4 && <NavLink to="#" onClick={handleIntrestShow}>+ {profile?.data?.interest?.length - 4} more</NavLink>}</p>
                        </div>
                        <hr />
                        <div className={` ${cx.profileIcons}`}>
                          <ul>
                            {/* <li>
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
                            </li> */}
                            {/* <li>
                            <span>+10</span>
                          </li> */}
                            {/* <button>127 Connections</button>   */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className={`${cx.contentBox} mt-4`}>
                <div className={`${cx.about_sec}`}>
                  <div className={`${cx.about_sec_head}`}>
                    <h3>About</h3>

                    <NavLink to="#" onClick={handleaboutShow}>
                      <img
                        src={EditProfileIcon}
                        className={` ${cx.edit_icon2}`}
                        alt="editProfileIcon"
                      />
                    </NavLink>
                  </div>
                  <div>
                    <p>{profile?.data?.about}</p>
                  </div>
                </div>
              </div>

              <div className={`${cx.contentBox} mt-4`}>
                <div className={`${cx.map_sec}`}>
                  <div className={`${cx.map_sec_head}`}>
                    <h3>Your work hotspots!</h3>

                    <NavLink to="/map-view">See all</NavLink>
                  </div>
                  <div className={`${cx.map_view}`}>
                    <Map
                      {...viewport}
                      onMove={onMove}
                      mapboxAccessToken={accesstoken}
                      mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
                    >
                      {profile?.data?.pinnedCafe?.map(
                        (item: any, index: number) => {
                          return (
                            <Marker
                              longitude={+item?.longitude}
                              latitude={+item?.latitude}
                              key={`${index}`}
                            >
                              {/* <div className={`${cm.coffeShop}`}>
                <div className={`${cm.coffeShopImg}`}>
                  <NavLink to={`/cafe-details/${item?._id}`}>
                    <img
                      src={item?.pictures[0]?.imageUrl ? item?.pictures[0]?.imageUrl : coffeeShop1}
                      className={`${cm.image}`}
                      alt="coffeeShop"
                    />
                  </NavLink>
                  <div className={`${cm.overlay}`}>
                    <img
                      src={Filled}
                      className={`${cm.shapeBg}`}
                      alt="Overlay"
                    />
                    <NavLink to="#" className={`${cm.viewBtn}`}>
                      <img src={location} alt="activeLocation" />
                    </NavLink>
                    <NavLink to="#" className={`${cm.viewBtn} ${cm.active}`}>
                      <img src={location2} alt="deactiveLocation" />
                    </NavLink>
                  </div>
                </div>
              </div> */}
                              <div className={`${cx.coffeShop}`} style={{ background:'none', boxShadow:'none' }} onClick={(e: any) => e.stopPropagation()}>
                                <div className={`${cx.coffeShopImg}`} >
                                    {/* <img
                        src={Filled}
                        className={`${cx.shapeBg}`}
                        alt="Overlay"
                      /> */}
                                    {/* {!profile?.data?.pinnedCafe?.some(
                                      (e: any) => e?._id === item?._id
                                    ) && (
                                      <NavLink
                                        to="#"
                                        className={`${cx.viewBtn}`}
                                      >
                                        <img
                                          src={Location}
                                          alt="activeLocation"
                                        />
                                      </NavLink>
                                    )} */}
                                    {profile?.data?.pinnedCafe?.some(
                                      (e: any) => e?._id === item?._id
                                    ) && (
                                        <NavLink
                                          to="#"
                                          onClick={() => setCafeItem(item)}
                                        >
                                          <img
                                            src={Location2}
                                            alt="activeLocation"
                                            className={`${cx.image}`} style={{height:'40px'}}
                                          />
                                        </NavLink>
                                      )}
                                </div>

                                {/* <div className={cx.hideBackground}>
                    <ListItem data={item} />
                  </div> */}
                              </div>
                            </Marker>
                          );
                        }
                      )}
                    </Map>
                    {Object.keys(cafeItem).length > 0 && (
                      <div className={`${cx.listContainer}`}>
                        <ListItem data={cafeItem} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`${cx.contentBox} mt-4`}>
                <div className={`${cx.about_sec}`}>
                  <div className={`${cx.about_sec_head}`}>
                    <h3>Photos</h3>

                    <div className={`${cx.addPhoto}`} style={{ display: "flex", alignItems: "center" }}>
                      <NavLink to="/photos" style={{ paddingRight: "10px" }}>See all</NavLink>
                      <button
                        className={`btn ${st.uploadBtn}`}
                        onClick={handlePhotoShow}
                      >
                        <HiPlus /> Add Photos
                        {/* {/ <input type="file" />  /} */}
                      </button>
                    </div>
                  </div>
                  <div className={`${cx.about_sec_images}`}>
                    <Row>
                      {profile?.data?.photos?.map(
                        (item: any, index: number) => {
                          return (
                            <Col
                              lg={3}
                              md={6}
                              className="col-6 m-0 p-0"
                              key={`${index}`}
                            >
                              <NavLink
                                to="#"
                                onClick={() => {
                                  setImageIndex(index);
                                  handleimageShow();
                                }}
                              >
                                <img src={item?.image} alt="photo1" />
                              </NavLink>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={12} lg={5} xl={4} xxl={4}>


            <div className={`${cx.workhotspots}`}>
              <div className={`${cx.headBox}`}>
                <h5>Your most recent work hotspots</h5>
                {/* <NavLink className={`${cx.allBtn}`} to="#">See all</NavLink> */}
              </div>
              {
                profile?.data?.pinnedCafe?.map((item:any, index:number)=>{
                  let overallRating = 0
                  if (item?.ratingReviews?.length > 0) {
                    const overAllReviews = item?.ratingReviews.reduce(
                      (acc: any, item: any) => {
                        acc += item?.point;
                        return acc;
                      },
                      0
                    );
                    
                    overallRating = Math.round(overAllReviews / item?.ratingReviews?.length)
                    
                  }
                  const distance = mapFunc(distancePoint, {
                    lat: +item?.latitude,
                    lng: +item?.longitude,
                  });
                  const publishDay: any = new Date().toLocaleDateString("en-us", {
                    weekday: "short"
                  });
                  let decideOpen = "Closed"
                  const currentTime = new Date().getHours()
                  if(item?.openHours?.[publishDay]){
                    const startTime = item?.openHours[publishDay]?.startTime.split(":")
                    const endTime = item?.openHours[publishDay]?.endTime.split(":")
                    if(startTime?.length>0 && endTime?.length>0){
                    if(+currentTime >= +startTime[0] && +currentTime <= +endTime[0]){
                      decideOpen = "Open"
                    }
                  }}
                  return index<3 && (<div className={cx.cardListItem}>
                    <div className={cx.listImage}>
                      <img className={cx.imgBox} src={item?.pictures?.[0]?.imageUrl
                                          ? item?.pictures?.[0]?.imageUrl
                                          : item?.images?.length > 0
                                            ? item?.images[0]
                                            : coffeeShop1} alt="" />
                      {/* <NavLink to="#" className={cx.playIcon}><img src={reelPlay} alt="reel"/></NavLink> */}
                      <div className={cx.overlay}>
                        <NavLink to="#" className={`${cx.viewBtn} ${cx.active}`} onClick={()=>dispatch(pinCafe(item?._id))}><img src={Location2} alt="location"/></NavLink> 
                        <svg className={cx.shape} viewBox="0 0 83 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0.0876543C1.02954 -0.0188502 2.27839 -0.0391463 3.6064 0.0876543H83C82.8333 28.5877 82.3 83.5876 81.5 75.5876C80.7 67.5876 72.8333 65.921 69 66.0876C57.8333 65.921 33.3 65.6876 24.5 66.0876C15.7 66.4876 14.1667 57.921 14.5 53.5876V10.5877C14.5 3.03254 8.5129 0.556137 3.6064 0.0876543H0Z" fill="#FEFCFC"/>
                        </svg>
                      </div>
                    </div>
                    <div className={cx.itemDetails}>
                      <div>
                          <div className={cx.starList}>
                            {(overallRating > 0 || item?.stars > 0) && (
            overallRating > 0 ? stars?.map((item:any, index:number)=>{
              return item <= overallRating ? 
              <FaStar /> : <BsStar />
            }) : stars?.map((item:any, index:number)=>{
              const cal = item - +item?.stars
              return (item <= item?.stars && cal !== 0.5) ? 
              <FaStar /> : (item > item?.stars && cal !== 0.5) ?
              <BsStar /> : 
              <BsStarHalf />})
          )}
                          </div>
                          <span className={cx.reviewCount}>. {item?.ratingReviews?.length +
                    +item?.reviewsNumber >
                    0 &&
                    `(${
                      item?.ratingReviews?.length +
                      +item?.reviewsNumber
                    } ${
                      item?.ratingReviews?.length +
                        +item?.reviewsNumber ===
                      1
                        ? "Review"
                        : "Reviews"
                    })`}</span>
                        </div>
                      <div className={cx.itemDetailsTitle}>
                        <h3>
                          <NavLink to={`/cafe-details/${item?._id}`}>
                          {item?.establishmentName}
                          </NavLink>
                        </h3>
                        <span>
                          <NavLink to="#" style={{"maxWidth": "95px"}}>
                          {item?.streetAddress}
                          </NavLink>
                        
                          <li>
                                  {Math.round(distance / 1600) < 1
                                    ? `${(distance / 1600).toFixed(1)} mile`
                                    : Math.round(distance / 1600)}{" "}
                                  {Math.round(distance / 1600) === 1
                                    ? "mile"
                                    : Math.round(distance / 1600) > 1
                                      ? "miles"
                                      : ""}
                                </li>
                          <li>
                            <span style={{ color:'#45D6AD' }}>{decideOpen}</span>
                          </li>
                        </span>
                        <ul className={`${cx.mutualList}`}>
                          {
                            item?.ratingReviews?.map((e:any, num:number) => {
                              if(profile?.data?.connection?.some((a:any)=>a?._id===e?.userProfile?._id)){
                                count += 1
                                mutualCon.push(e?.userProfile)
                              }
                              return profile?.data?.connection?.some((a:any)=>a?._id===e?.userProfile?._id) && count <= 5 && <li>{e?.userProfile?.profileImage ? <img src={e?.userProfile?.profileImage} alt="img" onClick={handlefriendShow} /> : <span onClick={handlefriendShow}><IconGenerator name={e?.userProfile?.name} data={"itemUser"}/></span>}</li>
                            })
                          }
                          {count>5 && <li><button>+{count - 5} mutual connections</button></li>}
                        </ul>
                      </div>
                    </div>
                  </div>)
                })
              }
            </div>

              <div className={` ${cx.contentBox}`}>
                <div className={` ${cx.saved_cafes}`}>
                  <h3>Saved Cafe</h3>
                  <p>Recent Saved Cafes</p>
                  {profile?.data?.savedCafe &&
                    profile?.data?.savedCafe?.map(
                      (item: any, index: number) => {
                        const distance = mapFunc(distancePoint, {
                          lat: +item?.latitude,
                          lng: +item?.longitude,
                        });
                        return (
                          <div
                            className={` ${cx.saved_cafes_cards}`}
                            key={`${index}`}
                          >
                            <div>
                              <img
                                src={
                                  item?.pictures?.[0]?.imageUrl
                                    ? item?.pictures?.[0]?.imageUrl
                                    : item?.images?.length > 0
                                      ? item?.images[0]
                                      : coffeeShop1
                                }
                                alt="coffeeShop1"
                              />
                            </div>
                            <div className={` ${cx.saved_cards_detail}`}>
                              <h3>
                                <NavLink to={`/cafe-details/${item?._id}`}>
                                  {item?.establishmentName}
                                </NavLink>
                              </h3>
                              <p>
                                {item?.streetAddress
                                  ? `${item?.streetAddress}, `
                                  : ""}
                              </p>
                              {localLocation?.placeName !== "Boston" && (
                                <p>
                                  {Math.round(distance / 1600) < 1
                                    ? `${(distance / 1600).toFixed(1)} mile`
                                    : Math.round(distance / 1600)}{" "}
                                  {Math.round(distance / 1600) === 1
                                    ? "mile"
                                    : Math.round(distance / 1600) > 1
                                      ? "miles"
                                      : ""}{" "}
                                  away
                                </p>
                              )}
                              <NavLink
                                className={` ${cx.linkBtn}`}
                                to="#"
                                onClick={() =>
                                  redirectToGoogleMaps(
                                    item?.latitude,
                                    item?.longitude
                                  )
                                }
                              >
                                Get directions
                              </NavLink>
                            </div>
                          </div>
                        );
                      }
                    )}
                  <p className="text-center mb-0 mt-3">
                    <NavLink className={` ${cx.linkBox}`} to="/saved-cafes">
                      See all
                    </NavLink>
                  </p>
                </div>
              </div>
              {/* <div className={`${cx.mobileHide} ${cx.contentBox} mt-4`}>
                <img
                  src={reviewImg}
                  style={{ width: "100%" }}
                  alt="reviewImg"
                />
              </div> */}

              {/* <div className={`${cx.mobileHide} ${cx.contentBox} mt-4`}>
                <div className={` ${cx.advertise_area}`}>
                  <div className={` ${cx.advertise_area_cards}`}>
                    <img src={coffeeShop1} alt="coffeeShop1" />

                    <div className={` ${cx.advertise_cards_detail}`}>
                      <h3>
                        Advertisement <br />
                        Area
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${cx.mobileHide} ${cx.contentBox} mt-4`}>
                <div className={` ${cx.advertise_area}`}>
                  <div className={` ${cx.advertise_area_cards}`}>
                    <img src={coffeeShop1} alt="coffeeShop1" />

                    <div className={` ${cx.advertise_cards_detail}`}>
                      <h3>
                        Advertisement <br />
                        Area
                      </h3>
                    </div>
                  </div>
                </div>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section >

      <section className={`${cx.reviewSection} ${st.sectionPaddingBottom}`}>
        <Container>
          
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Col lg={12}>
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="first">My reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">My Recommendations</Nav.Link>
            </Nav.Item>
          </Nav>
          </Col>
          
          <Tab.Content>
          <Tab.Pane eventKey="first">
          <Row className={`${cx.sliderRow}`}>
            {currentReviewItems &&
              currentReviewItems?.reverse()
                ?.map((item: any, index: number) => {
                  return item?.cafeData !== null && (
                    <Col lg={4}>
                      <div className="item" key={`${index}`}>
                        <MyReviews status="inactive" data={item} />
                      </div>
                    </Col>
                  );
                })}

          </Row>
          <ReactPaginate
            className={`pagination ${cx.paginationReview}`}
            breakLabel="..."
            nextLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "36px" }}
              >
                <AiFillRightCircle />
              </IconContext.Provider>
            }
            onPageChange={handleReviewPageClick}
            pageRangeDisplayed={2}
            pageCount={pageReviewCount}
            forcePage={currentReviewPage}
            previousLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "36px" }}
              >
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            renderOnZeroPageCount={null}
            disabledClassName="disabled"
            initialPage={0}
            breakClassName="break-me"
            marginPagesDisplayed={1}
            // subContainerClassName="pages pagination"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
          <Col lg={12} className={`text-center mt-4 wow fadeInUp`}>
            <NavLink
              to={`/all-reviews/${profile?.data?._id}`}
              className={`btn ${st.btn2}`}
            >
              See more Reviews
            </NavLink>
         
          </Col>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
          <Row className={`${cx.sliderRow}`}>
            {currentRecommendItems &&
              currentRecommendItems?.reverse()
                ?.map((item: any, index: number) => {
                  return item && (
                    <Col lg={4}>
                      <div className="item" key={`${index}`}>
                        <MyRecommendations status="active" data={item} />
                      </div>
                    </Col>
                  );
                })}

          </Row>
          <ReactPaginate
            className={`pagination ${cx.paginationReview}`}
            breakLabel="..."
            nextLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "36px" }}
              >
                <AiFillRightCircle />
              </IconContext.Provider>
            }
            onPageChange={handleRecommendPageClick}
            pageRangeDisplayed={2}
            pageCount={pageRecommendCount}
            forcePage={currentRecommendPage}
            previousLabel={
              <IconContext.Provider
                value={{ color: "#B8C1CC", size: "36px" }}
              >
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            renderOnZeroPageCount={null}
            disabledClassName="disabled"
            initialPage={0}
            breakClassName="break-me"
            marginPagesDisplayed={1}
            // subContainerClassName="pages pagination"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
          <Col lg={12} className={`text-center mt-4 wow fadeInUp`}>
            <NavLink
              to={`/all-recommends/${profile?.data?._id}`}
              className={`btn ${st.btn2}`}
            >
              See more Recommends
            </NavLink>
         
          </Col>
          </Tab.Pane>
          </Tab.Content>
          </Tab.Container>
        </Container>
      </section>

      <EditinfoM show={show} handleClose={handleClose} />
      <EditAboutM aboutshow={aboutshow} handleaboutClose={handleaboutClose} />
      <ContactDetailsM
        contactshow={contactshow}
        handlecontactClose={handlecontactClose}
      />
      <ImageViewsM
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={profile?.data?.photos} 
      />

      <UploadBanner
        uploadimageshow={uploadimageshow}
        handleUploadimageClose={handleUploadimageClose}
      />
      <UploadPhoto show={photoShow} handleClose={handlePhotoClose} />
      <FriendListM
        friendshow={friendshow}
        handlefriendClose={handlefriendClose}
        mutualCon = {mutualCon}
      />
      <Interest show={interestShow} interestTitle={interestTitle} handleIntrestClose={handleIntrestClose} interest={profile?.data?.interest}/>
    </>
  );
};

export default MyProfile;
