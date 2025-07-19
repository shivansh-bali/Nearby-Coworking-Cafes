import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import cm from "../../../assets/stylesheet/Custom.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { TagCafe, upload_icon } from "../../../assets/images";
import { NavLink } from "react-router-dom";
import TagYourCafe from "./TagYourCafe";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  changeImageState,
  imageUrl,
} from "../../../redux_toolkit/globalReducer/imageReducer";
import { allCafe } from "../../../redux_toolkit/reducer/cafeReducer";
import {
  profile,
  updateDetails,
} from "../../../redux_toolkit/reducer/profileReducer";

const UploadPhoto = (props: any) => {
  let { show, handleClose } = props;
  const dispatch = useDispatch();
  const imageState = useSelector((state: any) => state.imageReducer);
  const [shows, setShows] = useState(false);
  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [imageLink, setImageLink] = useState<any>();
  const [fields, setFields] = useState({
    image: "",
    description: "",
    cafe: {
      id: "",
      name: "",
    },
  });
  const [fieldError, setFieldError] = useState<string>();
  const handleChange = (file: any) => {
    dispatch(addImage({ image: file }));
    setImageLink("Uploading! It won't take long")
    setFieldError("");
  };
  const fillFields = (key: string, value: any) => {
    setFields((prev: any) => {
      return { ...prev, [key]: value };
    });
  };
  useEffect(() => {
    if (imageState.imageState > 0) {
      setImageLink(imageUrl);
      fillFields("image", imageUrl);
      dispatch(changeImageState());
    }
  }, [dispatch, imageState.imageState]);
  useEffect(() => {
    dispatch(allCafe());
    setFields({
      image: "",
      description: "",
      cafe: {
        id: "",
        name: "",
      },
    });
    setImageLink(undefined);
  }, [dispatch]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={show}
        onHide={handleClose}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title>Upload Photo</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              handleClose();
              fields.cafe.id = "";
              fields.cafe.name = "";
              setFields({
                image: "",
                description: "",
                cafe: {
                  id: "",
                  name: "",
                },
              });
              setImageLink(undefined);
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
                        imageLink === "Uploading! It won't take long" ? <h3>{imageLink}</h3> :
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
                <p className={`${cm.error}`}>{fieldError}</p>

                <Col lg={12} className="mt-3">
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      placeholder="Write something about your post"
                      className="border-0"
                      rows={3}
                      onChange={(e: any) =>
                        fillFields("description", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col lg={12} className="mt-4">
                  <div className={` ${m.tagged_btn}`}>
                    <NavLink to="#" onClick={handleShows}>
                      <p>
                        {fields?.cafe?.name === ""
                          ? "Tag your cafe"
                          : fields?.cafe?.name}
                      </p>

                      <img
                        src={TagCafe}
                        className={`${m.cafe_tages} `}
                        alt="cafeTag"
                      />
                    </NavLink>
                  </div>
                </Col>
                <Col lg={12} className="mt-4 text-end">
                  <div className={` ${m.btnSubmit}`}>
                    <button
                      className={
                        fields?.image === ""
                          ? `btn ${st.btn2}`
                          : `btn ${st.btn2} ${st.active2}`
                      }
                      onClick={() => {
                        if (fields?.image === "") {
                          setFieldError("Please add one image");
                        } else {
                          dispatch(
                            updateDetails({
                              photos: [...profile?.data?.photos, fields],
                            })
                          );
                          handleClose();
                          fields.cafe.id = "";
                          fields.cafe.name = "";
                          setFields({
                            image: "",
                            description: "",
                            cafe: {
                              id: "",
                              name: "",
                            },
                          });
                          setImageLink(undefined);
                        }
                      }}
                    >
                      Post
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <TagYourCafe
        shows={shows}
        handleCloses={handleCloses}
        fillFields={fillFields}
      />
    </>
  );
};

export default UploadPhoto;
