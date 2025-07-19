import React, { useEffect, useState } from "react";
import cx from "./PeopleCard.module.scss";
import { profile_icon } from "../../../assets/images";
// import { MdClose } from "react-icons/md";
import io from "socket.io-client";
import { ENDPOINT, cafeDataFunc, profile } from "../../../redux_toolkit/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";
import ConfirmCancle from "../Modals/ConfirmCancel";
import { useNavigate } from "react-router-dom";
import IconGenerator from "../../Shared/IconGenerator";
import { FriendListM, Interest } from "../Modals";
import { getSingleUser } from "../../../redux_toolkit/reducer/connectionReducer";
import { NavLink } from "react-router-dom";
import {colorMapping} from '../../../constant'
let socket: any;
socket = io(ENDPOINT); 

const PeopleCard = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state:any) => state.profileReducer)
  const [sendR, setSendR] = useState<any[]>([])
  const [reqU, setreqU] = useState<any[]>([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [friendshow, setfriendShow] = useState(false);
  const handlefriendClose = () => setfriendShow(false);
  const handlefriendShow = () => setfriendShow(true);
  const [mutualCon, setMutualCon] = useState<any[]>([])

  useEffect(()=>{
    if(profile?.data?._id){
    setSendR([...profile?.data?.sendConnection])
    setreqU([...profile?.data?.requestConnection])
    }
  },[profileState.profileState])
  console.log(props?.data)
  useEffect(()=>{
    if(profile?.data?._id){
      const sameFriends:any[] = []
     props?.data?.connection.forEach((item:any)=>{
        if(profile?.data?.connection?.some((e:any)=> e?._id === item?._id)){
          sameFriends.push(item)
        }
      })
      setMutualCon(sameFriends)
    }
  },[props?.data?.connection])

  const cancelFunc = () => {
    socket.emit(
      "cancelConnection",
      props?.data?._id,
      profile?.data?._id,
      (data: any) => {
        props?.send(data)
        setSendR([...data?.sendConnection])
      }
    );
  }
  const [interestTitle, setInterestTitle] = useState("")
  const [interestShow, setIntrestShow] = useState(false);
const handleIntrestClose = () => setIntrestShow(false);
const handleIntrestShow = () => {setIntrestShow(true)
    setInterestTitle(`${props?.data?.name} likes to talk about:`)
  }
  const [allInterest, setAllInterest] = useState<any[]>([])
  useEffect(()=>{
    const interestPeople = props?.data?.interest?.filter((e:any)=> typeof e === "string")
    setAllInterest(interestPeople)
  },[props?.data?.interest])
  // useEffect(()=>{
  //   props?.data?.connection?.forEach((e:any)=>{
  //     profile?.data?.connectin?.forEach((item:any)=>{

  //     })
  //   })
  // },[])
  console.log(props?.data?.name[0],"props?.data?.name[0]")
  return (
    <>
      <div className={`${cx.peopleCard}`}>
        <div
          className={`${cx.backgroundCard}`}
          style={{ background: colorMapping[props?.data?.name[0].toUpperCase()] }}
        >
          {/* <button className={`${cx.closeIcon}`} style={{cursor:"pointer"}}>
            <MdClose style={{cursor:"pointer"}} onClick={()=>props.cancelUserFunc(props?.data?._id)}/>
          </button> */}
        </div>
        <div className={`${cx.contentBody}`}>
        {
                          props?.data?.profileImage ? <img
                            src={
                              props?.data?.profileImage
                                ? props?.data?.profileImage
                                : profile_icon
                            }
                            className={` ${cx.profileImg}`}
                            alt="profile"
                          /> :
                           <div onClick={()=>navigate(`/userprofile/${props?.data?._id}`)}> <IconGenerator name={props?.data?.name} data={"userProfile"} /> </div>
                        }
          <h5 style={{cursor:"pointer"}} onClick={() => {
            dispatch(getSingleUser(props?.data?._id));
              navigate(`/userprofile/${props?.data?._id}`)
            }}>{props?.data?.name} <small>{props?.data?.gender}</small></h5>
          <p style={{height: "13px"}}>{props?.data?.schoolName && `${props?.data?.schoolName}`}</p>
          <h6 style={{"minHeight": "10px"}}>{props?.data?.headline}</h6>
          <hr className="mb-2"/>
          <p style={{"minHeight": "35px"}}><b>Talk to me about: </b>{allInterest?.map((item: any, index: number) => {
                            return index < 3 && typeof item==="string" &&  <>{`${item}, `}</>
                          })}{allInterest?.length > 3 && <NavLink to="#" onClick={handleIntrestShow}>+ {allInterest?.length - 3} more</NavLink>}</p>
          {mutualCon.length>0 && <span className={` ${cx.mutucalBox}`} style={{cursor: "pointer"}} onClick={handlefriendShow}>{mutualCon.length} {mutualCon?.length === 1 ? "mutual connection" : "mutual connections"}</span>}
          {/* {mutualCon.length>0 && <ul className={`${cx.mutualList}`} onClick={handlefriendShow}>
            {
              mutualCon?.map((item:any, index:number)=>{
                return index<10 && <li key={`${index}`}>
                  {
                    item?.profileImage ? 
                    <img src={item?.profileImage} alt="img" /> :
                    <IconGenerator name={item?.name} data={"itemUser"} /> 
                  }
                
              </li>
              })
            }
            <li>
              <button onClick={handlefriendShow}>{mutualCon?.length-10 > 0 ? +mutualCon?.length-10 : ""} {mutualCon?.length === 1 ? "mutual connection" : "mutual connections"}</button>
            </li>
          </ul>} */}
          {props?.connect!=="connection" && sendR?.some((e:any)=>e?._id===props?.data?._id) ? <button
            className={`btn ${cx.pendingBtn}`}
            onClick={() => {
              handleShow();
            }}
          >
            Pending Request
          </button> : props?.connect!=="connection" && reqU?.some((e:any)=>e?._id===props?.data?._id) ? <button
            className={`btn ${cx.connectBtn}`}
            onClick={() => {
              socket.emit(
                "acceptConnection",
                props?.data?._id,
                profile?.data?._id,
                (data: any) => {
                  dispatch(cafeDataFunc(data))
                }
              );
            }}
          >
            Accept
          </button> : 
          props?.connect!=="connection" &&  <button
            className={`btn ${cx.connectBtn}`}
            onClick={() => {
              socket.emit(
                "sendConnection",
                props?.data?._id,
                profile?.data?._id,
                (data: any) => {
                  props?.send(data)
                  setSendR([...data?.sendConnection])
                }
              );
            }}
          >
            Connect
          </button>}
          {props?.connect==="connection" && <button
            className={`btn ${cx.connectBtn}`}
            onClick={() => {
              navigate(`/userprofile/${props?.data?._id}`)
            }}
          >
            View Profile
          </button>}
        </div>
      </div>
      <ConfirmCancle show={show} handleClose={handleClose} cancelFunc={cancelFunc}/>
      <FriendListM
        friendshow={friendshow}
        handlefriendClose={handlefriendClose}
        mutualCon = {mutualCon}
        text="Your mutual connections"
      />
      <Interest show={interestShow} interestTitle={interestTitle} handleIntrestClose={handleIntrestClose} interest={allInterest}/>
    </>
  );
};

export default PeopleCard;
