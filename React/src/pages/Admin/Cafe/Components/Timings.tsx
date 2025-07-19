import React from "react";
import { Form } from "react-bootstrap";
import cx from "../CafeDescription.module.scss";

const Timings = ({ edit, setCafeData, cafeData }: any) => {
  const updateData = ({ key, value }: any) => {
    if (cafeData?.openHours) {
      setCafeData((prev: any) => {
        prev[key[0]] = {
          ...prev[key[0]],
          [key[1]]: { ...prev[key[0]][key[1]], [key[2]]: value },
        };
        return prev;
      });
    } else {
      cafeData.openHours = {
        Mon: { startTime: "", endTime: "" },
        Tue: { startTime: "", endTime: "" },
        Wed: { startTime: "", endTime: "" },
        Thu: { startTime: "", endTime: "" },
        Fri: { startTime: "", endTime: "" },
        Sat: { startTime: "", endTime: "" },
        Sun: { startTime: "", endTime: "" },
      };
      setCafeData((prev: any) => {
        prev[key[0]] = {
          ...prev[key[0]],
          [key[1]]: { ...prev[key[0]][key[1]], [key[2]]: value },
        };
        return prev;
      });
    }
  };
  const timeChange = ((time:any)=>{
    if(time !== undefined){
     let timeSplit = time?.split(':'),
     hours,
     minutes,
     meridian;
   hours = timeSplit[0];
   minutes = timeSplit[1];
   if (hours > 12) {
     meridian = 'PM';
     hours -= 12;
   } else if (hours < 12) {
     meridian = 'AM';
     if (hours === 0) {
       hours = 12;
     }
   } else {
     meridian = 'PM';
   }
   return hours + ':' + minutes + ' ' + meridian + " "
    }
   })
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Operating Hours</h4>
      </div>
      {edit && cafeData?.openHours && (
          Object.keys(cafeData?.openHours).map((item: string, index: number) => {
          const getTime = timeChange(cafeData?.openHours[item]?.startTime)
          const getEndTime = timeChange(cafeData?.openHours[item]?.endTime)
           return cafeData?.openHours[item]?.startTime!=="" && (
             <p key={index}>
               <span style={{ width: "30px", display: "inline-block" }}>
                 {item }:
               </span>
               <span> { getTime}</span> -
               <span> { getEndTime}</span>
             </p>
           );
         })
      )}

      {!edit && (
        <div className={cx.editItem}>
          <ul className={cx.timeTable}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (item: string, index: number) => {
                return (
                  <li key={index} className={`d-flex align-items-center gap-3`}>
                    <p
                      style={{
                        margin: 0,
                        height: "14px",
                        width: "100px",
                        textTransform: "capitalize",
                      }}
                    >
                      {item }: 
                    </p>
                    <Form.Group className={`${cx.formBox}`}>
                      <Form.Label>Opening hour</Form.Label>
                      <input
                        type="time"
                        aria-label="Default select example"
                        defaultValue={
                          cafeData?.openHours?.[item]
                            ? cafeData?.openHours?.[item]?.startTime
                            : ""
                        }
                        name="openHours"
                        onChange={(e: any) => {
                          updateData({
                            key: [e.target.name, item, "startTime"],
                            value: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>

                    <Form.Group className={`${cx.formBox}`}>
                      <Form.Label>Closing hour</Form.Label>
                      <input
                        type="time"
                        aria-label="Default select example"
                        defaultValue={
                          cafeData?.openHours?.[item]
                            ? cafeData?.openHours?.[item]?.endTime
                            : ""
                        }
                        name="openHours"
                        onChange={(e: any) => {
                          updateData({
                            key: [e.target.name, item, "endTime"],
                            value: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Timings;
