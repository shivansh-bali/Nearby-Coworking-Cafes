import React, { useEffect, useState } from "react";
import cx from "../CafeDescription.module.scss";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addImage } from "../../../../redux_toolkit/globalReducer/imageReducer";
import { FileUploader } from "react-drag-drop-files";
import { Col, Row } from "react-bootstrap";
import { uploadGallery } from "../../../../assets/images";
import ui from "../../../../pages/Cafe/Images/UploadImages.module.scss";

const Images = ({ cafeData, edit, handleChange, setCafeData }: any) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const imageArr = cafeData?.images?.length > 0 ? cafeData?.images : [];
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  useEffect(() => {
    if (cafeData?.pictures?.length === 0) {
      setCafeData((prev: any) => {
        return {
          ...prev,
          pictures: [
            { imageUrl: "", imageType: "cover" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
            { imageUrl: "", imageType: "" },
          ],
        };
      });
    }
  });

  const postImage = async ({ e, index }: any) => {
    await dispatch(addImage({ image: e })).then((data: any) => {
      if (index !== undefined) {
        cafeData.pictures[index].imageUrl = data.payload.image.image;
        setCafeData({ ...cafeData });
      } else {
        setCafeData((prev: any) => {
          if (cafeData?.images?.length > 0) {
            return {
              ...prev,
              images: [...prev.images, data.payload.image.image],
            };
          } else {
            return {
              ...prev,
              images: [data.payload.image.image],
            };
          }
        });
      }
    });
  };
  const removePicture = ({ index, img }: any) => {
    if (index !== undefined) {
      cafeData.pictures[index].imageUrl = "";
      setCafeData({ ...cafeData });
    } else {
      const filtered = cafeData.images.filter((item: any) => item !== img);
      setCafeData((prev: any) => {
        return { ...prev, images: filtered };
      });
    }
  };
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Images</h4>
        {!edit && (
          <div className={cx.navButtons}>
            <button
              className={active === 0 ? cx.active : ""}
              onClick={() => setActive(0)}
            >
              Uploaded by Owner
            </button>
            <button
              className={active === 1 ? cx.active : ""}
              onClick={() => setActive(1)}
            >
              Uploaded by People
            </button>
          </div>
        )}
      </div>
      {edit && (
        <div className={`${cx.images} `}>
          {(cafeData?.pictures || cafeData?.images) &&
            [
              ...cafeData?.pictures.map((item: any, index: number) =>
                item.imageUrl ? item.imageUrl : ""
              ),
              ...imageArr,
            ].map((item: any, index: number) => {
              return item ? (
                <div className={cx.imageContainer} key={index}>
                  {!edit && (
                    <button className={cx.closeButton}>
                      <AiFillCloseCircle style={{ fontSize: "24px" }} />
                    </button>
                  )}

                  <img src={item} alt="" />
                </div>
              ) : (
                ""
              );
            })}
        </div>
      )}

      {!edit && (
        <Row>
          {active === 0 ? (
            cafeData?.pictures?.map((item: any, index: number) => {
              return (
                <Col lg={index === 0 ? 12 : 3} key={`${index}`} my={2}>
                  <div className={`${ui.uploadBox} my-2`}>
                    <div className={`${ui.uploadBoxBody}`}>
                      <img
                        src={
                          item?.imageUrl === "" ? uploadGallery : item.imageUrl
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
                        handleChange={(e: any) => postImage({ e, index })}
                        types={fileTypes}
                      />
                    </div>
                    {item?.imageUrl && (
                      <button
                        className={`btn ${ui.closeButton}`}
                        onClick={() => {
                          removePicture({ index });
                        }}
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
            })
          ) : (
            <div className={`${cx.images} `}>
              {cafeData?.images?.map((item: any, index: number) => {
                return (
                  <div className={cx.imageContainer}>
                    {!edit && (
                      <button
                        className={cx.closeButton}
                        onClick={() => {
                          removePicture({ img: item });
                        }}
                      >
                        <AiFillCloseCircle style={{ fontSize: "24px" }} />
                      </button>
                    )}

                    <img src={item} alt="" />
                  </div>
                );
              })}

              <div className={`${ui.uploadBox} my-2`}>
                <div className={`${ui.uploadBoxBody}`}>
                  <img
                    src={uploadGallery}
                    className={`${ui.icon}`}
                    alt="cafeImage"
                  />
                  <p>Drag and drop your photos here</p>
                  <FileUploader
                    name="images"
                    handleChange={(e: any) => postImage({ e })}
                    types={fileTypes}
                  />
                </div>
              </div>
            </div>
          )}
        </Row>
      )}
    </div>
  );
};

export default Images;
