import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import cx from "../../../pages/Cafe/Dashboard/Dashboard.module.scss";
import ui from "./UploadImages.module.scss";
import { useOutletContext, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { uploadGallery } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { addImage } from "../../../redux_toolkit/globalReducer/imageReducer";
import { updateCafe } from "../../../redux_toolkit/reducer/cafeReducer";
import { AiOutlineClose } from "react-icons/ai";

const UploadImages = () => {
  const dispatch = useDispatch();
  const { cafeData } = useOutletContext<any>();
  const [active, setActive] = useState(0);

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [imageData, setImageData] = useState<any>([]);

  const params = useParams();

  useEffect(() => {
    setImageData(
      cafeData?.pictures
        ? cafeData?.pictures
        : [
            { imageUrl: "", imageType: "cover" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
          ]
    );
  }, [cafeData]);
  const handleFileChange = async (file: any, index: number) => {
    if (file === "") {
      imageData[index].imageUrl = "";
      dispatch(updateCafe({ pictures: imageData, _id: params.id }));
    } else {
      await dispatch(addImage({ image: file })).then((res: any) => {
        imageData[index].imageUrl = res.payload.image.image;
        dispatch(updateCafe({ pictures: imageData, _id: params.id }));
      });
    }
  };

  return (
    <>
      <Col>
        <div className={cx.businessInformation}>
          <div
            style={{ borderBottom: "1px solid #dedede" }}
            className={
              "d-flex justify-content-md-between flex-md-row gap-4 flex-column-reverse"
            }
          >
            <div
              className={`d-flex gap-2 ${cx.titleContainer} `}
              style={{ border: "none" }}
            >
              <button
                className={active === 0 ? cx.active : ""}
                onClick={() => setActive(0)}
              >
                Your Photos
              </button>
              <button
                className={active === 1 ? cx.active : ""}
                onClick={() => setActive(1)}
              >
                Added by Community
              </button>
            </div>
          </div>
          <Row style={{ padding: "20px 0" }}>
            {active === 0 &&
              imageData?.map((item: any, index: number) => {
                return (
                  <Col lg={index === 0 ? 12 : 3} key={`${index}`}>
                    <div className={`${ui.uploadBox}`}>
                      <div className={`${ui.uploadBoxBody}`}>
                        <img
                          src={
                            item?.imageUrl === ""
                              ? uploadGallery
                              : item.imageUrl
                          }
                          className={
                            item?.imageUrl === ""
                              ? `${ui.icon}`
                              : `${ui.uploadedImg}`
                          }
                          alt={index === 0 ? "cafeCoverImage" : "cafeImage"}
                        />

                        {item?.imageUrl === "" && index === 0 && (
                          <p>
                            Drag and drop your photos here <br />
                            (Accepted format: JPG, PNG)
                          </p>
                        )}
                        {item?.imageUrl === "" && index > 0 && (
                          <p>Drag and drop your photos here</p>
                        )}
                        <FileUploader
                          name={`file${index}file`}
                          handleChange={(e: any) => handleFileChange(e, index)}
                          types={fileTypes}
                        />
                      </div>
                      {item?.imageUrl && (
                        <button
                          className={`btn ${ui.closeButton}`}
                          onClick={() => handleFileChange("", index)}
                        >
                          <AiOutlineClose />
                        </button>
                      )}

                      {index === 0 && (
                        <span className={`${ui.label}`}>Cover photo</span>
                      )}
                    </div>
                  </Col>
                );
              })}
            {active === 1 &&
              (cafeData?.postByUsers.length > 0 ? (
                cafeData?.postByUsers?.map((item: any, index: number) => {
                  return (
                    <Col lg={3} key={`${index}`}>
                      <div className={`${ui.uploadBox}`}>
                        {/* <button className={`btn ${ui.closeButton}`}>
                          <AiOutlineClose />
                        </button> */}
                        <div className={`${ui.uploadBoxBody}`}>
                          <img
                            src={item.image}
                            className={`${ui.uploadedImg}`}
                            alt={index === 0 ? "cafeCoverImage" : "cafeImage"}
                          />
                        </div>
                      </div>
                    </Col>
                  );
                })
              ) : (
                <Row style={{ height: "600px" }}>
                  <div className={cx.uploadhere}>
                    <p>No images yet!</p>
                    {/* <FiUpload />
                    <p>Nothin</p>
                    <p>(Accepted format: PDF, JPG, PNG)</p> */}
                  </div>
                </Row>
              ))}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default UploadImages;
