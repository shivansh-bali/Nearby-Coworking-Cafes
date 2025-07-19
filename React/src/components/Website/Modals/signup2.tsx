import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Modal, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import EditContactInformation from "./EditContactInformation";
// import { Checkbox } from "../Forms";
import { changeUpdateOnceData, profile, updateonce } from "../../../redux_toolkit/reducer/profileReducer";
// import { Country, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import PinnedMap from "./PinnedMap";
import {intrestOptions} from "../../../constant"
const Signup2 = (props: any) => {
    let { lookshow2, handlelookClose2, checkSignup } = props;
    const dispatch = useDispatch();
    const profileState = useSelector((state: any) => state.profileReducer);
    const [editshow, setEditShow] = useState(false);
    const [err, setErr] = useState("");
    const handleeditClose = () => setEditShow(false);
    // const handleeditShow = () => setEditShow(true);
    // const [allCountries, setAllCountries] = useState(Country.getAllCountries());
    // const [allCities, setAllCities] = useState<any>();

    const [lookshow, setLookshow] = useState(false);
    const handlelookClose = () => {
        setLookshow(false);
    };
    const handlelookOpen = () => setLookshow(true);

    const [fields, setFields] = useState<any>({
        email: props?.email,
        headline: profile?.data?.headline,
        gender: profile?.data?.gender,
        companyName: profile?.data?.companyName,
        industry: profile?.data?.industry,
        showCompany: profile?.data?.showCompany,
        schoolName: profile?.data?.schoolName,
        showEducation: profile?.data?.showEducation,
        country: profile?.data?.country,
        postalCode: profile?.data?.postalCode,
        city: profile?.data?.city,
        interest: profile?.data?.interest,
    });
    function fill() {

        setFields({
            headline: profile?.data?.headline,
            email: props?.email,
            gender: profile?.data?.gender,
            companyName: profile?.data?.companyName,
            // position: profile?.data?.position,
            industry: profile?.data?.industry,
            showCompany: profile?.data?.showCompany,
            schoolName: profile?.data?.schoolName,
            showEducation: profile?.data?.showEducation,
            country: profile?.data?.country,
            postalCode: profile?.data?.postalCode,
            city: profile?.data?.city,
            interest: profile?.data?.interest,
        });
    }
    useEffect(() => {
        setFields({
            headline: profile?.data?.headline,
            gender: profile?.data?.gender,
            email: props?.email,
            companyName: profile?.data?.companyName,
            // position: profile?.data?.position,
            industry: profile?.data?.industry,
            showCompany: profile?.data?.showCompany,
            schoolName: profile?.data?.schoolName,
            showEducation: profile?.data?.showEducation,
            country: profile?.data?.country,
            postalCode: profile?.data?.postalCode,
            city: profile?.data?.city,
            interest: profile?.data?.interest,
        });
    }, [props?.email, profileState.profileState]);
    // useEffect(() => {
    //     setFields((prev: any) => {
    //         return { ...prev, name: `${name.fname} ${name.lname}` };
    //     });
    // }, [name]);

    // useEffect(() => {
    //     if (profile?.data?.country !== undefined || profile?.data?.country !== "") {
    //         setAllCities(
    //             City.getCitiesOfCountry(profile?.data?.country?.split("-")[1])
    //         );
    //     }
    //     setAllCountries(Country.getAllCountries());
    // }, []);

    const fillFields = (key: any, value: any) => {
        setFields((prev: any) => {
            return { ...prev, [key]: value };
        });
    };
    const [isClick, setIsClick] = useState(false);
    useEffect(() => {
        if (profileState.updateOnceState > 0 && isClick===true) {
            dispatch(changeUpdateOnceData());
            setIsClick(false)
            handlelookClose2();
            if(checkSignup===""){
            handlelookOpen();
            }
        }
    }, [dispatch, checkSignup, handlelookClose2, profileState.updateOnceState, isClick]);

  

    return (
        <>
            <Modal
                centered
                scrollable
                show={lookshow2}
                onHide={() => {
                    handlelookClose2();
                    fill();
                    if(checkSignup===""){
            handlelookOpen();
            }
                }}
                className={`${m.modalCts} ${m.modalMin}`}
            >
                <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
                    <Modal.Title>Tell our community what you're interested in! </Modal.Title>
                    <button
                        className={`${m.closeIcon}`}
                        title="Close"
                        onClick={() => {
                            handlelookClose2();
                            fill();
                            setErr('')
                           if(checkSignup===""){
            handlelookOpen();
            }
                        }}
                        style={{ right: "9px", top: "15px" }}
                    >
                        <MdClose />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${m.formContact}`}>
                        {/* <p className="mb-4">* Answer required</p> */}
                        <div className={`${m.formBox}`}>
                            <Form>

                                {/* <Form.Group className="mb-4 position-relative">
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

                                <Form.Group className="mb-4 mt-4 position-relative">
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Select
                                        required
                                        defaultValue={fields?.industry}
                                        onChange={(e: any) =>
                                            fillFields("industry", e.target.value)
                                        }>

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
                                <Form.Group className="mb-4 mt-3 position-relative">
                                    <Form.Select
                                        required
                                        defaultValue={fields?.country}
                                        onChange={(e: any) => {
                                            fillFields("country", e.target.value);
                                            const isoCode = e.target.value?.split("-");
                                            setAllCities(City.getCitiesOfCountry(isoCode[1]));
                                        }}
                                    >
                                        <option value="">Select Country / Region*</option>
                                        {allCountries?.map((item: any, index: number) => {
                                            return (
                                                <option value={`${item?.name}-${item?.isoCode}`}>
                                                    {item?.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4  position-relative">
                                    <Form.Select
                                        required
                                        defaultValue={fields?.city}
                                        onChange={(e: any) => fillFields("city", e.target.value)}
                                    >
                                        <option value="">City</option>
                                        {allCities?.map((item: any, index: number) => {
                                            return (
                                                <option value={`${item?.name}-${item?.countryCode}`}>
                                                    {item?.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group> */}

                                <p>Choose the topics you're most interested in.</p>
                                <ul className={`${m.intrestSelect}`}>
                                    {
                                        intrestOptions?.map((item: any, index: number) => {
                                            return <li style={{ "padding": "6px 15px" }} onClick={() => {
                                                if (fields?.interest?.some((e: any) => e === item?.value)) {
                                                    const indexValue = fields?.interest?.indexOf(item?.value)
                                                    fields?.interest?.splice(indexValue, 1)
                                                    fillFields("interest", [...fields?.interest])
                                                } else {
                                                    if (fields?.interest?.length > 0) {
                                                        fillFields("interest", [...fields?.interest, item?.value])
                                                    } else {
                                                        fillFields("interest", [item?.value])
                                                    }
                                                }
                                            }} key={`${index}`} className={fields?.interest?.some((e: any) => e === item?.value) ? `${m.active}` : ""}>{item?.value}</li>
                                        })
                                    }
                                </ul>

                                <p style={{ color: "red" }}>{err}</p>
                                <Col lg={12} className="mt-4 text-end">
                                    <div className={` ${m.btnSubmit}`}>
                                        <button
                                            className={`btn ${st.btn2} ${st.active2}`}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                // if (name?.fname?.trim() && name?.lname !== "") {
                                                dispatch(updateonce(fields));
                                                setIsClick(true)
                                                // } else {
                                                //     setErr("First name and last name is required")
                                                // }
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
            <PinnedMap
                lookshow={lookshow}
                handlelookClose={handlelookClose}
                popupMessage={props.popupMessage}
                handlelookOpen={handlelookOpen}
            />
        </>
    );
};

export default Signup2;