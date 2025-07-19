import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "./DeleteAccount.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import m from "../../../components/Website/Modals/Modal.module.scss";

import { Container, Form, Col, Row, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { userDelete, userLogout } from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch } from "react-redux";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";


const DeleteAccount = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fields, setFields] = useState({
    reason: "",
    comment: ""
  })
  const [error, setError] = useState<any>()
  const fillFields = (key:string, value:string) => {
    setFields((prev:any)=>{
      return {...prev, [key]:value}
    })
  }
  return (
    <>

    
     <section className={`${cx.stepSection}`}>
        <Container>

          <Col md={6} className={`${cx.stepBody}`}>
            <Row>
              <Col md={12} className={`${cx.titleBox}`}>
                <h3 className="mb-4">Deactivate your account</h3>
                <h5 className={`${cx.titleIn}`}>Please help us get better and let us know why you have decided to delete your account</h5>
              </Col>
              <Col md={12}>
                <ul className={`${cx.checkListBox}`}>
                   <li>
                    <label className={`${st.radio}`}>
                      <input type="radio" name="deactivation" value="I have safety or privacy concerns." onClick={(e:any)=>{fillFields("reason", e.target.value)
                    setError("")}}/>
                      <span className={`${st.checkmark}`}></span> I have safety or privacy concerns.
                    </label>
                   </li>
                   <li>
                    <label className={`${st.radio}`}>
                      <input type="radio" name="deactivation" value="I can’t comply with Sync’s terms and conditions" onClick={(e:any)=>{fillFields("reason", e.target.value)
                    setError("")}}/>
                      <span className={`${st.checkmark}`}></span> I can’t comply with Sync’s terms and conditions
                    </label>
                   </li>
                   <li>
                    <label className={`${st.radio}`}>
                      <input type="radio" name="deactivation" value="Other" onClick={(e:any)=>{fillFields("reason", e.target.value)
                    setError("")}}/>
                      <span className={`${st.checkmark}`}></span> Other
                    </label>
                   </li>
                </ul> 
                {error}
              </Col>
              <Col md={12}>
                <Form.Group className={`${cx.formBox}`}>
                <h5 className={`${cx.titleIn} mb-3`}>Additional comments?</h5>
                  <Form.Control
                as="textarea" placeholder="Additional Comments" style={{ minHeight: "200px" }}
                onChange={(e:any)=>fillFields("comment", e.target.value)}
                />
                </Form.Group>
              </Col>

             <div className={`${cx.actionSection}`}>
            <Row>
              <Col md={12} className="col-12">
                <NavLink className={`${cx.backBtn}`} to="/edit-account">Cancel</NavLink>
                <NavLink className={`btn ${cx.nextBtn}`} to="#" style={{ minWidth:'120px' }} onClick={()=>{
                  if(fields?.reason===""){
                    setError(<p style={{color:"red"}}>This fields is required</p>)
                  }else{
                    handleShow()
                  }
                }}>Continue</NavLink>
              </Col>
            </Row>
          </div>
            </Row>
          </Col>

          

        </Container>
      </section>



      <Modal show={show} onHide={handleClose}
         className={`${m.modalCts} ${m.modalMin}`}>
        <Modal.Header style={{ border:'none' }}>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className={`${cx.popupBody}`}>
              <p>Deactivate your account</p>
              <h5>We are sorry to see you go</h5>
              <p>Before we actually delete all your data and account,  you will still be able to login to your account before 15 days. If you wish to retain your account, you can always login. If that succeeded, your account will be automatically be deleted.</p>
              <NavLink to="#" className={`btn ${cx.Ntbn}`} onClick={()=>{
                dispatch(userDelete(fields))
                dispatch(userLogout(profile?.data?._id))
              }}>I understand</NavLink>
          </div>
        </Modal.Body>
      </Modal>
      </>
  );
};

export default DeleteAccount;
