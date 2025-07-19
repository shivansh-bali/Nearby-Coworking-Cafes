import React, { useEffect, useState } from "react";
import cx from "./Notifications.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";

import { Container, Col, Row } from "react-bootstrap";
import { favicon } from "../../../assets/images";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myData, profile } from "../../../redux_toolkit/reducer/profileReducer";
import IconGenerator from "../../../components/Shared/IconGenerator";
import { ShareLocationM } from "../../../components/Website/Modals";

const Notifications = (props: any) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState<any[]>([])
  const profileState = useSelector((state:any)=>state.profileReducer)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function formatDateDifference(currentDate:any, pastDate:any) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;
    const msPerMonth = msPerDay * 30; // Approximate, not considering varying month lengths
    const msPerYear = msPerDay * 365; // Approximate, not considering leap years

    const timeDifference = currentDate - pastDate;
    const absTimeDifference = Math.abs(timeDifference);

    if (absTimeDifference < msPerMinute) {
        return 'Just now';
    } else if (absTimeDifference < msPerHour) {
        const minutesAgo = Math.floor(absTimeDifference / msPerMinute);
        return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
    } else if (absTimeDifference < msPerDay) {
        const hoursAgo = Math.floor(absTimeDifference / msPerHour);
        return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
    } else if (absTimeDifference < msPerWeek) {
        const daysAgo = Math.floor(absTimeDifference / msPerDay);
        return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
    } else if (absTimeDifference < msPerMonth) {
        const weeksAgo = Math.floor(absTimeDifference / msPerWeek);
        return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`;
    } else if (absTimeDifference < msPerYear) {
        const monthsAgo = Math.floor(absTimeDifference / msPerMonth);
        return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
    } else {
        const yearsAgo = Math.floor(absTimeDifference / msPerYear);
        return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
    }
}
function formatDateDiff(currentDate:any, pastDate:any) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30; // Approximate, not considering varying month lengths
  const msPerYear = msPerDay * 365; // Approximate, not considering leap years

  const timeDifference = currentDate - pastDate;
  const absTimeDifference = Math.abs(timeDifference);

  if (absTimeDifference < msPerDay) {
      return 'Today';
  } else if (absTimeDifference < msPerWeek) {
      const daysAgo = Math.floor(absTimeDifference / msPerDay);
      return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
  } else if (absTimeDifference < msPerMonth) {
      const weeksAgo = Math.floor(absTimeDifference / msPerWeek);
      return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`;
  } else if (absTimeDifference < msPerYear) {
      const monthsAgo = Math.floor(absTimeDifference / msPerMonth);
      return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
  } else {
      const yearsAgo = Math.floor(absTimeDifference / msPerYear);
      return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
  }
}
  useEffect(()=>{
    let sameData:any = {}
    profile?.data?.notification?.forEach((item:any)=>{
      if(profile?.data?.connection.map((connec: { _id: any; }) => connec._id).includes(item.userId)){
      const date = new Date(item?.createdAt)
      const todayDate = new Date()
      const title = formatDateDiff(todayDate, date)
      if(Object.keys(sameData)?.some((e:any)=>e===title)){
        sameData[`${title}`].unshift(item)
      }else{
      sameData[`${title}`] = [item]
      }
      console.log(sameData, "adsdasds")
    }
    })
     setNotifications(sameData)
  },[profileState.profileState])
  console.log('Notifications: ', profile?.data?.notification)
  useEffect(()=>{
    dispatch(myData())
  },[dispatch])

  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);

  return (
    <>
      <section
        className={`${cx.NotificationSection} ${st.sectionPaddingBottom}`}
      >
        <Container>
          <Row>
            <Col lg={12}>
              <div className={`${cx.savedCafe}`}>
                <div className={`${cx.backIcon}`}>
                    <NavLink to="#" onClick={()=>navigate(-1)}>
                        <IoIosArrowBack/>
                        <span>Back</span>
                    </NavLink>
                </div>
                <h5>Notifications</h5>
              </div>
            </Col>
            <Col lg={8} md={12} sm={12}>
              <div className={`${cx.notificationBox}`}>
                {
                  Object.keys(notifications)?.reverse().map((item:any, index:number)=>{
                    return <>
                       <div className={`${cx.notificationHeading}`}>
                  <h5>{item}</h5>
                </div>
                {notifications[item]?.map((e:any)=>{
                  const date = new Date(e?.createdAt)
                  const todayDate = new Date()
                  const title = formatDateDifference(todayDate, date)
 return <div className={`${cx.notificationStart}`}>
 <div className={`${cx.notificationShow}`}>
   <div className={`${cx.notificationName}`}>
   {
                          (e?.data?.image && e?.role === "user") ? <img
                            src={e?.data?.image}
                            onClick={()=>{
                              if(e?.role==="user"){
                                navigate(`${`/userprofile/${e?.userId}`}`)
                              }else{
                                navigate(`${`/cafe-details/${e?.userId}`}`)
                              }
                             }}
                             style={{ cursor: "pointer" }}
                            className={` ${cx.profileImg}`}
                            alt="profile"
                          /> :
                          e?.role === "user" && <span style={{ cursor: "pointer" }} onClick={()=>{
                            if(e?.role==="user"){
                              navigate(`${`/userprofile/${e?.userId}`}`)
                            }else{
                              navigate(`${`/cafe-details/${e?.userId}`}`)
                            }
                           }}><IconGenerator name={e?.data?.name} data={"true"} /></span>
                        }
                        {
                          e?.role === "cafe" &&  <img
                          src={
                            e?.data?.pictures[0]?.imageUrl
                              ? e?.data?.pictures[0]?.imageUrl
                              : e?.data?.images?.length>0 ? e?.data?.images[0] : favicon
                          }
                          onClick={()=>{
                              navigate(`${`/cafe-details/${e?.userId}`}`)
                           }}
                          className={`${cx.image}`}
                          style={{ cursor: "pointer" }}
                          alt="coffeeShop"
                        />
                        }
     <div style={{ cursor: "pointer" }} onClick={()=>{
      if(e?.role==="user"){
        navigate(`${`/userprofile/${e?.userId}`}`)
      }else{
        navigate(`${`/cafe-details/${e?.userId}`}`)
      }
     }} className={`${cx.textAlign}`}>
       <h4>{e?.data?.name}</h4>
       <p>{e?.body}</p>
       <small>{title}</small>
     </div>
   </div>
   <div className={`${cx.notificationButton}`}>
    {e.status===false && <span className={`${cx.bulletBox}`}></span>}
     {/* <button className={`btn ${st.btn2} ${cx.acceptBtn}`} onClick={()=>{
      if(e?.role==="user"){
        navigate(`${`/userprofile/${e?.userId}`}`)
      }else{
        navigate(`${`/cafe-details/${e?.userId}`}`)
      }
     }}>
     See profile
     </button> */}
   </div>
 </div>
</div>
                })}
               
                    </>
                  })
                }
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

export default Notifications;