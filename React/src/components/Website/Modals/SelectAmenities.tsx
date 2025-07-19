import React from "react";
import m from "./Modal.module.scss";
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
  BigTables,
} from "../../../assets/svgs";
import {
  place15,
  place18,
} from "../../../assets/images";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const SelectAmenities = (props: any) => {
  let { reviewButtons, handleAnimationClose, amenitiesFunc } = props;
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
  return (
    <>
      <Modal
        centered
        scrollable
        show={reviewButtons?.step4?.status}
        // onHide={handlelookClose}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-0 p-0">
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={()=>{
              handleAnimationClose()
            }}
            style={{ right: "9px", top: "0px",zIndex:'1' }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
             <h5>Select amenities</h5>  
             <p style={{ color:'#393939' }}>Hey there! could you please help us select which items below fits this cafe? It will be highly appreciated!</p>
         </div>          
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.listShop} text-center`}>
                  {amenities?.map((item: any, index: number) => {
                          return (
                            <li key={`${index}`}>
                              <button onClick={() =>
                                  amenitiesFunc("amenities", item?.name)
                                }
                                className={
                                  reviewButtons?.step4?.amenities &&
                                  reviewButtons?.step4?.amenities?.some(
                                    (e: any) => e === item?.name
                                  )
                                    ? `${m.active}`
                                    : ""
                                }>
                                <img src={item?.image} alt="facilityImage" />
                                <h5>{item?.name}</h5>
                              </button>
                            </li>
                          );
                        })}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <Col md={12} className="text-end">
            <button className={`btn ${m.submitModal}`} onClick={handleAnimationClose}>Submit</button>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SelectAmenities;
