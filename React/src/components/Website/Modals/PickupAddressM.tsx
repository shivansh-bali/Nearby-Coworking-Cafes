import React, { useEffect, useState } from "react";
import m from "./Modal.module.scss";
import { Modal, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import PinAddressM from "./PinAddressM";
import { NavLink, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { AddressAutofill } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {
  increaseLocalLocation,
  localLatLng,
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch, useSelector } from "react-redux";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";
import {
  increaseMapState,
  sliderMiles,
  sliderValue,
} from "../../../redux_toolkit/globalReducer/mapReducer";
import { cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import { cafeImage } from "../../../assets/images";

const PickupAddressM = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state: any) => state.profileReducer);
  useEffect(() => {
    mapboxgl.accessToken = accessToken;
  }, [profileState.mapFuncState]);
  const [pinshow, setpinShow] = useState(false);
  const handlepinClose = () => setpinShow(false);
  const handlepinShow = () => setpinShow(true);
  const [value, setValue] = React.useState("");
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [searchCafe, setSearchCafe] = useState("Search by cafe name");
  const [cafe, setCafe] = useState<any[]>([]);
  const [showContent, setShowContent] = useState(false);

  // ------------------------------------------------
  const [locationBlocked, setLocationBlocked] = useState(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          // Handle location access success here
          console.log('Location accessed:', position);
        },
        // Error callback
        (error) => {
          // Handle location access error here
          if (error.code === error.PERMISSION_DENIED) {
            setLocationBlocked(true);
          }
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  };

  const showLocationInstructions = () => {
    alert(
      "To enable location access for this website:\n\n" +
      "1. Click on the lock or info icon in the browser's address bar.\n" +
      "2. Select 'Site settings' or 'Permissions'.\n" +
      "3. Look for 'Location' in the list and choose 'Allow' or 'Ask' from the dropdown.\n" +
      "4. Reload the page to apply the changes."
    );
    setLocationBlocked(false)
  };

  useEffect(() => {
    if (locationBlocked) {
      showLocationInstructions();
    }
  }, [locationBlocked]);

  return (
    <>
      <Modal
        centered
        show={props.locationshow}
        onHide={() => {
          props.handlelocationClose();
          setSearchCafe("Search by cafe name");
        }}
        className={`${m.modalCts} ${m.modalMin}`}
        aria-labelledby="example-modal-sizes-title-xl"
        size="xl"
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title>
            Add or search your address{" "}
            <button
              className={`btn ms-2 ${m.changeBtn}`}
              onClick={() => {
                if (searchCafe === "Search by cafe name") {
                  setSearchCafe("Search by address");
                  setValue("");
                } else {
                  setSearchCafe("Search by cafe name");
                  setValue("");
                }
              }}
            >
              {searchCafe}
            </button>
          </Modal.Title>
          <button
            className={`${m.closeIcon}`}
            title="Close"
            onClick={() => {
              props.handlelocationClose();
              setSearchCafe("Search by cafe name");
            }}
            style={{ top: "15px", right: "7px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "10px 10px" }}>
          <Row>
            <Col lg={12} style={{ position: "relative" }}>
              <div className={`${m.searchBar}`}>
                {searchCafe === "Search by cafe name" ? (
                  <div className={`${m.searchBarLarge}`}>
                    <form style={{ width: "100%" }}>
                      <AddressAutofill accessToken={accessToken}>
                        <input
                          autoComplete="shipping address-line1"
                          value={value}
                          onChange={(e: any) => {
                            setError("");
                            setValue(e.target.value);
                          }}
                        />
                      </AddressAutofill>
                      <input
                        autoComplete="shipping address-level2"
                        value={city}
                        onChange={(e: any) => {
                          setCity(e.target.value);
                          setValue(value + " " + e.target.value);
                        }}
                        style={{
                          visibility: "hidden",
                          height: "0px",
                          width: "0px",
                          position: "absolute",
                        }}
                      />
                      <input
                        autoComplete="shipping country"
                        onChange={(e: any) => {
                          setValue(value + " " + e.target.value);
                        }}
                        style={{
                          visibility: "hidden",
                          height: "0px",
                          width: "0px",
                          position: "absolute",
                        }}
                      />
                      {error}
                    </form>
                    <button
                      onClick={async () => {
                        try {
                          const response = await axios.get(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                              value
                            )}.json?access_token=${mapboxgl.accessToken}`
                          );
                          const features = response.data.features;
                          if (features.length > 0) {
                            const [lng, lat] = features[0].center;
                            props.placeName(value);
                            props.handlelocationClose();
                            setSearchCafe("Search by cafe name");
                            dispatch(sliderValue(sliderMiles));
                            dispatch(
                              localLatLng({ lat, lng, placeName: value })
                            );
                            dispatch(increaseLocalLocation());
                            dispatch(increaseMapState());
                          } else {
                            setError("No matching results found.");
                          }
                        } catch (error) {
                          console.log(
                            "Error retrieving geocoding data:",
                            error
                          );
                        }
                      }}
                    >
                      <RiSearchLine />
                    </button>
                  </div>
                ) : (
                  <div className={`${m.searchBarLarge}`}>
                    <form style={{ width: "100%" }}>
                      <input
                        value={value}
                        onChange={(e: any) => {
                          setValue(e.target.value);
                          if (e.target.value !== "") {
                            let cafes: any[] = [];
                            cafeList?.forEach((item: any) => {
                              if (
                                item?.isAccepted === "Approved" &&
                                item?.status === true &&
                                item?.establishmentName
                                  ?.toLowerCase()
                                  ?.includes(e.target.value?.toLowerCase())
                              ) {
                                cafes.push(item);
                              }
                            });
                            if (cafes.length > 0) {
                              setCafe(cafes);
                              setShowContent(false);
                            } else {
                              setShowContent(true);
                            }
                          } else {
                            setCafe([]);
                          }
                        }}
                      />
                    </form>
                    <button
                      onClick={() => {
                        if (value !== "") {
                          let cafes: any[] = [];
                          cafeList?.forEach((item: any) => {
                            if (
                              item?.isAccepted === "Approved" &&
                              item?.status === true &&
                              item?.establishmentName
                                ?.toLowerCase()
                                .includes(value.toLowerCase())
                            ) {
                              cafes.push(item);
                            }
                          });
                          setCafe(cafes);
                        } else {
                          setCafe([]);
                        }
                      }}
                    >
                      <RiSearchLine />
                    </button>
                    {cafe?.length > 0 && (
                      <span className={`${m.dropdownmenu}`}>
                        <ul>
                          {!showContent &&
                            cafe?.map((e: any) => {
                              return (
                                <li
                                  onClick={() =>
                                    navigate(`/cafe-details/${e?._id}`)
                                  }
                                >
                                  <img src={e?.pictures[0]?.imageUrl
                                    ? e?.pictures[0]?.imageUrl
                                    : e?.images?.length > 0 ? e?.images[0] : cafeImage} alt="cafeImage" />
                                  <div className={`${m.bodyList}`}>
                                    <h6>{e?.establishmentName}</h6>
                                    <p>{e?.streetAddress}</p>
                                  </div>
                                </li>
                              );
                            })}
                          {showContent && (
                            <li>
                              Can't find this place?{" "}
                              <span
                                className={`${m.linkPopup}`}
                                onClick={() => navigate("/recommend")}
                              >
                                Add it to Sync!
                              </span>
                            </li>
                          )}
                        </ul>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Col>
            <Col lg={12}>
              <div className={`${m.addLocationBtn} text-center mt-4`}>
                <NavLink
                  to="#"
                  onClick={() => {
                    props.handlelocationClose();
                    setSearchCafe("Search by cafe name");
                    handlepinShow();
                  }}
                >
                  {" "}
                  Or set your location on the map{" "}
                </NavLink>
                <NavLink
                  to="#"
                  style={{ paddingLeft: "30px" }}
                  onClick={() => {
                    props.placeName(saveLocation?.placeName);
                    dispatch(localLatLng(saveLocation));
                    dispatch(increaseLocalLocation());
                    dispatch(increaseMapState());
                    props.handlelocationClose();
                    setSearchCafe("Search by cafe name");
                    requestLocation()
                  }}
                >
                  {" "}
                  Choose your current location
                </NavLink>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <PinAddressM
        pinshow={pinshow}
        handlepinClose={handlepinClose}
        placeName={props.placeName}
      />
    </>
  );
}

export default PickupAddressM;
