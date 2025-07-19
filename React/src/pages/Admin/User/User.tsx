import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Col, Row } from "react-bootstrap";
import cx from "./User.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationPopup from "../../../components/Admin/Modals/ConfirmationPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserStatus,
  getUser,
  userData,
} from "../../../redux_toolkit/adminReducer/userReducer";
import IconGenerator from "../../../components/Shared/IconGenerator";

const User = () => {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const userState = useSelector((state: any) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [singleUser, setSingleUser] = useState<any>();

  useEffect(() => {
    dispatch(getUser(param?.id));
  }, [dispatch, param, userState.addUserState]);
  useEffect(() => {
    setSingleUser(userData);
  }, [userState.getSingleUserState]);

  const Listitem = ({ item }: any) => {
    return (
      <div className={`d-flex align-items-center ${cx.itemWrapper}`}>
        <p>{item.key}:</p>
        <span style={{ margin: "0" }}>{item.value}</span>
      </div>
    );
  };
  return (
    <section className={` ${st.pageWrapper}`}>
      <ConfirmationPopup
        show={show}
        handleClose={handleClose}
        value={singleUser?.status}
        content="user"
        manageStatus={() => {
          dispatch(changeUserStatus(param?.id));
          handleClose();
        }}
      />
      <div className={`${st.pageWrapperInside}`}>
        <Row>
          <Col md={10} className={cx.buttonsContainer}>
            <button
              type="button"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Home
            </button>
            /
            <button
              type="button"
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              Users
            </button>
            /
            <button type="button" className={cx.active}>
              Username
            </button>
          </Col>
          <Col md={2} className={cx.buttonsContainer}>
            <div className={cx.dualButtons}>
              <button
                onClick={() => {
                  handleOpen();
                }}
                style={
                  singleUser?.status
                    ? { borderColor: "#ff7272", color: "#ff7272" }
                    : {}
                }
              >
                {singleUser?.status ? " Deactivate " : " Activate "}
              </button>
            </div>
          </Col>
        </Row>

        <div
          className={`d-flex flex-column justify-content-center align-items-center ${cx.userDetailsWrapper}`}
        >
          <Col md={12} sm={12}>
            <div className={`d-flex align-items-center ${cx.userInfo}`}>
              <div>
                {singleUser?.profileImage ? (
                  <img
                    src={singleUser?.profileImage}
                    height="100px"
                    width="100px"
                    style={{ borderRadius: "50px", marginRight: " 20px" }}
                    alt="profileIcon"
                  />
                ) : (
                  <IconGenerator name={singleUser?.name} />
                )}
              </div>
              <div className={cx.userDetails}>
                <h5>{singleUser?.name}</h5> <p>{singleUser?.email}</p>
                <p>
                  {singleUser?.position &&
                    singleUser?.company &&
                    `${singleUser?.position} @ ${singleUser?.company} .
                  ${singleUser?.city} , ${singleUser?.country}`}
                </p>
                {/* <span> connections</span> */}
              </div>
            </div>
          </Col>
          <Col
            md={12}
            className={`d-flex justify-content-between gap-2 ${cx.userDescription}`}
          >
            <Col md={6} sm={12}>
              <div className={`${cx.aboutDetails} ${cx.userInfo}`}>
                <h4>Profile details</h4>
                <Listitem
                  item={{
                    key: "Birthday",

                    value:
                      singleUser?.birthdayDate && singleUser?.birthdayMonth
                        ? `${singleUser?.birthdayDate} / ${singleUser?.birthdayMonth}`
                        : "",
                  }}
                />
                <Listitem
                  item={{ key: "Country", value: singleUser?.country }}
                />
                <Listitem
                  item={{
                    key: "Contact No",
                    value: singleUser?.mobileNumber,
                  }}
                />
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Company details
                </p>
                <Listitem
                  item={{
                    key: "School/Company name",
                    value: singleUser?.companyName
                      ? singleUser?.companyName
                      : singleUser?.schoolName,
                  }}
                />
                <Listitem
                  item={{ key: "Position", value: singleUser?.position }}
                />
                <p className={cx.detailsCategory}>Address details</p>
                <Listitem
                  item={{
                    key: "Address",
                    value: "Address",
                  }}
                />
                <Listitem item={{ key: "City", value: singleUser?.city }} />
                <Listitem
                  item={{ key: "Postal Code", value: singleUser?.postalCode }}
                />
              </div>
            </Col>
            <Col md={6} sm={12}>
              <div className={`${cx.aboutDetails}  ${cx.userInfo}`}>
                <h4>About</h4>
                <p>{singleUser?.about}</p>
                {/* <p>
                  As a Marketing Manager, I am a highly motivated and
                  results-driven professional with extensive experience in
                  developing and implementing successful marketing strategies. I
                  am skilled in identifying market trends and consumer behavior,
                  and I am dedicated to utilizing this knowledge to drive sales
                  and revenue growth.
                </p>
                <p>
                  I am committed to staying up-to-date with the latest industry
                  trends and continuously expanding my knowledge to create
                  innovative and effective marketing strategies. I am passionate
                  about achieving business objectives and exceeding
                  expectations, and I am confident in my ability to drive
                  success for any organization.
                </p> */}
                {/* <img src={BlogImage} alt="" width="100%" /> */}
              </div>
            </Col>
          </Col>
        </div>
      </div>
    </section>
  );
};

export default User;
