import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cx from "./People.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { PeopleCard, PeopleSidebar } from "../../../components/Website";
import { favicon, profile_icon } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  ENDPOINT,
  cafeDataFunc,
  // changePinnedCafe,
  // changeSameInterest,
  // changeSchoolData,
  // pinnedCafe,
  profile,
  // sameInterest,
  // sameInterestUsers,
  // samePinnedData,
  // sameSchoolData,
  // schoolData,
} from "../../../redux_toolkit/reducer/profileReducer";
import io from "socket.io-client";
import {
  allUserData,
  allUserDataList,
} from "../../../redux_toolkit/adminReducer/userReducer";
import IconGenerator from "../../../components/Shared/IconGenerator";
import { MdSearch } from "react-icons/md";
import { ShareLocationM } from "../../../components/Website/Modals";

let socket: any;
socket = io(ENDPOINT);

const People2 = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myConnections = profile?.data?.connection.map((item: {_id: string}) => item._id)
  const profileState = useSelector((state: any) => state.profileReducer);
  const userState = useSelector((state: any) => state.userReducer);
  // const [schoolItem, setSchoolItem] = useState<any[]>([]);
  // const [pinnedItem, setPinnedItem] = useState<any[]>([]);
  const [requestUsers, setRequestUsers] = useState<any[]>([]);
  // const [allConnection, setAllConnection] = useState<any[]>([]);
  const [allUserConnection, setAllUserConnection] = useState<any[]>([]);
  const [sendRequest, setSendRequest] = useState<any[]>([]);
  const [cancelUser, setCancelUser] = useState<any[]>([]);
  const [allUserList, setAllUserList] = useState<any[]>([]);
  // const [interestUsers, setInterestUsers] = useState<any[]>([])
  const [search, setSearch] = useState("")
  // const [searchUser, setSearchUser] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(allUserData());
  }, [dispatch]);

  useEffect(() => {
    // if (profile?.data?.schoolName) {
    //   dispatch(schoolData(profile?.data?.schoolName));
    // }
    // if (profile?.data?._id) {
      // dispatch(pinnedCafe({ pinnedCafe: profile?.data?.pinnedCafe }));
      
      // if(profile?.data?.interest?.length>0){
      //   dispatch(sameInterest({interest: profile?.data?.interest}))
      // }
    // }
    if (profile?.data?._id) {
      const myConnectionIDs = profile?.data?.connection.map((item: {_id: any;}) => item?._id)
      const isAlreadyConnected = (request:{_id:any} ) => myConnectionIDs.includes(request?._id)
      setRequestUsers(profile?.data?.requestConnection.filter((item: { _id: any; }) => !isAlreadyConnected(item)));
      // setAllConnection([
        //   ...profile?.data?.requestConnection,
      //   ...profile?.data?.connection,
      // ]);
      setSendRequest(profile?.data?.sendConnection);
      }
    }, [dispatch, profileState.profileState]);
  console.log('profile:', profile)    
  useEffect(()=>{
    if(profile?.data?._id){
      setAllUserConnection(profile?.data?.connection);
    }
  },[profileState.profileState])
  useEffect(() => {
    if (profile?.data?._id && search==="") {
      setAllUserList(allUserDataList);
    }
  }, [userState.allUserState, search, profileState.profileState]);

  useEffect(() => {
    if (profileState.schoolDataState > 0) {
      // setSchoolItem(sameSchoolData);
      // dispatch(changeSchoolData());
    }
    if (profileState.pinnedCafeState > 0) {
      // setPinnedItem(samePinnedData);
      // dispatch(changePinnedCafe());
    }
    if (profileState.sameInterestState > 0) {
      // setInterestUsers(sameInterestUsers)
      // dispatch(changeSameInterest())
    }
  }, [dispatch, profileState.schoolDataState, profileState.pinnedCafeState, profileState.sameInterestState]);

  useEffect(() => {
    socket.on("getConnection", (data: any) => {
      if (data?._id === profile?.data?._id) {
        dispatch(cafeDataFunc(data));
      }
    });
    return () => {
      socket.off("getConnection");
    };
  });
  const send = (data: any) => {
    dispatch(cafeDataFunc(data));
  };
  const cancelUserFunc = (data: string) => {
    setCancelUser((prev: any) => {
      return [...prev, data];
    });
  };
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);
  return (
    <>
      <section className={`${cx.peopleSection}`}>
        <Container>
          <Row>
            <Col lg={4}>
              <PeopleSidebar allUserConnection={allUserConnection} />
            </Col>

            <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5> Pending invitations ({requestUsers?.length})</h5>
                  <NavLink to="/manage-invitations">Manage</NavLink>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <ul>
                    {requestUsers?.map((item: any, index: number) => {
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
                              {item?.schoolName && (
                                <span>Student @ {item?.schoolName}</span>
                              )}
                            </h5>
                          </div>
                          <div className={`${cx.inviationListRight}`}>
                            <button
                              className={`btn ${cx.ignoreBtn}`}
                              onClick={() => {
                                socket.emit(
                                  "ignoreConnection",
                                  item?._id,
                                  profile?.data?._id,
                                  (data: any) => {
                                    dispatch(cafeDataFunc(data));
                                  }
                                );
                              }}
                            >
                              Ignore
                            </button>
                            <button
                              className={`btn ${cx.acceptBtn}`}
                              onClick={() => {
                                socket.emit(
                                  "acceptConnection",
                                  item?._id,
                                  profile?.data?._id,
                                  (data: any) => {
                                    dispatch(cafeDataFunc(data));
                                  }
                                );
                              }}
                            >
                              Accept
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className={`${cx.notificationStart}`}>
                  <div className={`${cx.notificationShow}`}>
                    <div className={`${cx.notificationName}`}>
                      <img src={favicon} alt="NadineLustre" />
                      <div className={`${cx.textAlign}`}>
                        <h4>Invite your friends to Sync!</h4>
                        <p>Send a link to your friends and start building connections!</p>
                      </div>
                    </div>
                    <div className={`${cx.notificationButton}`}>
                      <button className={`btn ${st.btn2} ${cx.acceptBtn}`} onClick={handlelocationShow}>
                      Send an invitation
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className={`${cx.inviationsCard} mt-4`}>
                {/* <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know from name of company</h5>
                  <NavLink to="#">See all</NavLink>
                </div> */}
                <div className={`${cx.filterOption}`}>
                  <div className={`${cx.filterOptionLeft}`} style={{ width:'100%' }}>
                    <h5>People</h5>
                    <div className={`${cx.searchBox}`}>
                      <MdSearch className={`${cx.icon}`} />
                      <input
                      type="text"
                      className={`${cx.searchForm} form-control`}
                      placeholder="Type Name..."
                      onChange={(e: any) => {
                        let connectionArray: any[] = [];
                        setSearch(e.target.value)
                        allUserDataList?.forEach((item: any) => {
                          if (
                            item?.name
                              ?.toLowerCase()
                              ?.includes(e?.target?.value?.toLowerCase()) ||
                            item?.schoolName
                              ?.toLowerCase()
                              ?.includes(e?.target?.value?.toLowerCase()) ||
                            item?.companyName
                              ?.toLowerCase()
                              ?.includes(e?.target?.value?.toLowerCase())
                          ) {
                            connectionArray.push(item);
                          }
                        });
                        setAllUserList(connectionArray);
                        if (connectionArray.length === 0) {
                          setAllUserList([]);
                        }
                        if (e.target.value === "") {
                          setAllUserList(allUserDataList);
                        }
                      }}
                    />
                    {/* <img src={filter} className={`${cx.filterIcon}`} alt="filter" /> */}
                    </div>
                  </div>
                  {/* <div className={`${cx.filterOptionRight}`}>
                    {allUserList?.length > 3 && <NavLink className={`${cx.seeAll}`} to="/all-people/all-connections">
                      See all
                    </NavLink>}
                  </div> */}
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {allUserList?.map((item: any, index: number) => {
                        return (
                          item?.name !== "Deleted User" &&
                          item?.status === true &&
                          item?._id !== profile?.data?._id &&
                          !cancelUser.some((e: any) => e === item?._id) && (
                            <Col md={4} lg={6} xl={4} key={`${index}`}>
                              <PeopleCard
                                data={item}
                                send={send}
                                sendRequest={sendRequest}
                                connect={myConnections.includes(item?._id) ? "connection": ""}
                                cancelUserFunc={cancelUserFunc}
                              />
                            </Col>
                          )
                        );
                      })
                    }
                  </Row>
                </div>
              </div>

               {/* <div className={`${cx.inviationsCard} mt-4`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know from same interest</h5>
                  <NavLink to="/all-people/same-interest">See all</NavLink>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {interestUsers?.map((item: any) => {
                      return (
                        item?._id !== profile?.data?._id &&
                        !cancelUser.some((e:any)=> e===item?._id) &&
                        !allUserConnection?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <Col md={4} lg={6} xl={4}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={""}
                              cancelUserFunc={cancelUserFunc}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div> */}

              {/* <div className={`${cx.inviationsCard} mt-4`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know from name of school/university</h5>
                  <NavLink to="/all-people/connections-from-school">See all</NavLink>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {schoolItem?.map((item: any) => {
                      return (
                        item?._id !== profile?.data?._id &&
                        !cancelUser.some((e:any)=> e===item?._id) &&
                        !allConnection?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <Col md={4} lg={6} xl={4}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={""}
                              cancelUserFunc={cancelUserFunc}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div>

              <div className={`${cx.inviationsCard} mt-4`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People who pinned the same coffee shop as you</h5>
                  <NavLink to="/all-people/connections-from-same-coffee-shops">See all</NavLink>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {pinnedItem?.map((item: any) => {
                      return item?.pinnedUser?.map((user: any) => {
                        return (
                          user?._id !== profile?.data?._id &&
                          !cancelUser.some((e:any)=> e===item?._id) && 
                          !allConnection?.some(
                            (e: any) => e?._id === item?._id
                          ) && (
                            <Col md={4} lg={6} xl={4}>
                              <PeopleCard
                                data={user}
                                send={send}
                                sendRequest={sendRequest}
                                connect={""}
                                cancelUserFunc={cancelUserFunc}
                              />
                            </Col>
                          )
                        );
                      });
                    })}
                  </Row>
                </div>
              </div> */}
              {/* <div className={`${cx.inviationsCard} mt-4`}>
                <div className={`${cx.filterOption}`}>
                  <div className={`${cx.filterOptionLeft}`}>
                    <h5>
                      {allUserConnection?.length}{" "}
                      {allUserConnection?.length <= 1
                        ? "Connection"
                        : "Connections"}
                    </h5>
                  </div>
                  <div className={`${cx.filterOptionRight}`}>
                    <input
                      type="text"
                      className={`${cx.searchForm} form-control`}
                      placeholder="Type Name, Companies, etc.."
                      onChange={(e: any) => {
                        if (e.target.value?.length > 0) {
                          let connectionArray: any[] = [];
                          setSearchUser(e.target.value)
                          profile?.data?.connection?.forEach((item: any) => {
                            if (
                              item?.name
                                ?.toLowerCase()
                                ?.includes(e?.target?.value?.toLowerCase()) ||
                              item?.schoolName
                                ?.toLowerCase()
                                ?.includes(e?.target?.value?.toLowerCase()) ||
                              item?.companyName
                                ?.toLowerCase()
                                ?.includes(e?.target?.value?.toLowerCase())
                            ) {
                              connectionArray.push(item);
                            }
                          });
                          setAllUserConnection(connectionArray);
                        } else {
                          setAllUserConnection(profile?.data?.connection);
                        }
                        if (e.target.value?.trim() === "") {
                          setAllUserConnection(profile?.data?.connection);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {allUserConnection?.map((item: any, index: number) => {
                      return (
                        !cancelUser.some((e: any) => e === item?._id) && (
                          <Col md={4} lg={6} xl={4} key={`${index}`}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={"connection"}
                              cancelUserFunc={cancelUserFunc}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
      <ShareLocationM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
        locationUrl={"https://syncremote.co"}
        title={"Invite your friends to Sync!"}
      />
    </>
  );
};

export default People2;
