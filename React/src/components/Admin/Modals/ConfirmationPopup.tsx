import React from "react";
import m from "./Modal.module.scss";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

interface ConfirmationPopupProps {
  show: boolean;
  handleClose: () => void; // change the return type to void
  id?: string;
  value: boolean;
  manageStatus: () => void;
  content: string;
}

const ConfirmationPopup = (props: ConfirmationPopupProps) => {
  return (
    <>
      <Modal
        centered
        scrollable
        show={props.show}
        onHide={props.handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <div
          style={{ borderBottom: "1px solid var(--Main5)" }}
          className="d-flex justify-content-between"
        >
          <p
            style={{
              padding: " 15px",
              margin: "0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {props.value ? "Deactivating" : "Activating"}
          </p>
          <button
            style={{
              border: "none",
              background: "none",
              color: "var(--Color5)",
              padding: "10px",
            }}
            onClick={props.handleClose}
          >
            <AiOutlineClose style={{ fontWeight: "bold" }} />
          </button>
        </div>
        <div className={`${m.logoutPopup}`}>
          <h3>
            Would you like to {props.value ? "deactivate" : "activate"}{" "}
            {props.content}'s account?
          </h3>
          <div className={`${m.btnsAlignments} d-flex justify-content-center`}>
            <NavLink
              className={`btn ${m.cancelBtn}`}
              to=""
              onClick={props.handleClose}
            >
              Cancel
            </NavLink>
            <button
              type="button"
              className={`btn ${m.actionBtn}`}
              onClick={() => props.manageStatus()}
            >
              {props.value ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationPopup;
