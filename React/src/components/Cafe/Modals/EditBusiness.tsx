import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import cx from "./EditBusiness.module.scss";
import m from "../../Admin/Modals/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import { useOutletContext } from "react-router-dom";

const EditBusiness = ({ show, handleClose }: any) => {
  const { cafeData, updateCafeData } = useOutletContext<any>();
  const [data, setData] = useState<any>({});
  useEffect(() => {
    setData(cafeData);
  }, [cafeData]);
  const [error, serError] = useState(0);
  const handleError = () => {
    if (!data?.establishmentName) {
      serError(1);
    } else if (!data?.state) {
      serError(2);
    } else if (!data?.city) {
      serError(3);
    } else {
      updateCafeData({
        establishmentName: data?.establishmentName,
        state: data?.state,
        openHours: data?.openHours,
        city: data?.city,
        website: data?.website,
        phone: data?.phone,
      });
    }
  };
  const updateData = ({ key, value }: any) => {
    serError(0);
    if (key?.length > 1) {
      console.log(value);
      if (cafeData?.openHours) {
        setData((prev: any) => {
          prev[key[0]] = {
            ...prev[key[0]],
            [key[1]]: { ...prev[key[0]][key[1]], [key[2]]: value },
          };
          console.log(prev);
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
        setData((prev: any) => {
          prev[key[0]] = {
            ...prev[key[0]],
            [key[1]]: { ...prev[key[0]][key[1]], [key[2]]: value },
          };
          return prev;
        });
      }
    } else {
      setData((prev: any) => {
        return { ...prev, [key]: value };
      });
    }
  };
  return (
    <Modal
      centered
      scrollable
      show={show}
      onHide={handleClose}
      className={`${m.modalCts}`}
    >
      <Row className={cx.editBusiness}>
        <div
          style={{
            borderBottom: "1px solid var(--Main5)",
            marginBottom: "20px",
          }}
          className="d-flex justify-content-between"
        >
          <h5
            style={{
              padding: " 15px",
              margin: "0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Edit Business Information
          </h5>
          <button
            style={{
              border: "none",
              background: "none",
              color: "var(--Color5)",
              padding: "10px",
            }}
            onClick={handleClose}
          >
            <AiOutlineClose style={{ fontWeight: "bold" }} />
          </button>
        </div>
        <form
          style={{ marginLeft: "20px" }}
          action=""
          onSubmit={(e: any) => {
            handleError();
            e.preventDefault();
            handleClose();
          }}
        >
          <Col md={11} sm={11} xs={11}>
            <div className={cx.editItem}>
              <p>Business Name</p>
              <input
                type="text"
                placeholder="Enter business name"
                defaultValue={data?.establishmentName}
                name="establishmentName"
                onChange={(e: any) => {
                  updateData({ key: [e.target.name], value: e.target.value });
                }}
              />
            </div>
            {error === 1 && (
              <p
                style={{ fontSize: "14px", color: "red", marginLeft: "170px" }}
              >
                Please fill the required fields
              </p>
            )}
            <div className={cx.editItem}>
              <p>State</p>
              <input
                type="text"
                placeholder="Enter state name"
                defaultValue={data?.state}
                name="state"
                onChange={(e: any) => {
                  updateData({ key: [e.target.name], value: e.target.value });
                }}
              />
            </div>
            {error === 2 && (
              <p
                style={{ fontSize: "14px", color: "red", marginLeft: "170px" }}
              >
                Please fill the required fields
              </p>
            )}
            <div className={cx.editItem}>
              <p>City</p>
              <input
                type="text"
                placeholder="Enter city"
                defaultValue={data?.city}
                name="city"
                onChange={(e: any) => {
                  updateData({ key: [e.target.name], value: e.target.value });
                }}
              />
            </div>
            {error === 3 && (
              <p
                style={{ fontSize: "14px", color: "red", marginLeft: "170px" }}
              >
                Please fill the required fields
              </p>
            )}
            <div className={cx.editItem}>
              <p>Contact Number</p>
              <PhoneInput
                country={"in"}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
                value={`+${data?.phone}`}
                onChange={(e: any) => updateData({ key: ["phone"], value: e })}
                defaultErrorMessage="It doesn't works, why?"
              />
            </div>

            <div className={cx.editItem}>
              <p>Website</p>
              <input
                type="text"
                placeholder="Enter website URL"
                defaultValue={data?.website}
                name="website"
                onChange={(e: any) => {
                  updateData({ key: [e.target.name], value: e.target.value });
                }}
              />
            </div>
            <div className={cx.editItem}>
              <p>Business Hours</p>
              <ul className={cx.timeTable}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (item: string, index: number) => {
                    return (
                      <li key={index}>
                        <p
                          style={{
                            padding: "7px 0",
                            textTransform: "capitalize",
                          }}
                        >
                          {item}
                        </p>
                        <Form.Group className={`${cx.formBox}`}>
                          <Form.Label>Opening hour</Form.Label>
                          <Form.Control
                            type="time"
                            defaultValue={
                              data?.openHours?.[item]
                                ? data?.openHours?.[item].startTime
                                : ""
                            }
                            name="openHours"
                            onChange={(e: any) => {
                              updateData({
                                key: [e.target.name, [item], "startTime"],
                                value: e.target.value,
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group className={`${cx.formBox}`}>
                          <Form.Label>Closing hour</Form.Label>
                          <Form.Control
                            type="time"
                            defaultValue={
                              data?.openHours?.[item]
                                ? data?.openHours?.[item].endTime
                                : ""
                            }
                            onChange={(e: any) => {
                              updateData({
                                key: [e.target.name, [item], "endTime"],
                                value: e.target.value,
                              });
                            }}
                            name="openHours"
                          />
                        </Form.Group>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </Col>
          <div style={{ textAlign: "end", padding: "0 30px 20px " }}>
            <button type="submit" className={cx.themeBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </Row>
    </Modal>
  );
};

export default EditBusiness;
