import React, { useEffect, useState } from "react";
import cx from "./UserRecommend.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Container, Form, Col, Row, ProgressBar } from "react-bootstrap";
import {
  cafeStep,
  cafeFormHeader,
  place1,
  place15,
  place18,
  place19,
  place2,
  place20,
  place21,
  place22,
  place23,
  place3,
  place4,
  uploadGallery,
  coffeeShop1,
  reBanner,
  BigTables,
} from "../../../assets/images";
import { Checkbox } from "../../../components/Website/Forms";
import { PhoneNumber } from "../../../components/Website";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import { useDispatch, useSelector } from "react-redux";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import {
  claimCafeFunc,
  saveRecommend,
  saveRecommendData,
} from "../../../redux_toolkit/globalReducer/cafeClaimReducer";
import { AddressAutofill } from "@mapbox/search-js-react";
import {
  accessToken,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { Login } from "../../../components/Website/Modals";
import {
  recommend,
  recommendChangeState,
} from "../../../redux_toolkit/globalReducer/recommendReducer";
import { BsFillStarFill } from "react-icons/bs";
import ThanksRecommend from "../../../components/Website/Modals/ThanksRecmomend";
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
import axios from "axios";
import Signup from "../../../components/Website/Modals/Signup";

const UserRecommend = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const imageState = useSelector((state: any) => state.imageReducer);
  const recommendState = useSelector((state: any) => state.recommendReducer);
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const category = [
    {
      name: "Coffee Shop",
      image: place1,
    },
    {
      name: "Bar",
      image: place2,
    },
    {
      name: "Restaurant",
      image: place3,
    },
    {
      name: "Other",
      image: place4,
    },
  ];
  const amenities = [
    // {
    //   name: "Stars",
    //   image: Stars,
    // },
    // {
    //   name: "Price Range",
    //   image: PriceRange,
    // },
    // {
    //   name: "Open Now",
    //   image: OpenNow,
    // },

    {
      name: "WiFi",
      image: WiFi,
    },
    // {
    //   name: "Fast WiFi",
    //   image: FastWifi,
    // },
    {
      name: "Natural Light",
      image: NaturalLight,
    },

    {
      name: "Charging Outlets",
      image: Outlets,
    },

    {
      name: "Quiet Environment",
      image: QuietVibes,
    },
    {
      name: "Outdoor Seating",
      image: Outdoor,
    },
    {
      name: "Large Groups",
      image: LargeGroup,
    },
    // {
    //   name: "Students",
    //   image: Students,
    // },
    {
      name: "Alcohol",
      image: Alcohol,
    },
    {
      name: "Snacks",
      image: place18,
    },
    {
      name: "Meals",
      image: SomethingToEat,
    },

    // {
    //   name: "Table Layout",
    //   image: TableLayout,
    // },
    {
      name: "Big Tables",
      image: BigTables,
    },
    {
      name: "Sofa Seating",
      image: SofaSeating,
    },
    {
      name: "High Tops",
      image: HighChairs,
    },
    // {
    //   name: "Bar Seating",
    //   image: Barseating,
    // },

    // {
    //   name: "Small Groups",
    //   image: place14,
    // },
    {
      name: "Private Room",
      image: place15,
    },
    // {
    //   name: "Free Parking",
    //   image: place16,
    // },
    {
      name: "Accessibility",
      image: Handicap,
    },
  ];
  const standoutAmenities = [
    {
      name: "Book Shop",
      image: place19,
    },
    {
      name: "Printer Available",
      image: place20,
    },
    {
      name: "Fast WiFi",
      image: place21,
    },
    {
      name: "Child Seats",
      image: place22,
    },
    {
      name: "Meals",
      image: place23,
    },
  ];
  const [imageLink, setImageLink] = useState<any[]>([
    {
      imageUrl: "",
      imageType: "cover",
    },
    {
      imageUrl: "",
      imageType: "",
    },
    {
      imageUrl: "",
      imageType: "",
    },
    {
      imageUrl: "",
      imageType: "",
    },
    {
      imageUrl: "",
      imageType: "",
    },
  ]);
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
  };
  const handlelookOpen = () => setLookshow(true);
  const [show, setShow] = useState<any>({
    step1: { isShow: false },
    step2: {
      establishmentName: "",
      category: "",
      otherDescription: "",
      isShow: true,
    },
    step3: {
      streetAddress: "",
      latitude: 0,
      longitude: 0,
      phone: 0,
      dialCode: 0,
      countryCode: "",
      contactEmail: "",
      facebookLink: "",
      instagramLink: "",
      twitterLink: "",
      linkedinLink: "",
      isShow: false,
    },
    step4: { isShow: false, facilities: [], stars: "", message: "" },
    step5: { isShow: false, isUpload: false, pictures: imageLink },
    currentStep: 2,
  });
  const [fieldError, setFieldError] = useState<any>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [cafe, setCafe] = useState<any>(cafeList);
  useEffect(() => {
    dispatch(allCafe());
  }, [dispatch]);
  useEffect(() => {
    setCafe(cafeList);
  }, [cafeState.allCafeState]);
  const handleFileChange = (file: any) => {
    dispatch(addImage({ image: file }));
  };
  useEffect(() => {
    if (recommendState.recommendState > 0) {
      if (
        (registrationState.registrationState === 1 && saveRecommend) ||
        (registrationState.socialState === 1 && saveRecommend) ||
        (registrationState.loginState === 1 && saveRecommend) ||
        !saveRecommend
      ) {
        handlelookOpen();
      }
      dispatch(recommendChangeState());
    }
  }, [
    dispatch,
    recommendState.recommendState,
    registrationState.socialState,
    registrationState.loginState,
    registrationState.registrationState,
  ]);
  const changeStatus = (key: any, value: any, type: string) => {
    if (Object.keys(show).some((a: any) => a === key)) {
      setShow((prev: any) => {
        return {
          ...prev,
          [key]: { ...prev[key], isShow: value },
          currentStep:
            type === "next"
              ? prev.currentStep + 1
              : type === ""
                ? prev.currentStep
                : prev.currentStep - 1,
        };
      });
    }
    window.scrollTo(0, 0);
  };
  const stars = [1, 2, 3, 4, 5];
  const [businessListed, setbusinessListed] = useState(false);
  const businessListedDropdown = () => {
    setbusinessListed(!businessListed);
  };
  const [cssOnNext, setCssOnNext] = useState(false);
  const fillFields = (key: any, param: any, value: any) => {
    setShow((prev: any) => {
      return { ...prev, [key]: { ...prev[key], [param]: value } };
    });
    if (fieldError !== undefined && fieldError[param]) {
      fieldError[param] = "";
    }
  };
  const checkFields = (fields: any, type = "") => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (e === "otherDescription") {
        if (fields[e] === "" && fields?.category === "Other") {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
          );
        }
      } else if (e === "facilities") {
        if (fields[e].length === 0) {
          fieldErr[e] = (
            <p className={`${cm.error}`}> Please select minimum one amenity </p>
          );
        }
      } else if (
        e === "isAgreeUser" ||
        e === "isCertify" ||
        (e === "isUpload" && imageLink?.some((a: any) => a.imageUrl !== ""))
      ) {
        if (fields[e] === false) {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
          );
        }
      } else if (
        (fields[e] === "" || fields[e] === 0) &&
        e !== "website" &&
        e !== "phone" &&
        e !== "dialCode" &&
        e !== "contactEmail" &&
        e !== "countryCode" &&
        e !== "linkedinLink" &&
        e !== "twitterLink" &&
        e !== "instagramLink" &&
        e !== "facebookLink"
      ) {
        fieldErr[e] = (
          <p className={`${cm.error}`}>
            {" "}
            {e === "category"
              ? "Please select one category"
              : e === "latitude"
              ? "Please select address from dropdown" : "This field is required"}
          </p>
        );
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (fields?.contactEmail) {
        if (fields?.contactEmail?.match(regex)) {
          changeStatus(`step${show.currentStep}`, false, "");
          changeStatus(`step${show.currentStep + 1}`, true, "next");
          setCssOnNext(false);
        } else {
          fieldErr.contactEmail = (
            <p className={`${cm.error}`}> Invalid Email </p>
          );
          setFieldError(fieldErr);
        }
      } else {
        if (
          show.currentStep === 5 &&
          !profile?.data?.role &&
          ((imageLink.some((e: any) => e.imageUrl !== "") &&
            show?.step5?.isUpload === true) ||
            imageLink.every((e: any) => e.imageUrl === ""))
        ) {
          handleSignupShow();
          dispatch(
            saveRecommendData({
              ...show?.step2,
              ...show.step3,
              ...show?.step4,
              ...show?.step5,
              recommendBy: "unknown user",
              isMember: "no",
              ratingReviews: {
                point: show?.step4?.stars,
                message: show?.step4?.message,
                createdAt: Date.now(),
                uniqueId: Date.now().toString(),
                userProfile: profile?.data?._id,
                cafeData: "",
                reply: "",
              },
            })
          );
        } else if (
          show.currentStep === 5 &&
          profile?.data?.role &&
          ((imageLink.some((e: any) => e.imageUrl !== "") &&
            show?.step5?.isUpload === true) ||
            imageLink.every((e: any) => e.imageUrl === ""))
        ) {
          dispatch(saveRecommendData(undefined));
          dispatch(
            recommend({
              ...show?.step2,
              ...show.step3,
              ...show?.step4,
              ...show?.step5,
              recommendBy: profile?.data?._id,
              isMember: "no",
              ratingReviews: {
                point: show?.step4?.stars,
                message: show?.step4?.message,
                createdAt: Date.now(),
                uniqueId: Date.now().toString(),
                userProfile: profile?.data?._id,
                reply: "",
              },
            })
          );
        } else {
          setCssOnNext(false);
          changeStatus(`step${show.currentStep}`, false, "");
          changeStatus(`step${show.currentStep + 1}`, true, "next");
        }
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  useEffect(() => {
    let arrayOfShow: any[] = Object.keys(show[`step${show.currentStep}`]);
    if (
      arrayOfShow.every((e: any) => {
        return show.currentStep === 2 && show.step2.category === "Other"
          ? show[`step${show.currentStep}`][e] !== "" &&
          show[`step${show.currentStep}`][e] !== false
          : e === "otherDescription"
            ? show[`step${show.currentStep}`][e] !==
            (e === "otherDescription" ? true : "") &&
            show[`step${show.currentStep}`][e] !== false
            : e === "facilities"
              ? show[`step${show.currentStep}`][e].length > 0
              : show[`step${show.currentStep}`][e] !==
              (e === "facebookLink" ||
                e === "instagramLink" ||
                e === "twitterLink" ||
                e === "linkedinLink" ||
                e === "website" ||
                e === "contactEmail" ||
                e === "phone" ||
                e === "dialCode" ||
                e === "countryCode"
                ? true
                : e === "latitude" ||
                e === "longitude" ? 0 : "") &&
              show[`step${show.currentStep}`][e] !==
              (e === "isUpload"
                ? imageLink.every((a: any) => a.imageUrl === "")
                : false);
      })
    ) {
      setCssOnNext(true);
    } else {
      setCssOnNext(false);
    }
  }, [show, imageLink]);
  const checkBoxFunc = (step: any, name: any, value: Boolean) => {
    fillFields(step, name, value);
  };
  function phoneInput(value: any, data: any) {
    fillFields("step3", "phone", +value);
    fillFields("step3", "dialCode", +data?.dialCode);
    fillFields("step3", "countryCode", data?.countryCode);
  }
  const amenitiesFunc = (name: any, value: String) => {
    if (
      show?.step4[name] &&
      show?.step4[name].length > 0 &&
      show?.step4[name]?.some((item: any) => item === value)
    ) {
      const index = show?.step4[name]?.indexOf(value);
      show?.step4[name]?.splice(index, 1);
      fillFields("step4", name, show?.step4[name]);
    } else {
      if (show?.step4[name] && show?.step4[name].length > 0) {
        show.step4[name].push(value);
        fillFields("step4", name, show?.step4[name]);
      } else {
        show.step4[name] = [value];
        fillFields("step4", name, show?.step4[name]);
      }
    }
  };
  useEffect(() => {
    if (imageState.imageState > 0) {
      imageLink[imageIndex].imageUrl = imageUrl;
      let imageUpdate: any[] = imageLink;
      setImageLink(imageUpdate);
      setImageIndex(0);
      setShow((prev: any) => {
        return { ...prev, step5: { ...prev.step5, pictures: imageLink } };
      });
      dispatch(changeImageState());
    }
  }, [dispatch, imageLink, imageIndex, imageState.imageState]);
  const [showLogin, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [showSignup, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);
  const handleSignupShow = () => setSignupShow(true);
  const [afterShowModule, setafterShowModule] = useState(false);
  const [beforeModule, setbeforeModule] = useState(true);
  const [selectedCafe, setSelectedCafe] = useState<any>();
  const afterShowModulef = () => {
    setafterShowModule(!afterShowModule);
    setbeforeModule(false);
  };
  const findLatLng = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          show?.step3?.streetAddress
        )}.json?access_token=${accessToken}`
      );
      const features = response.data.features;
      if (features.length > 0) {
        const [lng, lat] = features[0].center;
        fillFields("step3", "latitude", lat);
        fillFields("step3", "longitude", lng);
      } else {
        console.log("No matching results found.");
      }
    } catch (error) {
      console.log("Error retrieving geocoding data:", error);
    }
  };
  return (
    <>
      <div className={`${cx.topbox}`}> </div>
      <div className={`${cx.spaceBox}`}>
        <section className={`${cx.bannertop}`}>
          <img src={cafeFormHeader} className={`${cx.desktopImg}`} alt="" />
          <img src={reBanner} className={`${cx.mobileImg}`} alt="" />
          <Container>
            <Row>
              <Col lg={12} md={12} className={` ${cx.contenttop1}  `}>
                <div className={`${cx.contenttop}`}>
                  <h1>{!afterShowModule && "Recommend a place to Sync!"}</h1>
                </div>
              </Col>
              {/* after show  */}
              {afterShowModule && (
                <div className={`${cx.searchbox}`}>
                  <Row className="justify-content-center">
                    <Col lg={8}>
                      <div className={` ${cx.searchtext}`}>
                        <div className={`${cx.searchitem}`}>
                          <div className={`${cx.searchmenu}`}>
                            <img src={coffeeShop1} alt="" />
                            <div className={` ${cx.searchcontent}`}>
                              <h6>{selectedCafe?.establishmentName}</h6>
                              <span>{selectedCafe?.streetAddress}</span>
                            </div>
                          </div>
                          <div className={`${cx.textnumber}`}>
                            {selectedCafe?.image?.length > 0 && (
                              <div className={`${cx.photonumber}`}>
                                <p>{selectedCafe?.image?.length}</p>
                                <span>Photos</span>
                              </div>
                            )}
                            {+selectedCafe?.reviewsNumber +
                              selectedCafe?.ratingReviews?.length >
                              0 && (
                                <div className={`${cx.photonumber1}`}>
                                  <p>
                                    {+selectedCafe?.reviewsNumber +
                                      selectedCafe?.ratingReviews?.length}
                                  </p>
                                  <span>Reviews</span>
                                </div>
                              )}
                          </div>
                        </div>
                        <hr />
                        <div className={` ${cx.text_content}`}>
                          <div className="mt-3">
                            <p>
                              {" "}
                              This cafe is already listed. Please leave a
                              review!
                            </p>
                          </div>
                          <div className={`${cx.btnSubmit}`}>
                            <button
                              className={`btn ${st.btn2}`}
                              onClick={()=>{
                                if (!profile?.data?.role) {
                                  setSignupShow(true);
                                } else {
                                  navigate(`/cafe-details/${selectedCafe?._id}`)
                                }
                              }}
                            >
                              Leave a review
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Row>
          </Container>
        </section>
      </div>

      {show.step1.isShow && (
        <section className={`${cx.cafeStepSection}`}>
          <Container>
            <Row className="align-items-center">
              <Col md={6} className={`${cx.content}`}>
                <span className={`${cx.stepCount}`}>Step 1</span>
                <h2>
                  Tell us about <br />
                  your place
                </h2>
                <p>
                  Customize your profile, upload photos, and include any
                  information that you think people need to know before working
                  from your business.
                </p>
                <NavLink
                  to="#"
                  className={`btn ${st.btn1}`}
                  onClick={() => {
                    changeStatus("step1", false, "");
                    changeStatus("step2", true, "next");
                  }}
                >
                  Get started
                </NavLink>
              </Col>
              <Col md={6} className={`${cx.imBox}`}>
                <img src={cafeStep} alt="cafeStep" />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {!show.step1.isShow && beforeModule && (
        <>
          <section className={`${cx.stepSection}`}>
            <Container>
              {show.step2.isShow && (
                <Col md={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>
                        Share your favorite places to work from with our
                        community.
                      </h3>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox} ms-0 me-0`}>
                        <Form.Label>Name of place</Form.Label>
                        <Form.Control
                          type="type"
                          onClick={businessListedDropdown}
                          value={show?.step2?.establishmentName}
                          placeholder="Type the name of the place "
                          onChange={(e: any) => {
                            const filtered = cafeList.filter(
                              (item: any, index: number) =>
                                item?.establishmentName
                                  ?.toLowerCase()
                                  .indexOf(e.target.value.toLowerCase()) !== -1
                            );
                            setCafe(filtered);
                            fillFields(
                              "step2",
                              "establishmentName",
                              e.target.value
                            );
                          }}
                        />
                        {fieldError?.establishmentName}
                        {businessListed && (
                          <div className={`${cx.dropdownList}`}>
                            {cafe?.length > 0 && (
                              <h3>{cafe?.length} Results found</h3>
                            )}
                            {cafe?.length > 0 && (
                              <div className={`${cx.userFound}`}>
                                <ul>
                                  {cafe?.map((item: any, index: number) => {
                                    return (
                                      <li
                                        key={index}
                                        onClick={() => {
                                          setSelectedCafe(item);
                                          dispatch(claimCafeFunc(item));
                                          afterShowModulef();
                                          fillFields(
                                            "step2",
                                            "establishmentName",
                                            item?.establishmentName
                                          );
                                          businessListedDropdown();
                                        }}
                                      >
                                        <img
                                          src={coffeeShop1}
                                          alt="coffeeShop1"
                                        />
                                        <div className={`${cx.locationList}`}>
                                          <h5>{item?.establishmentName}</h5>
                                          <p>{item?.streetAddress} </p>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>Which of these best describe your place?</h3>
                    </Col>
                    <Col md={12}>
                      <ul className={`${cx.listShop}`}>
                        {category?.map((item: any, index: number) => {
                          return (
                            <li key={`${index}`}>
                              <button
                                className={
                                  show?.step2?.category === item?.name
                                    ? `${cx.active}`
                                    : ""
                                }
                                onClick={() =>
                                  fillFields("step2", "category", item?.name)
                                }
                              >
                                <img src={item?.image} alt="categoryImage" />
                                <h5>{item?.name}</h5>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      {fieldError?.category}
                    </Col>

                    {show?.step2?.category === "Other" && (
                      <Col md={12}>
                        <Form.Group className={`${cx.formBox}`}>
                          <Form.Label>Other</Form.Label>
                          <Form.Control
                            type="type"
                            placeholder="Please specify"
                            value={show?.step2?.otherDescription}
                            onChange={(e: any) =>
                              fillFields(
                                "step2",
                                "otherDescription",
                                e.target.value
                              )
                            }
                          />
                          {fieldError?.otherDescription}
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                </Col>
              )}

              {show.step3.isShow && (
                <Col md={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>Establishment Details</h3>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Name of place*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type the name of the place "
                          value={show?.step2?.establishmentName}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Address of the place*</Form.Label>
                        <form style={{ width: "100%" }}>
                          <AddressAutofill accessToken={accessToken}>
                            <Form.Control
                              placeholder="Location"
                              autoComplete="shipping address-line1"
                              value={show?.step3?.streetAddress}
                              onChange={(e: any) => {
                                if (e.target.value?.length < 2) {
                                  fillFields("step3", "latitude", 0)
                                  fillFields("step3", "longitude", 0)
                                }
                                fillFields(
                                  "step3",
                                  "streetAddress",
                                  e.target.value
                                );
                              }}
                            />
                          </AddressAutofill>
                          <input
                            autoComplete="shipping address-level2"
                            style={{
                              visibility: "hidden",
                              height: "0px",
                              width: "0px",
                              position: "absolute",
                            }}
                            onChange={(e: any) => {
                              fillFields(
                                "step3",
                                "streetAddress",
                                show?.step3?.streetAddress +
                                " " +
                                e.target.value
                              );
                            }}
                          />
                          <input
                            autoComplete="shipping country"
                            style={{
                              visibility: "hidden",
                              height: "0px",
                              width: "0px",
                              position: "absolute",
                            }}
                            onChange={(e: any) => {
                              findLatLng();
                              fillFields(
                                "step3",
                                "streetAddress",
                                show?.step3?.streetAddress +
                                " " +
                                e.target.value
                              );
                            }}
                          />
                        </form>
                        {fieldError?.streetAddress}
                        {fieldError?.latitude}
                      </Form.Group>
                    </Col>
                    <h5 className={`${cx.titleIn} mb-4`}>
                      Contact information
                    </h5>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Website (Optional)</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Share the website for this place"
                          value={show?.step3?.website}
                          onChange={(e: any) =>
                            fillFields("step3", "website", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Phone Number</Form.Label>
                        <PhoneNumber phoneInput={phoneInput} />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Share the email for this place"
                          value={show?.step3?.contactEmail}
                          onChange={(e: any) =>
                            fillFields("step3", "contactEmail", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <h5 className={`${cx.titleIn} mb-3`}>Social Media Links</h5>
                    <Col md={12}>
                      <Form.Group
                        className={`${cx.formBox} ${cx.formBoxGroup}`}
                      >
                        <span className={`${cx.icon}`}>
                          <FaFacebookF />
                        </span>
                        <Form.Control
                          type="type"
                          placeholder="Facebook link"
                          value={show?.step3?.facebookLink}
                          onChange={(e: any) =>
                            fillFields("step3", "facebookLink", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className={`${cx.formBox} ${cx.formBoxGroup}`}
                      >
                        <span className={`${cx.icon}`}>
                          <AiFillInstagram />
                        </span>
                        <Form.Control
                          type="type"
                          value={show?.step3?.instagramLink}
                          placeholder="Instagram link"
                          onChange={(e: any) =>
                            fillFields("step3", "instagramLink", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className={`${cx.formBox} ${cx.formBoxGroup}`}
                      >
                        <span className={`${cx.icon}`}>
                          <AiOutlineTwitter />
                        </span>
                        <Form.Control
                          type="type"
                          placeholder="Twitter link"
                          value={show?.step3?.twitterLink}
                          onChange={(e: any) =>
                            fillFields("step3", "twitterLink", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group
                        className={`${cx.formBox} ${cx.formBoxGroup}`}
                      >
                        <span className={`${cx.icon}`}>
                          <FaLinkedinIn />
                        </span>
                        <Form.Control
                          type="type"
                          placeholder="LinkedIn link"
                          value={show?.step3?.linkedinLink}
                          onChange={(e: any) =>
                            fillFields("step3", "linkedinLink", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              )}

              {show.step4.isShow && (
                <Col md={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>Tell us which amenities this place offers</h3>
                    </Col>

                    <Col md={12}>
                      <ul className={`${cx.listShop}`}>
                        {amenities?.map((item: any, index: number) => {
                          return (
                            <li key={`${index}`}>
                              <button
                                onClick={() =>
                                  amenitiesFunc("facilities", item?.name)
                                }
                                className={
                                  show?.step4?.facilities &&
                                    show?.step4?.facilities?.some(
                                      (e: any) => e === item?.name
                                    )
                                    ? `${cx.active}`
                                    : ""
                                }
                              >
                                <img src={item?.image} alt="facilityImage" />
                                <h5>{item?.name}</h5>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      {fieldError?.facilities}
                    </Col>
                    <Col md={12}>
                      <h5 className={`${cx.titleIn} mb-3`}>
                        Do you have standout amenities?
                      </h5>
                    </Col>
                    <Col md={12}>
                      <ul className={`${cx.listShop}`}>
                        {standoutAmenities?.map((item: any, index: number) => {
                          return (
                            <li key={`${index}`}>
                              <button
                                onClick={() =>
                                  amenitiesFunc(
                                    "standoutFacilities",
                                    item?.name
                                  )
                                }
                                className={
                                  show?.step4?.standoutFacilities &&
                                    show?.step4?.standoutFacilities?.some(
                                      (e: any) => e === item?.name
                                    )
                                    ? `${cx.active}`
                                    : ""
                                }
                              >
                                <img
                                  src={item?.image}
                                  alt="standoutFacilityImage"
                                />
                                <h5>{item?.name}</h5>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </Col>

                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>Leave your first review of this place!</h3>
                      <p>From 1 (poor) to 5 (Excellent)</p>
                      <div className={`${cx.ratingStar}`}>
                        {stars?.map((item: any, index: number) => {
                          return (
                            <button
                              className={
                                show?.step4?.stars >= index + 1
                                  ? `${cx.active}`
                                  : ""
                              }
                              onClick={() => {
                                fillFields("step4", "stars", index + 1);
                              }}
                            >
                              <BsFillStarFill />
                            </button>
                          );
                        })}
                        {fieldError?.stars}
                      </div>
                    </Col>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>
                        Please share any additional comments about the place
                      </h3>
                    </Col>
                    <Form.Group className={`${cx.formBox} m-0`}>
                      <Form.Control
                        as="textarea"
                        placeholder="Type here"
                        style={{ minHeight: "200px" }}
                        value={show?.step4?.message}
                        onChange={(e: any) => {
                          fillFields("step4", "message", e.target.value);
                        }}
                      />
                      {fieldError?.message}
                    </Form.Group>
                  </Row>
                </Col>
              )}

              {show.step5.isShow && (
                <Col md={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <h3>Add some photos</h3>
                    </Col>

                    {imageLink?.map((item: any, index: number) => {
                      return (
                        <Col lg={index === 0 ? 12 : 6} key={`${index}`}>
                          <div className={`${cx.uploadBox}`}>
                            <div className={`${cx.uploadBoxBody}`}>
                              <img
                                src={
                                  item?.imageUrl === ""
                                    ? uploadGallery
                                    : item?.imageUrl
                                }
                                className={
                                  item?.imageUrl === ""
                                    ? `${cx.icon}`
                                    : `${cx.uploadedImg}`
                                }
                                alt={
                                  index === 0 ? "cafeCoverImage" : "cafeImage"
                                }
                              />
                              {/* {item?.imageUrl !== "" && (
                                  <button className={`${cx.closeIcon}`}  onClick={() =>{
                                    imageLink[index].imageUrl = "";
                                    setImageLink(imageLink)
                                  }
                                  }>
                                    <MdClose />
                                  </button>
                                )} */}
                              {item?.imageUrl === "" && index === 0 && (
                                <p>
                                  Upload photos <br />
                                  (Accepted format: JPG, PNG)
                                </p>
                              )}
                              {item?.imageUrl === "" && index > 0 && (
                                <p>Upload photos</p>
                              )}
                              <FileUploader
                                name={`file${index}file`}
                                handleChange={(e: any) => {
                                  setImageIndex(index);
                                  handleFileChange(e);
                                }}
                                types={fileTypes}
                              />
                            </div>
                            {index === 0 && (
                              <span className={`${cx.label}`}>Cover photo</span>
                            )}
                          </div>
                        </Col>
                      );
                    })}
                    {/* <Col md={12} className="text-center mt-3 mb-3">
                      <NavLink to="#" className={`btn ${st.btn1}`} onClick={() => {
                          checkFields(show?.step8, "upload");
                          setStepType("upload");
                        }}>
                        Upload
                      </NavLink>
                    </Col> */}
                    <Col md={8} className="m-auto">
                      <ul className={`${cx.policyList}`}>
                        <li>
                          <label className={`${st.checkbox}`}>
                            <Checkbox
                              nameCheckbox={"isUpload"}
                              step={"step5"}
                              fillFields={checkBoxFunc}
                              checked={show?.step5?.isUpload ? true : false}
                            />
                            By uploading these photos, you agree to our Terms
                            and Conditions and confirm that you have read our
                            Privacy and Cookie Statement.
                          </label>
                        </li>
                        {fieldError?.isUpload}
                      </ul>
                    </Col>
                  </Row>
                </Col>
              )}
            </Container>
          </section>

          <section className={`${cx.actionFixed}`}>
            <Container>
              {!show.step1.isShow && (
                <div className={`${cx.actionSection}`}>
                  <Row className="align-items-center">
                    <Col md={12}>
                      <ProgressBar
                        now={
                          ((show.currentStep - 1) * 100) /
                          (Object.keys(show).length - 1)
                        }
                      />
                    </Col>
                    <Col className="col-6" md={6}>
                      {!show?.step2.isShow && (
                        <NavLink
                          className={`${cx.backBtn}`}
                          to="#"
                          onClick={() => {
                            changeStatus(
                              `step${show.currentStep - 1}`,
                              true,
                              "back"
                            );
                            changeStatus(`step${show.currentStep}`, false, "");
                          }}
                        >
                          Back
                        </NavLink>
                      )}
                    </Col>
                    <Col md={6} className="col-6 text-end">
                      <NavLink
                        className={
                          cssOnNext === true
                            ? `btn ${cx.nextBtn} ${cx.active2}`
                            : `btn ${cx.nextBtn}`
                        }
                        to="#"
                        onClick={() => {
                          checkFields(show[`step${show.currentStep}`]);
                        }}
                      >
                        {show?.currentStep === 5 ? "Finish" : "Next"}
                      </NavLink>
                    </Col>
                  </Row>
                </div>
              )}
            </Container>
          </section>
          <ThanksRecommend
            lookshow={lookshow}
            handlelookClose={handlelookClose}
          />
        </>
      )}
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

export default UserRecommend;
