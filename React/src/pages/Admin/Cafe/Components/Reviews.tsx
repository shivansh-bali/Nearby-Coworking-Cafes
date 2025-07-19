import cx from "../CafeDescription.module.scss";
import React from "react";
import { Col } from "react-bootstrap";
import re from "../../../Cafe/Reviews/Reviews.module.scss";
import { AiFillStar } from "react-icons/ai";

import IconGenerator from "../../../../components/Shared/IconGenerator";

const Review = ({ data, status, index, edit }: any) => {
  const { point } = data;

  return (
    <Col xs={12} className="d-flex">
      {/* {status && (
        <div
          style={{
            width: "20px",
            textAlign: "center",
            margin: "55px 5px 0 2px",
          }}
        >
          <input
            className={`form-check-input ${re.radioButton}`}
            type="radio"
            name="radioNoLabel"
            id={`radioNoLabel${index}`}
            checked={selected}
            aria-label="..."
            onClick={() => {
              setSelected(!selected);
            }}
          />
        </div>
      )} */}
      <div className={re.review}>
        <div style={{ padding: "5px 0", marginBottom: "20px" }}>
          {[...Array(5)].map((item: any, index: any) => {
            return (
              <AiFillStar
                style={
                  index < point
                    ? { color: "#45D6AD" }
                    : { color: "var(--Main5)" }
                }
              />
            );
          })}
          <span
            style={{
              marginLeft: "5px",
              color: "var(--Color5)",
              fontSize: "14px",
            }}
          >
            ({point}.0)
          </span>
        </div>
        <h3 style={{ fontSize: "14px" }}>{data.message} </h3>
        {/* <p style={{ fontSize: "14px", color: "var(--Color5)" }}>
          {data?.message}
        </p> */}
        {data?.photos && data?.photos?.length > 0 && (
          <div className={`d-flex gap-2 flex-wrap`}>
            {data?.photos?.map((item: any, index: number) => {
              return (
                <img
                  src={item}
                  alt=""
                  height="90px"
                  width="90px"
                  style={{ borderRadius: "10px" }}
                />
              );
            })}
          </div>
        )}

        <div className={`d-flex `} style={{ marginTop: "20px" }}>
          {data?.userProfile?.profileImage ? (
            <img
              src={data?.userProfile?.profileImage}
              alt=""
              width="50px"
              height="50px"
              style={{
                borderRadius: "50%",
                marginRight: "10px",
                objectFit: "cover",
              }}
            />
          ) : (
            <IconGenerator name={data?.userProfile?.name} />
          )}

          <div>
            <h5 style={{ fontSize: "18px", marginBottom: "5px" }}>
              {data?.userProfile?.name}
            </h5>
            <p style={{ fontSize: "14px", color: "var(--Color5)" }}>
              {data?.userProfile?.position}, {data?.userProfile?.city},{" "}
              {data?.userProfile?.country}
            </p>
          </div>
        </div>

        {/* {!reply && !edit && (
          <button
            className={dx.themeBtn}
            style={{ fontSize: "14px" }}
            onClick={() => setReply(!reply)}
          >
            {data?.reply ? "View Reply" : "Reply"}
          </button>
        )}

        {data?.reply && reply && (
          <>
            <button
              className={dx.settingBtn}
              style={{ fontSize: "14px" }}
              onClick={() => setReply(!reply)}
            >
              Close
            </button>
            <div
              style={{
                marginTop: "10px",
                background: "var(--Main5)",
                borderRadius: "15px",
                padding: "10px",
              }}
            >
              <h6 style={{ fontSize: "16px" }}>{data.message} </h6>
              <p style={{ fontSize: "14px", color: "var(--Color5)" }}>
                {data.message}
              </p>
            </div>
          </>
        )}
        {!data?.reply && reply && (
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                borderBottom: "1px solid #dedede",
                paddingBottom: "10px",
                marginBottom: "15px",
              }}
            >
              {profile?.data?.profileImage ? (
                <img
                  src={profile?.data?.profileImage}
                  alt=""
                  width="35px"
                  height="35px"
                  style={{ borderRadius: "50%", marginRight: "5px" }}
                />
              ) : (
                <div style={{ display: "inline-block" }}>
                  <IconGenerator name={profile?.data?.name} />
                </div>
              )}

              <input
                type="text"
                name="reply"
                value={replyMessage}
                onChange={(e: any) => {
                  setError(false);
                  setReplyMessage(e.target.value);
                }}
              />
            </div>
            {error && (
              <p style={{ fontSize: "14px", color: "red", marginLeft: "20px" }}>
                Please enter your reply here.
              </p>
            )}
            <Row>
              <Col md={9}></Col>
              <Col md={3}>
                <div>
                  <button
                    style={{
                      border: "none",
                      background: "transparent",
                      fontWeight: "600",
                      margin: " 0 22px",
                    }}
                    onClick={() => setReply(!reply)}
                  >
                    Cancel
                  </button>
                  <button
                    className={dx.themeBtn}
                    style={{
                      width: "120px",
                    }}
                    onClick={() => {
                      if (replyMessage.length > 2) {
                        updateCafeData();
                      } else {
                        setError(true);
                      }
                    }}
                  >
                    Send
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        )} */}
      </div>
    </Col>
  );
};

const Reviews = ({ edit, cafeData, handleChange }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Reviews</h4>
      </div>
      <div>
        {/* <h6 className="my-2">Cafe Introduction</h6> */}
        <Col className={`d-flex container flex-wrap p-0 ${re.reviewBox}`}>
          {cafeData?.ratingReviews?.length === 0 ? (
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginTop: "30%",
                width: "100%",
              }}
            >
              You don't have any reviews yet.
            </p>
          ) : (
            <>
              {cafeData?.ratingReviews
                ?.filter(
                  (item: any, i: number) =>
                    item.message && { ...item, itemId: i }
                )
                .map((item: any, index: number) => {
                  return (
                    <Review
                      edit={edit}
                      data={item}
                      index={index}
                      cafeDate={cafeData}
                      status={edit}
                    />
                  );
                })}
            </>
          )}
        </Col>
      </div>
    </div>
  );
};

export default Reviews;
