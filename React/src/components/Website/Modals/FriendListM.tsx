import React from "react";
import m from "./Modal.module.scss";
import { Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { userProfile } from "../../../assets/images";
// import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import IconGenerator from "../../Shared/IconGenerator";

const ShareLocationM = (props: any) => {
  let { friendshow, handlefriendClose, mutualCon } = props;
  const navigate = useNavigate()
  return (
    <>
      <Modal
        centered
        show={friendshow}
        onHide={handlefriendClose}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Modal.Title>{props?.text}</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlefriendClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={` ${m.listContainer}`}>
            {
              mutualCon?.map((item:any, index:number)=>{
 return <div
              className={`d-flex flex-row justify-content-between ${m.friendListItem}`} key={`${index}`}
            >
              <div
                className={`d-flex flex-row align-items-center ${m.friendlistDetails}`}
              >
                {
                         item?.profileImage ? <img
                            src={
                             item?.profileImage
                                ?item?.profileImage
                                : userProfile
                            }
                            alt="profile"
                          /> :
                           <div onClick={()=>navigate(`/userprofile/${item?._id}`)}> <IconGenerator name={item?.name} data={"true"} /> </div>
                        }
                <div>
                  <h5 style={{cursor:"pointer"}} onClick={()=>navigate(`/userprofile/${item?._id}`)}>{item?.name}</h5>
                  <p>{item?.schoolName && `Student @ ${item?.schoolName}`}</p>
                </div>
              </div>
              {/* <div className={m.optionButton}>
                <Dropdown>
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <FiMoreHorizontal />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <ul>
                      <li>
                        <NavLink to="#">View Profile</NavLink>
                      </li>
                      <li>
                        <NavLink to="#">See Nadine’s Map</NavLink>
                      </li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}
            </div>
              })
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareLocationM;
