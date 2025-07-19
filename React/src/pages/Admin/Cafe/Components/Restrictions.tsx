import React from "react";
import cx from "../CafeDescription.module.scss";

const Restrictions = ({ edit, handleChange, cafeData }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Restrictions</h4>
      </div>
      <textarea
        name="limitations"
        id=""
        disabled={edit}
        rows={2}
        className="my-2"
        onChange={(e: any) => handleChange({ e })}
        value={
          cafeData?.limitations
            ? cafeData?.limitations
            : !edit ? "" : "Click on Edit to write here."
        }
      ></textarea>
    </div>
  );
};

export default Restrictions;
