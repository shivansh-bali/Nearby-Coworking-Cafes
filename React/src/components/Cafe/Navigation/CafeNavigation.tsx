import React from "react";
import cx from "./CafeNavigation.module.scss";
import { Outlet } from "react-router-dom";
import Sidepanel from "../Sidepanel/Sidepanel";
import "bootstrap/dist/css/bootstrap.css";
import MobileHeader from "../MobileHeader/MobileHeader";

const CafeNavigation = () => {
  return (
    <>
      <MobileHeader />
      <div className={`${cx.cafePanel} container `}>
        <Sidepanel />
        <Outlet />
      </div>
    </>
  );
};

export default CafeNavigation;
