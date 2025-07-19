import React from "react";
import m from "./Modal.module.scss";
import { NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { deleteBlog } from "../../../redux_toolkit/globalReducer/blogReducer";
import { useDispatch } from "react-redux";

interface DeletePopupProps {
  show: boolean;
  handleClose: () => void; // change the return type to void
  id?: string;
}

const DeletePopup = (props: DeletePopupProps) => {
  let { show, handleClose } = props;
  const dispatch = useDispatch();
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
          <h3>Are you Sure you want to Delete this item?</h3>
          <div className={`${m.btnsAlignments}`}>
            <button
              type="button"
              className={`btn ${m.actionBtn}`}
              onClick={() => dispatch(deleteBlog(props?.id))}
            >
              Delete
            </button>
            <NavLink
              className={`btn ${m.cancelBtn}`}
              to=""
              onClick={handleClose}
            >
              Cancel
            </NavLink>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeletePopup;
