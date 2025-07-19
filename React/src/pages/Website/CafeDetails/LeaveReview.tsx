import React, { useCallback, useEffect, useState } from "react";
import cx from "./CafeDetails.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import { Form, Col, Row } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BsFillStarFill } from "react-icons/bs";
import {
  changeReviewState,
  profile,
  reviewCafe,
  reviewsFilterCafe,
} from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  allCafe,
  singleCafeData,
} from "../../../redux_toolkit/reducer/cafeReducer";
import { Login, ShareLocationM } from "../../../components/Website/Modals";
import { FileUploader } from "react-drag-drop-files";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import {
  addNew,
  editNew,
  upload_icon,
} from "../../../assets/images";
import { MdClose } from "react-icons/md";
import EditImages from "../../../components/Website/Modals/EditImages";
import SelectAmenities from "../../../components/Website/Modals/SelectAmenities";

const LeaveReview = (props: any) => {
  const dispatch = useDispatch();
  const param = useParams();
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const profileState = useSelector((state: any) => state.profileReducer);
  const imageState = useSelector((state: any) => state.imageReducer);
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);
    const [reviewButtons, setReviewButtons] = useState<any>({
    step1: {
      status: true,
      point: 0,
      message: "",
    },
    step2: {
      status: false,
      wifiQuality: 0,
      outletAvaibility: 0,
      atmosphere: 0,
    },
    step3: {
      status: false,
      photos: []
    },
    step4: {
      status: false,
      amenities: []
    },
    step5: {
      status: false,
    },
  });
  const [activeButton, setActiveButton] = useState({
    step1: false,
    step2: false,
  });
  useEffect(() => {
    if (profileState.reviewCafeState > 0) {
      dispatch(allCafe(param?.id));
      dispatch(changeReviewState());
    }
  }, [dispatch, profileState.reviewCafeState, param?.id]);
  useEffect(() => {
    if (props.cafeData?.ratingReviews?.length > 0 && profile?.data?._id) {
      if (props.cafeData?.ratingReviews?.some((e: any) => e?.userProfile?._id === profile?.data?._id)) {
        const matchedData = props.cafeData?.ratingReviews?.filter((e: any) => e?.userProfile?._id === profile?.data?._id)
        const dataInMiliSec: any = +new Date(matchedData[0]?.createdAt)
        const todayData: any = +new Date()
        if (+dataInMiliSec + 7889238000 >= +todayData) {
          setReviewButtons((prev: any) => {
            return { ...prev, step1: { ...prev.step1, status: false }, step5: { status: prev.step2.status === false ? true : false } }
          })
        }
      }
    }
  }, [props.cafeData, profileState.profileState])
  const [fieldError, setFieldError] = useState<any>();
  const [imageLink, setImageLink] = useState<any>();
  const [next, setNext] = useState("");
  const stars = [1, 2, 3, 4, 5];
  const fillFields = useCallback(
    (step: string, key: any, value: any) => {
      setReviewButtons((prev: any) => {
        return { ...prev, [step]: { ...prev[step], [key]: value } };
      });
      if (fieldError !== undefined && fieldError[key]) {
        fieldError[key] = "";
      }
    },
    [fieldError]
  );

  useEffect(() => {
    if (
      reviewButtons?.step2?.wifiQuality !== 0 &&
      reviewButtons?.step2?.outletAvaibility !== 0 &&
      reviewButtons?.step2?.atmosphere !== 0
    ) {
      setActiveButton((prev: any) => {
        return { ...prev, step2: true };
      });
    }
  }, [reviewButtons?.step2]);

  const checkFields = (fields: any, step: string, nextStep: string) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      if (fields[e] === 0 && e !== "message") {
        fieldErr[e] = <p className={`${cm.error}`}> This field is required </p>;
      }
    });
    if (Object.keys(fieldErr).length === 0) {
      if (profile?.data?.role) {
        setReviewButtons((prev: any) => {
          return {
            ...prev,
            [step]: { ...prev[step], status: false },
            [nextStep]: { ...prev[nextStep], status: true },
          };
        });
        if (nextStep === "step2") {
          dispatch(
            reviewCafe({
              ratingReviews: {
                ...reviewButtons.step1,
                ...reviewButtons.step3,
                ...reviewButtons.step4,
                createdAt: Date.now(),
                uniqueId: Date.now().toString(),
                userProfile: profile?.data?._id,
                cafeData: singleCafeData?._id,
                reply: "",
              },
              id: param?.id,
            })
          );
        }
        if (nextStep === "step5" && next !== "add") {
          dispatch(
            reviewsFilterCafe({
              ratingFilters: {
                ...reviewButtons.step2,
                userProfile: profile?.data?._id,
                cafeData: singleCafeData?._id,
              },
              id: param?.id,
            })
          );
        }
      } else {
        props.handleLoginShow();
      }
    } else {
      setFieldError(fieldErr);
    }
  };
  const handleChange = (file: any) => {
    dispatch(addImage({ image: file }));
    setFieldError("");
  };
  useEffect(() => {
    if (imageState.imageState > 0) {
      setImageLink(imageUrl);
      setReviewButtons((prev: any) => {
        return { ...prev, step3: { ...prev.step3, photos: [...prev.step3.photos, imageUrl] } }
      })
      dispatch(changeImageState());
    }
  }, [dispatch, imageState.imageState]);
  const [lookshow, setLookshow] = useState(false);
  const handlelookClose = () => {
    setLookshow(false);
  };
  const handleAnimationClose = () => {
    setReviewButtons((prev:any)=>{
      return {...prev, step4: {...prev.step4, status:false}, step2: {...prev.step2, status: true}}
    })
    checkFields(reviewButtons.step4, "step4", "step2");
  }
  const handlelookOpen = () => setLookshow(true);
  const removeImage = () => {
    setReviewButtons((prev: any) => {
      prev.step3.photos.splice(0, 1)
      if (prev?.step3?.photos?.length > 0) {
        setImageLink(prev?.step3?.photos[0])
      } else {
        setImageLink(undefined)
      }
      return { ...prev }
    })
  }
  const remove = (index: number) => {
    setReviewButtons((prev: any) => {
      prev.step3.photos.splice(index, 1)
      return { ...prev }
    })
  }
  const amenitiesFunc = (name: any, value: String) => {
    if (
      reviewButtons?.step4[name] &&
      reviewButtons?.step4[name].length > 0 &&
      reviewButtons?.step4[name]?.some((item: any) => item === value)
    ) {
      const index = reviewButtons?.step4[name]?.indexOf(value);
      console.log(index, reviewButtons?.step4?.amenities)
      reviewButtons?.step4[name]?.splice(index, 1);
      fillFields("step4", name, reviewButtons?.step4[name]);
    } else {
      if (reviewButtons?.step4[name] && reviewButtons?.step4[name].length > 0) {
        reviewButtons.step4[name].push(value);
        fillFields("step4", name, reviewButtons?.step4[name]);
      } else {
        reviewButtons.step4[name] = [value];
        fillFields("step4", name, reviewButtons?.step4[name]);
      }
    }
  };
  return (
    <>
      <div className={` ${cx.contentBox}`}>
        {reviewButtons.step1.status === true && (
          <Row>
            <Col lg={12}>
              <div className={`${cx.contentHeading2}`}>
                <p>Leave a review</p>
                <h1>
                  Support your local businesses by telling the community how you
                  like this place!{" "}
                </h1>
              </div>
              <div className={`${cx.ratingBox}`}>
                <div className={`${cx.ratingStar}`}>
                  {stars?.map((item: any, index: number) => {
                    return (
                      <button
                        className={
                          reviewButtons.step1.point >= index + 1
                            ? `${cx.active}`
                            : ""
                        }
                        onClick={() => {
                          fillFields("step1", "point", index + 1);
                          setActiveButton((prev: any) => {
                            return { ...prev, step1: true };
                          });
                        }}
                      >
                        <BsFillStarFill />
                      </button>
                    );
                  })}
                </div>
                <div className={`${cx.rating_btn}`}>
                  <p>From 1 (poor) to 5 (Excellent)</p>
                </div>
              </div>
              {fieldError?.point}
            </Col>
            <Col lg={12} className={`${cx.form_box}`}>
              <Form.Group className="text-center mt-2">
                <Form.Label className="mb-3">
                  Anything you wanna add? (Optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  as={"textarea"}
                  onChange={(e: any) => {
                    fillFields("step1", "message", e.target.value);
                  }}
                  rows={4}
                  cols={10}
                  style={{ color: "#3b3b3b" }}
                  placeholder="Type your message here"
                />
              </Form.Group>
            </Col>
            <Col md={12} className="text-center mt-3">
              <NavLink
                to="#"
                onClick={() => {
                  if (!profile?.data?.role) {
                    props.handleLoginShow();
                  } else {
                    setNext("add");
                    console.log("dasdasdd")
                    checkFields(reviewButtons.step1, "step1", "step3");
                  }
                }}
                style={{
                  color: "#222",
                  fontWeight: "600",
                  textDecoration: "underline",
                }}
              >
                Add Photo
              </NavLink>
            </Col>
            <Col lg={12} className={`text-center mt-4`}>
              <button
                className={
                  activeButton.step1 === true
                    ? `btn ${st.btn2} ${st.active2}`
                    : `btn ${st.btn2}`
                }
                style={{ width: "100%" }}
                onClick={() => {
                  if (!profile?.data?.role) {
                    props.handleLoginShow();
                  } else {
                    checkFields(reviewButtons.step1, "step1", "step4");
                  }
                }}
              >
                Submit
              </button>
            </Col>
          </Row>
        )}

        {reviewButtons.step2.status === true && (
          <Row>
            <Col lg={12}>
              <div className={`${cx.contentHeading2}`}>
                <p>Leave a review</p>
                <h1>Tell us a bit more!</h1>
              </div>

              <div className={`${cx.ratingBox}`}>
                <p>How was the WiFi quality?</p>
                <div className={`${cx.ratingStar}`}>
                  {stars?.map((item: any, index: number) => {
                    return (
                      <button
                        className={
                          reviewButtons.step2.wifiQuality >= index + 1
                            ? `${cx.active}`
                            : ""
                        }
                        onClick={() =>
                          fillFields("step2", "wifiQuality", index + 1)
                        }
                      >
                        <BsFillStarFill />
                      </button>
                    );
                  })}
                </div>
                {fieldError?.wifiQuality}
              </div>

              <div className={`${cx.ratingBox}`}>
                <p>How was the outlet availability?</p>
                <div className={`${cx.ratingStar}`}>
                  {stars?.map((item: any, index: number) => {
                    return (
                      <button
                        className={
                          reviewButtons.step2.outletAvaibility >= index + 1
                            ? `${cx.active}`
                            : ""
                        }
                        onClick={() =>
                          fillFields("step2", "outletAvaibility", index + 1)
                        }
                      >
                        <BsFillStarFill />
                      </button>
                    );
                  })}
                </div>
                {fieldError?.outletAvaibility}
              </div>

              <div className={`${cx.ratingBox}`}>
                <p>
                  How would you rate the noise level from 1 (noisy) to 5
                  (quiet)?
                </p>
                <div className={`${cx.ratingStar}`}>
                  {stars?.map((item: any, index: number) => {
                    return (
                      <button
                        className={
                          reviewButtons.step2.atmosphere >= index + 1
                            ? `${cx.active}`
                            : ""
                        }
                        onClick={() =>
                          fillFields("step2", "atmosphere", index + 1)
                        }
                      >
                        <BsFillStarFill />
                      </button>
                    );
                  })}
                </div>
                {fieldError?.atmosphere}
              </div>
            </Col>
            <Col lg={12} className={`text-center mt-5`}>
              <button
                className={
                  activeButton.step2 === true
                    ? `btn ${st.btn2} ${st.active2}`
                    : `btn ${st.btn2}`
                }
                style={{ width: "100%" }}
                onClick={() => {
                  checkFields(reviewButtons.step2, "step2", "step5");
                }}
              >
                Submit
              </button>
            </Col>
          </Row>
        )}

        {reviewButtons.step3.status === true && (
          <Row>
            <Col lg={12}>
              <div className={`${cx.contentHeading2}`}>
                <p>Leave a review</p>
                <h1>Upload a photo</h1>
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${cx.upload_profile} mt-3`} style={imageLink && { height: "auto" }}>
                <div className={`${cx.upload_profile_icon} position-relative`}>
                  {imageLink === undefined ? (
                    <img src={upload_icon} alt="uploadIcon" />
                  ) : (
                    <>
                      <div className={`${cx.uploadedImg}`}>
                        <img
                          src={reviewButtons?.step3?.photos[0]}
                          className={`${cx.uploadedView}`}
                          alt="uploadView"
                        />
                        <div className={`${cx.menuIcons}`}>
                          <button onClick={handlelookOpen}>
                            <img src={editNew} alt="Edit Icon" /> Edit
                          </button>
                          <button>
                            <img src={addNew} alt="Add Icon" /> Add photos
                            <FileUploader
                              name="file"
                              handleChange={handleChange}
                              types={fileTypes}
                            />
                          </button>
                        </div>
                        <button
                          className={`${cx.closeIcon}`}
                          onClick={() => {
                            removeImage()
                          }
                          }
                        >
                          <MdClose />
                        </button>
                      </div>

                      {reviewButtons?.step3?.photos?.length > 1 &&
                        <ul className={`${cx.galleryList}`}>
                          {
                            reviewButtons?.step3?.photos?.map((e: any, index: number) => {
                              return index > 0 ? index < 5 ? <li key={`${index}`}>
                                <div className={`${cx.galleryBox}`}>
                                  <img src={e} alt="img 1" />
                                </div>
                              </li> : <li>
                                <div className={`${cx.galleryBox}`}>
                                  <img src={e} alt="img 1" />
                                  <span>{reviewButtons?.step3?.photos?.length - 5}</span>
                                </div>
                              </li> : ""
                            })
                          }
                        </ul>}
                    </>
                  )}
                  {imageLink === undefined && (
                    <>
                      <FileUploader
                        name="file"
                        handleChange={handleChange}
                        types={fileTypes}
                      />
                      <p>
                        Drag and drop an image, or{" "}
                        <span style={{ marginLeft: "1px" }}>Browse</span>
                      </p>{" "}
                    </>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={6} className={`text-center mt-5`}>
              <button
                className={`btn ${st.btn2}`}
                style={{ width: "100%", minWidth: "100%" }}
                onClick={() => {
                  setNext("");
                  checkFields(reviewButtons.step3, "step3", "step4");
                }}
              >
                May be next time
              </button>
            </Col>
            <Col lg={6} className={`text-center mt-5`}>
              <button
                className={`btn ${st.btn2} ${st.active2}`}
                style={{ width: "100%", minWidth: "100%" }}
                onClick={() => {
                  setNext("");
                  checkFields(reviewButtons.step3, "step3", "step4");
                }}
              >
                Submit
              </button>
            </Col>
          </Row>
        )}
        {reviewButtons.step5.status === true && (
          <Row>
            <Col lg={12}>
              <div className={`${cx.contentHeading2} mt-5`}>
                <h1>
                  🎉 <br />
                  Your review has been added. <br />
                  Thank you!
                </h1>
              </div>
              <button
                className={`btn mt-3 ${st.btn2} ${st.active2}`}
                style={{ width: "100%", minWidth: "170px" }}
                onClick={handlelocationShow}
              >
                Share this place
              </button>
            </Col>
          </Row>
        )}
      </div>
      <Login
        showLogin={props.showLogin}
        handleLoginShow={props.handleLoginShow}
        handleLoginClose={props.handleLoginClose}
      />
      <SelectAmenities
        reviewButtons={reviewButtons}
        handleAnimationClose={handleAnimationClose}
        checkFields={checkFields}
        amenitiesFunc={amenitiesFunc}
      />
      <ShareLocationM locationshow={locationshow} handlelocationClose={handlelocationClose} locationUrl={window?.location?.href} title={"Share this cafe to your friends!"}/>
      <EditImages lookshow={lookshow} handlelookClose={handlelookClose} images={reviewButtons?.step3?.photos} handleChange={handleChange} removeImage={remove} />
    </>
  );
};

export default LeaveReview;
