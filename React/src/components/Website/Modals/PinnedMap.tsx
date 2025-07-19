import React from "react";
import m from "./Modal.module.scss";

import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { saveRecommend } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";

const PinnedMap = (props: any) => {
  let { lookshow, handlelookClose } = props;
  return (
    <>
      <Modal
        centered
        scrollable
        show={lookshow}
        // onHide={handlelookClose}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header className="border-1 " style={{ padding: "20px 10px 0" }}>
          <p style={{ fontWeight: "600" }}>Successfully Updated!</p>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={()=>{
              if(saveRecommend){
                return;
              }else{
              handlelookClose()
              }
            }}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.reviewCafeList} text-center`}>
                    <h5
                      className="pb-4"
                      style={
                        props.popupMessage ===
                        "You just pinned a place to your map!"
                          ? {
                              color: "#1c1c1c",
                            }
                          : {}
                      }
                    >
                      {props.popupMessage}
                    </h5>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PinnedMap;
