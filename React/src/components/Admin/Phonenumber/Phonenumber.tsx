import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumber = (props: any) => {
  return (
    <>
      <PhoneInput
        country={"in"}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: false,
        }}
        onChange={props.phoneInput}
        defaultErrorMessage="It doesn't works, why?"
      />
    </>
  );
};

export default PhoneNumber;
