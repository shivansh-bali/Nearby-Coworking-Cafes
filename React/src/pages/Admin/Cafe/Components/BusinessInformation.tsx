import React from "react";
import cx from "../CafeDescription.module.scss";
import PhoneInput from "react-phone-input-2";
import { AiTwotoneEdit } from "react-icons/ai";

const data = [
  {
    title: "Category",
    value: "category",
    type: "dropdown",
    options: ["Coffee Shop", "Bar", "Restaurant", "Other"],
  },
  {
    title: "Business Location",
    value: "streetAddress",
    type: "input",
  },
  {
    title: "Phone No.",
    value: "phone",
    type: "phone",
  },
  {
    title: "Establishment Name",
    value: "establishmentName",
    type: "input",
  },
  {
    title: "State ",
    value: "state",
    type: "input",
  },
  {
    title: " Email ",
    value: "email",
    type: "input",
  },
  {
    title: "Legal Establishment Name",
    value: "legalEstablishmentName",
    type: "input",
  },
  {
    title: "City",
    value: "city",
    type: "input",
  },
  {
    title: "Website",
    value: "website",
    type: "input",
  },

  {
    title: "Postal Code",
    value: "postalCode",
    type: "input",
  },
];
const BusinessInformation = ({
  cafeData,
  edit,
  handleChange,
  setEdit,
}: any) => {
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Business Information</h4>
        {cafeData?.isVerified===false && <p style={{color:"red"}}>User does not verify its email</p>}

        {!edit ||
        cafeData?.isAccepted === "pending" ||
        cafeData?.isAccepted === "Rejected" ||
        cafeData?.isApproved === "pending" ||
        cafeData?.isApproved === "Rejected" ? (
          ""
        ) : (
          <button
            className={` ${cx.editButton}`}
            onClick={() => setEdit(!edit)}
          >
            <AiTwotoneEdit /> Edit
          </button>
        )}
      </div>
      <div className={cx.infoitems}>
        {data.map((item: any, index: number) => {
          return (
            <div className={cx.item} key={index}>
              <h6>{item.title}</h6>
              {item.type === "input" && (
                <input
                  type="text"
                  name={item.value}
                  value={cafeData?.[item.value]?.includes("example@gmail.com") ? "" : cafeData?.[item.value]}
                  disabled={edit}
                  onChange={(e: any) => handleChange({ e })}
                />
              )}
              {item.type === "phone" && (
                <PhoneInput
                  value={`+${cafeData?.[item.type]}`}
                  country="us"
                  disabled={edit}
                  onChange={(e: any) =>
                    handleChange({ e: { target: { name: "phone", value: e } } })
                  }
                  placeholder=""
                />
              )}
              {item.type === "dropdown" && (
                <select
                  name={item.value}
                  value={cafeData?.[item.value]}
                  disabled={edit}
                  onChange={(e: any) => handleChange({ e })}
                >
                  {item?.options?.map((item: string, index: any) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessInformation;
