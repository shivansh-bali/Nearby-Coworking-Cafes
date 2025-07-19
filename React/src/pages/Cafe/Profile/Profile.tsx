import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import cx from "../../../pages/Cafe/Dashboard/Dashboard.module.scss";
import { myData, profile } from "../../../redux_toolkit/reducer/profileReducer";
import {
  changeUpdateCafeState,
  updateCafe,
} from "../../../redux_toolkit/reducer/cafeReducer";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafeData, setCafeData] = useState<any>({
    name: profile?.data ? profile?.data?.name : "",
    userPosition: profile?.data ? profile?.data?.userPosition : "",
    userPhone: profile?.data ? profile?.data?.userPhone : "",
  });

  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const handleData = (e: any) => {
    setCafeData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (cafeState.updateEditState > 0 || cafeState.updateCafeState > 0) {
      dispatch(myData());
      dispatch(changeUpdateCafeState());
    }
  }, [dispatch, cafeState.updateCafeState, cafeState.updateEditState]);
  return (
    <>
      <Col className={cx.dashboard}>
        <Col className={cx.buttonsContainer}>
          <button
            type="button"
            onClick={() => {
              navigate("/cafepanel");
            }}
          >
            Home
          </button>
          /
          <button type="button" className={cx.active}>
            My Profile
          </button>
        </Col>
        <h2>My Profile</h2>
        <div className={cx.businessInformation}>
          <div
            className={`d-flex justify-content-between my-2 ${cx.businessInformationTitle}`}
          >
            <h5>Personal Details</h5>
            <button onClick={() => setEditable(!editable)}>
              Edit <FaEdit style={{ marginLeft: "10px" }} />
            </button>
          </div>
          <Row>
            <Col md={4} className={`${cx.businessList}`}>
              <span>Name</span>
              <input
                className={`d-block`}
                name="name"
                type="text"
                defaultValue={cafeData?.name}
                disabled={!editable}
                onChange={(e: any) => handleData(e)}
              />
            </Col>
            <Col md={4} className={`${cx.businessList}`}>
              <span>Job Title</span>
              <input
                className={`d-block`}
                name="userPosition"
                type="text"
                defaultValue={cafeData?.userPosition}
                disabled={!editable}
                onChange={(e: any) => handleData(e)}
              />
            </Col>
            <Col md={4} className={`${cx.businessList}`}>
              <span className={`d-block`}>Phone no.</span>
              <PhoneInput
                country={"in"}
                inputProps={{
                  name: "userPhone",
                  required: true,
                  autoFocus: false,
                }}
                value={`+${cafeData?.userPhone}`}
                onChange={(e: any) =>
                  handleData({ target: { name: "userPhone", value: e } })
                }
                // onChange={(e: any) => updateData({ key: ["phone"], value: e })}
                // defaultErrorMessage="It doesn't works, why?"
                disabled={!editable}
              />
            </Col>
          </Row>
          {editable && (
            <div style={{ marginTop: "20px" }}>
              <button
                className={cx.themeBtn}
                onClick={async () => {
                  await dispatch(
                    updateCafe({ ...cafeData, _id: profile.data._id })
                  ).then((res: any) => {
                    setEditable(false);
                  });
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </Col>
    </>
  );
};

export default Profile;
