import React from "react";
import m from "./Modal.module.scss";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import st from "../../../assets/stylesheet/style.module.scss";

const ConfirmCancle = (props: any) => {
  let { show, handleClose } = props;
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div className={`${m.logoutPopup}`}>
          <h3>Are you sure you want to cancel request?</h3>
          <div className={`${m.btnsAlignments}`}>
            <button
              type="button"
              className={`btn ${m.actionBtn} ${st.btn1} ${st.active}`}
              onClick={() => {
                props?.cancelFunc();
                handleClose();
              }}
            >
              Yes
            </button>
            <NavLink
              className={`btn ${m.cancelBtn} ${st.btn2}`}
              to=""
              onClick={handleClose}
            >
              No
            </NavLink>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmCancle;
