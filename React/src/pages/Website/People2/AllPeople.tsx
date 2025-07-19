import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cx from "./People.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { PeopleCard, PeopleSidebar } from "../../../components/Website";
import { useDispatch, useSelector } from "react-redux";
import {
  ENDPOINT,
  cafeDataFunc,
  changePinnedCafe,
  changeSameInterest,
  changeSchoolData,
  pinnedCafe,
  profile,
  sameInterest,
  sameInterestUsers,
  // samePinnedData,
  // sameSchoolData,
  schoolData,
} from "../../../redux_toolkit/reducer/profileReducer";
import io from "socket.io-client";
import { allUserDataList } from "../../../redux_toolkit/adminReducer/userReducer";
// import { filter } from "../../../assets/images";
import { MdSearch } from "react-icons/md";

let socket: any;
socket = io(ENDPOINT);

const AllPeople = (props: any) => {
  const dispatch = useDispatch();
  const param = useParams();
  const profileState = useSelector((state: any) => state.profileReducer);
  const userState = useSelector((state: any) => state.userReducer);
  // const [schoolItem, setSchoolItem] = useState<any[]>([]);
  // const [pinnedItem, setPinnedItem] = useState<any[]>([]);
  const [allConnection, setAllConnection] = useState<any[]>([]);
  const [allUserConnection, setAllUserConnection] = useState<any[]>([]);
  const [sendRequest, setSendRequest] = useState<any[]>([]);
  const [allUserList, setAllUserList] = useState<any[]>([]);
  const [interestUsers, setInterestUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile?.data?.schoolName) {
      dispatch(schoolData(profile?.data?.schoolName));
    }
    if (profile?.data?._id) {
      dispatch(pinnedCafe({ pinnedCafe: profile?.data?.pinnedCafe }));
      if(profile?.data?.interest?.length>0){
        dispatch(sameInterest({interest: profile?.data?.interest}))
      }
    }
    if (profile?.data?._id) {
      setAllConnection([
        ...profile?.data?.requestConnection,
        ...profile?.data?.connection,
      ]);
      setSendRequest(profile?.data?.sendConnection);
      setAllUserConnection(profile?.data?.connection);
    }
  }, [dispatch, profileState.profileState]);

  useEffect(() => {
    if (profile?.data?._id && search==="") {
      setAllUserList(allUserDataList);
    }
  }, [userState.allUserState, search]);

  useEffect(() => {
    if (profileState.schoolDataState > 0) {
      // setSchoolItem(sameSchoolData);
      dispatch(changeSchoolData());
    }
    if (profileState.pinnedCafeState > 0) {
      // setPinnedItem(samePinnedData);
      dispatch(changePinnedCafe());
    }
    if (profileState.sameInterestState > 0) {
      setInterestUsers(sameInterestUsers)
      dispatch(changeSameInterest())
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
  return (
    <>
      <section className={`${cx.peopleSection}`}>
        <Container>
          <Row>
            <Col lg={4}>
              <PeopleSidebar allUserConnection={allUserConnection}/>
            </Col>

            {param?.title==="all-connections" && <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know </h5>
                  <div className={`${cx.filterOptionRight}`}>
                    <input
                      type="text"
                      className={`${cx.searchForm} form-control`}
                      placeholder="Type Name"
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
                  </div>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {allUserList?.map((item: any) => {
                      return (
                        item?.name !== "Deleted User" &&
                        item?.status === true &&
                        item?._id !== profile?.data?._id &&
                        !allConnection?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <Col md={4} lg={6} xl={4}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={""}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>}

            {param?.title==="same-interest" && <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know from same interest</h5>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {interestUsers?.map((item: any) => {
                      return (
                        item?._id !== profile?.data?._id &&
                        !allConnection?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <Col md={4} lg={6} xl={4}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={""}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>}

           {/* {param?.title==="connections-from-school" && <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People you may know from name of school/university</h5>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                    {schoolItem?.map((item: any) => {
                      return (
                        item?._id !== profile?.data?._id &&
                        !allConnection?.some(
                          (e: any) => e?._id === item?._id
                        ) && (
                          <Col md={4} lg={6} xl={4}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={""}
                            />
                          </Col>
                        )
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>}

            {param?.title==="connections-from-same-coffee-shops" && <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
                <div className={`${cx.inviationsCardHead}`}>
                  <h5>People who pinned the same coffee shop as you</h5>
                </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                  {pinnedItem?.map((item: any) => {
                      return item?.pinnedUser?.map((user: any) => {
                        return (
                          user?._id !== profile?.data?._id &&
                          allConnection?.some(
                            (e: any) => e?._id !== item?._id
                          ) && (
                            <Col md={4} lg={6} xl={4}>
                              <PeopleCard
                                data={user}
                                send={send}
                                sendRequest={sendRequest}
                                connect={""}
                              />
                            </Col>
                          )
                        );
                      });
                    })}
                  </Row>
                </div>
              </div>
            </Col>} */}

            {param?.title==="connections" && <Col lg={8}>
              <div className={`${cx.inviationsCard}`}>
              <div className={`${cx.filterOption}`}>
                    <div className={`${cx.filterOptionLeft}`} style={{ width:'100%' }}>
                      <h5>
                        {allUserConnection?.length}{" "}
                        {allUserConnection?.length === 1
                          ? "Connection"
                          : "Connections"}
                      </h5>
                      {/* <div className={`${cx.filterDropdown}`}>
                      <p>Sort by:</p>
                      <select className={`${cx.selectForm}`}>
                        <option>Recently Added</option>
                      </select>
                    </div> */}
                    <div className={`${cx.searchBox}`}>
                      <MdSearch className={`${cx.icon}`} />
                      <input
                        type="text"
                        className={`${cx.searchForm} form-control`}
                        placeholder="Type Name..."
                        onChange={(e:any)=>{
                          if(e.target.value?.length>0){
                          let connectionArray:any[] = []
                          profile?.data?.connection?.forEach((item:any)=>{
                            if(item?.name?.toLowerCase()?.includes(e?.target?.value?.toLowerCase()) || item?.schoolName?.toLowerCase()?.includes(e?.target?.value?.toLowerCase()) || item?.companyName?.toLowerCase()?.includes(e?.target?.value?.toLowerCase())){
                              connectionArray.push(item)
                            }
                          })
                          setAllUserConnection(connectionArray);
                        }else{
                          setAllUserConnection(profile?.data?.connection);
                        }
                        if(e.target.value?.trim()===""){
                          setAllUserConnection(profile?.data?.connection);
                        }
                        }}
                      />
                    {/* <img src={filter} className={`${cx.filterIcon}`} alt="filter" /> */}
                    </div>
                    </div>
                  </div>

                <div className={`${cx.inviationsCardBody}`}>
                  <Row className={`${cx.rowSpace}`}>
                  {allUserConnection?.map((item: any, index: number) => {
                        return (
                          <Col md={4} lg={6} xl={4} key={`${index}`}>
                            <PeopleCard
                              data={item}
                              send={send}
                              sendRequest={sendRequest}
                              connect={"connection"}
                            />
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </div>
            </Col>}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllPeople;
