import React from "react";
import st from "../../../assets/stylesheet/style.module.scss";

const Radio = () => {
  return (
    <>
      <input type="radio" />
      <span className={`${st.checkmark}`}></span>
    </>
  );
};

export default Radio;
