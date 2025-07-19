import React from "react";
import { Modal } from "react-bootstrap";
import m from "../../Admin/Modals/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";

const SuccessPopup = ({ show, handleClose }: any) => {
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        className={`${m.modalCts}`}
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
            Success!
          </p>
          <button
            style={{
              border: "none",
              background: "none",
              color: "var(--Color5)",
              padding: "10px",
            }}
            onClick={handleClose}
          >
            <AiOutlineClose style={{ fontWeight: "bold" }} />
          </button>
        </div>
        <div className={`${m.logoutPopup}`}>
          <div className={`${m.btnsAlignments} d-flex justify-content-center`}>
            <div></div>
            <p
              style={{
                margin: "0",
                fontSize: "18px",
                color: "var(--Color2)",
                fontWeight: "600",
              }}
            >
              Successfully updated new changes!
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuccessPopup;
