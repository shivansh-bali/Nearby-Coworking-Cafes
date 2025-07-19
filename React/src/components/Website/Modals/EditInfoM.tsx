import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Modal, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import EditContactInformation from "./EditContactInformation";
import { Checkbox } from "../Forms";
import { changeUpdateData, profile, updateDetails, } from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import {intrestOptions} from "../../../constant"
const EditinfoM = (props: any) => {
  let { show, handleClose } = props;
  const dispatch = useDispatch();
  const profileState = useSelector((state: any) => state.profileReducer);
  const [editshow, setEditShow] = useState(false);
  const [err, setErr] = useState("");
  const handleeditClose = () => setEditShow(false);
  // const handleeditShow = () => setEditShow(true);
  const [name, setName] = useState({
    fname: profile?.data?.name?.split(" ")[0],
    lname: profile?.data?.name?.split(" ")[1],
  });


  const [fields, setFields] = useState<any>({
    name: `${name.fname} ${name.lname}`,
    headline: profile?.data?.headline,
    gender: profile?.data?.gender,
    companyName: profile?.data?.companyName,
    industry: profile?.data?.industry,
    showCompany: profile?.data?.showCompany,
    schoolName: profile?.data?.schoolName,
    showEducation: profile?.data?.showEducation,
    postalCode: profile?.data?.postalCode,
    city: profile?.data?.city,
    interest: profile?.data?.interest,
  });
  function fill() {
    setName({
      fname: profile?.data?.name?.split(" ")[0],
      lname: profile?.data?.name?.split(" ")[1],
    });

    setFields({
      name: `${name.fname?.trim()} ${name.lname}`,
      headline: profile?.data?.headline,
      gender: profile?.data?.gender,
      companyName: profile?.data?.companyName,
      industry: profile?.data?.industry,
      showCompany: profile?.data?.showCompany,
      schoolName: profile?.data?.schoolName,
      showEducation: profile?.data?.showEducation,
      postalCode: profile?.data?.postalCode,
      city: profile?.data?.city,
      interest: profile?.data?.interest,
    });
  }
  useEffect(() => {
    setFields({
      name: `${name.fname} ${name.lname}`,
      headline: profile?.data?.headline,
      gender: profile?.data?.gender,
      companyName: profile?.data?.companyName,
      industry: profile?.data?.industry,
      showCompany: profile?.data?.showCompany,
      schoolName: profile?.data?.schoolName,
      showEducation: profile?.data?.showEducation,
      postalCode: profile?.data?.postalCode,
      city: profile?.data?.city,
      interest: profile?.data?.interest,
    });
  }, [name, profileState.profileState]);
  useEffect(() => {
    setFields((prev: any) => {
      return { ...prev, name: `${name.fname} ${name.lname}` };
    });
  }, [name]);
  useEffect(() => {
    setName({
      fname: profile?.data?.name?.split(" ")[0],
      lname: profile?.data?.name?.split(" ")?.slice(1),
    });
  }, [profileState.profileState]);

  const fillFields = (key: any, value: any) => {
    setFields((prev: any) => {
      return { ...prev, [key]: value };
    });
  };
  useEffect(() => {
    if (profileState.updateState) {
      handleClose();
      dispatch(changeUpdateData());
    }
  }, [dispatch, handleClose, profileState.updateState]);

  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={() => {
          handleClose();
          fill();
        }}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>Edit Intro</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleClose();
              fill();
              setErr('')
            }}
            style={{ right: "9px", top: "15px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <p className="mb-4">* Answer required</p>
            <div className={`${m.formBox}`}>
              <Form>
                <Form.Group className="mb-4 position-relative">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    type="type"
                    placeholder="First Name*"
                    value={name?.fname}
                    onChange={(e: any) => {
                      setName((prev: any) => {
                        return { ...prev, fname: e.target.value };
                      })
                      setErr("")
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    type="type"
                    placeholder="Surname*"
                    value={name?.lname}
                    onChange={(e: any) => {
                      setName((prev: any) => {
                        return { ...prev, lname: e.target.value };
                      })
                      setErr("")
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4 position-relative">
                  <Form.Label>Headline</Form.Label>
                  <Form.Control
                    type="type"
                    placeholder="Headline"
                    value={fields?.headline}
                    onChange={(e: any) =>
                      fillFields("headline", e.target.value)
                    }
                  />
                </Form.Group>

                {/* <Form.Group className="mb-4 position-relative">
                  <Form.Label>Gender Pronouns</Form.Label>
                  <Form.Select required>
                    <option value="">Select Item</option>
                    <option value="He">He</option>
                    <option value="She">She</option>
                  </Form.Select>
                </Form.Group> */}

                <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>Gender Pronouns</Form.Label>
                  <Form.Select
                    required
                    defaultValue={fields?.gender}
                    onChange={(e: any) =>
                      fillFields("gender", e.target.value)
                    }>
                    <option value="">Select Item</option>
                    <option value="she/her/hers">she/her/hers</option>
                    <option value="he/him/his">he/him/his</option>
                    <option value="they/them/theirs">they/them/theirs</option>
                  </Form.Select>
                </Form.Group>

                {/* <Form.Group className="mb-4 position-relative">
                        <Form.Control as="textarea" placeholder="Type your message here" rows={3} />
                      </Form.Group> */}

                <h3>Company</h3>
                <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>Company / School</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type your company / school’s name"
                    value={fields?.companyName}
                    onChange={(e: any) =>
                      fillFields("companyName", e.target.value)
                    }
                  />
                </Form.Group>

                {/* <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Position"
                    value={fields?.position}
                    onChange={(e: any) =>
                      fillFields("position", e.target.value)
                    }
                  />
                </Form.Group> */}

                {/* <Form.Group className="mb-4 mt-4">
                  <label className={`${st.checkbox} ${m.checkboxLabel}`}>
                    <Checkbox
                      nameCheckbox={"showCompany"}
                      fillFields={fillFields}
                      checked={fields?.showCompany}
                    />{" "}
                    Show current company position in my profile
                  </label>
                </Form.Group> */}

                <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>Industry</Form.Label>
                  <Form.Select
                    required
                    defaultValue={fields?.industry}
                    onChange={(e: any) =>
                      fillFields("industry", e.target.value)
                    }
                  >
                    <option value="">Select Item</option>
                    <option value="Technology">Technology</option>
                    <option value="Food and beverage">Food and beverage</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                    <option value="Transport">Transport</option>
                    <option value="Finance">Finance</option>
                    <option value="Research">Research</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Advertising">Advertising</option>
                    <option value="Product">Product</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Capital Market">Capital Market</option>
                    <option value="Design">Design</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Law">Law</option>
                    <option value="Automation">Automation</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Startup">Startup</option>
                  </Form.Select>
                </Form.Group>

                <h3>Education</h3>
                <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>School</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type your school’s name"
                    value={fields?.schoolName}
                    onChange={(e: any) =>
                      fillFields("schoolName", e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-4 mt-4">
                  <label className={`${st.checkbox} ${m.checkboxLabel}`}>
                    <Checkbox
                      nameCheckbox={"showEducation"}
                      fillFields={fillFields}
                      checked={fields?.showEducation}
                    />{" "}
                    Show education in my intro
                  </label>
                </Form.Group>

                <h3>Location</h3>
                {/* <Form.Group className="mb-4  position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    value={fields?.postalCode}
                    className={`${m.removeArrow}`}
                    onChange={(e: any) =>
                      fillFields("postalCode", e.target.value)
                    }
                  />
                </Form.Group> */}
                <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Type your city name"
                    value={fields?.city}
                    onChange={(e: any) => fillFields("city", e.target.value)}
                  />
                </Form.Group>
                {/* <div className={` ${m.contactInfo}`}>
                  <h5>Contact info</h5>
                  <p>Add or edit your contact details, and more</p>
                  <NavLink
                    to="#"
                    onClick={() => {
                      handleeditShow();
                      handleClose();
                    }}
                  >
                    Edit contact information
                  </NavLink>
                </div> */}
                   <h3><b>Talk to me about</b></h3>
                   <p>Pick 5 things you're most interested in. These will appear on your profile for others to see.</p>
                   <ul className={`${m.intrestSelect}`}>
                    {
                      intrestOptions?.map((item:any, index:number)=> {
                        return <li style={{"padding": "6px 15px"}} onClick={()=>{
                          if(fields?.interest?.some((e:any)=>e===item?.value)){
                            const indexValue = fields?.interest?.indexOf(item?.value)
                            fields?.interest?.splice(indexValue, 1)
                            fillFields("interest", [...fields?.interest])
                          }else{
                          fillFields("interest", [...fields?.interest, item?.value])
                        }}} key={`${index}`} className={fields?.interest?.some((e:any)=>e===item?.value) ? `${m.active}`: ""}>{item?.value}</li>
                      })
                    }
                   </ul>
                {/* <Form.Group className="mb-4 mt-4 position-relative">
                  <Form.Label>Interest</Form.Label>
                  <Select className={`mb-4 mt-4 position-relative ${m.formSelect}`}
                    isMulti
                    required
                    options={intrestOptions}
                    value={fields?.interest}
                    onChange={(e: any) =>
                      fillFields("interest", e)
                    }></Select>
                </Form.Group> */}
                <p style={{ color: "red" }}>{err}</p> 
                <Col lg={12} className="mt-4 text-end">
                  <div className={` ${m.btnSubmit}`}>
                    <button
                      className={`btn ${st.btn2} ${st.active2}`}
                      onClick={(e: any) => {
                        e.preventDefault();
                        if (name?.fname?.trim() && name?.lname !== "") {
                          dispatch(updateDetails(fields));
                        } else {
                          setErr("First name and last name is required")
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditContactInformation
        editshow={editshow}
        handleeditClose={handleeditClose}
        allFields={fields}
      />
    </>
  );
};

export default EditinfoM;