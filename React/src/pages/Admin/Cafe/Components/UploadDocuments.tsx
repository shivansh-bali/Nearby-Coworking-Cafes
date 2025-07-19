import React from "react";
import cx from "../CafeDescription.module.scss";
import { FiFolder } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { GridAddIcon } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { addImage } from "../../../../redux_toolkit/globalReducer/imageReducer";

const UploadDocuments = ({ cafeData, edit, setCafeData }: any) => {
  const dispatch = useDispatch();
  const postImage = async (e: any) => {
    await dispatch(addImage({ image: e.target.files[0] })).then((data: any) => {
      setCafeData((prev: any) => {
        return {
          ...prev,
          uploadDocuments: [
            ...prev.uploadDocuments,
            {
              imageUrl: data.payload.image.image,
              name: e.target.files[0].name,
            },
          ],
        };
      });
    });
  };
  const removePicture = (image: any) => {
    const filtered = cafeData.uploadDocuments.filter(
      (item: any) => item.name !== image.name
    );
    setCafeData((prev: any) => {
      return { ...prev, uploadDocuments: filtered };
    });
  };
  return (
    <div className={cx.container}>
      <div className={cx.header}>
        <h4>Menu</h4>
      </div>
      <div className="py-3 d-flex gap-3">
        {cafeData?.uploadDocuments &&
          cafeData?.uploadDocuments?.map((item: any, index: number) => {
            return (
              <div className="mr-3 " key={index}>
                <div className={cx.uploadDocuments}>
                  <label htmlFor="actual-btn">
                    <FiFolder style={{ fontSize: "22px" }} />
                  </label>
                  {!edit && (
                    <button
                      className={cx.closeButton}
                      onClick={() => removePicture(item)}
                    >
                      <AiFillCloseCircle style={{ fontSize: "24px" }} />
                    </button>
                  )}
                </div>
                <p>{item.name}</p>
              </div>
            );
          })}
        {(cafeData?.uploadDocuments?.length === 0 || !edit) && (
          <div className={cx.uploadDocuments}>
            <div className={cx.uploadButton2}>
              <input
                type="file"
                id="actual-btn"
                hidden
                onChange={(e: any) => {
                  postImage(e);
                }}
              />
              <label htmlFor="actual-btn">
                <GridAddIcon style={{ fontSize: "26px" }} />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocuments;
