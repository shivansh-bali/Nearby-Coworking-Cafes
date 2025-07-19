import React from "react";
import cx from "../CafeDescription.module.scss";

const TimeLimit = ({ handleChange, edit, cafeData }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Time Limit</h4>
      </div>
      <select
        name="timeLimitation"
        id=""
        disabled={edit}
        value={cafeData?.timeLimitation}
        className="my-2"
        onChange={(e: any) => handleChange({ e })}
      >
        <option value="1 hour"> 1 hour</option>
        <option value="3 hours">3 hours </option>
        <option value="5 hours">5 hours</option>
        <option selected value={"No time limit"}>
          No time limit
        </option>
      </select>
    </div>
  );
};

export default TimeLimit;
