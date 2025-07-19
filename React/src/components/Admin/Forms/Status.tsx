import React from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";

const Status = () => {
  return (
    <>
      <label className={`${st.switch}`}>
        <input className={`${st.switchInput}`} type="checkbox" />
        <span
          className={`${st.switchLabel}`}
          data-on="Active"
          data-off="Deactive"
        ></span>
        <span className={`${st.switchHandle}`}></span>
      </label>
    </>
  );
};

export default Status;
