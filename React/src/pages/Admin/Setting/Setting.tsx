import React, { useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { profile_icon } from "../../../assets/images";
import { Col } from "react-bootstrap";
import cx from "./Setting.module.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";

const Setting = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(false);
  return (
    <section className={`${st.pageWrapper}`}>
      <div className={`${st.pageWrapperInside} `}>
        <Col className={cx.buttonsContainer}>
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
            className={cx.active}
            type="button"
            onClick={() => {
              navigate("/admin/users");
            }}
          >
            Settings
          </button>
          {/* /
          <button type="button" className={cx.active}>
            Username
          </button> */}
        </Col>
        <Col md={12} className={`${cx.settingContainer} p-3`}>
          <div className={`${cx.header}`}>
            {/* <img src={AdminBanner} className={`${cx.bannerImage}`} alt="" /> */}
            <div
              className={`d-flex flex-column align-items-center ${cx.userProfile}`}
            >
              <img src={profile_icon} alt="profileIcon"/>
              <div className={cx.uploadBtnWrapper}>
                <button className={cx.btn}>
                  <FaUpload style={{ color: "#ffffffba", fontSize: "14px" }} />
                </button>
                <input type="file" name="myfile" />
              </div>
            </div>
          </div>
          <Col className={`${cx.formContainer} ml-2`} md={12}>
            <h5 className="py-2">Edit details</h5>
            <form action="">
              <Col className={cx.inputField}>
                <p>First Name</p>
                <div className={`${cx.formGroup}  `}>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className={`${cx.formControl}`}
                    name="user"
                    id="user"
                    ng-model="userName"
                  />
                  <label
                    htmlFor="user"
                    className={`${cx.animatedLabel}`}
                  ></label>
                </div>
              </Col>
              <div className={cx.inputField}>
                <p>Last Name</p>
                <div className={`${cx.formGroup}  `}>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className={`${cx.formControl}`}
                    name="user"
                    id="user"
                    ng-model="userName"
                  />
                  <label
                    htmlFor="user"
                    className={`${cx.animatedLabel}`}
                  ></label>
                </div>
              </div>
              <div className={cx.inputField}>
                <p>Email</p>
                <div className={`${cx.formGroup}  `}>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className={`${cx.formControl}`}
                    name="user"
                    id="user"
                    ng-model="userName"
                  />
                  <label
                    htmlFor="user"
                    className={`${cx.animatedLabel}`}
                  ></label>
                </div>
              </div>
              <div className={cx.inputField}>
                <p>Contact Number</p>
                <div className={`${cx.formGroup}  `}>
                  <input
                    type="text"
                    placeholder="Enter here"
                    className={`${cx.formControl}`}
                    name="user"
                    id="user"
                    ng-model="userName"
                  />
                  <label
                    htmlFor="user"
                    className={`${cx.animatedLabel}`}
                  ></label>
                </div>
              </div>
              {newPassword ? (
                <div>
                  <div className={cx.inputField}>
                    <p>New Password</p>
                    <div className={`${cx.formGroup}  `}>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className={`${cx.formControl}`}
                        name="user"
                        id="user"
                        ng-model="userName"
                      />
                      <label
                        htmlFor="user"
                        className={`${cx.animatedLabel}`}
                      ></label>
                    </div>
                  </div>
                  <div className={cx.inputField}>
                    <p>Confirm Password</p>
                    <div className={`${cx.formGroup}  `}>
                      <input
                        type="text"
                        placeholder="Enter here"
                        className={`${cx.formControl}`}
                        name="user"
                        id="user"
                        ng-model="userName"
                      />
                      <label
                        htmlFor="user"
                        className={`${cx.animatedLabel}`}
                      ></label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={cx.inputField}>
                  <p>Password</p>
                  <div className={`${cx.formGroup}  `}>
                    <p
                      className={cx.changePassword}
                      onClick={() => {
                        setNewPassword(true);
                      }}
                    >
                      Change Password
                      <AiFillEdit style={{ fontSize: "16px" }} />
                    </p>
                  </div>
                </div>
              )}

              {/* <div>
                <label className={` mb-3`} htmlFor="">
                  Description
                </label>
                <div className={cx.editorContainer}>
                  <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                  />
                </div>
              </div> */}
            </form>
          </Col>

          <div className={`d-flex justify-content-end  mt-4 ${cx.dualButton} `}>
            <button type="button" className="btn btn-success m-2">
              Save
            </button>
            <button type="button" className="btn btn-secondary m-2">
              Cancel
            </button>
          </div>
        </Col>
      </div>
    </section>
  );
};

export default Setting;
