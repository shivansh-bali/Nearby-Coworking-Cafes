import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

const ImageViewsCafe = (props: any) => {
  let { imageshow, handleimageClose } = props;
  const [activeSlide, setActiveSlide] = useState(0);

  
  useEffect(() => {
    if (imageshow) {
      setActiveSlide(props.imageIndex || 0);
    }
  }, [imageshow, props.imageIndex]);

  const handleThumbnailClick = (index: number) => {
    setActiveSlide(index);
  };

  const galleryOptions = {
    type: 'fade',
    rewind: true,
    gap: 10,
    pagination: false,
    arrows: false,
    cover: true,
    startIndex: activeSlide,
  };

  const thumbnailOptions = {
    perPage: 5,
    gap: 10,
    pagination: false,
    arrows: true,
    cover: true,
    isNavigation: true,
    rewind: true,
    autoplay: true,
    interval: 2500,
    breakpoints: {
      640: {
        perPage: 3,
      },
    },
  };

  let sortedArr: any[] = [];
    if (props.image) {
      let endPart = props.image?.slice(props.imageIndex, props.image?.length);
      let start = props.image?.slice(0, props.imageIndex);
      sortedArr = endPart.concat(start);
    }

  return (
    <>
       <Modal
        centered
        show={imageshow}
        onHide={handleimageClose}
        className={`${m.modalMin} ${m.imageViewPopup}`}
      >
        {/* Modal Content */}
        <Modal.Header>
          <Modal.Title>{props?.name}</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleimageClose}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row className={`${m.modelSliderSec}`}>
                <Col lg={12} className="text-end">
                  <div className="gallery-container">
                    <Splide
                      options={galleryOptions}
                    >
                      {sortedArr?.map((item: any, index: number) => {
                        return (
                          item?.imageUrl !== '' && index===activeSlide && (
                            <SplideSlide key={index}>
                                <div
                                  className={`${m.galleryImgMain}`}
                                >
                                  <img
                                    src={item?.imageUrl || item}
                                    alt="profileImage"
                                  />
                                </div>
                            </SplideSlide>
                          )
                        );
                      })}
                    </Splide>
                    <Splide
                      options={thumbnailOptions}
                      onMoved={(splide) => {
                        setActiveSlide(splide.index);
                      }}

                    >
                      {sortedArr?.map((item: any, index: number) => {
                        return (
                          item?.imageUrl !== '' && (
                            <SplideSlide key={index}>
                              <div
                                className="item p-0"
                                onClick={() => handleThumbnailClick(index)}
                              >
                               <div className={`${m.galleryImg} position-relative`}
                                  >
                                    <img
                                      src={item?.imageUrl || item}
                                      alt="profileImage"
                                    />
                              </div>
                              </div>
                            </SplideSlide>
                          )
                        );
                      })}
                    </Splide>
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

export default ImageViewsCafe;
