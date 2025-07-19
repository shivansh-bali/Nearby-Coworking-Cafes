import React from "react";
import m from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import OwlCarousel from "react-owl-carousel";

const ImageViewsM = (props: any) => {
  let { imageshow, handleimageClose } = props;

  const options = {
    loop: true,
    items: 4,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    dots: false,
    nav: true,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 1,
      },
      768: {
        items: 1,
      },
    },
  };
  let sortedArr: any[] = [];
  if (props.image) {
    let endPart = props.image?.slice(
      props.imageIndex,
      props.image?.length
    );
    let start = props.image?.slice(0, props.imageIndex);
    sortedArr = endPart.concat(start);
  }

  return (
    <>
      <Modal
        centered
        show={imageshow}
        onHide={handleimageClose}
        className={`$ ${m.modalMin} ${m.imagemodel_scroller}`}
      >
        <div className="position-relative">
          <button
            className={`${m.closeimgIcon}`}
            title="Close"
            onClick={handleimageClose}
          >
            <MdClose />
          </button>
        </div>

        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row className={`${m.modelSliderSec}`}>
                <Col lg={12} className="text-end">
                  <OwlCarousel className="owl-theme" {...options}>
                    {sortedArr?.map((item: any, index: number) => {
                      return (
                        <div className="item p-0" key={`${index}`}>
                          <div className={`${m.upload_profile_after}`}>
                            <div
                              className={`${m.upload_profile_image} position-relative`}
                            >
                              <img src={item?.image} alt="profileImage" />

                              {item?.cafe?.name && (
                                <div className={`${m.cafe_tagged_list}`}>
                                  <p> {item?.cafe?.name}</p>
                                </div>
                              )}
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageViewsM;
