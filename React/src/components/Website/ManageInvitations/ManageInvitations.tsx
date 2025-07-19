import React, { useEffect, useState } from "react";
import cx from "./ManageInvitations.module.scss";

import { Container, Col, Row, Nav, Tab } from "react-bootstrap";
import { PeopleSidebar } from "../../../components/Website";
import { profile_icon } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINT, cafeDataFunc, profile } from "../../../redux_toolkit/reducer/profileReducer";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import IconGenerator from "../../Shared/IconGenerator";
import ConfirmCancle from "../Modals/ConfirmCancel";

let socket: any 
socket = io(ENDPOINT);

const ManageInvitations = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [requestUsers, setRequestUsers] = useState<any[]>([])
  const [sendUsers, setSendUsers] = useState<any[]>([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cancelItem, setCancelItem] = useState<any>()
  const profileState = useSelector((state: any) => state.profileReducer)
  useEffect(() => {
    if(profile?.data?._id){
    setRequestUsers(profile?.data?.requestConnection)
    setSendUsers(profile?.data?.sendConnection)
   }
  }, [profileState.profileState])
  useEffect(() => {
    socket.on("getConnection", (data: any) => {
      if(data?._id === profile?.data?._id){
        dispatch(cafeDataFunc(data))
      }
    });
    return () => {
      socket.off("getConnection");
    };
  });
  const cancelFunc = () => {
    socket.emit(
      "cancelConnection",
      cancelItem?._id,
      profile?.data?._id,
      (data: any) => {
        dispatch(cafeDataFunc(data))
      }
    );
  }
  return (
    <>
      <section className={`${cx.peopleSection}`}>
        <Container>
          <Row>
            <Col lg={4}>
              <PeopleSidebar allUserConnection={profile?.data?.connection}/>
            </Col>

            <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>Manage invitations</h5>
                </div>

                <Tab.Container defaultActiveKey="manageTab1">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="manageTab1">Received ({requestUsers?.length})</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="manageTab2">Sent ({sendUsers?.length})</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="manageTab1">
                      <div className={`${cx.inviationsCardBody}`}>
                        {/* <div className={`${cx.noDatafound}`}>
                        <img src={noDataFound} alt="img" />
                        <h5>You don’t have  new invitations</h5>
                      </div> */}

                        <ul>
                        {
                      requestUsers?.map((item:any, index:number) => {
                        return (
                          <li className={`${cx.inviationList}`} key={`${index}`}>
                          <div className={`${cx.inviationListLeft}`}>
                          {
                          item?.profileImage ? <img
                            src={
                              item?.profileImage
                                ? item?.profileImage
                                : profile_icon
                            }
                            className={` ${cx.profileImg}`}
                            alt="profile"
                            onClick={()=>navigate(`/userprofile/${item?._id}`)}
                          /> :
                          <div onClick={()=>navigate(`/userprofile/${item?._id}`)}> <IconGenerator name={item?.name} data={"true"}/> </div>
                        }
                            <h5>
                              <p style={{cursor:"pointer"}} onClick={()=>navigate(`/userprofile/${item?._id}`)}>{item?.name}</p>{" "}
                              {item?.schoolName && <span>Student @ {item?.schoolName}</span>}
                            </h5>
                          </div>
                          <div className={`${cx.inviationListRight}`}>
                            <button className={`btn ${cx.ignoreBtn}`} onClick={() => {
              socket.emit(
                "ignoreConnection",
                item?._id,
                profile?.data?._id,
                (data: any) => {
                  dispatch(cafeDataFunc(data))
                }
              )
            }}>
                              Ignore
                            </button>
                            <button className={`btn ${cx.acceptBtn}`} onClick={()=>{
                               socket.emit(
                                "acceptConnection",
                                item?._id,
                                profile?.data?._id,
                                (data: any) => {
                                  dispatch(cafeDataFunc(data))
                                }
                              );
                            }}>
                              Accept
                            </button>
                          </div>
                        </li>
                        )
                      })
                    }
                        </ul>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="manageTab2">
                      <div className={`${cx.inviationsCardBody}`}>
                        <ul>
                        {
                      sendUsers?.map((item:any, index:number) => {
                        return (
                          <li className={`${cx.inviationList}`} key={`${index}`}>
                          <div className={`${cx.inviationListLeft}`}>
                          {
                          item?.profileImage ? <img
                            src={
                              item?.profileImage
                                ? item?.profileImage
                                : profile_icon
                            }
                            className={` ${cx.profileImg}`}
                            alt="profile"
                            onClick={()=>navigate(`/userprofile/${item?._id}`)}
                          /> :
                          <div onClick={()=>navigate(`/userprofile/${item?._id}`)}> <IconGenerator name={item?.name} data={"true"}/> </div>
                        }
                            <h5>
                              <p>{item?.name}</p>{" "}
                              {item?.schoolName && <span>Student @ {item?.schoolName}</span>}
                            </h5>
                          </div>
                          <div className={`${cx.inviationListRight}`}>
                              <button className={`btn ${cx.ignoreBtn}`} onClick={() => {
                                setCancelItem(item)
handleShow()
            }}>
                                Pending request
                              </button>
                            </div>
                        </li>
                        )
                      })
                    }
                        </ul>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ConfirmCancle show={show} handleClose={handleClose} cancelFunc={cancelFunc}/>
    </>
  );
};

export default ManageInvitations;
