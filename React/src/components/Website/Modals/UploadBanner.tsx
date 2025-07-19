import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { upload_icon } from "../../../assets/images";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import {
  changeUpdateData,
  updateDetails,
} from "../../../redux_toolkit/reducer/profileReducer";

const UploadBanner = (props: any) => {
  let { uploadimageshow, handleUploadimageClose } = props;
  const dispatch = useDispatch();
  const imageState = useSelector((state: any) => state.imageReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [imageLink, setImageLink] = useState<any>();
  const [err, setErr] = useState("");
  const handleChange = (file: any) => {
    dispatch(addImage({ image: file }));
    setErr("");
  };
  useEffect(() => {
    if (imageState.imageState > 0) {
      setImageLink(imageUrl);
      dispatch(changeImageState());
    }
    if (profileState.updateState > 0) {
      handleUploadimageClose();
      dispatch(changeUpdateData());
      setImageLink(undefined)
    }
  }, [
    dispatch,
    handleUploadimageClose,
    imageState.imageState,
    profileState.updateState,
  ]);
  const [activeButton, setActiveButton] = useState(false);
  useEffect(() => {
    if (imageLink) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [imageLink]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={uploadimageshow}
        onHide={()=>{
          handleUploadimageClose()
          setImageLink(undefined)
        }}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title>Upload Photo</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={()=>{
              handleUploadimageClose()
              setImageLink(undefined)
            }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.upload_profile}`}>
                    <div
                      className={`${m.upload_profile_icon} position-relative`}
                    >
                      {imageLink === undefined ? (
                        <img src={upload_icon} alt="uploadIcon" />
                      ) : (
                        <img
                          src={imageLink}
                          className={`${m.uploadedView} mb-3`}
                          alt="uploadView"
                        />
                      )}
                      {imageLink !== undefined ? (
                        <button
                          className={`${m.closeIcon}`}
                          onClick={() => setImageLink(undefined)}
                        >
                          <MdClose />
                        </button>
                      ) : (
                        <>
                          <FileUploader
                            name="file"
                            handleChange={handleChange}
                            types={fileTypes}
                          />
                          <p>
                            Drag and drop an image, or{" "}
                            <span style={{ marginLeft: "1px" }}>Browse</span>
                          </p>{" "}
                        </>
                      )}
                    </div>
                  </div>
                </Col>

                <Col lg={12} className="mt-4 text-end">
                  <div className={` ${m.btnSubmit}`}>
                    <p className="text-center" style={{ color: "red" }}>
                      {err}
                    </p>
                    <button
                      className={
                        activeButton === true
                          ? `btn ${st.btn2} ${st.active2}`
                          : `btn ${st.btn2}`
                      }
                      onClick={() => {
                        if (imageLink !== undefined) {
                          dispatch(updateDetails({ bannerImage: imageLink }));
                        } else {
                          setErr("Please select image");
                        }
                      }}
                    >
                      Upload
                    </button>
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

export default UploadBanner;
