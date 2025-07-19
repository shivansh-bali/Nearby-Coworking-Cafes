import React from "react";
import st from "../../../assets/stylesheet/style.module.scss";
import { useDispatch } from "react-redux";
import {
  isSearchLocation,
  profile,
} from "../../../redux_toolkit/reducer/profileReducer";
import { localLatLng, saveLatLng } from "../../../redux_toolkit/reducer/registrationReducer";

const YesNo = () => {
  const dispatch = useDispatch();
  return (
    <>
      <label className={`${st.switch}`}>
        <input
          className={`${st.switchInput}`}
          checked={!profile?.data?.isSearchLocation}
          type="checkbox"
          onChange={(e: any) => {
            dispatch(isSearchLocation({ isSearchLocation: !e.target.checked }));
            if(e.target.checked===true){
              dispatch(
                localLatLng({
                  lat: 42.360253,
                  lng: -71.058291,
                  placeName: "Boston",
                })
              );
              dispatch(
                saveLatLng({
                  lat: 42.360253,
                  lng: -71.058291,
                  placeName: "Boston",
                })
              );
            }
            
          }}
        />
        <span
          className={`${st.switchLabel}`}
          data-on="Yes"
          data-off="No"
        ></span>
        {/* <span className={`${st.switchHandle}`}></span>  */}
      </label>
    </>
  );
};

export default YesNo;
