import React from "react";
import st from "../../../assets/stylesheet/style.module.scss";

const Checkbox = () => {
  return (
    <>
      <input type="checkbox" />
      <span className={`${st.checkmark}`}></span>
    </>
  );
};

export default Checkbox;
