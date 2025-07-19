import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Col, Row } from "react-bootstrap";
import cx from "../Cafe/CafeDescription.module.scss";
import {
  Photo1,
  Photo2,
  Photo3,
  romanImage,
  profile_icon,
} from "../../../assets/images";
import { useEffect, useState } from "react";
import {
  WiFi,
  Accessibility,
  FastWifi,
  QuietVibes,
  BigTables,
  Books,
  ChildSeats,
  HighTops,
  Keys,
  LargeGroup,
  Meals,
  MultipleSockets,
  NaturalLight,
  Outdoor,
  SmallGroups,
  Snacks,
  SofaSeating,
  Printer,
  Alcohol,
} from "../../../assets/svgs/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allCafe,
  cafeResolution,
  singleCafeData,
} from "../../../redux_toolkit/reducer/cafeReducer";
import RejectRequest from "../../../components/Admin/Modals/RejectRequest";
import { CafeStatus } from "../Branch/DataGrid";

const Recommendation = () => {
  const param: any = useParams();
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafeData, setCafeData] = useState<any>();
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(allCafe(param?.id));
  }, [param?.id, dispatch]);
  useEffect(() => {
    if (cafeState.allCafeState > 0) {
      setCafeData(singleCafeData);
    }
  }, [cafeState.allCafeState]);

  let obj: any = {
    WiFi: WiFi,
    Accessibility: Accessibility,
    "Fast WiFi": FastWifi,
    "Quiet Environment": QuietVibes,
    "Big Tables": BigTables,
    "Book Shop": Books,
    "Child Seats": ChildSeats,
    "High Tops": HighTops,
    Alcohol: Alcohol,
    "Private Room": Keys,
    "Large Groups": LargeGroup,
    Meals: Meals,
    "Charging Outlets": MultipleSockets,
    "Natural Light": NaturalLight,
    "Outdoor Seating": Outdoor,
    // "Free Parking": Parking,
    "Small Groups": SmallGroups,
    Snacks: Snacks,
    "Sofa Seating": SofaSeating,
    "Printer Available": Printer,
  };
  const cafeDetails = [
    {
      title: "Establishment Name",
      placeholder: "Enter Establishment Name",
      value: cafeData?.establishmentName,
    },
    {
      title: "Category",
      placeholder: "Enter Category",
      value: cafeData?.category,
    },
    {
      title: "Status",
      placeholder: "Enter Status",
      value: cafeData?.isOpen ? "Open" : "Closed",
    },

    {
      title: "Email",
      placeholder: "Enter email",
      value: cafeData?.email,
    },

    {
      title: "Legal Est. Name",
      placeholder: "Enter Legal Est. Name",
      value: cafeData?.legalEstablishmentName,
    },
    {
      title: "Website",
      placeholder: "Enter your website",
      value: cafeData?.website,
    },
    {
      title: "Contact Number",
      placeholder: "Enter contact number",
      value: `+${cafeData?.dialCode} ${cafeData?.phone}`,
    },
    {
      title: "Contact Email",
      placeholder: "Enter Contact Email",
      value: cafeData?.contactEmail,
    },
    { title: "State", placeholder: "Enter state name", value: cafeData?.state },
    { title: "City", placeholder: "Enter city name", value: cafeData?.city },
    {
      title: "Postal Code",
      placeholder: "Enter postal code",
      value: cafeData?.postalCode,
    },
    {
      title: "About",
      placeholder: "Enter city name",
      value: cafeData?.shortDescription,
    },
  ];

  const AddImage = ({ content, type }: any) => {
    return (
      <div className={cx.imageBox}>
        {type === "image" ? (
          <div className={cx.imageOuter}>
            <img src={content} alt="" height="100%" width="100%" />
            {/* <button className={cx.deleteButton}>
              <BsTrashFill />
            </button> */}
          </div>
        ) : (
          content
        )}
      </div>
    );
  };
  const InputContainer = ({ props: { title, value, placeholder } }: any) => {
    return (
      <Col md={6} className="d-flex mb-2">
        <p>{title}:</p>
        <span>{value}</span>
        {/* <Form.Control type="email" placeholder={placeholder} /> */}
      </Col>
    );
  };
  return (
    <section className={` ${st.pageWrapper}`}>
      <RejectRequest show={show} handleClose={handleClose} id={param?.id} />
      <div className={`${cx.pageWrapperInside}`}>
        <Row>
          <Col md={10} className={cx.buttonsContainer}>
            <button
              type="button"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Home
            </button>
            /
            <button type="button" onClick={() => {}}>
              Recommendation
            </button>
          </Col>
          <Col md={2} className={cx.buttonsContainer}>
            <div className={cx.dualButtons}>
              {cafeData?.isAccepted === "Approved" ? (
                <CafeStatus params={cafeData.status} />
              ) : (
                <>
                  <button
                    style={{ color: "#ff7272", borderColor: "#ff7272" }}
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        cafeResolution({
                          id: param?.id,
                          resolution: "Approved",
                          message: "Your Businesse is approved by Sync",
                        })
                      );
                    }}
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </Col>
        </Row>

        <Col md={12} sm={12} className={`${cx.imageContainer}  `}>
          <h5>Requested by</h5>
          <div className=" d-flex px-4 mb-4">
            <img
              src={profile_icon}
              height="100px"
              width="100px"
              style={{ borderRadius: "50px", marginRight: " 20px" }}
              alt="profileIcon"
            />
            <div className={cx.userDetails}>
              <h4>Anna Smith</h4>
              <p style={{ width: "100%", margin: 0 }}>
                Marketing Manager @ Sync Remote . New York, United States
              </p>
              <p style={{ width: "100%", margin: 0 }}>
                Email: <span>annasmith@browncafe.com</span>
              </p>
              <p style={{ width: "100%", margin: 0 }}>
                Phone: <span>+01 123 121 1212</span>
              </p>
            </div>
          </div>
        </Col>

        <Col className={`${cx.imageContainer} `}>
          <h5>Business Details</h5>
          <div className="d-lg-flex flex-lg-wrap px-4 ">
            {cafeDetails.map((item: any, index: number) => {
              return <InputContainer props={item} key={`${index}`} />;
            })}
            <Col md={6} className="d-flex mb-2">
              <p>Amenities:</p>
              <div style={{ maxWidth: "300px" }}>
                {cafeData?.facilities?.map((item: any, index: number) => {
                  return <span key={`${index}`}>{item},</span>;
                })}
                {cafeData?.standoutFacilities?.map(
                  (item: any, index: number) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          width: "max-content",
                          padding: "0px",
                          fontSize: "15px",
                          alignItems: "center",
                        }}
                        key={`${index}`}
                      >
                        <img
                          src={obj[item]}
                          alt=""
                          height="20px"
                          width="20px"
                        />
                        <span>{item}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </Col>
            <Col md={6} className="d-flex mb-2">
              <p>Operating Hours:</p>
              <div style={{ maxWidth: "300px" }}>
                {cafeData?.openHours &&
                  Object.keys(cafeData?.openHours).map(
                    (item: any, index: number) => {
                      let startTime = new Date(
                        "1970-01-01T" +
                          cafeData?.openHours[item]?.startTime +
                          "Z"
                      ).toLocaleTimeString("en-us", {
                        timeZone: "UTC",
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      let endTime = new Date(
                        "1970-01-01T" + cafeData?.openHours[item]?.endTime + "Z"
                      ).toLocaleTimeString("en-us", {
                        timeZone: "UTC",
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <div className="d-flex" key={`${index}`}>
                          <div
                            style={{
                              width: "50px",
                              padding: "0px 5px",
                              fontSize: "15px",
                            }}
                          >
                            {item} :
                          </div>
                          <span>
                            {startTime} - {endTime}
                          </span>
                        </div>
                      );
                    }
                  )}
              </div>
            </Col>
            <Col md={6} className="d-flex mb-2">
              <p>Time Limit:</p> <div style={{ maxWidth: "300px" }}></div>
            </Col>
            <Col md={6} className="d-flex mb-2">
              <p>Resrictions:</p>
              <div style={{ maxWidth: "300px" }}></div>
            </Col>
          </div>
        </Col>
        <Col className={`${cx.imageContainer}`}>
          <div style={{ position: "relative" }} className="m-4 w">
            <div className={cx.imageCategory}>
              <h6>Cover picture</h6>
            </div>
            <img
              src={romanImage}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            {/* <button
              className={cx.deleteButton}
              style={{ bottom: "10px", right: "10px" }}
            >
              <BsTrashFill />
            </button> */}
          </div>
          {/* <div className={`${cx.imageCategory} px-4`}>
            <h6>Ambience </h6>
          </div> */}
          <div className="px-4 d-flex justify-content-between mb-4">
            <AddImage content={Photo1} type="image" />
            <AddImage content={Photo2} type="image" />
            <AddImage content={Photo3} type="image" />
            <AddImage content={Photo1} type="image" />
            {/* <AddImage content={Photo2} type="image" />
            <AddImage content={Photo3} type="image" /> */}
            {/* <AddImage content={<HiPlusSm style={{ fontSize: "120px" }} />} /> */}
          </div>
        </Col>
      </div>
    </section>
  );
};

export default Recommendation;
