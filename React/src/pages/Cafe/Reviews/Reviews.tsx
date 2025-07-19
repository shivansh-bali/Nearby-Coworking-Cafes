import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import cx from '../../../pages/Cafe/Dashboard/Dashboard.module.scss';
import re from './Reviews.module.scss';
import { AiFillStar, AiOutlineQuestionCircle } from 'react-icons/ai';
import { profile_icon } from '../../../assets/images/index';
import { myData, profile } from '../../../redux_toolkit/reducer/profileReducer';
import { updateReview } from '../../../redux_toolkit/reducer/cafeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import IconGenerator from '../../../components/Shared/IconGenerator';

const Review = ({ data, status, index }: any) => {
  const { point } = data;
  const [reply, setReply] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const updatecafeListData = () => {
    dispatch(
      updateReview({
        userId: data?.userProfile?._id,
        reviewId: data?.uniqueId,
        message: replyMessage,
      })
    );

    setReply(false);
    setReplyMessage('');
  };
  return (
    <Col xs={12} className='d-flex'>
      {status && (
        <div
          style={{
            width: '20px',
            textAlign: 'center',
            margin: '55px 5px 0 2px',
          }}
        >
          <input
            className={`form-check-input ${re.radioButton}`}
            type='radio'
            name='radioNoLabel'
            id={`radioNoLabel${index}`}
            checked={selected}
            aria-label='...'
            onClick={() => {
              setSelected(!selected);
            }}
          />
        </div>
      )}
      <div className={re.review}>
        <div style={{ padding: '5px 0', marginBottom: '20px' }}>
          {[...Array(5)].map((item: any, index: any) => {
            return (
              <AiFillStar
                style={
                  index < point
                    ? { color: '#45D6AD' }
                    : { color: 'var(--Main5)' }
                }
              />
            );
          })}
          <span
            style={{
              marginLeft: '5px',
              color: 'var(--Color5)',
              fontSize: '14px',
            }}
          >
            ({point}.0)
          </span>
        </div>
        <h6 style={{ fontSize: '16px' }}>{data.message} </h6>
        <p style={{ fontSize: '14px', color: 'var(--Color5)' }}>
          {data.message}
        </p>
        <div className={`d-flex gap-2 flex-wrap`}>
          {data?.photos?.map((item: any, index: number) => {
            return (
              <img
                src={item}
                alt=''
                height='90px'
                width='90px'
                style={{ borderRadius: '10px' }}
              />
            );
          })}
        </div>
        <div className={`d-flex `} style={{ marginTop: '20px' }}>
          {data?.userProfile?.profileImage ? (
            <img
              src={data?.userProfile?.profileImage}
              alt=''
              width='50px'
              height='50px'
              style={{
                borderRadius: '50%',
                marginRight: '10px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <IconGenerator name={data?.userProfile?.name} />
          )}

          <div>
            <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>
              {data?.userProfile?.name}
            </h5>
            <p style={{ fontSize: '14px', color: 'var(--Color5)' }}>
              {data?.userProfile?.position}, {data?.userProfile?.city},{' '}
              {data?.userProfile?.country}
            </p>
          </div>
        </div>

        {!reply && (
          <button
            className={cx.settingBtn}
            style={{ fontSize: '14px' }}
            onClick={() => setReply(!reply)}
          >
            {data?.reply ? 'View Reply' : 'Reply'}
          </button>
        )}

        {data?.reply && reply && (
          <>
            <button
              className={cx.settingBtn}
              style={{ fontSize: '14px' }}
              onClick={() => setReply(!reply)}
            >
              Close
            </button>
            <div
              style={{
                marginTop: '10px',
                background: 'var(--Main5)',
                borderRadius: '15px',
                padding: '10px',
              }}
            >
              <h6 style={{ fontSize: '16px' }}>{data.message} </h6>
              <p style={{ fontSize: '14px', color: 'var(--Color5)' }}>
                {data.message}
              </p>
            </div>
          </>
        )}
        {!data?.reply && reply && (
          <div style={{ marginTop: '20px' }}>
            <div
              style={{
                borderBottom: '1px solid #dedede',
                paddingBottom: '10px',
                marginBottom: '15px',
              }}
            >
              {profile?.data?.profileImage ? (
                <img
                  src={profile_icon}
                  alt=''
                  width='35px'
                  height='35px'
                  style={{ borderRadius: '50%', marginRight: '5px' }}
                />
              ) : (
                <div style={{ display: 'inline-block' }}>
                  <IconGenerator name={profile?.data?.name} />
                </div>
              )}
              <input
                type='text'
                name='reply'
                value={replyMessage}
                onChange={(e: any) => {
                  setError(false);
                  setReplyMessage(e.target.value);
                }}
              />
            </div>
            {error && (
              <p style={{ fontSize: '14px', color: 'red', marginLeft: '20px' }}>
                Please enter your reply here.
              </p>
            )}
            <Row>
              <Col md={9}></Col>
              <Col md={3}>
                <div>
                  <button
                    style={{
                      border: 'none',
                      background: 'transparent',
                      fontWeight: '600',
                      margin: ' 0 22px',
                    }}
                    onClick={() => setReply(!reply)}
                  >
                    Cancel
                  </button>
                  <button
                    className={cx.themeBtn}
                    style={{
                      width: '120px',
                    }}
                    onClick={() => {
                      if (replyMessage.length > 2) {
                        updatecafeListData();
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
        )}
      </div>
    </Col>
  );
};
const Reviews = () => {
  const { cafeData } = useOutletContext<any>();
  console.log(cafeData.ratingReviews, 'cafedata');
  const [cafeListData, setcafeListData] = useState<any>({});
  useMemo(() => setcafeListData(cafeData), [cafeData]);
  const [highlight, setHighlight] = useState(false);
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    dispatch(myData());
  }, [cafeState.updateReviewState, dispatch]);

  useEffect(() => {
    setcafeListData(profile?.data);
  }, [profileState.profileState]);
  console.log(profile?.data);
  return (
    <>
      <Col className={cx.dashboard}>
        <h2>Reviews</h2>
        <div className={cx.businessInformation}>
          <div
            className={`d-flex justify-content-between my-2 ${cx.businessInformationTitle}`}
          >
            <h5>Reviews</h5>
            <div className='d-flex align-items-center py-1'>
              <button
                style={{ minWidth: 'max-content', padding: '0' }}
                onClick={() => {
                  setHighlight(!highlight);
                }}
              >
                {!highlight ? ' Highlight a review' : 'Cancel'}
              </button>
              <Tooltip
                title={
                  <p>
                    Highlighting a review will feature it to the “From the
                    community” section in your cafe page.
                  </p>
                }
              >
                <button
                  style={{
                    width: 'max-content',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                  }}
                >
                  <AiOutlineQuestionCircle fontSize={18} />
                </button>
              </Tooltip>
            </div>
          </div>
          <Col className={`d-flex container flex-wrap p-0 ${re.reviewBox}`}>
            {false ? (
              <p
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '30%',
                  width: '100%',
                }}
              >
                You don't have any reviews yet.
              </p>
            ) : (
              <>
                {cafeListData?.ratingReviews
                  ?.filter(
                    (item: any, i: number) =>
                      item.message && { ...item, itemId: i }
                  )
                  .map((item: any, index: number) => {
                    return (
                      <Review
                        data={item}
                        index={index}
                        cafeDate={cafeListData}
                        status={highlight}
                      />
                    );
                  })}
              </>
            )}
          </Col>
        </div>
      </Col>
    </>
  );
};

export default Reviews;
