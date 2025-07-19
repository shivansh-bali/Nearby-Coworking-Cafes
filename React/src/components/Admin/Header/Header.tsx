import React, { useEffect } from "react";
import cx from "./Header.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

import { Col } from "react-bootstrap";
import { userLogout } from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";

interface HeaderProps {
  showHeaderClass?: string;
}

const Header = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationState.logoutState === 1) {
      navigate("/");
    }
  }, [navigate, registrationState.logoutState]);
  return (
    <>
      <header className={`${cx.mainHeader}`}>
        <Col className={` d-flex justify-content-end gap-4 ${cx.headerRight}`}>
          <NavLink to="edit-profile">
            <FaUserEdit style={{ marginRight: "5px" }} />
            Edit Profile
          </NavLink>
          <NavLink
            to="#"
            className={cx.logoutButton}
            onClick={() => dispatch(userLogout(profile?.data?._id))}
          >
            <BiLogOutCircle style={{ marginRight: "5px" }} />
            Logout
          </NavLink>
        </Col>
      </header>
    </>
  );
};

export default Header;
