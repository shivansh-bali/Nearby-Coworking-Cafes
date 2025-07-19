import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import cx from "./Reviews.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Col, Row } from "react-bootstrap";
import { reviewsHeader } from "../../../assets/images";

import { ThankYou } from "../../../components/Website/Modals";

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  allCafe,
  singleCafeData,
} from "../../../redux_toolkit/reducer/cafeReducer";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons/lib";
import ReviewItem from "./ReviewItem";

const Reviews2 = (props: any) => {
  const param = useParams();   
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafeData, setCafeData] = useState<any>();
  const [overallRating, setOverallRating] = useState(0);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(allCafe(param?.id));
  }, [dispatch, param?.id]);
  useEffect(() => {
    if (cafeState.allCafeState > 0) {
      setCafeData(singleCafeData);
      setOverallRating(0);
      if (singleCafeData?.ratingReviews?.length > 0) {
        const overAllReviews = singleCafeData?.ratingReviews.reduce(
          (acc: any, item: any) => {
            acc +=
              (item?.wifiQuality +
                item?.point +
                item?.outletAvaibility +
                item?.atmosphere) /
              4;
            return acc;
          },
          0
        );
        setOverallRating(
          Math.round(overAllReviews / singleCafeData?.ratingReviews?.length)
        );
      }
    }
  }, [dispatch, cafeState.allCafeState]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  const currentItems = cafeData?.ratingReviews?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cafeData?.ratingReviews?.length / 5);

  useEffect(() => {
    const newOffset = (0 * 5) % cafeData?.ratingReviews?.length;
    setItemOffset(newOffset);
  }, [cafeData?.ratingReviews?.length]);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 5) % cafeData?.ratingReviews?.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className={`${cx.spaceBox}`}>
        <section className={`${cx.bannerSection}`}>
          <img
            src={
              cafeData?.pictures[0]?.imageUrl
                ? cafeData?.pictures[0]?.imageUrl
                : cafeData?.images?.length > 0 ? cafeData?.images[0] : reviewsHeader
            }
            alt="reviewsHeader"
          />
          <Container>
            <Row>
              <Col md={8} className={`${cx.contentBox}`}>
                <div className={`${cx.contentHeading}`}>
                  <h1>{cafeData?.establishmentName}</h1>
                  <NavLink to={`/cafe-details/${singleCafeData?._id}`}>
                    Visit Cafe Profile
                  </NavLink>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <section className={`${cx.reviewSection} ${st.sectionPaddingBottom}`}>
        <Container>
          <Row>
            <Col md={12} xl={12}>
              <div className={`${cx.reviewStart}`}>
                <h3>All Reviews</h3>
              </div>
            </Col>

            <Col lg={8} md={12} xl={8} sm={12}>
              {currentItems?.map((item: any, index: number) => {
                const num = item.point
                let arr = [];
                if (num > 0) {
                  for (let i = 0; i < num; i++) {
                    let count = 1 * (i + 1);
                    arr.push(count);
                  }
                }
                return (
                  <ReviewItem
                    item={item}
                    index={index}
                    overallRating={overallRating}
                    arr={arr}
                  />
                );
              })}
            </Col>
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
          </Row>
        </Container>
      </section>
      <ThankYou show={show} handleClose={handleClose} />
    </>
  );
};

export default Reviews2;