import React from "react";
import st from "../../../assets/stylesheet/style.module.scss";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";


const Radio = (props: any) => {
  return (
    <>
      <input type="radio" value={props.value} name="defaultAudience" defaultChecked={props.value === profile?.data?.defaultAudience} onClick={(e: any) => {
        props?.fillFields("defaultAudience", e?.target?.value)
      }} />
      <span className={`${st.checkmark}`}></span>
    </>
  );
};

export default Radio;
