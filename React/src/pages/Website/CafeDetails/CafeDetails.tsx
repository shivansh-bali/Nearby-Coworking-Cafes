import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cx from "./CafeDetails.module.scss";
import { Container, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdOutlineChevronLeft, MdOutlineFileUpload } from "react-icons/md";
import {
  number,
  menu,
  webbrowser,
  reviewImg,
  cafeImg,
  timeIcon,
  place15,
  place19,
  place20,
  place22,
  BigTables,
  time,
  placeholderImage,
  newsnacks,
  mark,
} from "../../../assets/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { ReviewC } from "../../../components/Website";
import { Login, ShareLocationM } from "../../../components/Website/Modals";
import LeaveReview from "./LeaveReview";
import { useDispatch, useSelector } from "react-redux";
import {
  allCafe,
  allSingleCafeState,
  changeSingleCafeState,
  singleCafeData,
} from "../../../redux_toolkit/reducer/cafeReducer";
import {
  accessToken,
  myData,
  profile,
  saveCafe,
} from "../../../redux_toolkit/reducer/profileReducer";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons/lib";
import { saveLocation } from "../../../redux_toolkit/reducer/registrationReducer";
import Map, { Marker } from "react-map-gl";
import ReviewItem from "./ReviewItem";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { coffeeShop1 } from '../../../assets/images';
// import EditImages from "../../../components/Website/Modals/EditImages";
import {
  Alcohol,
  Handicap,
  HighChairs,
  LargeGroup,
  NaturalLight,
  Outdoor,
  Outlets,
  QuietVibes,
  SofaSeating,
  SomethingToEat,
  WiFi,
} from "../../../assets/svgs";
import ImageViewsCafe from "../../../components/Website/Modals/ImageViewsCafe";
import Signup from "../../../components/Website/Modals/Signup";
import ReactLoading from "react-loading";

const CafeDetails = (props: any) => {
  const dispatch = useDispatch();
  const param = useParams();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   dispatch(mapKeyFunc());
  // }, [dispatch]);
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);

  const [cafeData, setCafeData] = useState<any>();
  const [imageData, setImageData] = useState<any[]>([])
  const [ratingArr, setRatingArr] = useState<any[]>([]);
  const [overallRating, setOverallRating] = useState<any>(0);
  const [showThank, setShowThank] = useState(false)
  const stars = [1, 2, 3, 4, 5];
  useEffect(() => {
    dispatch(allCafe(param?.id));
  }, [dispatch, param?.id]);
  useEffect(() => {
    if (allSingleCafeState > 0) {
      setCafeData(singleCafeData);
      console.log('cafeData:', singleCafeData)
      setRatingArr(singleCafeData?.ratingReviews?.reverse());
      setViewport({
        latitude: singleCafeData?.latitude ? singleCafeData?.latitude : 0,
        longitude: singleCafeData?.longitude ? singleCafeData?.longitude : 0,
        zoom: 12,
      });
      let allImages: any[] = []
      if (singleCafeData?.images && singleCafeData?.images?.length > 0) {
        singleCafeData?.images?.forEach((e: any, num: number) => {
          if (!e?.toLowerCase()?.includes(".mp4") && !e?.toLowerCase()?.includes(".mov"))
            allImages.push(e)
        })
      }
      singleCafeData?.pictures?.forEach((e: any) => {
        if (e.imageUrl !== "" && !e.imageUrl?.toLowerCase()?.includes(".mp4") && !e.imageUrl?.toLowerCase()?.includes(".mov"))
          allImages.push(e.imageUrl)
      })
      if (singleCafeData?.ratingReviews && singleCafeData?.ratingReviews?.length > 0) {
        singleCafeData?.ratingReviews?.forEach((e: any) => {
          e?.photos?.forEach((a: any) => {
            if (!a?.toLowerCase()?.includes(".mp4") && !a?.toLowerCase()?.includes(".mov"))
              allImages.push(a)
          })
        })
      }
      if (singleCafeData?.postByUsers && singleCafeData?.postByUsers?.length > 0) {
        singleCafeData?.postByUsers?.forEach((e: any, num: number) => {
          if (e?.image && e?.image !== "" && !e?.image?.toLowerCase()?.includes(".mp4") && !e?.image?.toLowerCase()?.includes(".mov"))
            allImages.push(e?.image)
        })
      }
      allImages?.length === 0 && allImages.push(coffeeShop1) 
      setImageData(allImages)
      if (singleCafeData?.ratingReviews?.length > 0) {
        const overAllReviews = singleCafeData?.ratingReviews.reduce(
          (acc: any, item: any) => {
            acc += item?.point;
            return acc;
          },
          0
        );
        setOverallRating(
          Math.round(overAllReviews / singleCafeData?.ratingReviews?.length)
        );
      }
      dispatch(changeSingleCafeState());
    }
    if (profileState.saveCafeState) {
      dispatch(myData());
    }
  }, [dispatch, cafeState.allCafeState, profileState.saveCafeState]);
  useEffect(() => {
    if (cafeData?.ratingReviews?.length > 0 && profile?.data?._id) {
      if (cafeData?.ratingReviews?.some((e: any) => e?.userProfile?._id === profile?.data?._id)) {
        const matchedData = cafeData?.ratingReviews?.filter((e: any) => e?.userProfile?._id === profile?.data?._id)
        const dataInMiliSec: any = +new Date(matchedData[0]?.createdAt)
        const todayData: any = +new Date()
        if (+dataInMiliSec + 7889238000 >= +todayData) {
          setShowThank(true)
        }
      }
    }
  }, [cafeData])
  const options = {
    dots: false,
    nav: true,
    autoplay: false,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 3,
      },
    },
  };

  console.log(options, "options")

  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const handleSignupShow = () => setSignupShow(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const endOffset = itemOffset + 3;
  const currentItems = ratingArr?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cafeData?.ratingReviews?.length / 3);

  useEffect(() => {
    const newOffset = (0 * 3) % cafeData?.ratingReviews?.length;
    setItemOffset(newOffset);
    setCurrentPage(0);
  }, [cafeData?.ratingReviews?.length]);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * 3) % cafeData?.ratingReviews?.length;
    setItemOffset(newOffset);
  };

  function mylinkfunction(e: any) {
    window.location.href = "#leavePopup";
    e.preventDefault();
    e.stopPropagation();
  }

  function redirectToGoogleMaps() {
    var destinationLat = +cafeData?.latitude;
    var destinationLng = +cafeData?.longitude;

    var origin = saveLocation?.placeName;

    var mapsUrl = "https://www.google.com/maps/dir/?api=1&";
    mapsUrl += "origin=" + encodeURIComponent(origin);
    mapsUrl +=
      "&destination=" +
      encodeURIComponent(destinationLat + "," + destinationLng);

    window.open(mapsUrl, "_blank");
  }

  const filterOptions = [
    // {
    //   title: "Stars",
    //   image: Stars,
    // },
    // {
    //   title: "Price Range",
    //   image: PriceRange,
    // },
    // {
    //   title: "Open Now",
    //   image: OpenNow,
    // },

    {
      title: "WiFi",
      image: WiFi,
    },
    // {
    //   title: "Fast WiFi",
    //   image: FastWifi,
    // },
    {
      title: "Natural Light",
      image: NaturalLight,
    },

    {
      title: "Charging Outlets",
      image: Outlets,
    },

    {
      title: "Quiet Environment",
      image: QuietVibes,
    },
    {
      title: "Outdoor Seating",
      image: Outdoor,
    },
    {
      title: "Large Groups",
      image: LargeGroup,
    },
    // {
    //   title: "Students",
    //   image: Students,
    // },
    {
      title: "Alcohol",
      image: Alcohol,
    },
    {
      title: "Snacks",
      image: newsnacks,
    },
    {
      title: "Meals",
      image: SomethingToEat,
    },

    // {
    //   title: "Table Layout",
    //   image: TableLayout,
    // },
    {
      title: "Big Tables",
      image: BigTables,
    },
    {
      title: "Sofa Seating",
      image: SofaSeating,
    },
    {
      title: "High Tops",
      image: HighChairs,
    },
    // {
    //   title: "Bar Seating",
    //   image: Barseating,
    // },

    // {
    //   title: "Small Groups",
    //   image: place14,
    // },
    {
      title: "Private Room",
      image: place15,
    },
    // {
    //   title: "Free Parking",
    //   image: place16,
    // },
    {
      title: "Accessibility",
      image: Handicap,
    },
  ];

  const standoutAmenities = [
    {
      title: "Book Shop",
      image: place19,
    },
    {
      title: "Printer Available",
      image: place20,
    },
    {
      title: "Child Seats",
      image: place22,
    },
  ];

  function downloadFiles() {
    cafeData?.uploadDocuments?.forEach((file: any) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      link.target = "_self"; // Open the file in a new tab/window if needed
      link.style.display = "none"; // Hide the link element

      document.body.appendChild(link); // Append the link to the document body
      link.click(); // Trigger the click event
      document.body.removeChild(link); // Clean up the link element
    });
  }
  const [viewport, setViewport] = useState<any>({
    latitude: cafeData?.latitude ? cafeData?.latitude : 0,
    longitude: cafeData?.longitude ? cafeData?.longitude : 0,
    zoom: 8,
  });
  const onMove = useCallback(({ viewState }: any) => {
    const newCenter = [viewState.latitude, viewState.longitude];
    setViewport(newCenter);
  }, []);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date();
  let day = d.getDay();
  const [imageIndex, setImageIndex] = useState(0);
  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);

  const timeChange = ((time: any) => {
    if (time !== undefined && time !== "") {
      let timeSplit = time?.split(':'),
        hours,
        minutes,
        meridian;
      hours = timeSplit[0];
      minutes = timeSplit[1];
      if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
      } else if (hours < 12) {
        meridian = 'AM';
        if (hours === 0) {
          hours = 12;
        }
      } else {
        meridian = 'PM';
      }
      return hours + ':' + minutes + ' ' + meridian + " "
    }
  })

  const tooltip = (
    <Tooltip id="tooltip">
      We’ve collected these reviews from different sources until we get enough
      reviews of our own! Thank you in advance for leaving your review and
      supporting local businesses. 🙂
    </Tooltip>
  );

  const tooltip1 = (
    <Tooltip id="tooltip">
      <div style={{ margin: "10px" }}>
        {cafeData?.openHours &&
          Object.keys(cafeData?.openHours).map(
            (item: string, index: number) => {
              const getTime = timeChange(cafeData?.openHours[item]?.startTime)
              const getEndTime = timeChange(cafeData?.openHours[item]?.endTime)
              return cafeData?.openHours[item]?.startTime !== "" && (
                <p key={index}>
                  <span style={{ width: "30px", display: "inline-block" }}>
                    {item}:
                  </span>
                  <span>{getTime}</span> -
                  <span>{getEndTime}</span>
                </p>
              );
            }
          )}
      </div>
    </Tooltip>
  );

  const centeredContainer = {
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    height: '100vh', // Optional: Set a specific height for the container
  };

  const [loaderStatus] = useState(<div style={centeredContainer}>
    <ReactLoading type="spin" color="#4f4f4f" width="30px" />
  </div>);

  return (
    <>
      <div className={`${cx.fixSpace}`}></div>
      <div className={`${cx.space}`}>
        <section
          className={`${cx.sliderSection}`}
          style={{ minHeight: "300px" }}
        >
          <Row>
            <Col md={8} className={`${cx.cardSpaceLeft}`}>
              {imageData?.length > 0 ? <img src={imageData?.length > 0 ? imageData[0] : cafeImg} className={`${cx.imgCard} ${cx.img1}`} alt="cafeImg" /> : loaderStatus}
            </Col>
            <Col md={4} className={`${cx.cardSpaceRight}`}>
              {imageData?.length > 0 ? <img src={imageData?.length > 1 ? imageData[1] : placeholderImage} className={`${cx.imgCard} ${cx.img2}`} alt="cafeImg" /> : ''}
              {imageData?.length > 0 ? <img src={imageData?.length > 2 ? imageData[2] : placeholderImage} className={`${cx.imgCard} ${cx.img3}`} alt="cafeImg" /> : ''}
              <NavLink to="#" onClick={() => {
                handleimageShow()
                setImageIndex(0);
              }} className={`${cx.allPhotos}`}>{imageData?.length > 0 && `View all photos(${imageData?.length})`}</NavLink>
            </Col>
          </Row>
          <div className={`${cx.overlay}`}>
            <div className={`${cx.visitorRating}`}>
              <p>Ratings</p>

              <h4>
                {/* {(overallRating > 0 || cafeData?.stars > 0) &&
                  (overallRating > 0 ? overallRating : cafeData?.stars)}{" "} */}
                <OverlayTrigger placement="top" overlay={tooltip}>
                  <span className={`${cx.infoToolTip}`}>
                    <AiOutlineInfoCircle />
                  </span>
                </OverlayTrigger>
              </h4>

              <span className="d-block" style={{ fontSize: "13px" }}>
                {cafeData?.ratingReviews?.length +
                  (!cafeData?.reviewsNumber ? 0 : +cafeData?.reviewsNumber) >
                  0
                  ? `${cafeData?.ratingReviews?.length +
                  (!cafeData?.reviewsNumber ? 0 : +cafeData?.reviewsNumber)
                  } ${cafeData?.ratingReviews?.length +
                    (!cafeData?.reviewsNumber
                      ? 0
                      : +cafeData?.reviewsNumber) ===
                    1
                    ? "Review"
                    : "Reviews"
                  }`
                  : "No Review"}
              </span>
              <span className={`${cx.rating}`}>
                {(overallRating > 0 || cafeData?.stars > 0) &&
                  (overallRating > 0
                    ? stars?.map((item: any, index: number) => {
                      return item <= overallRating ? (
                        <BsStarFill />
                      ) : (
                        <BsStar />
                      );
                    })
                    : stars?.map((item: any, index: number) => {
                      const cal = item - +cafeData?.stars;
                      return item <= cafeData?.stars && cal !== 0.5 ? (
                        <BsStarFill />
                      ) : item > cafeData?.stars && cal !== 0.5 ? (
                        <BsStar />
                      ) : (
                        <BsStarHalf />
                      );
                    }))}
              </span>
            </div>
            <svg
              className={`${cx.bgShape}`}
              viewBox="0 0 199 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M198 0.5C198.22 1.77817 198.275 3.39435 198 5.08038V135.5C128.167 136 -9.00019 136.7 0.999812 135.5C10.9998 134.3 12.1666 125.667 11.5 121.5C11.3333 99.1667 11.1 50.6 11.5 35C11.9 19.4 24.6666 15.1667 31 15H49H184.5C193.915 15 197.234 9.76999 198 5.08038V0.5Z"
                fill="#FBFBFB"
              />
            </svg>
          </div>
          <div>
            <NavLink to="/cafe-listing" className={`${cx.left_arrow}`}>
              <MdOutlineChevronLeft />
            </NavLink>
          </div>

          <NavLink
            className={`${cx.leaveMobileBtn}`}
            to="#leavePopup"
            onClick={mylinkfunction}
          >
            Leave a review
          </NavLink>
        </section>
      </div>
      <section className={`${cx.bannerSection} ${cx.section_padding}`}>
        <Container>
          <Row>
            <Col lg={8} className="mt-4">
              <div className={` ${cx.contentBox}`}>
                <Row>
                  <div className={`${cx.visited_cafe}`}>
                    <NavLink to="#"></NavLink>
                    <div className="d-flex">
                      <div></div>
                      <button className={`${cx.Cafe_icons}`} onClick={handlelocationShow}><MdOutlineFileUpload /></button>
                    </div>
                  </div>
                  <div className={`${cx.contentHeading}`}>
                    <h1>{cafeData?.establishmentName}</h1>
                    <p>{cafeData?.streetAddress}</p>
                  </div>

                  <Col className="col-6" lg={6} md={6}>
                    <div className={`${cx.content_btn}`}>
                      <button
                        className={
                          profile?.data?.savedCafe?.some(
                            (e: any) => e?._id === cafeData?._id
                          )
                            ? `${cx.active}`
                            : ""
                        }
                        onClick={() => {
                          if (profile?.data?.role) {
                            dispatch(saveCafe(cafeData?._id));
                          } else {
                            handleSignupShow()
                          }
                        }}
                      >
                        {" "}
                        Save for later
                      </button>
                    </div>
                  </Col>
                  <Col className="col-6" lg={6} md={6}>
                    <div className={`${cx.content_btn}`}>
                      <button onClick={redirectToGoogleMaps}>
                        Get directions
                      </button>
                    </div>
                  </Col>
                  <Col lg={12} className={`${cx.content_detail} mt-4`}>
                    <div className="d-flex flex-wrap">
                      {cafeData?.openHours &&
                        Object.keys(cafeData?.openHours)?.map(
                          (e: any, index: number) => {
                            const getTime = timeChange(cafeData?.openHours[e]?.startTime)
                            const getEndTime = timeChange(cafeData?.openHours[e]?.endTime)
                            return e.toString() === weekday[+day] && (
                              <p>
                                <img src={time} alt="time" />{" "}
                                {getTime === undefined ? <span>Closed</span> : <span>{`${getTime} - ${getEndTime}`}</span>}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={tooltip1}
                                >
                                  <span className={`${cx.infoToolTip}`}>
                                    <AiOutlineInfoCircle />
                                  </span>
                                </OverlayTrigger>
                              </p>
                            )
                          }
                        )}
                      <p>
                        <a href={`tel:${cafeData?.userPhone}`}>
                          <img src={number} alt="number" />{" "}
                          <span>{cafeData?.userPhone}</span>
                        </a>
                      </p>
                      <p>
                        <a
                          href={`${cafeData?.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={webbrowser} alt="webbrowser" />
                          <span>{cafeData?.website}</span>
                        </a>
                      </p>
                    </div>
                    <div>
                      {cafeData?.uploadDocuments?.length > 0 && (
                        <p style={{ paddingRight: "0px" }}>
                          <NavLink to="#" onClick={downloadFiles}>
                            <img src={menu} alt="" /> <span>Download Menu</span>
                          </NavLink>
                        </p>
                      )}
                    </div>
                  </Col>
                  <hr />
                  <Col lg={12} className={`${cx.about_detil} my-3`}>
                    <div>
                      <h3>About</h3>
                      <p>{cafeData?.shortDescription}</p>
                    </div>
                  </Col>
                  <hr />
                  <Col lg={12} className={`${cx.top_amenties} mt-4`}>
                    <h3> Top Amenities</h3>
                    <ul className={`${cx.listShop}`}>
                      {filterOptions?.map((item: any) => {
                        return cafeData?.facilities?.map(
                          (e: any, index: number) => {
                            return (
                              item?.title === e && (
                                <li key={`${index}`}>
                                  <button className={`${cx.active}`}>
                                    <img src={item?.image} alt="cSmallGroups" />
                                    <h5>{item?.title}</h5>
                                  </button>
                                </li>
                              )
                            );
                          }
                        );
                      })}
                    </ul>
                  </Col>
                  <Col lg={12} className={`${cx.top_amenties} mt-4`}>
                    <h3> Top Standout Amenities</h3>
                    <ul className={`${cx.listShop}`}>
                      {standoutAmenities?.map((item: any) => {
                        return cafeData?.standoutFacilities?.map(
                          (e: any, index: number) => {
                            return (
                              item?.title === e && (
                                <li key={`${index}`}>
                                  <button className={`${cx.active}`}>
                                    <img src={item?.image} alt="cSmallGroups" />
                                    <h5>{item?.title}</h5>
                                  </button>
                                </li>
                              )
                            );
                          }
                        );
                      })}
                    </ul>
                  </Col>
                  <Col lg={12} className={`${cx.top_amenties} mt-4`}>
                    <hr />
                    <h3 className="pt-3">Additional Info</h3>
                    <p style={{ fontWeight: "500" }}>
                      {!cafeData?.timeLimitation && "No time limit provided"}
                    </p>
                    {cafeData?.timeLimitation && (
                      <p style={{ fontWeight: "500" }}>
                        <img src={timeIcon} alt="" className="me-2" />
                        {cafeData?.timeLimitation}
                      </p>
                    )}
                    <h3 className="pt-3">Restrictions</h3>
                    <p>
                      {!cafeData?.limitations &&
                        "No restrictions of guidelines provided for this place."}
                    </p>
                    {cafeData?.limitations}
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={4} className={`mt-4 ${cx.desktopShow}`}>
              <LeaveReview
                showLogin={showLogin}
                handleLoginShow={handleLoginShow}
                handleLoginClose={handleLoginClose}
                showSignup={showSignup}
                handleSignupShow={handleSignupShow}
                handleSignupClose={handleSignupClose}
                showThank={showThank}
                cafeData={cafeData}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {cafeData?.ratingReviews?.length > 0 && (
        <section className={`${cx.featuredSection}  ${cx.padding_top}`}>
          <Container>
            <div className={` ${cx.reviewBg}`}>
              <Col lg={12}>
                <h3>From the community</h3>
              </Col>
              <OwlCarousel className="owl-theme" {...options}>
                {ratingArr?.map((item: any, index: number) => {
                  return (
                    <div className="item" key={`${index}`}>
                      <ReviewC data={item} />
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          </Container>
        </section>
      )}

      <section className={`${cx.padding_top}`}>
        <Row>
          <Col lg={12} className="m-auto">
            <div style={{ width: "96%", margin: "0px auto" }}>
              <div className={`${cx.map_view}`} style={{ overflow: "hidden" }}>
                <Map
                  {...viewport}
                  onMove={onMove}
                  mapboxAccessToken={accessToken}
                  mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
                >
                  <Marker
                    longitude={cafeData?.longitude ? cafeData?.longitude : 0}
                    latitude={cafeData?.latitude ? cafeData?.latitude : 0}
                  >
                    <img src={mark} alt="marker" />
                  </Marker>
                </Map>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {cafeData?.ratingReviews?.length > 0 && (
        <section className={`${cx.reviewSection} ${cx.padding_top} `}>
          <Container>
            <Row>
              <Col lg={4}>
                <div className={`${cx.reviewImg}`}>
                  <img src={reviewImg} alt="reviewImg" />
                </div>
              </Col>
              <Col lg={8}>
                <div className={`${cx.reviewSide}`}>
                  <div className={`${cx.allReviews} mt-2`}>
                    <p>All reviews</p>
                  </div>
                  <div className={`${cx.allReviews}`}>
                    <hr />

                    <Row>
                      {currentItems &&
                        currentItems?.map((item: any, index: number) => {
                          let arr = [];
                          if (item?.point > 0) {
                            for (let i = 0; i < item?.point; i++) {
                              let count = 1 * (i + 1);
                              arr.push(count);
                            }
                          }
                          return (
                            <ReviewItem item={item} index={index} arr={arr} />
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
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <Container className="mb-4">
        <Col
          lg={4}
          className={`mt-4 ${cx.bannerSection} ${cx.mobileShow}`}
          id="leavePopup"
        >
          <LeaveReview
            showLogin={showLogin}
            handleLoginShow={handleLoginShow}
            handleLoginClose={handleLoginClose}
            showSignup={showSignup}
            handleSignupShow={handleSignupShow}
            handleSignupClose={handleSignupClose}
            showThank={showThank}
            cafeData={cafeData}
          />
        </Col>
      </Container>
      <ShareLocationM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
        locationUrl={window?.location?.href}
        title={"Share this cafe to your friends!"}
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
      <ImageViewsCafe
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={imageData}
        name={cafeData?.establishmentName}
      />
    </>
  );
};

export default CafeDetails;
