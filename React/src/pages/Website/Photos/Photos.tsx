import React, { useEffect, useState } from "react";
import cx from "./Photos.module.scss";
import st from "../../../assets/stylesheet/style.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { HiPlus } from "react-icons/hi";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ImageViewsM, UploadPhoto } from "../../../components/Website/Modals";
import { useSelector } from "react-redux";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";

const Photos = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const profileState = useSelector((state: any) => state.profileReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageshow, setImageShow] = useState(false);
  const handleimageClose = () => setImageShow(false);
  const handleimageShow = () => setImageShow(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    if (profileState.updateState > 0 || profileState.profileState > 0) {
      setImages(profile?.data?.photos);
    }
  }, [profileState.updateState, profileState.profileState]);
  return (
    <>
      <div className={`${cx.fixSpace}`}></div>

      <section className={`${cx.featuredSection}`}>
        <Container>
          <div className={`${cx.photoSection}`}>
            <Col lg={12}>
              <div className={`${cx.photoHeading}`}>
                <h3>Photos</h3>
                <div className={`${cx.addPhoto}`}>
                  <button
                    className={`btn ${st.uploadBtn}`}
                    onClick={handleShow}
                  >
                    <HiPlus /> Add Photos
                    {/* <input type="file" /> */}
                  </button>
                </div>
              </div>
            </Col>
            <Row xs={3} md={5} lg={5}>
              {images?.map((item: any, index: number) => {
                return (
                  <Col
                    className={`p-0 ${cx.imgSize}`}
                    key={`${index}`}
                    onClick={() => {
                      setImageIndex(index);
                      handleimageShow();
                    }}
                  >
                    <div className={`${cx.photoImg}`}>
                      <img src={item?.image} alt="Photo1" />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
      </section>
      <UploadPhoto show={show} handleClose={handleClose} />
      <ImageViewsM
        imageshow={imageshow}
        handleimageClose={handleimageClose}
        imageIndex={imageIndex}
        image={profile?.data?.photos}
      />
    </>
  );
};

export default Photos;
