import React, { useState, Fragment } from "react";
import cx from "./AddedCard.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { DeletePopup } from "../Modals";

interface AddCardOptions {
  deleteIcon?: boolean;
  radioButton?: boolean;
}
const AddedCard = (props: AddCardOptions) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { deleteIcon, radioButton } = props;

  return (
    <>
      <label className={`${cx.addedCard} ${cx.radio}`}>
        <ul>
          <h6>Jitendra Kumar Prajapat</h6>
          <li>Card Number : XXXXXXX987</li>
          <li>Expiry : 07/2037</li>
        </ul>
        {radioButton && (
          <Fragment>
            <input type="radio" name="cardSelect" />
            <span className={`${cx.checkmark}`}></span>
          </Fragment>
        )}
        {deleteIcon && (
          <button
            type="button"
            onClick={handleShow}
            className={`${cx.deleteBtn}`}
          >
            <AiFillDelete />
          </button>
        )}
      </label>

      <DeletePopup show={show} handleClose={handleClose} />
    </>
  );
};

export default AddedCard;
