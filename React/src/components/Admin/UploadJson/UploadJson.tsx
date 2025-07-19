import React from "react";
import cx from "./UploadJson.module.scss";

export function UploadJson() {
  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const data = JSON.stringify(e.target?.result);
      console.log("data: ", JSON.parse(JSON.parse(data)));
    };
  };
  return (
    <button className={`btn ${cx.button}`}>
      <input
        type="file"
        onChange={(e: any) => {
          handleChange(e);
        }}
        className={cx.uploadBtn}
      />
      Upload in Bulk
    </button>
  );
}
