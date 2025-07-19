import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import es from "react-phone-input-2/lang/es.json";

const PhoneNumber = (props: any) => {
  const [phoneValue, setPhoneValue] = useState(
    `${props?.fields?.mobileNumber}`
  );
  useEffect(() => {
    setPhoneValue(`${props?.fields?.mobileNumber}`);
  }, [props?.fields?.dialCode, props?.fields?.mobileNumber, phoneValue]);
  return (
    <>
      <PhoneInput
        country={props?.fields?.countryCode ? props?.fields?.countryCode : "us"}
        value={phoneValue}
        localization={es}
        onChange={props.phoneInput}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
        }}
      />
    </>
  );
};

export default PhoneNumber;
