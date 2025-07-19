import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cx from "./UserProfile.module.scss";
// import cm from "../MapView/Listitem.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Col, Row, Tab, Nav } from "react-bootstrap";
// images
import {
  Banner1,
  coffeeShop1,
  // location2,
  profile_icon,
} from "../../../assets/images";

import { MyRecommendations, MyReviews } from "../../../components/Website";
import {
  FriendListM,
  ImageViewsM, Interest,
} from "../../../components/Website/Modals";
import { ENDPOINT, cafeDataFunc, pinCafe, profile } from "../../../redux_toolkit/reducer/profileReducer";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { accesstoken } from "../../../config";
import ListItem from "../MapView/ListItem";
import IconGenerator from "../../../components/Shared/IconGenerator";
import {
  getSingleUser,
  singleUser,
} from "../../../redux_toolkit/reducer/connectionReducer";
import UserContactDetails from "../../../components/Website/Modals/UserContactDetails";
import io from "socket.io-client";
import ConfirmCancle from "../../../components/Website/Modals/ConfirmCancel";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import ReactPaginate from "react-paginate";
import { BsStar, BsStarHalf } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Location2 } from "../../../assets/svgs";
import MyProfile from '../MyProfile/MyProfile';


let socket: any;
socket = io(ENDPOINT);
const UserProfile = (props: any) => {
  const param = useParams();
  const dispatch = useDispatch();
  const connectionState = useSelector((state: any) => state.connectionReducer);
  const profileState = useSelector((state: any) => state.profileReducer);

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
    latitude: coordinates?.lat,
    longitude: coordinates?.lng,
    zoom: 8,
  });
  const [user, setUser] = useState<any>({});
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
    dispatch(getSingleUser(param?.id));
  }, [dispatch, param]);

  const [sendR, setSendR] = useState<any[]>([])
  const [connect, setConnect] = useState<any[]>([])
  const [request, setRequest] = useState<any[]>([])
  const [allInterest, setAllInterest] = useState<any[]>([])
  const [contactConShow, setContactConShow] = useState(true)
  useEffect(() => {
    setUser(singleUser);
    const interestPeople = singleUser?.interest?.filter((e: any) => typeof e === "string")
    setAllInterest(interestPeople)
    if(singleUser?.defaultAudience){
      if(singleUser?.defaultAudience !== "None"){
        if(singleUser?.defaultAudience === "Connections"){
           let checkConnection = singleUser?.connection?.some((a: any) => a?._id === profile?.data?._id)
           console.log(checkConnection, profile,"asdsadasdasdasd")
           if(checkConnection){
             setContactConShow(true)
           }else{
             setContactConShow(false)
           }
        }else if(singleUser?.defaultAudience === "Mutual Connections"){
          const filterMutuals = singleUser?.connection?.filter((a:any) => profile?.data?.connection.some((e:any)=>e?._id===a?._id))
          const checkMutuals = filterMutuals.some((z:any)=> z === true)
          console.log(filterMutuals, "asdsadasdasdasd")
          if(checkMutuals){
            setContactConShow(true)
          }else{
            setContactConShow(false)
          }
        }
      }else{
        setContactConShow(false)
      }
     }
  }, [connectionState.singleUserState]);
  useEffect(() => {
    if (profile?.data?._id) {
      setSendR([...profile?.data?.sendConnection])
      setConnect([...profile?.data?.connection])
      setRequest([...profile?.data?.requestConnection])
    }
  }, [profileState.profileState])
  useEffect(() => {
    if(user?.pinnedCafe?.length>0){
      updateLatLng([user?.pinnedCafe?.[0]?.latitude, user?.pinnedCafe?.[0]?.longitude]);
    }else{
    updateLatLng([42.360253, -71.058291]);
    }
  }, [updateLatLng, user?.pinnedCafe, registrationState.localLocationState]);
  const [imageIndex, setImageIndex] = useState(0);

  const [contactshow, setContactShow] = useState(false);
  const handlecontactClose = () => setContactShow(false);
  const handlecontactShow = () => setContactShow(true);

  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);

  // function redirectToGoogleMaps(lat: string, lng: string) {
  //   var destinationLat = +lat;
  //   var destinationLng = +lng;

  //   var origin = saveLocation?.placeName;

  //   var mapsUrl = "https://www.google.com/maps/dir/?api=1&";
  //   mapsUrl += "origin=" + encodeURIComponent(origin);
  //   mapsUrl +=
  //     "&destination=" +
  //     encodeURIComponent(destinationLat + "," + destinationLng);

  //   window.open(mapsUrl, "_blank");
  // }
  const mapState = useSelector((state: any) => state.mapReducer);
  const [distancePoint, setDistancePoint] = useState<any>({
    lat: saveLocation?.lat,
    lng: saveLocation?.lng,
  });
  useEffect(() => {
    setDistancePoint({
      lat: saveLocation?.lat,
      lng: saveLocation?.lng,
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cancelFunc = () => {
    socket.emit(
      "cancelConnection",
      singleUser?._id,
      profile?.data?._id,
      (data: any) => {
        dispatch(cafeDataFunc())
        setSendR([...data?.sendConnection])
      }
    );
  }
  useEffect(() => {
    socket.on("getConnection", (data: any) => {
      if (data?._id === profile?.data?._id) {
        dispatch(cafeDataFunc(data));
      }
    });
    return () => {
      socket.off("getConnection");
    };
  });
  const [interestShow, setIntrestShow] = useState(false);
  const [interestTitle, setInterestTitle] = useState("")
  const handleIntrestClose = () => setIntrestShow(false);
  const handleIntrestShow = () => {
    setIntrestShow(true)
    setInterestTitle(`${user?.name} likes to talk about:`)
  }
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const endOffset = itemOffset + 3;
  const currentItems = singleUser?.ratingReviews?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(singleUser?.ratingReviews?.length / 3);
  const pageRecommandCount = Math.ceil(singleUser?.recommandCafes?.length / 3);
  useEffect(() => {
    const newOffset = (0 * 3) % singleUser?.ratingReviews?.length;
    setItemOffset(newOffset);
    setCurrentPage(0);
  }, [connectionState.singleUserState]);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * 3) % singleUser?.ratingReviews?.length;
    setItemOffset(newOffset);
  };
  const [recommandItemOffset, setRecommandItemOffset] = useState(0);
  const [recommandCurrentPage, setRecommandCurrentPage] = useState(0);
  const recommandEndOffset = recommandItemOffset + 3;
  const currentRecommandItems = singleUser?.recommandCafes?.slice(recommandItemOffset, recommandEndOffset);
  const handleRecommandPageClick = (event: any) => {
    setRecommandCurrentPage(event.selected);
    const newOffset = (event.selected * 3) % singleUser?.recommandCafes?.length;
    setRecommandItemOffset(newOffset);
  };
  useEffect(() => {
    const newOffset = (0 * 3) % singleUser?.recommandCafes?.length;
    setRecommandItemOffset(newOffset);
    setRecommandCurrentPage(0);
  }, [connectionState.singleUserState]);
  const stars = [1, 2, 3, 4, 5]
  let mutualCon: any[] = []
  const [friendshow, setfriendShow] = useState(false);
  const handlefriendClose = () => setfriendShow(false);
  const handlefriendShow = () => setfriendShow(true);
  
  return (
    <>{
    param?.id === profile?.data?._id?
    <MyProfile /> :
    <>
      <section
        className={`${cx.bannerSection} ${cx.section_padding}`}
        onClick={() => setCafeItem({})}
      >
        <Container>
          <Row>
            <Col lg={8}>
              <div className={`${cx.contentBox}`}>
                <div className={`${cx.topbannerbg}`}>
                  <img
                    src={
                      user?.bannerImage === undefined ||
                        user?.bannerImage === ""
                        ? Banner1
                        : user?.bannerImage
                    }
                    className={`${cx.banner}`}
                    alt="banner"
                  />
                </div>

                <Row>
                  <Col lg={12}>
                    <div className={` ${cx.user_profile}`}>
                      <div className={`${cx.profileImgBox}`}>
                        {user?.profileImage ? (
                          <img
                            src={
                              user?.profileImage
                                ? user?.profileImage
                                : profile_icon
                            }
                            className={` ${cx.profileImg}`}
                            alt="profile"
                          />
                        ) : (
                          <IconGenerator name={user?.name} data={"false"} />
                        )}
                      </div>
                      <div className={` ${cx.user_detail}`}>
                        <h3>{user?.name} <small>{user?.gender}</small></h3>
                        <div className={` ${cx.edit_icon2}`}>

                          {sendR?.some((e: any) => e?._id === singleUser?._id) ?
                            <NavLink to="#" className={`btn ${st.btn2}`} onClick={() => {
                              handleShow();
                            }}>
                              Pending request
                            </NavLink> :
                            connect?.some((e: any) => e?._id === singleUser?._id) ?
                              <NavLink to="#" className={`btn ${st.btn1}`} onClick={() => {
                                socket.emit(
                                  "unfollowConnection",
                                  singleUser?._id,
                                  profile?.data?._id,
                                  (data: any) => {
                                    dispatch(cafeDataFunc(data));
                                  }
                                );
                              }}>
                                Unfollow
                              </NavLink> :
                              request?.some((e: any) => e?._id === singleUser?._id) ?
                                <>
                                  <NavLink to="#" className={`btn ${st.btn2}`} onClick={() => {
                                    socket.emit(
                                      "ignoreConnection",
                                      singleUser?._id,
                                      profile?.data?._id,
                                      (data: any) => {
                                        dispatch(cafeDataFunc(data));
                                      }
                                    );
                                  }}>
                                    Ignore
                                  </NavLink>
                                  <NavLink to="#" className={`btn ${st.btn1}`} onClick={() => {
                                    socket.emit(
                                      "acceptConnection",
                                      singleUser?._id,
                                      profile?.data?._id,
                                      (data: any) => {
                                        dispatch(cafeDataFunc(data));
                                      }
                                    );
                                  }}>
                                    Accept
                                  </NavLink>
                                </> :
                                <button className={`btn ${st.btn1}`} onClick={() => {
                                  socket.emit(
                                    "sendConnection",
                                    singleUser?._id,
                                    profile?.data?._id,
                                    (data: any) => {
                                      dispatch(cafeDataFunc(data));
                                    }
                                  );
                                }}>
                                  Connect
                                </button>
                          }
                        </div>
                        <div className={` ${cx.user_details}`}>
                          <h5> {user?.headline}</h5>
                          {user?.showEducation && (
                            <h5>{user?.schoolName}</h5>
                          )}
                          {user?.showCompany && <h5> {user?.position}</h5>}
                          <div className={` ${cx.user_details_body}`}>
                            <p>
                              {user?.city?.split("-")[0]}
                              {user?.city && user?.country ? "," : ""}{" "}
                              {user?.country?.split("-")[0]}
                              {user?.city && (
                                <span className={`${cx.bullet}`}></span>
                              )}
                            </p>
                            {contactConShow && <NavLink to="#" onClick={handlecontactShow}>
                              Contact details
                            </NavLink>}
                          </div>
                          <p style={{
                            "fontWeight": "500",
                            "fontSize": "14px",
                            "margin": "10px 0px 0px 0px",
                            "color": "#878787"
                          }}><span style={{ color: '#393939' }}><b>Talk to me about:</b></span> {allInterest?.map((item: any, index: number) => {
                            return index < 4 && typeof item === "string" && <span>{`${item}, `}</span>
                          })}{allInterest?.length > 4 && <NavLink to="#" onClick={handleIntrestShow}>+ {allInterest?.length - 4} more</NavLink>}</p>
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
                  </div>
                  <div>
                    <p>{user?.about}</p>
                  </div>
                </div>
              </div>

              <div className={`${cx.contentBox} mt-4`}>
                <div className={`${cx.map_sec}`}>
                  <div className={`${cx.map_sec_head}`}>
                    <h3>{user?.name}'s work hotspots!</h3>
                    {/* 
                    <NavLink to="/map-view">See all</NavLink> */}
                  </div>
                  <div className={`${cx.map_view}`}>
                    <Map
                      {...viewport}
                      onMove={onMove}
                      mapboxAccessToken={accesstoken}
                      mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
                    >
                      {user?.pinnedCafe?.map((item: any, index: number) => {
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
                            <div
                              className={`${cx.coffeShop}`}
                              onClick={(e: any) => e.stopPropagation()}
                            >
                              <div className={`${cx.coffeShopImg}`}>
                                <NavLink
                                  to="#"
                                  onClick={() => setCafeItem(item)}
                                >
                                  <img
                                    src={Location2
                                      // item?.pictures?.[0]?.imageUrl
                                      //   ? item?.pictures[0]?.imageUrl
                                      //   : item?.images?.length > 0
                                      //     ? item?.images[0]
                                      //     : coffeeShop1
                                    }
                                    className={`${cx.image}`}
                                    alt="coffeeShop"
                                  />
                                </NavLink>
                                <div className={` `}>
                                  {/* <img
                        src={Filled}
                        className={`${cx.shapeBg}`}
                        alt="Overlay"
                      /> */}
                                  {/* {!user?.pinnedCafe?.some(
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
                                  {/* {user?.pinnedCafe?.some(
                                    (e: any) => e?._id === item?._id
                                  ) && (
                                      <NavLink
                                        to="#"
                                        className={`${cx.viewBtn} ${cx.active}`}
                                        style={{ color: "orange" }}
                                        onClick={() => setCafeItem(item)}
                                      >
                                        <img
                                          src={location2}
                                          alt="deactiveLocation"
                                        />
                                      </NavLink>
                                    )} */}
                                </div>
                              </div>

                              {/* <div className={cx.hideBackground}>
                    <ListItem data={item} />
                  </div> */}
                            </div>
                          </Marker>
                        );
                      })}
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

                    <div
                      className={`${cx.addPhoto}`}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* <NavLink to="/photos" style={{ paddingRight: "10px" }}>
                        See all
                      </NavLink> */}
                    </div>
                  </div>
                  <div className={`${cx.about_sec_images}`}>
                    <Row>
                      {user?.photos?.map((item: any, index: number) => {
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
                      })}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={`${cx.workhotspots}`}>
                <div className={`${cx.headBox}`}>
                  <h5>{user?.name}'s most recent work hotspots</h5>
                  {/* <NavLink className={`${cx.allBtn}`} to="#">See all</NavLink> */}
                </div>
                {
                  user?.pinnedCafe?.map((item: any, index: number) => {
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
                    if (item?.openHours?.[publishDay]) {
                      const startTime = item?.openHours[publishDay]?.startTime.split(":")
                      const endTime = item?.openHours[publishDay]?.endTime.split(":")
                      console.log(startTime, endTime, "sadasdasdasdasd")
                      if (startTime?.length > 0 && endTime?.length > 0) {
                        if (+currentTime >= +startTime[0] && +currentTime <= +endTime[0]) {
                          decideOpen = "Open"
                        }
                      }
                    }
                    return index < 3 && (<div className={cx.cardListItem}>
                      <NavLink to={`/cafe-details/${item?._id}`}>
                        <div className={cx.listImage}>
                          <img className={cx.imgBox} src={item?.pictures?.[0]?.imageUrl
                            ? item?.pictures?.[0]?.imageUrl
                            : item?.images?.length > 0
                              ? item?.images[0]
                              : coffeeShop1} alt="" />
                          {/* <NavLink to="#" className={cx.playIcon}><img src={reelPlay} alt="reel"/></NavLink> */}
                          <div className={cx.overlay}>
                            <NavLink to="#" className={`${cx.viewBtn} ${cx.active}`} onClick={() => dispatch(pinCafe(item?._id))}><img src={Location2} alt="location" /></NavLink>
                            <svg className={cx.shape} viewBox="0 0 83 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0.0876543C1.02954 -0.0188502 2.27839 -0.0391463 3.6064 0.0876543H83C82.8333 28.5877 82.3 83.5876 81.5 75.5876C80.7 67.5876 72.8333 65.921 69 66.0876C57.8333 65.921 33.3 65.6876 24.5 66.0876C15.7 66.4876 14.1667 57.921 14.5 53.5876V10.5877C14.5 3.03254 8.5129 0.556137 3.6064 0.0876543H0Z" fill="#FEFCFC" />
                            </svg>
                          </div>
                        </div>
                      </NavLink>
                      <div className={cx.itemDetails}>
                        <NavLink to={`/cafe-details/${item?._id}`}>
                          <div>
                            <div className={cx.starList}>
                              {(overallRating > 0 || item?.stars > 0) && (
                                overallRating > 0 ? stars?.map((a: any, index: number) => {
                                  console.log(overallRating, "overallRating123")
                                  return a <= overallRating ?
                                    <FaStar /> : <BsStar />
                                }) : stars?.map((a: any, index: number) => {
                                  const cal = a - +item?.stars
                                  return (a <= item?.stars && cal !== 0.5) ?
                                    <FaStar /> : (a > item?.stars && cal !== 0.5) ?
                                      <BsStar /> :
                                      <BsStarHalf />
                                })
                              )}
                            </div>
                            <span className={cx.reviewCount}>. {item?.ratingReviews?.length +
                              +item?.reviewsNumber >
                              0 &&
                              `(${item?.ratingReviews?.length +
                              +item?.reviewsNumber
                              } ${item?.ratingReviews?.length +
                                +item?.reviewsNumber ===
                                1
                                ? "Review"
                                : "Reviews"
                              })`}</span>
                          </div>
                        </NavLink>
                        <div className={cx.itemDetailsTitle}>
                          <h3>
                            <NavLink to={`/cafe-details/${item?._id}`}>
                              {item?.establishmentName}
                            </NavLink>
                          </h3>
                          <span>
                            <NavLink to="#" style={{ "maxWidth": "95px" }}>
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
                              <span style={{ color: '#45D6AD' }}>{decideOpen}</span>
                            </li>
                          </span>
                          <ul className={`${cx.mutualList}`}>
                            {
                              item?.ratingReviews?.forEach((e: any, num: number) => {
                                if (user?.connection?.some((a: any) => a?._id === e?.userProfile?._id)) {
                                  mutualCon.push(e?.userProfile)
                                }
                                // return user?.connection?.some((a:any)=>a?._id===e?.userProfile?._id) && count <= 5 && <li>{e?.userProfile?.profileImage ? <img src={e?.userProfile?.profileImage} alt="img" onClick={handlefriendShow} /> : <span onClick={handlefriendShow}><IconGenerator name={e?.userProfile?.name} data={"itemUser"}/></span>}</li>
                              })
                            }
                            {mutualCon.length > 0 && <li onClick={handlefriendShow}><button>Friends who have been here</button></li>}
                          </ul>
                        </div>
                      </div>
                    </div>)
                  })
                }
              </div>

              {/* <div className={` ${cx.contentBox}`}>
                <div className={` ${cx.saved_cafes}`}>
                  <h3>Saved Cafe</h3>
                  <p>Recent Saved Cafes</p>
                  {user?.savedCafe &&
                    user?.savedCafe?.map((item: any, index: number) => {
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
                                  ? item?.pictures[0]?.imageUrl
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
                    })} */}
              {/* <p className="text-center mb-0 mt-3">
                    <NavLink className={` ${cx.linkBox}`} to="/saved-cafes">
                      See all
                    </NavLink>
                  </p> */}
              {/* </div>
              </div> */}
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
                  <Nav.Link eventKey="first">{user?.name}'s Reviews</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">{user?.name}'s Recommendations</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row className={`${cx.sliderRow}`}>
                  {currentItems &&
                    currentItems?.reverse()
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
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageCount}
                  forcePage={currentPage}
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
                    to={`/all-reviews/${user?._id}`}
                    className={`btn ${st.btn2}`}
                  >
                    See more Reviews
                  </NavLink>

                </Col>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Row className={`${cx.sliderRow}`}>
                  {currentRecommandItems &&
                    currentRecommandItems?.reverse()
                      ?.map((item: any, index: number) => {
                        return (
                          <Col lg={4}>
                            <div className="item" key={`${index}`}>
                              <MyRecommendations status="active" data={  item } />
                              <MyRecommendations status="active" data={  item } />
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
                  onPageChange={handleRecommandPageClick}
                  pageRangeDisplayed={2}
                  pageCount={pageRecommandCount}
                  forcePage={recommandCurrentPage}
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
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
      <UserContactDetails
        contactshow={contactshow}
        handlecontactClose={handlecontactClose}
      />
      <ImageViewsM
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={user?.photos}
      />
      <FriendListM
        friendshow={friendshow}
        handlefriendClose={handlefriendClose}
        mutualCon={mutualCon}
        text="Friends who have been here"
      />
      <ConfirmCancle show={show} handleClose={handleClose} cancelFunc={cancelFunc} />
      <Interest show={interestShow} interestTitle={interestTitle} handleIntrestClose={handleIntrestClose} interest={allInterest} />
    </>}
    </>
  );
};

export default UserProfile;