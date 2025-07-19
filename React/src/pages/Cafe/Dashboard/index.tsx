import React from "react";
import cx from "./Dashboard.module.scss";
import { Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { placeholderImage } from "../../../assets/images";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";

const CafeList = () => {
  const navigate = useNavigate();
  return (
    <section className={`${cx.dashboard}`}>
      <Col className={cx.buttonsContainer}>
        <button
          type="button"
          onClick={() => {
            navigate("/cafepanel");
          }}
        >
          Home
        </button>
        /
        <button type="button" className={cx.active}>
          My Business
        </button>
      </Col>
      <h2> My Business</h2>

      <div className={cx.businessCardOuter}>
        {profile.cafeData?.map((item: any, index: number) => {
          return (
            <div className={cx.businessCard} key={index}>
              <img
                src={
                  item.pictures[0]?.imageUrl
                    ? item.pictures[0]?.imageUrl
                    : item?.images?.length > 0
                    ? item?.images[0]
                    : placeholderImage
                }
                alt="cafe"
              />
              <NavLink to={`/cafepanel/cafe-information/${item._id}`}>
                {item.establishmentName}
              </NavLink>
              <p>{item.streetAddress}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CafeList;
