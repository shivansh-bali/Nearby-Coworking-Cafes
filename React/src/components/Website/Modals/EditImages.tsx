import React from "react";
import m from "./Modal.module.scss";

import { Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { addNew } from "../../../assets/images";
import { FileUploader } from "react-drag-drop-files";

const EditImages = (props: any) => {
  let { lookshow, handlelookClose } = props;
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  return (
    <>
      <Modal
        centered
        scrollable
        show={lookshow}
        onHide={handlelookClose}
        aria-labelledby="example-modal-sizes-title-lg"
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header>
          <Modal.Title>Edit photos</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handlelookClose}
            style={{ right: "9px", top: "0px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <ul className={`${m.addedImgList}`}>
            {
              props?.images?.map((e:any, index:number) => {
                return  <li>
                <div className={`${m.addedImgBody}`}>
                  <img src={e} alt="img" />
                  <button className={`${m.closeBtn}`}>
                    <MdClose onClick={()=>props.removeImage(index)}/>
                  </button>
                </div>
              </li>
              })
            }
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <button className={`btn ${m.addPhoto}`}>
            <img src={addNew} alt="icon" />
            Add photo
            <FileUploader
                        name="file"
                        handleChange={props.handleChange}
                        types={fileTypes}
                      />
          </button>
          <button className={`btn ${m.doneBtn}`} onClick={handlelookClose}>Done</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditImages;
