import React, { useCallback, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import cx from "./CafeStep.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Container, Form, Col, Row, ProgressBar } from "react-bootstrap";
import {
  BigTables,
  Logo,
  cafeStep,
  place1,
  place15,
  place18,
  place19,
  place2,
  place20,
  place22,
  place3,
  place4,
  uploadGallery,
} from "../../../assets/images";
import { Checkbox } from "../../../components/Website/Forms";
import PhoneNumber from "../../../components/Website/PhoneNumber/PhoneNumber";
import { useDispatch, useSelector } from "react-redux";
import {
  addCafe,
  addcafebyowner,
  allEmail,
  allEmails,
  cafeAdd,
  cafeSubmission,
  cafeVerification,
  changeAddCafeState,
  changeSubmitCafeState,
  changeVerifyCafeState,
  changeaddCafeByOwnerState,
  submitCafe,
  verifyCafe,
} from "../../../redux_toolkit/reducer/cafeReducer";
import OtpInput from "react-otp-input";
import {
  accessToken,
  cafeDataFunc,
  myData,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { FileUploader } from "react-drag-drop-files";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import Map from "react-map-gl";
import Geocoder from "./Geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
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

const CafeStep = () => {
  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapRef: any = useRef();
  const [coordinates, setCoordinates] = useState({
    lat: 42.360253,
    lng: -71.058291,
  });
  const updateLatLng = useCallback((coord: any) => {
    setFieldError({});
    setCoordinates(() => {
      return { lat: coord[1], lng: coord[0] };
    });
  }, []);

  const cafeStates = useSelector((state: any) => state.cafeReducer);
  const imageState = useSelector((state: any) => state.imageReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(myData());
    dispatch(allEmail())
    // dispatch(mapKeyFunc());
  }, [dispatch]);
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
      name: "Child Seats",
      image: place22,
    },
  ];
  const [eyeShow, setEyeShow] = useState(true);
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
  const [show, setShow] = useState<any>({
    step1: { isShow: true },
    step2: {
      category: "",
      otherDescription: "",
      isShow: false,
    },
    step3: {
      isMember: "",
      position: "",
      isOpen: "",
      isShow: false,
    },
    step4: {
      email: "",
      password: "",
      isNotifyByEmail: false,
      isCertify: false,
      isShow: false,
    },
    step5: {
      establishmentName: "",
      legalEstablishmentName: "",
      website: "",
      shortDescription: "",
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
    step6: {
      openHours: {},
      isShow: false,
    },
    step7: { isShow: false },
    step8: { isShow: false, isUpload: false, pictures: imageLink },
    step9: { isShow: false, longitude: "", latitude: "" },
    step10: {
      state: "",
      city: "",
      streetAddress: "",
      postalCode: "",
      isShow: false,
    },
    step11: {
      name: "",
      userPosition: "",
      userPhone: 0,
      userDialCode: 0,
      userCountryCode: "",
      isAgreeUser: false,
      isShow: false,
    },
    currentStep: 1,
  });
  useEffect(() => {
    setShow(show);
  }, [show]);
  useEffect(()=>{
    if(window.location.pathname.includes('/cafe-step/addcafe')){
      setShow((prev:any)=>{
        return {...prev, 
        step1: { isShow: false },
        step2: {
          category: "",
          otherDescription: "",
          isShow: false,
        },
        step3: {
          isMember: "yes",
          position: "",
          isOpen: "",
          isShow: false,
        },
        step4: {
          email: profile?.data?.email,
          isNotifyByEmail: false,
          isCertify: true,
          isShow: false,
        },
        step5: {
          ...prev.step5, isShow: true
        },
        currentStep: 5
      }
      })
    }
  },[])
  const [isVerify, setIsVerify] = useState(false);
  const [timer, setTimer] = useState<any>(30);
  const [otp, setOtp] = useState("");
  const [cafeId, setCafeId] = useState("");
  const [cafeDetails, setCafeDetails] = useState<any>();
  const [fieldError, setFieldError] = useState<any>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [stepType, setStepType] = useState("");
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [cssOnNext, setCssOnNext] = useState(false);
  const [cssOnSignUp, setCssOnSignUp] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [commonError, setCommonError] = useState("");
  const [changeColor, setChangeColor] = useState(false)
  const [viewport, setViewport] = useState<any>({
    width: "100vw",
    height: "100vh",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 10,
  });
  const [showPassword, setShowPassword] = useState(true);

  const changeStatus = useCallback((key: any, value: any, type: String) => {
    setShow((prev: any) => {
      if (Object.keys(prev).some((a: any) => a === key)) {
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
      } else {
        return prev;
      }
    });
    window.scrollTo(0, 0);
  }, []);
  const checkBoxFunc = (step: any, name: any, value: Boolean) => {
    if (step === "step6")
      if (!value) {
        delete show?.step6?.openHours[name];
        fillFields("step6", "openHours", { ...show?.step6?.openHours });
      } else {
        fillFields("step6", "openHours", {
          ...show?.step6?.openHours,
          [name]: {},
        });
      }
    else {
      fillFields(step, name, value);
    }
  };
  const [timeErr, setTimeErr] = useState<any>({});
  const TimeFunc = (name: any, time: any, value: any) => {
    if (time === "endTime") {
      if (!show?.step6?.openHours[name]?.startTime) {
        setTimeErr((prev: any) => {
          return {
            ...prev,
            [name]: `Please select start time first on ${name} first`,
          };
        });
      } else {
        let end = value.split(":");
        let totalEnd = `${end[0]}${end[1]}`;
        let start = show?.step6?.openHours[name]?.startTime?.split(":");
        let totalStart = `${start[0]}${start[1]}`;
        let difference = +totalEnd - +totalStart;
        if (difference < 100) {
          setTimeErr((prev: any) => {
            return { ...prev, [name]: `minimum 1 hour is required in ${name}` };
          });
        } else {
          fillFields("step6", "openHours", {
            ...show?.step6?.openHours,
            [name]: { ...show?.step6?.openHours[name], [time]: value },
          });
          setTimeErr({});
        }
      }
    } else {
      fillFields("step6", "openHours", {
        ...show?.step6?.openHours,
        [name]: { ...show?.step6?.openHours[name], [time]: value },
      });
      setTimeErr("");
    }
  };
  const amenitiesFunc = (name: any, value: String) => {
    if (
      show?.step7[name] &&
      show?.step7[name].length > 0 &&
      show?.step7[name]?.some((item: any) => item === value)
    ) {
      const index = show?.step7[name]?.indexOf(value);
      show?.step7[name]?.splice(index, 1);
      fillFields("step7", name, show?.step7[name]);
    } else {
      if (show?.step7[name] && show?.step7[name].length > 0) {
        show.step7[name].push(value);
        fillFields("step7", name, show?.step7[name]);
      } else {
        show.step7[name] = [value];
        fillFields("step7", name, show?.step7[name]);
      }
    }
  };
  const fillFields = (key: any, param: any, value: any) => {
    setCommonError("");
    setShow((prev: any) => {
      return { ...prev, [key]: { ...prev[key], [param]: value } };
    });
    if (fieldError !== undefined && fieldError[param]) {
      fieldError[param] = "";
    }
  };
  const checkFields = (fields: any, type = "") => {
    setCommonError("");
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (e === "otherDescription") {
        if (fields[e] === "" && fields?.category === "Other") {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
          );
        }
      } else if (e === "position") {
        if (fields[e] === "" && isOwner === true) {
          fieldErr[e] = (
            <p className={`${cm.error}`}> This field is required </p>
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
        e !== "shortDescription" &&
        e !== "dialCode" &&
        e !== "countryCode" &&
        e !== "openHours" &&
        e !== "timeLimitation" &&
        e !== "limitations" &&
        e !== "streetAddress" &&
        e !== "userPhone" &&
        e !== "userDialCode" &&
        e !== "userCountryCode" &&
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
              : "This field is required"}
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
      } else if (fields?.email) {
        if (fields?.email?.match(regex) && ((showPassword && fields?.password?.length >= 8) || (!showPassword))) {
          if (type === "signup") {
            dispatch(
              addCafe({
                ...show.step2,
                ...show.step3,
                ...show.step4,
                isClaimed: true,
              })
            );
            setCssOnNext(false);
          } else {
            if (show.currentStep === 4 && isVerify === false) {
              setCommonError("Please signup first");
            } else {
              changeStatus(`step${show.currentStep}`, false, "");
              changeStatus(`step${show.currentStep + 1}`, true, "next");
              setCssOnNext(false);
            }
          }
        } else {
          if (!fields?.email?.match(regex)) {
            fieldErr.email = <p className={`${cm.error}`}> Invalid Email </p>;
            setFieldError({ ...fieldError, ...fieldErr });
          }
          if (showPassword && fields?.password?.length < 8) {
            fieldErr.password = (
              <p className={`${cm.error}`}>
                {" "}
                Password must be 8 or more character{" "}
              </p>
            );
            setFieldError({ ...fieldError, ...fieldErr });
          }
        }
      } else {
        if (type === "signup") {
          dispatch(
            addCafe({
              ...show.step2,
              ...show.step3,
              ...show.step4,
              isClaimed: true,
            })
          );
          setCssOnNext(false);
        } else if (type === "upload") {
          dispatch(submitCafe({ ...show.step8 }));
          setCssOnNext(false);
        } else {
          if (show.currentStep === 4 && isVerify === false) {
            setCommonError("Please signup first");
          } else if (
            show.currentStep === 8 &&
            isImageUpload === false &&
            imageLink.some((e: any) => e.imageUrl !== "")
          ) {
            setCommonError("Please upload first");
          } else {
            if (Object.keys(timeErr)?.length === 0) {
              if (show.currentStep !== 11) {
                changeStatus(`step${show.currentStep}`, false, "");
                changeStatus(`step${show.currentStep + 1}`, true, "next");
              }
              if (show.currentStep === 11) {
                setStepType("");
                if(window.location.pathname.includes('/cafe-step/addcafe')){
                  dispatch(addcafebyowner({
                    ...show.step2,
                    ...show.step3,
                    ...show.step4,
                    ...show.step5,
                    ...show.step6,
                    ...show.step7,
                    ...show.step8,
                    ...show.step9,
                    ...show.step10,
                    ...show.step11,
                    isClaimed: true,
                    type: "cafeRequest",
                  }))
                }else{
                dispatch(
                  submitCafe({
                    ...show.step5,
                    ...show.step6,
                    ...show.step7,
                    ...show.step8,
                    ...show.step9,
                    ...show.step10,
                    ...show.step11,
                    isClaimed: true,
                    type: "cafeRequest",
                  })
                );
                }
              }
              setCssOnNext(false);
            }
          }
        }
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  function phoneInput(value: any, data: any) {
    fillFields("step5", "phone", +value);
    fillFields("step5", "dialCode", +data?.dialCode);
    fillFields("step5", "countryCode", data?.countryCode);
  }
  function phoneValue(value: any, data: any) {
    fillFields("step11", "userPhone", +value);
    fillFields("step11", "userDialCode", +data?.dialCode);
    fillFields("step11", "userCountryCode", data?.countryCode);
  }
  const handleFileChange = (file: any) => {
    dispatch(addImage({ image: file }));
  };
  useEffect(() => {
    if (imageState.imageState > 0) {
      imageLink[imageIndex].imageUrl = imageUrl;
      let imageUpdate: any[] = imageLink;
      setImageLink(imageUpdate);
      setCssOnSignUp(false);
      setImageIndex(0);
      dispatch(changeImageState());
    }
  }, [dispatch, imageLink, imageIndex, imageState.imageState]);
  useEffect(() => {
    if (cafeStates.addCafeState > 0) {
      if (cafeAdd.success === true) {
        setTimer(30);
        setIsVerify(true);
        setCafeId(cafeAdd?.cafeUniqueId);
        dispatch(changeAddCafeState());
      } else {
        setCommonError(cafeAdd.message);
        dispatch(changeAddCafeState());
      }
    }
    if (cafeStates.verifyCafeState > 0) {
      if (cafeVerification.success === true) {
        setCafeDetails(cafeVerification?.cafe);
        dispatch(myData());
        changeStatus(`step4`, false, "");
        changeStatus(`step5`, true, "next");
        setIsVerify(false);
        dispatch(changeVerifyCafeState());
        setCssOnNext(false);
      } else {
        setCommonError(cafeVerification.message);
        dispatch(changeVerifyCafeState());
        setCssOnNext(false);
      }
    }
    if (cafeStates.submitCafeState > 0) {
      if (cafeSubmission.success === true) {
        if (stepType === "") {
          dispatch(cafeDataFunc());
          dispatch(changeSubmitCafeState());
        } else {
          setIsImageUpload(true);
          changeStatus(`step8`, false, "");
          changeStatus(`step9`, true, "next");
          show.currentStep = 8;
          dispatch(changeSubmitCafeState());
        }
      } else {
        setCommonError(cafeSubmission.message);
        dispatch(changeSubmitCafeState());
      }
    }
    if(cafeStates.addCafeByOwnerState > 0){
      navigate('/cafepanel')
      dispatch(changeaddCafeByOwnerState());
      dispatch(myData());
    }
  }, [
    navigate,
    dispatch,
    changeStatus,
    show,
    stepType,
    cafeStates.addCafeState,
    cafeStates.verifyCafeState,
    cafeStates.submitCafeState,
    cafeStates.addCafeByOwnerState
  ]);

  const timeOutCallback = useCallback(
    () => setTimer((currTimer: any) => currTimer - 1),
    []
  );

  useEffect(() => {
    if (isVerify === true) {
      timer > 0 && setTimeout(timeOutCallback, 1000);
    }
  }, [isVerify, timer, timeOutCallback]);
  useEffect(() => {
    if (
      profile?.data?.role === "cafe" &&
      profile?.data?.isVerified === true &&
      profile?.data?.isSubmitted === false
    ) {
      setCafeDetails(profile?.data);
      setShow((prev: any) => {
        return {
          ...prev,
          step1: { ...prev.step1, isShow: false },
        };
      });
      setShow((prev: any) => {
        return {
          ...prev,
          step5: { ...prev.step5, isShow: true },
          currentStep: 5,
        };
      });
    }
    if (profile?.data?.role === "cafe" && profile?.data?.isSubmitted === true && !window.location.pathname.includes('/cafe-step/addcafe')) {
      setCafeDetails(profile?.data);
      navigate("/cafepanel");
    }
  }, [navigate, profileState.profileState]);
  useEffect(() => {
    let arrayOfShow: any[] = Object.keys(show[`step${show.currentStep}`]);
    if (show.currentStep !== 4) {
      if (
        arrayOfShow.every((e: any) => {
          return show.currentStep === 2 && show.step2.category === "Other"
            ? show[`step${show.currentStep}`][e] !== "" &&
                show[`step${show.currentStep}`][e] !== false
            : e === "otherDescription"
            ? show[`step${show.currentStep}`][e] !==
                (e === "otherDescription" ? true : "") &&
              show[`step${show.currentStep}`][e] !== false
            : show.currentStep === 3 && isOwner === true
            ? show[`step${show.currentStep}`][e] !== "" &&
              show[`step${show.currentStep}`][e] !== false
            : e === "position"
            ? show[`step${show.currentStep}`][e] !==
                (e === "position" ? true : "") &&
              show[`step${show.currentStep}`][e] !== false
            : e === "pictures"
            ? isImageUpload
            : show[`step${show.currentStep}`][e] !==
                (e === "facebookLink" ||
                e === "instagramLink" ||
                e === "twitterLink" ||
                e === "linkedinLink" ||
                e === "website" ||
                e === "shortDescription" ||
                e === "streetAddress" ||
                e === "userPhone" ||
                e === "userDialCode" ||
                e === "userCountryCode"
                  ? true
                  : "") &&
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
    } else {
      if (
        arrayOfShow.every((e: any) => {
          return (
            show[`step${show.currentStep}`][e] !== (e !== "password" ? "" : showPassword===true ? "" : true) &&
            show[`step${show.currentStep}`][e] !== (e === "isNotifyByEmail" ? "" : false)
          );
        })
      ) {
        setCssOnSignUp(true);
      } else {
        setCssOnSignUp(false);
      }
    }
  }, [show, imageLink, isImageUpload, isOwner, showPassword]);
  useEffect(() => {
    if (otp !== "" && otp.length === 6) {
      setCssOnNext(true);
    } else {
      setCssOnNext(false);
    }
  }, [otp]);
  const onMove = React.useCallback(({ viewState }: any) => {
    const newCenter = [viewState.latitude, viewState.longitude];
    setViewport(newCenter);
  }, []);
  return (
    <>
      <section className={`${cx.cafeHeader}`}>
        <Container>
          <NavLink to="/">
            <img src={Logo} className={`${cx.logo}`} alt="logo" />
          </NavLink>
        </Container>
      </section>

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
                <img src={cafeStep} alt="cafestep" />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {!show.step1.isShow && (
        <>
          <section className={`${cx.stepSection}`}>
            <Container>
              {show.step2.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 2</span>
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
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 3</span>
                      <h3>Add your business to Sync</h3>
                      <p>Customize your profile, upload photos, and include </p>
                    </Col>
                    <Col md={12}>
                      <h5 className={`${cx.titleIn}`}>
                        Is this place currently open?
                      </h5>
                      <div className={`${cx.btnGroup}`}>
                        <button
                          className={
                            show?.step3?.isOpen === "yes"
                              ? `btn ${cx.actionBtn} ${cx.active}`
                              : `btn ${cx.actionBtn}`
                          }
                          onClick={() => fillFields("step3", "isOpen", "yes")}
                        >
                          Yes
                        </button>
                        <button
                          className={
                            show?.step3?.isOpen === "no"
                              ? `btn ${cx.actionBtn} ${cx.active}`
                              : `btn ${cx.actionBtn}`
                          }
                          onClick={() => fillFields("step3", "isOpen", "no")}
                        >
                          No
                        </button>
                      </div>
                      {fieldError?.isOpen}
                    </Col>
                    <Col md={12}>
                      <h5 className={`${cx.titleIn}`}>
                        Are you the owner, employee, or official representative
                        of this place?
                      </h5>
                      <div className={`${cx.btnGroup}`}>
                        <button
                          className={
                            show?.step3?.isMember === "yes"
                              ? `btn ${cx.actionBtn} ${cx.active}`
                              : `btn ${cx.actionBtn}`
                          }
                          onClick={() => {
                            fillFields("step3", "isMember", "yes");
                            setIsOwner(true);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className={
                            show?.step3?.isMember === "no"
                              ? `btn ${cx.actionBtn} ${cx.active}`
                              : `btn ${cx.actionBtn}`
                          }
                          onClick={() => {
                            fillFields("step3", "isMember", "no");
                            fillFields("step3", "position", "Owner")
                            setIsOwner(false);
                            navigate('/user-recommend')
                          }}
                        >
                          No
                        </button>
                      </div>
                    </Col>
                    <Col md={12} style={{ marginBottom: "20px" }}>
                      {fieldError?.isMember}
                    </Col>
                    {isOwner && (
                      <Col md={12}>
                        <Form.Group className={`${cx.formBox}`}>
                          <Form.Label>What is your role?</Form.Label>
                          <Form.Select
                            required
                            value={show?.step3?.position}
                            onChange={(e: any) =>
                              fillFields("step3", "position", e.target.value)
                            }
                          >
                            <option value="">Select your role</option>
                            <option value="Owner">Owner</option>
                            <option value="Manager">Manager</option>
                            <option value="Guest Services">
                              Guest Services
                            </option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                          {fieldError?.position}
                        </Form.Group>
                      </Col>
                    )}
                  </Row>
                </Col>
              )}

              {!cafeDetails?.isVerified && show.step4.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    {!isVerify && (
                      <>
                        <Col md={12} className={`${cx.titleBox}`}>
                          <span className={`${cx.stepCount}`}>Step 4</span>
                          <h3>
                            Sign up to <br />
                            Sync Remote Business
                          </h3>
                        </Col>
                        <Col md={12}>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Email Address*</Form.Label>
                            <Form.Control
                              type="type"
                              placeholder="Type your email address"
                              value={show?.step4?.email}
                              onChange={(e: any) =>{
                                const checkEmail = allEmails?.some((a:any) => a?.email?.toLowerCase()===e.target.value?.toLowerCase())
                                if(!checkEmail){
                                  setShowPassword(true)
                                }else{
                                  setShowPassword(false)
                                  // fillFields("step4", "password", "")
                                  setFieldError((prev:any)=>{
                                    return {...prev, password: ""}
                                  })
                                  delete show.step4.password;
                                }
                                fillFields("step4", "email", e.target.value)
                              }}
                            />
                            {fieldError?.email}
                          </Form.Group>
                        </Col>
                        {showPassword ? <Col md={12}>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Create Password*</Form.Label>
                            <Form.Control
                              type={eyeShow ? "password" : "text"}
                              placeholder="Create your password"
                              value={show?.step4?.password}
                              onChange={(e: any) =>
                                fillFields("step4", "password", e.target.value)
                              }
                            />
                            {eyeShow ? (
                              <AiFillEye
                                className={`${cx.eyeIcon}`}
                                onClick={() => {
                                  setEyeShow(false);
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                className={`${cx.eyeIcon}`}
                                onClick={() => {
                                  setEyeShow(true);
                                }}
                              />
                            )}
                            {fieldError?.password}
                          </Form.Group>
                        </Col> : <Col md={12}><p style={changeColor ? {color: "red"} : {color: 'black'}}>You're already registered! Please login and add cafe.  </p></Col>}
                        <Col md={12}>
                          <ul className={`${cx.policyList}`}>
                            <li>
                              <label className={`${st.checkbox}`}>
                                <Checkbox
                                  nameCheckbox={"isNotifyByEmail"}
                                  step={"step4"}
                                  fillFields={checkBoxFunc}
                                  checked={
                                    show?.step4?.isNotifyByEmail ? true : false
                                  }
                                />
                                Get notified by email about new reviews, best
                                practices, and more to help you improve your
                                online reputation and build your business.
                              </label>
                              {fieldError?.isNotifyByEmail}
                            </li>
                            <li>
                              <label className={`${st.checkbox}`}>
                                <Checkbox
                                  nameCheckbox={"isCertify"}
                                  step={"step4"}
                                  fillFields={checkBoxFunc}
                                  checked={
                                    show?.step4?.isCertify ? true : false
                                  }
                                />
                                Checking this box to certify that you are an
                                official representative of the establishment for
                                which you are submitting this listing and that
                                the information you have submitted is correct.
                              </label>
                              {fieldError?.isCertify}
                            </li>
                          </ul>
                        </Col>
                        <p className={`${cm.error}`}>{commonError}</p>
                        <Col md={12}>
                          <NavLink
                            to="#"
                            className={
                              cssOnSignUp === true
                                ? `btn ${st.btn2} ${st.active2}`
                                : `btn ${st.btn2}`
                            }
                            style={{ width: "100%" }}
                            onClick={() => {
                              if(!showPassword){
                                setChangeColor(true)
                              }else{
                              checkFields(show?.step4, "signup")
                            }}}
                          >
                            Sign up
                          </NavLink>
                        </Col>
                      </>
                    )}

                    {isVerify && (
                      <>
                        <Col md={12} className={`${cx.titleBox} mt-5`}>
                          <h3>Enter Verification</h3>
                          <p>
                            Please enter the verification code that we have sent
                            on your email.
                          </p>
                        </Col>

                        <Col md={12}>
                          <ul className={`${cx.verificationCode}`}>
                            <li>
                              <OtpInput
                                value={otp}
                                onChange={(e: any) => {
                                  setOtp(e);
                                  setFieldError({});
                                }}
                                numInputs={6}
                                renderSeparator={<span> </span>}
                                renderInput={(props) => <input {...props} />}
                              />
                            </li>
                            {fieldError?.otpErr}
                          </ul>
                        </Col>
                        <Col md={12}>
                          <ul className={`${cm.resendBox}`}>
                            <li className={`${cm.resendOtp}`}>
                              {timer > 0 ? (
                                <p>You can resend OTP after {timer} seconds </p>
                              ) : (
                                <>
                                  <p>
                                    Didn’t get the code?
                                    <Link
                                      className="ms-1"
                                      to="#"
                                      onClick={() =>
                                        dispatch(
                                          addCafe({
                                            ...show.step2,
                                            ...show.step3,
                                            ...show.step4,
                                            isClaimed: true,
                                          })
                                        )
                                      }
                                    >
                                      send again
                                    </Link>
                                  </p>
                                </>
                              )}
                            </li>
                            <li className={`${cm.changeEmail}`}>
                              <Link to="#" onClick={() => setIsVerify(false)}>
                                Change Email Address
                              </Link>
                            </li>
                          </ul>
                        </Col>
                        <p className={`${cm.error}`}>{commonError}</p>
                      </>
                    )}
                  </Row>
                </Col>
              )}

              {show.step5.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 5</span>
                      <h3>Public Information</h3>
                      <p>
                        This information will appear on your listing for users
                        to see.
                      </p>
                    </Col>
                    <Col md={12} className={`${cx.inTitle}`}>
                      <p>This is the name users will see</p>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Establishment Name*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type the name of your establishment"
                          value={show?.step5?.establishmentName}
                          onChange={(e: any) =>
                            fillFields(
                              "step5",
                              "establishmentName",
                              e.target.value
                            )
                          }
                        />
                        {fieldError?.establishmentName}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Legal Establishment Name*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type the name your business is registered under"
                          value={show?.step5?.legalEstablishmentName}
                          onChange={(e: any) =>
                            fillFields(
                              "step5",
                              "legalEstablishmentName",
                              e.target.value
                            )
                          }
                        />
                        {fieldError?.legalEstablishmentName}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Website (Optional)</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type your website"
                          value={show?.step5?.website}
                          onChange={(e: any) =>
                            fillFields("step5", "website", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>
                          Write a short description (Optional)
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Tell our users a bit about your place!"
                          style={{ minHeight: "200px" }}
                          value={show?.step5?.shortDescription}
                          onChange={(e: any) =>
                            fillFields(
                              "step5",
                              "shortDescription",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12} className={`${cx.inTitle}`}>
                      <p>
                        This is the number customers can contact your business
                        at
                      </p>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Phone Number*</Form.Label>
                        <PhoneNumber
                          phoneInput={phoneInput}
                          fields={{
                            ...show?.step5,
                            mobileNumber: show?.step5?.phone,
                          }}
                        />
                        {fieldError?.phone}
                      </Form.Group>
                    </Col>

                    <Col md={12} className={`${cx.inTitle}`}>
                      <p>
                        This is the email address customers can contact your
                        business at
                      </p>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Email address*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type your Email"
                          value={show?.step5?.contactEmail}
                          onChange={(e: any) =>
                            fillFields("step5", "contactEmail", e.target.value)
                          }
                        />
                        {fieldError?.contactEmail}
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
                          value={show?.step5?.facebookLink}
                          onChange={(e: any) =>
                            fillFields("step5", "facebookLink", e.target.value)
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
                          placeholder="Instagram link"
                          value={show?.step5?.instagramLink}
                          onChange={(e: any) =>
                            fillFields("step5", "instagramLink", e.target.value)
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
                          value={show?.step5?.twitterLink}
                          onChange={(e: any) =>
                            fillFields("step5", "twitterLink", e.target.value)
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
                          value={show?.step5?.linkedinLink}
                          onChange={(e: any) =>
                            fillFields("step5", "linkedinLink", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              )}

              {show.step6.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 6</span>
                      <h3>Additional Information</h3>
                    </Col>
                    <Col md={12}>
                      <h5 className={`${cx.titleIn} mb-5`}>Operating Hours</h5>
                    </Col>
                    <Col md={12}>
                      <ul className={`${cx.timeSlot}`}>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Mon"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Mon ? true : false
                              }
                            />
                            Mon
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Mon?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Mon", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Mon?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Mon", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Mon}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Tue"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Tue ? true : false
                              }
                            />
                            Tue
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Tue?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Tue", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Tue?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Tue", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Tue}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Wed"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Wed ? true : false
                              }
                            />
                            Wed
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Wed?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Wed", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Wed?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Wed", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Wed}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Thu"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Thu ? true : false
                              }
                            />
                            Thu
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Thu?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Thu", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Thu?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Thu", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Thu}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Fri"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Fri ? true : false
                              }
                            />
                            Fri
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Fri?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Fri", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Fri?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Fri", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Fri}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Sat"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Sat ? true : false
                              }
                            />
                            Sat
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Sat?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Sat", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Sat?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Sat", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Sat}
                        </p>
                        <li>
                          <label className={`${st.checkbox} ${cx.weekCount}`}>
                            <Checkbox
                              nameCheckbox={"Sun"}
                              step={"step6"}
                              fillFields={checkBoxFunc}
                              checked={
                                show?.step6?.openHours?.Sun ? true : false
                              }
                            />
                            Sun
                          </label>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Opening hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Sun?.startTime}
                              onChange={(e: any) =>
                                TimeFunc("Sun", "startTime", e.target.value)
                              }
                            />
                          </Form.Group>
                          <div className={`${cx.dashLine}`}>-</div>
                          <Form.Group className={`${cx.formBox}`}>
                            <Form.Label>Closing hour</Form.Label>
                            <Form.Control
                              type="time"
                              placeholder="00:00"
                              value={show?.step6?.openHours?.Sun?.endTime}
                              onChange={(e: any) =>
                                TimeFunc("Sun", "endTime", e.target.value)
                              }
                            />
                          </Form.Group>
                        </li>
                        <p className={`${cm.error} ${cm.errorTime}`}>
                          {timeErr?.Sun}
                        </p>
                      </ul>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>
                          Time limit for customers with laptop (If any)
                        </Form.Label>
                        <Form.Select
                          required
                          value={show?.step6?.timeLimitation}
                          onChange={(e: any) =>
                            fillFields(
                              "step6",
                              "timeLimitation",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select duration</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                          <option value="4">Option 4</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Any restrictions?</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Please describe any restrictions or requirements for customers to work from your place"
                          style={{ minHeight: "200px" }}
                          value={show?.step6?.limitations}
                          onChange={(e: any) =>
                            fillFields("step6", "limitations", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} className={`${cx.inTitle}`}>
                      <p>
                        (E.g. Customers with laptops can only sit at the bar or
                        customers only have WiFi access for one hour.)
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}

              {show.step7.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 7</span>
                      <h3>Tell us which amenities your place offers</h3>
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
                                  show?.step7?.facilities &&
                                  show?.step7?.facilities?.some(
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
                                  show?.step7?.standoutFacilities &&
                                  show?.step7?.standoutFacilities?.some(
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
                  </Row>
                </Col>
              )}

              {show.step8.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 8</span>
                      <h3>Add some photos</h3>
                      <p>
                        The first image you upload will be your cover photo, one
                        of the first things potential customers see on your
                        listing.
                      </p>
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
                                  Drag and drop your photos here <br />
                                  (Accepted format: JPG, PNG)
                                </p>
                              )}
                              {item?.imageUrl === "" && index > 0 && (
                                <p>Drag and drop your photos here</p>
                              )}
                              <FileUploader
                                name={`file${index}file`}
                                handleChange={(e: any) => {
                                  setImageIndex(index);
                                  handleFileChange(e);
                                  setIsImageUpload(false);
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

                    <Col md={8} className="m-auto">
                      <ul className={`${cx.policyList}`}>
                        <li>
                          <label className={`${st.checkbox}`}>
                            <Checkbox
                              nameCheckbox={"isUpload"}
                              step={"step8"}
                              fillFields={checkBoxFunc}
                              checked={show?.step8?.isUpload ? true : false}
                            />
                            By uploading this photo, I also certify that you
                            have the right to use the photo on the web and agree
                            to hold Sync harmless for any all copyright issues
                            arising from the use of the images
                          </label>
                        </li>
                        {fieldError?.isUpload}
                      </ul>
                    </Col>
                    <Col md={12} className="text-center mt-3 mb-3">
                      <NavLink
                        to="#"
                        className={`btn ${st.btn1}`}
                        onClick={() => {
                          checkFields(show?.step8, "upload");
                          setStepType("upload");
                        }}
                      >
                        Upload
                      </NavLink>
                    </Col>
                    <p className={`${cm.error}`}>{commonError}</p>
                  </Row>
                </Col>
              )}

              {show.step9.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 9</span>
                      <h3>Location information</h3>
                      <p>You can add more locations later.</p>
                    </Col>

                    <Col lg={12}>
                      {fieldError?.latitude}
                      <div className={`${cx.mapBox}`}>
                        {accessToken && (
                          <Map
                            {...viewport}
                            ref={mapRef}
                            onMove={onMove}
                            mapboxAccessToken={accessToken}
                            mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
                          >
                            <Geocoder
                              updateLatLng={updateLatLng}
                              coordinates={coordinates}
                              fillFields={fillFields}
                            />
                          </Map>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Col>
              )}

              {show.step10.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 10</span>
                      <h3>Confirm your address</h3>
                      <p>You can add more locations later.</p>
                    </Col>

                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>State*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type in which state your establishment is"
                          value={show?.step10?.state}
                          onChange={(e: any) =>
                            fillFields("step10", "state", e.target.value)
                          }
                        />
                        {fieldError?.state}
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>City*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type in which city your establishment is"
                          value={show?.step10?.city}
                          onChange={(e: any) =>
                            fillFields("step10", "city", e.target.value)
                          }
                        />
                        {fieldError?.city}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type your establishment’s street address"
                          value={show?.step10?.streetAddress}
                          onChange={(e: any) =>
                            fillFields(
                              "step10",
                              "streetAddress",
                              e.target.value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Postal code*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type your establishment’s postal code"
                          value={show?.step10?.postalCode}
                          onChange={(e: any) =>
                            fillFields("step10", "postalCode", e.target.value)
                          }
                        />
                        {fieldError?.postalCode}
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              )}

              {show.step11.isShow && (
                <Col md={10} lg={8} xl={6} xxl={6} className={`${cx.stepBody}`}>
                  <Row>
                    <Col md={12} className={`${cx.titleBox}`}>
                      <span className={`${cx.stepCount}`}>Step 11</span>
                      <h3>Private information</h3>
                      <p>
                        We are gathering this information to help keep your
                        account secure. This information will not appear in your
                        listing
                      </p>
                    </Col>

                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Full Name*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type your name here"
                          value={show?.step11?.name}
                          onChange={(e: any) =>
                            fillFields("step11", "name", e.target.value)
                          }
                        />
                        {fieldError?.name}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Job Title*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Type your job title here"
                          value={show?.step11?.userPosition}
                          onChange={(e: any) =>
                            fillFields("step11", "userPosition", e.target.value)
                          }
                        />
                        {fieldError?.userPosition}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className={`${cx.formBox}`}>
                        <Form.Label>Preferred phone number</Form.Label>
                        <PhoneNumber
                          phoneInput={phoneValue}
                          fields={{
                            ...show?.step11,
                            mobileNumber: show?.step11?.userPhone,
                          }}
                        />
                        {fieldError?.userPhone}
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <ul className={`${cx.policyList}`}>
                        <li>
                          <label className={`${st.checkbox}`}>
                            <Checkbox
                              nameCheckbox={"isAgreeUser"}
                              step={"step11"}
                              fillFields={checkBoxFunc}
                              checked={show?.step11?.isAgreeUser ? true : false}
                            />
                            I personally allow Sync’s Terms & Conditions
                            agreement o access and save my information for their
                            own purposes.
                          </label>
                        </li>
                        {fieldError?.isAgreeUser}
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
                          (show.currentStep * 100) /
                          (Object.keys(show).length - 1)
                        }
                      />
                    </Col>
                    {cafeDetails?.isVerified ? (
                      show.currentStep > 5 ? (
                        <Col className="col-6" md={6}>
                          <NavLink
                            className={`${cx.backBtn}`}
                            to="#"
                            onClick={() => {
                              if (show.currentStep === 10) {
                                setShow((prev: any) => {
                                  return {
                                    ...prev,
                                    step9: {
                                      ...show.step9,
                                      latitude: "",
                                      longitude: "",
                                    },
                                    step10: {
                                      ...show.step10,
                                      state: "",
                                      city: "",
                                      streetAddress: "",
                                      postalCode: "",
                                    },
                                  };
                                });
                              }
                              changeStatus(
                                `step${show.currentStep - 1}`,
                                true,
                                "back"
                              );
                              changeStatus(
                                `step${show.currentStep}`,
                                false,
                                ""
                              );
                            }}
                          >
                            Back
                          </NavLink>
                        </Col>
                      ) : (
                        <Col md={6} className="col-6 text-end"></Col>
                      )
                    ) : (
                      (show.currentStep === 5 && window.location.pathname.includes('/cafe-step/addcafe')) ?  <Col md={6} className="col-6 text-end"></Col> : <Col className="col-6" md={6}>
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
                      </Col>
                    )}
                    <Col md={6} className="col-6 text-end">
                      <NavLink
                        className={
                          cssOnNext === true
                            ? `btn ${cx.nextBtn} ${cx.active2}`
                            : `btn ${cx.nextBtn}`
                        }
                        to="#"
                        onClick={() => {
                          if (isVerify) {
                            if (otp !== "" && otp.length === 6) {
                              dispatch(verifyCafe({ cafeId, otp }));
                            } else {
                              setFieldError({
                                otpErr: (
                                  <p
                                    style={{
                                      color: "#738801",
                                      textAlign: "center",
                                    }}
                                  >
                                    Please enter valid otp
                                  </p>
                                ),
                              });
                            }
                          } else {
                            checkFields(show[`step${show.currentStep}`]);
                          }
                        }}
                      >
                        Next
                      </NavLink>
                    </Col>
                  </Row>
                </div>
              )}
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default CafeStep;
