import React, { useEffect, useState } from "react";
import cx from "./Cafeform.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Form, Col, Row } from "react-bootstrap";
import { cafeFormHeader } from "../../../assets/images";
import {} from "..";
import { Checkbox, Radio } from "../../../components/Website/Forms";
import { NavLink } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import LookCorrectM from "../../../components/Website/Modals/LookCorrectM";

const Cafeform = (props: any) => {

  
const [lookshow, setlookShow] = useState(false);
const handlelookClose = () => setlookShow(false);
const handlelookShow = () => setlookShow(true);

  const [nextState, setNextState] = useState({
    firstStep: true,
    secondStep: false,
    thirdStep: false
  })
  const [isShow, setIsShow] = useState(true);
  const showContent = () => setIsShow(true);
  const hideContent = () => setIsShow(false)
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[nextState])
  return (
    <>
      <div className={`${cx.topbox}`}> </div>
      <div className={`${cx.spaceBox}`}>
      <section className={`${cx.bannertop}`}>
        <img src={cafeFormHeader} alt="" />

        <Container>
          <Row>
            <Col lg={12} md={12} className={` ${cx.contenttop1}  `}>
              <div className={`${cx.contenttop}`}>
                <h1>expand your reach</h1>
                <p>Become a remote work hub, on your terms</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      </div>
      <section className={`${cx.secationText2}`}>
        <Container>
          {
            nextState.firstStep===true &&  <Row>
            <Col lg={12}>
              <div className="">
                <div className={`${cx.texttop} mt-5`}>
                  <h3>Know a cool place to work from? Add it to Sync!</h3>
                  <p className={`${cx.p} mt-3`}>
                    Thanks for recommending a new place to work from. Your
                    contributions are making the Sync community stronger. <br />
                    To get started, please tell us a bit more about the place.
                  </p>
                </div>
                <div className={`${cx.content} mt-4`}>
                  <h3>
                    Are you the owner, employee, or official representative of
                    this place?
                  </h3>
                </div>

                <div className={`${cx.btnGroup}`}>
                  <button className={`btn ${cx.actionBtn}`} onClick={showContent}>Yes</button>

                  <button className={`btn ${cx.actionBtn}`} onClick={hideContent}>No</button>
                </div>
                {isShow && <>
                <div className={`${cx.content} mt-4`}>
                  <h3>Does this cafe already have a listing on Sync Remote?</h3>
                </div>
                <div className={`${cx.btnGroup}`}>
                  <button className={`btn ${cx.actionBtn}`} >Yes</button>

                  <button className={`btn ${cx.actionBtn}`} >No</button>
                </div>
                <div className={`mt-4`}>
                  <h4>What is your role?</h4>
                  <Col lg={5}>
                    <div className={`${cx.formBox}`}>
                      <Form.Group className="position-relative">
                        <Form.Label>
                          Role
                          </Form.Label>
                      <Form.Select required>
                      <option value="Owner">
                        Owner
                        </option>
                        <option value="Manager">Manager</option>
                        <option value="Guest Services">Guest Services</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                     
                      </Form.Group>
                    </div>
                  </Col>
                </div>
                <div className={`${cx.inputtext} mt-4`}>
                  <h4>Is this place currently open?</h4>
                  <div className={`${cx.btnGroup}`}>
                    <button className={`btn ${cx.actionBtn}`} >Yes</button>

                    <button className={`btn ${cx.actionBtn}`}>No</button>
                  </div>
                </div>
                </>
                }
                

                <div className={` mt-5`}>
                  <NavLink to="#" className={`btn ${st.btn2}`} onClick={()=>{
                    setNextState((prev:any)=>{
                      return {...prev, firstStep: false, secondStep: true}
                    })
                  }}>
                    Next
                  </NavLink>
                </div>
              </div>
            </Col>
          </Row>
          }
         
{
  nextState.secondStep===true && <Row>
  <Col lg={12}>
    <div className="">
      <Row>
        <div className={`${cx.texttop} mt-5`}>
          <h3>How can we find this place?</h3>
        </div>
        <div className={`${cx.content} mt-4`}>
          <h3>Name & Description</h3>
        </div>
        <Col lg={6}>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-3 position-relative" >
            <Form.Label>Name of the cafe</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of the cafe*"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-3 position-relative">
            <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description of the cafe (Optional)"
                style={{ minHeight: "200px" }}
              />
            </Form.Group>
          </div>
        </Col>

        <div className={`${cx.content} mt-4`}>
          <h3>Address</h3>
        </div>
        <Col lg={6}>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Search City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search City, Town, State, Province, Region"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country (Optional)"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Street address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street address"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Additional address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Additional address (Optional)"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>

           <Form.Group className="mb-4 position-relative" >
            <Form.Label>Postal Code  (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Postal Code (Optional)"
              />
            </Form.Group>
          </div>
        </Col>

        <div className={`${cx.content} mt-4`}>
          <h3>Contact information</h3>
        </div>
        <Col lg={6}>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Phone Number" />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Email address (Optional)</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address (Optional)"
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>Website (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Website (Optional)"
              />
            </Form.Group>
          </div>
        </Col>
      </Row>

      <div className={`mt-5`}>
        <NavLink to="#" className={`${cx.backLink}`}  onClick={()=>{
                    setNextState((prev:any)=>{
                      return {...prev, firstStep: true, secondStep: false}
                    })
                  }}>
          Back
        </NavLink>
        <NavLink to="#" className={`btn ${st.btn2}`}  onClick={()=>{
                    setNextState((prev:any)=>{
                      return {...prev, secondStep: false, thirdStep: true}
                    })
                  }}>
          Continue
        </NavLink>
      </div>
    </div>
  </Col>
</Row>
}
          
{
  nextState.thirdStep===true && <Row>
  <Col lg={12}>
    <div className="">
      <Row>
        <div className={`${cx.texttop} mt-5`}>
          <h3>Tell us a bit more!</h3>
        </div>
        <div className={`${cx.content} mt-4`}>
          <h3>Operating hours</h3>
        </div>
        <Col lg={6}>
          <Row className="align-items-center mb-4">
            <Col lg={5}>
              <div className={`${cx.formBox}`}>
                <Form.Group>
                  <Form.Control type="text" placeholder="00:00" />
                </Form.Group>
              </div>
            </Col>
            <Col lg={2} className="text-center">
              -
            </Col>
            <Col lg={5}>
              <div className={`${cx.formBox}`}>
                <Form.Group>
                  <Form.Control type="text" placeholder="00:00" />
                </Form.Group>
              </div>
            </Col>
          </Row>
          <div className={`${cx.formBox}`}>
          <Form.Group className="mb-4 position-relative" >
            <Form.Label>  Time limit for customers with laptop (If any)</Form.Label>
            
              <Form.Select required>
                <option value="">Select an Item</option>
                <option value="1">Item 1</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-4 position-relative" >
              <Form.Label>
                Minimum amount customers must spend to work from your
                business (If Any)
              </Form.Label>
              <Form.Select required>
                <option value="">Select</option>
                <option value="1">Option 1</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-4 ">
              <label style={{padding:"12px 4px", fontSize:"14px"}}>
                Rate the amount of charger outlets available from 1-5
                (5 being the best)
              </label>
              <ul className={`${cx.amountRate}`}>
                <li>
                  <button>1</button>
                </li>
                <li>
                  <button>2</button>
                </li>
                <li>
                  <button>3</button>
                </li>
                <li>
                  <button>4</button>
                </li>
                <li>
                  <button>5</button>
                </li>
              </ul>
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-4 position-relative">
              <Form.Label> Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Additional description (Optional)"
                rows={6}
                style={{ minHeight: "200px" }}
              />
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <label style={{padding:"10px 4px", fontSize:"14px"}}>Free wifi?</label>
            <Form.Group>
              <div className="d-flex mb-3">
                <label className={`${cx.radioCheckbox} ${st.radio}`}>
                  <Radio /> Yes
                </label>
                <label className={`${cx.radioCheckbox} ${st.radio}`}>
                  <Radio /> No
                </label>
                <label className={`${cx.radioCheckbox} ${st.radio}`}>
                  <Radio /> For customers only
                </label>
              </div>
            </Form.Group>
          </div>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-3">
              <label style={{padding:"12px 4px", fontSize:"14px"}}>Is the wifi fast?</label>
              <ul className={`${cx.amountRate}`}>
                <li>
                  <button>1</button>
                </li>
                <li>
                  <button>2</button>
                </li>
                <li>
                  <button>3</button>
                </li>
                <li>
                  <button>4</button>
                </li>
                <li>
                  <button>5</button>
                </li>
              </ul>
            </Form.Group>
          </div>
        </Col>
        <div className={`${cx.content} mt-5`}>
          <h3>Describe the atmosphere</h3>
        </div>
        
        <Col lg={6}>
          <div className={`${cx.formBox}`}>
            <Form.Group className="mb-4 position-relative">
              <Form.Label>Describe</Form.Label>
          
              <Form.Control
                as="textarea"
                placeholder="Is it a  quiet or noisy environment? is it a good place for customers to take meetings? etc.."
                rows={6}
                style={{ minHeight: "200px" }}
              />
            </Form.Group>
          </div>
        </Col>
        
        <div className={`${cx.content} mt-5`}>
          <h3>Upload photos of your business</h3>
        </div>

        <Col lg={6}>
          <div className={`${cx.formBox}`}>
            <div className={`${cx.upload_profile}`} >
              <div className={`${cx.upload_profile_icon} position-relative`}>
                <FiUpload className={`${cx.icon}`} />
              <p>Upload photos of the place if you have any!</p>
              </div>
            </div>
            <p className={`${cx.extaction}`}>Accepted file types: .jpg and .png only (Less than 200kb)</p>
            <button className={`btn ${st.btn2} ${st.uploadBtn} ${cx.fileUpload}`}>Upload
            <input type="file" /></button>
          </div>

          <ul className={`${cx.policyList}`}>
            <li>
              <label className={`${st.checkbox}`}>
              <Checkbox />
              Get notified by email about new reviews, best practices, and more to help you improve your online reputation and build your business.
              </label>
            </li>

            <h5>Please click the statements below to indicate you understand and accept these terms.</h5>

            
            <li>
              <label className={`${st.checkbox}`}>
              <Checkbox />I certify that I am an authorized representative or affiliate of this establishment and have the authority to register as a business representative. The information I have entered into this form is neither false nor fraudulent. I also understand that Sync Remote may disclose my name and affiliation to other verified representatives of this establishment.</label>
            </li>
            <li>
              <label className={`${st.checkbox}`}>
              <Checkbox />I have read and accept Sync Remote’s Terms of Use and Privacy Policy.</label></li>
          </ul>
        </Col>

      </Row>

      <div className={`mt-5`}>
        <NavLink to="#" className={`${cx.backLink}`}  onClick={()=>{
                    setNextState((prev:any)=>{
                      return {...prev, secondStep: true, thirdStep: false}
                    })
                  }}>
          Back
        </NavLink>
        <NavLink to="#" className={`btn ${st.btn2}`} onClick={handlelookShow}>
          Continue
        </NavLink>
      </div>
    </div>
  </Col>
</Row>
}
          
        </Container>
      </section>
      <LookCorrectM  lookshow={lookshow} handlelookClose={handlelookClose}/>
    </>
  );
};
export default Cafeform;
