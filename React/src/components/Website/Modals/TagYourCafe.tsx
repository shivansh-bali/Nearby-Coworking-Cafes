import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";

import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { coffeeShop1 } from "../../../assets/images";
import { cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import { useSelector } from "react-redux";

const TagYourCafe = (props: any) => {
  let { shows, handleCloses } = props;
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafe, setCafe] = useState<any[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<any>({
    id: "",
    name: "",
  });
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    if (cafeState.allCafeState > 1) {
      let list: any[] = [];
      cafeList?.forEach((item: any) => {
        if (item?.isAccepted === "Approved" && item?.status === true) {
          list.push(item);
        }
      });
      setCafe(list);
    }
  }, [cafeState.allCafeState]);
  return (
    <>
      <Modal
        centered
        scrollable
        show={shows}
        onHide={handleCloses}
        className={`${m.modalCts} ${m.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title>Tag your cafe</Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={handleCloses}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className={`${m.formContact}`}>
            <div className={`${m.formBox}`}>
              <Row>
                <Col lg={12}>
                  <div className={`${m.tag_your_cafe}`}>
                    <div className={`${m.tag_your_cafe_search}`}>
                      <input
                        type="search"
                        placeholder="Search for cafe"
                        value={searchData}
                        onChange={(e: any) => {
                          setSearchData(e.target.value);
                          const matchedData: any[] = [];
                          cafeList.forEach((item: any) => {
                            if (
                              item?.isAccepted === "Approved" &&
                              item?.status === true && 
                              item?.establishmentName
                                ?.toLowerCase()
                                ?.includes(e.target.value?.toLowerCase())
                            ) {
                              matchedData.push(item);
                            }
                          });
                          setCafe(matchedData);
                        }}
                      />
                      <FiSearch className={`${m.cafe_search_icon}`} />
                      <button
                      className= {selectedCafe?.name==="" ? `` : `${m.active}`}
                        onClick={() => {
                          if (searchData !== "") {
                            setSelectedCafe({
                              id: cafe[0]?._id,
                              name: cafe[0]?.establishmentName,
                            });
                            props.fillFields("cafe", {
                              id: cafe[0]?._id,
                              name: cafe[0]?.establishmentName,
                            });
                            handleCloses()
                          }else{
                            handleCloses()
                          }
                        }}
                      >
                        Done
                      </button>
                    </div>

                    {/* TAGGED BADGE */}

                    {selectedCafe?.name !== "" && (
                      <>
                        <p>Tagged</p>
                        <div className={`${m.cafe_tagged_list}`}>
                          <p>
                            {" "}
                            <MdClose
                              className={`${m.tagged_icon}`}
                              style={{ cursor: "pointer" }}
                              onClick={() =>{
                                setSelectedCafe({
                                  id: "",
                                  name: "",
                                })
                                const list:any[] = []
                                cafeList?.forEach((item: any) => {
                                  if (item?.isAccepted === "Approved" && item?.status === true) {
                                    list.push(item);
                                  }
                                });
                                setCafe(list);
                              }}
                            />
                            {selectedCafe?.name}
                          </p>
                        </div>
                      </>
                    )}

                    {cafe.length>0 && <p>Suggestions</p>}

                    <div>
                      {cafe?.map((item: any, index: number) => {
                        return (
                          <div
                            className={`${m.tag_your_cafe_list}`}
                            key={`${index}`}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={
                                item?.pictures[0]?.imageUrl
                              ? item?.pictures[0]?.imageUrl
                              : item?.images?.length > 0
                              ? item?.images[0]
                              : coffeeShop1
                              }
                              alt="coffeeShop"
                            />
                            <div
                              className={`${m.tag_your_cafe_list_detail}`}
                              onClick={() => {
                                setSelectedCafe({
                                  id: item?._id,
                                  name: item?.establishmentName,
                                });
                                setSearchData("")
                                props.fillFields("cafe", {
                                  id: item?._id,
                                  name: item?.establishmentName,
                                });
                                setCafe([])
                              }}
                            >
                              <h3>{item?.establishmentName}</h3>
                              <p>
                                {item?.streetAddress
                                  ? `${item?.streetAddress}, `
                                  : ""}
                                {item?.city ? `${item?.city}, ` : ""}
                                {item?.state}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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

export default TagYourCafe;
