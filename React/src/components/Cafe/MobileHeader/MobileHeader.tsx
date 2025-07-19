import React, { useEffect } from "react";
import BusinessLogo from "../BusinessLogo.svg";
import cx from "./MobileHeader.module.scss";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineCoffee,
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlineThumbUpOffAlt,
} from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../redux_toolkit/reducer/registrationReducer";
import { NavLink } from "react-router-dom";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";

const HamburgerIcon = () => {
  return (
    <div className={cx.hamburger}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
const NavData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  useEffect(() => {
    if (registrationState.logoutState === 1) {
      navigate("/");
    }
  }, [navigate, registrationState.logoutState]);
  return (
    <section className={cx.sidepanel}>
      <div className="d-flex flex-column">
        <h5 className="">Main Menu</h5>
        <NavLink to="/cafepanel">
          <MdOutlineCoffee />
          <span>My Business </span>
        </NavLink>
        <NavLink to="/cafepanel/reviews">
          <MdOutlineThumbUpOffAlt />
          <span>Reviews</span>
        </NavLink>
      </div>
      <div className="d-flex flex-column">
        <h5>Account</h5>
        <NavLink to="/cafepanel/profile">
          <HiOutlineUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink to="/cafepanel/setting">
          <MdOutlineSettings />
          <span>Account Settings</span>
        </NavLink>
        <button className="btn" onClick={() => dispatch(userLogout(profile?.data?._id))}>
          <MdOutlineLogout />
          <span>Log Out</span>
        </button>
      </div>
    </section>
  );
};

const MobileHeader = () => {
  return (
    <nav>
      <div className={cx.headerTitle}>
        <img src={BusinessLogo} alt="Logo" />
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState: any) => (
            <div>
              <Button variant="contained" {...bindTrigger(popupState)}>
                <HamburgerIcon />
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  <NavData />
                </Typography>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </nav>
  );
};

export default MobileHeader;
