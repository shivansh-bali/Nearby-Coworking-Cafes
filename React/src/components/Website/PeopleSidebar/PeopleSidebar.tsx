import React from "react";
import { NavLink } from "react-router-dom";
import cx from "./PeopleSidebar.module.scss";

import { Col } from "react-bootstrap";
// import { addImg, addImg2 } from "../../../assets/images";
import { FiUsers } from "react-icons/fi";

const PeopleSidebar = (props: any) => {

  return (
    <>
      <div className={`${cx.people_sidbar}`}>
          <Col lg={12}>
            <div className={`${cx.sidbar_Menu}`}>
              <h5>Manage People</h5>
              {props.allUserConnection?.length>0 && <ul>
                <li>
                  <NavLink to="/all-people/connections">
                    <span><FiUsers /></span>
                    {props.allUserConnection?.length===1 ? "Connection" : "Connections"}
                  </NavLink>
                  <NavLink className={`${cx.countUser}`} to="/all-people/connections">{props.allUserConnection?.length}</NavLink>
                </li>
              </ul>}
            </div>

            {/* <div className={`${cx.addCard} mt-4`}>
              <NavLink to="#"><img src={addImg} alt="add Img" className={`${cx.addImg}`} /></NavLink>
            </div>

            <div className={`${cx.addCard} mt-4`}>
              <NavLink to="#"><img src={addImg2} alt="add Img" className={`${cx.addImg}`} /></NavLink>
            </div>

            <div className={`${cx.addCard} mt-4`}>
              <NavLink to="#"><img src={addImg2} alt="add Img" className={`${cx.addImg}`} /></NavLink>
            </div> */}
          </Col>
      </div>
    </>
  );
};

export default PeopleSidebar;
