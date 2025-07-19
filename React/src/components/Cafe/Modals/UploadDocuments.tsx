import React from "react";
import m from "../../Admin/Modals/Modal.module.scss";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";

interface RejectRequestProps {
  show: boolean;
  handleClose: () => void;
  id?: string;
}

const UploadDocuments = (props: RejectRequestProps) => {
  let { show, handleClose } = props;
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
            Downloadable Documents!
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
          <div className={`${m.btnsAlignments} d-flex justify-content-center`}>
            <div></div>
            <button
              type="button"
              className={`btn ${m.actionBtn}`}
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadDocuments;
