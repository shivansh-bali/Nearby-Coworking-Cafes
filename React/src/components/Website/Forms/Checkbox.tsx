import React from "react";
import st from "../../../assets/stylesheet/style.module.scss";

const Checkbox = (props: any) => {
  return (
    <>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e: any) => {
          if (props?.step) {
            props.fillFields(props.step, props.nameCheckbox, e.target.checked);
          } else {
            props.fillFields(props.nameCheckbox, e.target.checked);
          }
        }}
      />
      <span className={`${st.checkmark}`}></span>
    </>
  );
};

export default Checkbox;
