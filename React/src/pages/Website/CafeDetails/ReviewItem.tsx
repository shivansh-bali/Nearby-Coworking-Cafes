import React, { useState } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import cx from "../Reviews/Reviews.module.scss";
import { NadineLustre } from "../../../assets/images";
import { IoIosArrowUp } from "react-icons/io";
import { Collapse } from "react-bootstrap";
import IconGenerator from "../../../components/Shared/IconGenerator";
import ImageViewsCafe from "../../../components/Website/Modals/ImageViewsCafe";

const ReviewItem = ({ item, index, arr }: any) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);
  return (
    <>
    <div className={`${cx.reviewContent}`} key={`${index}`}>
      <div className={`${cx.reviewComment}`}>
        <ul>
          {arr.map((e: any, num: number) => {
            return (
              <li key={`${num}`}>
                <AiTwotoneStar />
              </li>
            );
          })}
          <li
            className="ms-1"
            style={{
              color: "#878787",
              fontSize: "14px",
              position: "relative",
              top: "1.5px",
            }}
          >
            {item?.point}
          </li>
        </ul>
          <p>{item?.message}</p>

        <div className={`${cx.reviewImages}`}>
          {item?.photos?.map((e: any, index: number) => {
            return (
              <img src={e} alt="ReviewImage" key={`${index}`} style={{cursor: "pointer"}} onClick={()=>{
                handleimageShow()
                setImageIndex(index);
              }}/>
            );
          })}
        </div>

        {item?.reply && (
          <div className={`${cx.replayBox}`}>
            <NavLink
              to="#"
              className={`${cx.replayDropdown}`}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <IoIosArrowUp /> Replies
            </NavLink>
            <Collapse in={open}>
              <div id="example-collapse-text">
                <div className={`${cx.commentCard}`}>
                  <div className={`${cx.commentCardHeader}`}>
                    <img
                      src={
                        item?.cafeData?.pictures[0]?.imageUrl
                          ? item?.cafeData?.pictures[0]?.imageUrl
                          : NadineLustre
                      }
                      className={`${cx.profileImg}`}
                      alt="NadineLustre"
                    />
                    <div className={`${cx.commentCardBody}`}>
                      <h5>{item?.cafeData?.establishmentName}</h5>
                      <p>
                        {item?.cafeData?.streetAddress
                          ? `${item?.cafeData?.streetAddress}, `
                          : ""}
                        {item?.cafeData?.city
                          ? `${item?.cafeData?.city}, `
                          : ""}
                        {item?.cafeData?.state}
                      </p>
                    </div>
                  </div>
                  <div className={`${cx.commentCardMessage}`}>
                    <p>{item?.reply}</p>
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        )}
      </div>
      <div className={`${cx.nameImgBox}`}>
        {item?.userProfile?.profileImage ? (
          <img
            src={
              item?.userProfile?.profileImage
                ? item?.userProfile?.profileImage
                : NadineLustre
            }
            alt="NadineLustre"
          />
        ) : (
          <IconGenerator name={item?.userProfile?.name} data={"true"} />
        )}
        <div className={`${cx.nameText}`}>
          <h5>{item?.userProfile?.name}</h5>
          <p>
            {item?.userProfile?.position} <br />
            <span>
              {item?.userProfile?.city?.split("-")[0]}
              {item?.userProfile?.city && item?.userProfile?.country
                ? ","
                : ""}{" "}
              {item?.userProfile?.country?.split("-")[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
    <ImageViewsCafe
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={item?.photos}
        name = {item?.cafeData?.establishmentName}
      />
    </>
  );
};

export default ReviewItem;
