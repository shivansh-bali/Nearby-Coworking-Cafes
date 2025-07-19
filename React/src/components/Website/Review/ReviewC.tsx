import React, { useEffect, useState } from "react";
import cx from "./ReviewC.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import review_icon from "../../../assets/images/review_icon.png";

import st from "../../../assets/stylesheet/style.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import IconGenerator from "../../Shared/IconGenerator";
import ImageViewsCafe from "../Modals/ImageViewsCafe";
import {colorMapping} from '../../../constant'
const ReviewC = (props: any) => {
  const [overallRating, setOverallRating] = useState<any[]>([]);
  const [numRating, setNumRating] = useState(0);
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
  const [imageIndex, setImageIndex] = useState(0);
  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);
  return (
    <>
      <section className={`${cx.cardSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={`${cx.cardBox}`}>
                <div className={`${cx.cardBox_head}`}>
                  <div className={`${cx.reviewComment}`}>
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
                  {props?.data?.message?.length > 100 ? <p>{props?.data?.message?.slice(0, 100)}
                    <NavLink to={`/reviews/${props?.data?.uniqueId}`}>
                      ...Read More
                    </NavLink>
                  </p> : <p>{props?.data?.message}</p>}
                  <div className={`${cx.reviewComment}`}>
                  <ul>
                    {props?.data?.amenities?.map((item: any) => {
                  return < li > <button style={{ background: colorMapping[item[0]?.toUpperCase()], border: '1px solid #E6F1E3', color: '#709C64', width: "100%", height: "100%", padding:"6px 15px" }}>{item}</button></li>
                })}
                </ul>
                </div>
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
                </div>
                <div className={`${cx.overlay}`}>
                  <NavLink to="#" className={`${cx.nextBtn}`}>
                    {numRating > 0 && numRating}
                  </NavLink>
                  <svg
                    className={`${cx.bgShape}`}
                    width="91"
                    height="89"
                    viewBox="0 0 91 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0.499915C0.413197 0.489838 0.852842 0.489388 1.31458 0.499915H89.5C90 35.1666 90.7 100.8 89.5 86C88.3 71.2 73 67.8333 65.5 68C59.3333 67.6667 44.8 67.2 36 68C27.2 68.8 24.3333 62.3333 24 59V50C24.1667 42.6666 24.1 25.1999 22.5 13.9999C20.9967 3.47716 8.48891 0.663489 1.31458 0.499915H0Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div className={`${cx.overlay2}`}>
                  <div className={`${cx.nextBtn}`}>
                    {props?.data?.userProfile?.profileImage ? <img
                      src={
                        props?.data?.userProfile?.profileImage
                          ? props?.data?.userProfile?.profileImage
                          : review_icon
                      }
                      alt="NadineLustre"
                    /> :
                      <IconGenerator name={props?.data?.userProfile?.name} data={"review"} />}
                  </div>
                  <svg
                    className={`${cx.bgShape}`}
                    width="91"
                    height="89"
                    viewBox="0 0 91 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0.499915C0.413197 0.489838 0.852842 0.489388 1.31458 0.499915H89.5C90 35.1666 90.7 100.8 89.5 86C88.3 71.2 73 67.8333 65.5 68C59.3333 67.6667 44.8 67.2 36 68C27.2 68.8 24.3333 62.3333 24 59V50C24.1667 42.6666 24.1 25.1999 22.5 13.9999C20.9967 3.47716 8.48891 0.663489 1.31458 0.499915H0Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={`${cx.cardBox_head2}`}>
                  <h4>{props?.data?.userProfile?.name}</h4>

                  <p>
                    {props?.data?.userProfile?.position}
                    <br />
                    {props?.data?.userProfile?.city?.split("-")[0]}
                    {props?.data?.userProfile?.city &&
                      props?.data?.userProfile?.country
                      ? ","
                      : ""}{" "}
                    {props?.data?.userProfile?.country?.split("-")[0]}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
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

export default ReviewC;
