import React from "react";
import cx from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import m from "./Modal.module.scss";
import {colorMapping} from '../../../constant'

const Interest = (props: any) => {

  return (
    <>
      <Modal
        centered
        scrollable
        show={props.show}
        onHide={props.handleIntrestClose}
        className={`${cx.modalCts} ${cx.modalMin}`}
      >
        <Modal.Header className="border-0 pb-0"
        >
          <Modal.Title>{props?.interestTitle}</Modal.Title>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={props.handleIntrestClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
            <ul className={`${m.intrestSelect}`}>
                {props?.interest?.map((item: any) => {
                  return typeof item==="string" && (
                    < li > <button style={{ background: colorMapping[item[0]?.toUpperCase()], border: '1px solid #E6F1E3', color: '#709C64', width: "100%", height: "100%", padding:"6px 15px" }}>{item}</button></li>
                  )
                })}
              </ul>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Interest;
