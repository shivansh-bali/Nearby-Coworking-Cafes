import React, { useEffect, useState } from 'react';
import cx from './Dashboard.module.scss';
import { Col, Modal } from 'react-bootstrap';
import { myData, profile } from '../../../redux_toolkit/reducer/profileReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUpdateCafeState,
  changeFirstUpdation,
  updateCafe,
} from '../../../redux_toolkit/reducer/cafeReducer';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import m from '../../../components/Admin/Modals/Modal.module.scss';
import pending from '../../../components/Cafe/pendingicon.svg';
import verified from '../../../components/Cafe/verifiedicon.svg';

const CafeDashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [cafeData, setCafeData] = useState<any>({});
  const [navStr, setNavStr] = useState('');
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    if (cafeState.updateEditState > 0 || cafeState.updateCafeState > 0) {
      dispatch(myData());
      dispatch(changeUpdateCafeState());
    }
  }, [dispatch, cafeState.updateCafeState, cafeState.updateEditState]);
  useEffect(() => {
    setCafeData(
      profile?.cafeData?.filter(
        (item: any) => location.pathname.split('/')[3] === item._id
      )[0]
    );
  }, [location.pathname, profileState.profileState]);
  useEffect(() => {
    if (location.pathname === `/cafepanel/cafe-information/${cafeData._id}`) {
      setActive(0);
      setNavStr('');
    } else if (
      location.pathname === `/cafepanel/cafe-information/${cafeData._id}/about`
    ) {
      setActive(1);
      setNavStr('About');
    } else if (
      location.pathname ===
      `/cafepanel/cafe-information/${cafeData._id}/amenities`
    ) {
      setActive(2);
      setNavStr('Amenities');
    } else if (
      location.pathname === `/cafepanel/cafe-information/${cafeData._id}/images`
    ) {
      setActive(3);
      setNavStr('Images');
    } else if (
      location.pathname ===
      `/cafepanel/cafe-information/${cafeData._id}/reviews`
    ) {
      setActive(4);
      setNavStr('Reviews');
    }
  }, [location.pathname, cafeData._id]);

  const updateData = ({ key, value }: any) => {
    if (key?.length > 1) {
      setCafeData((prev: any) => {
        return {
          ...prev,
          [key[0]]: {
            ...prev[key[0]],
            [key[1]]: { ...prev[key[0]][key[1]], [key[2]]: value },
          },
        };
      });
    } else {
      setCafeData((prev: any) => {
        return { ...prev, [key]: value };
      });
    }
  };

  const removeData = ({ str }: any) => {
    dispatch(updateCafe({ [str]: '' }));
  };
  const updateCafeData = (data: any) => {
    dispatch(updateCafe({ ...data, _id: cafeData._id }));
  };
  return (
    <>
      <section className={`${cx.dashboard}`}>
        <Col className={cx.buttonsContainer}>
          {navStr ? (
            <>
              <button
                type='button'
                onClick={() => {
                  navigate('/cafepanel');
                }}
              >
                Home
              </button>
              /
              <button type='button' className={cx.active}>
                {navStr}
              </button>
            </>
          ) : (
            ''
          )}
        </Col>
        <Col>
          <h2>
            {cafeData?.establishmentName}
            <img
              src={cafeData?.isAccepted === 'Approved' ? verified : pending}
              alt='status'
              height='14px'
              style={{ position: 'relative', top: '-12px', left: '5px' }}
            />
          </h2>
          <Col md={12} className={`d-flex gap-2 ${cx.titleContainer} `}>
            <button
              className={active === 0 ? cx.active : ''}
              onClick={() => {
                navigate(`/cafepanel/cafe-information/${cafeData._id}`);
              }}
            >
              Business Information
            </button>
            <button
              className={active === 1 ? cx.active : ''}
              onClick={() => {
                navigate(`/cafepanel/cafe-information/${cafeData._id}/about`);
              }}
            >
              About
            </button>
            <button
              className={active === 2 ? cx.active : ''}
              onClick={() => {
                navigate(
                  `/cafepanel/cafe-information/${cafeData._id}/amenities`
                );
              }}
            >
              Amenities
            </button>
            <button
              className={active === 3 ? cx.active : ''}
              onClick={() => {
                navigate(`/cafepanel/cafe-information/${cafeData._id}/images`);
              }}
            >
              Images
            </button>
            <button
              className={active === 4 ? cx.active : ''}
              onClick={() => {
                navigate(`/cafepanel/cafe-information/${cafeData._id}/reviews`);
              }}
            >
              Reviews
            </button>
          </Col>
        </Col>

        <Outlet
          context={{
            updateData: updateData,
            removeData: removeData,
            cafeData: cafeData,
            updateCafeData: updateCafeData,
          }}
        />
      </section>

      <Modal centered scrollable show={profile?.data?.isFirst}>
        <Modal.Header>
          <Modal.Title>Welcome to Sync!</Modal.Title>
        </Modal.Header>
        <div className='d-flex justify-content-between'>
          <p
            style={{
              padding: ' 15px',
              margin: '0',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            We are preparing your listing, which should be visible to Sync users
            in 48 hours.
          </p>
        </div>
        <div className={`${m.logoutPopup}`}>
          <div className={`${m.btnsAlignments} d-flex justify-content-center`}>
            <div></div>
            <button
              type='button'
              className={`btn ${m.actionBtn}`}
              onClick={() => dispatch(changeFirstUpdation(profile?.data?._id))}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CafeDashboard;
