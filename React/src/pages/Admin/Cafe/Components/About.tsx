import React from "react";
import cx from "../CafeDescription.module.scss";

const About = ({ edit, cafeData, handleChange }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>About</h4>
      </div>
      <div>
        <h6 className="my-2">Cafe Introduction</h6>
        <textarea
          name="shortDescription"
          id=""
          disabled={edit}
          rows={6}
          value={
            cafeData?.shortDescription
              ? cafeData?.shortDescription
              : !edit ? "" : "Click on Edit to write here."
          }
          onChange={(e: any) => handleChange({ e })}
        ></textarea>
      </div>
    </div>
  );
};

export default About;
