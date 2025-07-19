import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cafeResolution } from "../../../redux_toolkit/reducer/cafeReducer";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  updateClaimResult,
  updateRecommendResult,
} from "../../../redux_toolkit/globalReducer/cafeClaimReducer";

interface RejectRequestProps {
  show: boolean;
  handleClose: () => void;
  page?: any;
  id?: string;
}

const RejectRequest = (props: RejectRequestProps) => {
  let { show, handleClose, page, id } = props;

  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [rejectMessage, setRejectMessage] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (cafeState.cafeResolutionState > 0) {
      setRejectMessage("");
    }
  }, [handleClose, cafeState.cafeResolutionState]);

  const rejectBusiness = async () => {
    let res: any;
    if (page === "businessRequest")
      res = await dispatch(
        cafeResolution({
          id: id,
          resolution: "Rejected",
          message: rejectMessage,
        })
      );
    else if (page === "businessClaim") {
      res = await dispatch(
        updateClaimResult({
          id: id,
          resolution: "Rejected",
          message: rejectMessage,
        })
      );
    } else if (page === "businessRecommend") {
      res = await dispatch(
        updateRecommendResult({
          id: id,
          resolution: "Rejected",
          message: rejectMessage,
        })
      );
    }
    if (res?.payload?.success) {
      navigate("/admin");
      handleClose();
    }
  };
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
            Reason for Rejection!
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
          <Row>
            <Col lg={12}>
              <div className={`${st.formBox}`}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={rejectMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setRejectMessage(e.target.value);
                    setErr("");
                  }}
                />
              </div>
              {err}
            </Col>
          </Row>
          <div className={`${m.btnsAlignments} d-flex justify-content-center`}>
            <button
              type="button"
              className={`btn ${m.actionBtn}`}
              onClick={() => {
                if (rejectMessage === "") {
                  setErr("This field is Required");
                } else {
                  rejectBusiness();
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RejectRequest;
