import React from "react";
import cx from "../CafeDescription.module.scss";
import PhoneInput from "react-phone-input-2";

const data1 = [
  {
    title: "Full Name",
    value: "name",
    type: "input",
  },
  {
    title: "Job Title",
    value: "position",
    type: "input",
  },
  {
    title: "Phone No.",
    value: "phone",
    type: "userPhone",
  },
];

const PersonalDetails = ({ cafeData, edit, handleChange }: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Personal Details</h4>
      </div>
      <div className={cx.infoitems}>
        {data1.map((item: any, index: number) => {
          return (
            <div className={cx.item} key={index}>
              <h6>{item.title}</h6>
              {item.type === "input" && (
                <input
                  type="text"
                  name={item.value}
                  value={cafeData?.[item.value]}
                  disabled={edit}
                  onChange={(e: any) => handleChange({ e })}
                />
              )}
              {item.type === "userPhone" && (
                <PhoneInput
                  value={`+${cafeData?.[item.type]}`}
                  country="us"
                  disabled={edit}
                  onChange={(e: any) =>
                    handleChange({
                      e: { target: { name: "userPhone", value: e } },
                    })
                  }
                  placeholder=""
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalDetails;
