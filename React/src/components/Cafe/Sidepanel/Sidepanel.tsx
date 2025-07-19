import React, { useEffect, useState } from 'react';
import {
  MdOutlineCoffee,
  MdOutlineSettings,
  MdOutlineLogout,
  MdOutlineExpandMore,
  MdAddCircleOutline,
} from 'react-icons/md';
import cx from './Sidepanel.module.scss';
import { userLogout } from '../../../redux_toolkit/reducer/registrationReducer';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BusinessLogo from '../BusinessLogo.svg';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FiChevronLeft } from 'react-icons/fi';
import pending from '../pendingicon.svg';
import verified from '../verifiedicon.svg';
import { profile } from '../../../redux_toolkit/reducer/profileReducer';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import ClaimCafe from '../../Website/Modals/ClaimCafe';

const Sidepanel = () => {
  const [active, setActive] = useState(0);
  const [expand, setExpand] = useState(false);
  const [activeNested, setActiveNested] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(userLogout(profile?.data?._id)).then((res: any) => {
      if (res.payload.success === true) {
        navigate('/');
      }
    });
  };
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.endsWith('/cafepanel')) {
      setActive(1);
    } else if (pathname.endsWith('/cafepanel/reviews')) {
      setActive(2);
    } else if (pathname.endsWith('/cafepanel/profile')) {
      setActive(3);
    } else if (pathname.endsWith('/cafepanel/setting')) {
      setActive(5);
    }
  }, [pathname]);
  const [editshow, setEditShow] = useState(false);
  const handleeditClose = () => setEditShow(false);
  const handleeditShow = () => setEditShow(true);
  return (
    <>
      <section className={cx.sidepanel}>
        <div>
          <NavLink to='/'>
            <h5 className='' style={{ padding: '0' }}>
              <FiChevronLeft style={{ fontSize: '14px' }} /> Back to web
            </h5>
          </NavLink>
        </div>

        <div>
          <NavLink to='/cafepanel'>
            <img
              src={BusinessLogo}
              alt='Sync business'
              width='140px'
              height='auto'
              className='my-2'
            />
          </NavLink>
        </div>
        <div className='d-flex flex-column my-4'>
          <h5 className=''>Main Menu</h5>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <NavLink
              to='/cafepanel'
              className={active === 1 ? cx.active : ''}
              onClick={() => {
                setExpand(false);
                setActiveNested(0);
              }}
            >
              <div>
                <MdOutlineCoffee />
                <span>My Business </span>
                <img
                  src={
                    profile?.data?.isAccepted === 'Approved'
                      ? verified
                      : pending
                  }
                  alt='status'
                  height='10px'
                  style={{ position: 'relative', top: '-5px', left: '2px' }}
                />
              </div>
            </NavLink>
            <div
              style={{
                padding: '0 10px',
                transform: expand ? 'rotate(180deg)' : '',
              }}
              onClick={() => {
                setActive(1);
                setExpand(!expand);
                setActiveNested(0);
              }}
            >
              <MdOutlineExpandMore fontSize='18px' />
            </div>
          </div>
          {expand && (
            <div className={cx.nestedLinks}>
              {profile?.cafeData?.map((item: any, index: number) => {
                return (
                  <div className={cx.item} key={index}>
                    <div
                      className={
                        index + 1 <= activeNested
                          ? `${cx.connecter} ${cx.active}`
                          : cx.connecter
                      }
                    ></div>
                    <button
                      onClick={() => {
                        setActiveNested(index + 1);
                        navigate(`/cafepanel/cafe-information/${item._id}`);
                      }}
                      className={index + 1 <= activeNested ? cx.active : ''}
                    >
                      {item.establishmentName
                        ? item.establishmentName
                        : 'Name unavailable'}
                    </button>
                  </div>
                );
              })}
              <div
                className={cx.item}
                style={{ marginBottom: '20px' }}
                onClick={() => {
                  handleeditShow();
                }}
              >
                <button>
                  <MdAddCircleOutline /> Add Another
                </button>
              </div>
            </div>
          )}
          {/* <NavLink
          to="/cafepanel/reviews"
          className={active === 2 ? cx.active : ""}
          onClick={() => {
            setExpand(false);
            setActiveNested(0);
          }}
        >
          <MdOutlineThumbUpOffAlt />
          <span>Reviews</span>
        </NavLink> */}
        </div>
        <div className='d-flex flex-column'>
          <h5>Account</h5>
          <NavLink
            to='/cafepanel/profile'
            className={active === 3 ? cx.active : ''}
            onClick={() => {
              setExpand(false);
              setActiveNested(0);
            }}
          >
            <AiOutlineUser />
            <span>My Profile</span>
          </NavLink>
          <NavLink
            to='/'
            className={active === 4 ? cx.active : ''}
            onClick={() => {
              setExpand(false);
              setActiveNested(0);
            }}
          >
            <HiOutlineSwitchHorizontal />
            <span>Switch to personal account</span>
          </NavLink>
          <NavLink
            to='/cafepanel/setting'
            className={active === 5 ? cx.active : ''}
            onClick={() => {
              setExpand(false);
              setActiveNested(0);
            }}
          >
            <MdOutlineSettings />
            <span>Account Settings</span>
          </NavLink>
          <button
            className='btn'
            onClick={() => {
              logout();
            }}
          >
            <MdOutlineLogout />
            <span>Log Out</span>
          </button>
        </div>
      </section>
      <ClaimCafe editshow={editshow} handleeditClose={handleeditClose} />
    </>
  );
};

export default Sidepanel;
