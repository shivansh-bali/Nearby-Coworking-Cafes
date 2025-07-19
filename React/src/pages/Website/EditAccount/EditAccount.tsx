import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./EditAccount.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Container, Form, Col, Row } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import ResetPassword from "../../../components/Website/Modals/ResetPassword";
import { PhoneNumber } from "../../../components/Website";
import { Radio } from "../../../components/Website/Forms";
import { changeUpdateData, profile, updateDetails, } from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";

const EditAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);

  const [showPopup, setPopupShow] = useState(false);
  const handlePopupClose = () => setPopupShow(false);
  const handlePopupShow = () => setPopupShow(true);
  const [err, setErr] = useState("");
  const [name, setName] = useState({
    fname: profile?.data?.name?.split(" ")[0],
    lname: profile?.data?.name?.split(" ")?.slice(1),
  });

  const [fields, setFields] = useState<any>({
    name: `${name.fname} ${name.lname}`,
    gender: profile?.data?.gender,
    nameInProfile: profile?.data?.nameInProfile,
    mobileNumber: profile?.data?.mobileNumber,
    dob: profile?.data?.dob,
    currentPassword: profile?.data?.currentPassword,
    defaultAudience: profile?.data?.defaultAudience,
  });

  const fillFields = (key: any, value: any) => {
    setFields((prev: any) => {
      return { ...prev, [key]: value };
    });
  };

  function phoneInput(value: any, data: any) {
    fillFields("mobileNumber", +value);
    fillFields("dialCode", +data?.dialCode);
    fillFields("countryCode", data?.countryCode);
  }

  useEffect(() => {
    setFields((prev: any) => {
      return { ...prev, name: `${name.fname} ${name.lname}` };
    });
  }, [name]);

  useEffect(() => {
    if (profileState.updateState) {
      dispatch(changeUpdateData());
    }
  }, [dispatch, profileState.updateState]);

  return (
    <>
      <section
        className={`${cx.EditAccountSection} ${st.sectionPaddingBottom}`}
      >
        <Container>
          <Row>
            <Col lg={8} md={12} sm={12}>
              <div className={`${cx.backIcon}`}>
                <NavLink to={profile?`/userprofile/${profile?.data?._id}`:''}>
                  <IoIosArrowBack />
                  <span>Back to my profile</span>
                </NavLink>
              </div>
              <div className={`${cx.EditAccountBox}`}>
                <div className={`${cx.EditAccountHeading}`}>
                  <h5>Edit Account Settings</h5>
                </div>
                <div className={`${cx.EditAccountTable}`}>

                  <div className={`${cx.formBox}`}>
                    <h5 className="mb-4">Account information</h5>
                    <Form>
                      <Form.Group className={`mb-4 position-relative ${cx.emailFiled}`}>
                        <Form.Label>First name*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="First Name"
                          value={name?.fname}
                          onChange={(e: any) => {
                            setName((prev: any) => {
                              return { ...prev, fname: e.target.value };
                            })
                            setErr("")
                          }} />
                      </Form.Group>
                      <Form.Group className={`mb-4 position-relative ${cx.emailFiled}`}>
                        <Form.Label>Last name*</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Surname"
                          value={name?.lname}
                          onChange={(e: any) => {
                            setName((prev: any) => {
                              return { ...prev, lname: e.target.value };
                            })
                            setErr("")
                          }} />
                      </Form.Group>
                      <Form.Group className={`mb-4 position-relative ${cx.emailFiled}`}>
                        <Form.Label>Name in profile</Form.Label>
                        <Form.Control
                          type="type"
                          placeholder="Name in Profile"
                          value={fields?.nameInProfile}
                          onChange={(e: any) =>
                            fillFields("nameInProfile", e.target.value)
                          } />
                      </Form.Group>
                      <Form.Group className={`mb-4 position-relative ${cx.emailFiled}`}>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example"
                          required
                          defaultValue={fields?.gender}
                          onChange={(e: any) =>
                            fillFields("gender", e.target.value)
                          }>
                          <option>--- Select ---</option>
                          <option value="She / Her">She / Her</option>
                          <option value="He / Has">He / Has</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className={`mb-4 position-relative ${cx.emailFiled}`}>
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date"
                          value={fields?.dob}
                          onChange={(e: any) => {
                            fillFields("dob", e.target.value)
                          }} />
                      </Form.Group>
                      <hr />
                      <h5 className="mb-4">Contact information</h5>
                      <Form.Group
                        className={`mb-3 position-relative ${cx.emailFiled}`}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          value={profile?.data?.email}
                          disabled
                        />
                        {/* <label className={`${st.radio}`}>
                          <Radio />
                        </label> */}
                      </Form.Group>

                      <Form.Group className={`mb-4 ${cx.numberForm}`}>
                        <PhoneNumber phoneInput={phoneInput} fields={fields} />
                      </Form.Group>

                      <hr />
                      <div className={`${cx.privacyBox}`}>
                        <h5 className="mb-2">Privacy</h5>
                        <h6>Show my contact details to:</h6>
                        <p>Your default audience is set to Public, but you can always change  the audiences of your location.</p>
                        <ul>
                          <li>
                            <label className={`${st.radio}`}>
                              <Radio value="Connections" fillFields={fillFields} /> Connections
                            </label>
                          </li>
                          <li>
                            <label className={`${st.radio}`}>
                              <Radio value="Mutual Connections" fillFields={fillFields} /> Mutual Connections
                            </label>
                          </li>
                          <li>
                            <label className={`${st.radio}`}>
                              <Radio value="None" fillFields={fillFields} /> None
                            </label>
                          </li>
                        </ul>
                      </div>
                      {/* <Form.Group
                        className={`mb-3 position-relative ${st.formBox}`}
                      >
                        <Form.Label>Current Password</Form.Label>
                        <div className="position-relative">
                          <input
                            className="form-control"
                            placeholder="Your password"
                            type="password" />
                          <AiFillEye className={`${st.eyeIcon}`} />
                          <AiFillEyeInvisible className={`${st.eyeIcon}`} />
                        </div>

                      </Form.Group> */}

                      <div className={`${cx.primaryEmail}`}>
                        <NavLink to="#" className={`${cx.resetPasswordBtn}`} onClick={handlePopupShow}>
                          Reset my password
                        </NavLink>
                        <NavLink to="/delete-account" className={`btn ${cx.deleteBtn}`}>
                          Delete My Account
                        </NavLink>
                      </div>

                      <p style={{ color: "red" }}>{err}</p>
                      <Col md={12} className="text-end">
                        <button className={`btn ${cx.saveBtn}`}
                          onClick={(e: any) => {
                            e.preventDefault();
                            if (name?.fname?.trim() && name?.lname !== "") {
                              dispatch(updateDetails(fields));
                            } else {
                              setErr("First name and last name is required")
                            }
                          }}>
                          Save
                        </button>
                      </Col>
                    </Form>
                  </div>

                  {/* <div className={`${cx.locationSettings}`}>
                    <h5>Location Settings</h5>

                    <div className={`${cx.locationText}`}>
                      <p>
                        Would you like to allow us to access your current
                        location?
                      </p>
                      <YesNo />
                    </div> */}

                  {/* <div className={`mt-4 ${cx.locationSettings}`}>
                      <h5>Facebook Setting</h5>
                      <p>
                        If you have a Facebook account, you might be using it to
                        personalize your Sync experience. You can change this
                        settings at any time.
                      </p>
                      <div className={`${cx.facebookIcon}`}>
                        <img src={FaceBook} alt="facebook" />
                        <h6>Facebook Connect</h6>
                      </div>
                      <p>
                        Your Facebook Connect status: <span> Connected</span>
                      </p>

                      <div className={`${cx.disConnect}`}>
                        <NavLink to="#">Disconnect</NavLink>
                      </div>
                    </div> */}

                  {/* <div className={`${cx.checkBoxSection}`}>
                      <div className={`${cx.checkBox}`}>
                        <label className={`${st.checkbox}`}>
                          <Checkbox />
                          <p>
                            Show information about your Facebook friends while
                            you browse Sync
                          </p>
                        </label>
                      </div>
                    </div> */}
                   {/* </div>  */}
                  {/* <div className={` ${cx.btnSubmit}`}>
                    <button className={`btn ${st.btn2}`}>Save</button>
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ResetPassword
        showPopup={showPopup}
        handlePopupClose={handlePopupClose}
        handlePopupShow={handlePopupShow}
      />
    </>
  );
};

export default EditAccount;
