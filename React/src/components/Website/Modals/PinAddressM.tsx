import React, { useCallback, useEffect, useState } from "react";
import cx from "./Modal.module.scss";

import st from "../../../assets/stylesheet/style.module.scss";

import { Modal, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { PinSmall } from "../../../assets/images";
import { Map } from "react-map-gl";
import {
  increaseLocalLocation,
  localLatLng,
  localLocation,
  saveLatLng,
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import GeocoderModal from "./GeocoderModal";
import { useDispatch, useSelector } from "react-redux";
import { accessToken } from "../../../redux_toolkit/reducer/profileReducer";
import { increaseMapState } from "../../../redux_toolkit/globalReducer/mapReducer";

const PinAddressM = (props: any) => {
  let { placeName, pinshow, handlepinClose } = props;
  // const mapState = useSelector((state: any) => state.mapReducer);
  const profileState = useSelector((state: any) => state.profileReducer);
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState<any>({
    latitude: saveLocation.lat,
    longitude: saveLocation.lng,
    place: saveLocation.placeName,
  });
  const [mapToken, setMapToken] = useState("");
  useEffect(() => {
    setMapToken(accessToken);
  }, [profileState.mapFuncState]);
  const updateLatLng = useCallback((coord: any, places: any) => {
    setViewport(() => {
      return { latitude: coord[0], longitude: coord[1], place: places };
    });
  }, []);
  const onMove = useCallback(({ viewState }: any) => {
    setViewport({
      latitude: viewState.latitude,
      longitude: viewState.longitude,
      place: localLocation.placeName,
    });
  }, []);
  useEffect(() => {
      setViewport({
        latitude: saveLocation.lat,
        longitude: saveLocation.lng,
        place: saveLocation.placeName,
        zoom: 12,
      });
  }, []);
  return (
    <>
      <Modal
        centered
        show={pinshow}
        onHide={handlepinClose}
        className={`${cx.modalCts} ${cx.modalMin}`}
        aria-labelledby="example-modal-sizes-title-xl"
        size="xl"
      >
        <Modal.Header style={{ justifyContent: "Left", alignItems: "center" }}>
          <Modal.Title>Pin your address on the map</Modal.Title>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={handlepinClose}
            style={{ top: "15px", right: "7px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "15px 15px" }}>
          <Col lg={12} className={cx.selectOnMap2}>
            <div className={cx.mapView}>
              <Map
                {...viewport}
                onMove={onMove}
                mapboxAccessToken={mapToken}
                mapStyle="mapbox://styles/adminsync/clgow0rik00gm01qmhapyhbix"
                minZoom={2}
                maxZoom={30}
              >
                <GeocoderModal
                  updateLatLng={updateLatLng}
                  coordinates={viewport}
                />
              </Map>
            </div>
            <div className="d-flex mt-3">
              <div>
                <img src={PinSmall} alt="" />
              </div>
              <p>{viewport.place}</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className={` ${cx.btnSubmit} text-center mt-4`}>
              <button
                className={`btn ${st.btn2} ${st.active2}`}
                onClick={() => {
                  placeName(viewport.place);
                  dispatch(
                    localLatLng({
                      lat: viewport.latitude,
                      lng: viewport.longitude,
                      placeName: viewport.place,
                    })
                  );
                  dispatch(saveLatLng({
                    lat: viewport.latitude,
                      lng: viewport.longitude,
                      placeName: viewport.place,
                  }))
                  setViewport({
                    latitude: viewport.latitude,
                    longitude: viewport.longitude,
                    place: viewport.place,
                    zoom: 12,
                  });
                  dispatch(increaseLocalLocation());
                    dispatch(increaseMapState());
                  handlepinClose();
                }}
              >
                Confirm address
              </button>
            </div>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PinAddressM;
