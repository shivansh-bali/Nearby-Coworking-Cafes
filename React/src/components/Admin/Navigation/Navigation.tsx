import React from "react";
import { Outlet } from "react-router-dom";
import cx from "./Navigation.module.scss";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import AdminMobileHeader from "../Header/MobileHeader/AdminMobileHeader";

export default function AdminNavigation() {
  return (
    <div className={`${cx.wrapper}`}>
      <AdminMobileHeader />
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
}
