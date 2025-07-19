import { MdClose } from "react-icons/md";
import cx from "./Modal.module.scss";
import { PinSmall } from "../../../assets/images";
import { Modal } from "react-bootstrap";
import PickupAddressM from "./PickupAddressM";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { profile } from "../../../redux_toolkit/reducer/profileReducer";
import {
  increaseLocalLocation,
  localLocation,
  saveLocation,
} from "../../../redux_toolkit/reducer/registrationReducer";
import { localLatLng } from "../../../redux_toolkit/reducer/registrationReducer";
import { useDispatch } from "react-redux";
import { increaseMapState } from "../../../redux_toolkit/globalReducer/mapReducer";

const ChooseAddress = (props: any) => {
  let { show, handleClose } = props;
  const dispatch = useDispatch();
  const [locationshow, setlocationShow] = useState(false);
  const handlelocationClose = () => setlocationShow(false);
  const handlelocationShow = () => setlocationShow(true);

  // ------------------------------------------------
  const [locationBlocked, setLocationBlocked] = useState(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          // Handle location access success here
          console.log("Location accessed:", position);
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
      console.log("Geolocation is not supported in this browser.");
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
        scrollable
        show={show}
        aria-labelledby="example-modal-sizes-title-xl"
        size="xl"
        onHide={handleClose}
        className={`${cx.modalCts} ${cx.modalMin}`}
      >
        <Modal.Header style={{ justifyContent: "left", alignItems: "center" }}>
          <Modal.Title> Choose your address</Modal.Title>
          <button
            className={`${cx.closeIcon}`}
            title="Close"
            onClick={handleClose}
            style={{ top: "15px", right: "7px" }}
          >
            <MdClose />
          </button>
        </Modal.Header>

        <Modal.Body style={{ padding: "15px 15px" }}>
          <div className={` ${cx.friendlistContainer}`}>
            <div className={` ${cx.addresListContainer}`}>
              <div className={cx.addresListContainerInner}>
                {profile?.data?.searchLocation?.map((item: any) => {
                  return (
                    <button
                      className={
                        localLocation.placeName === item?.placeName
                          ? `d-flex flex-row  align-items-center ${cx.addressContainer} ${cx.active}`
                          : `d-flex flex-row  align-items-center ${cx.addressContainer}`
                      }
                      onClick={() => {
                        dispatch(localLatLng(item));
                        props.placeName(item?.placeName);
                        dispatch(increaseLocalLocation());
                        dispatch(increaseMapState());
                        handleClose();
                      }}
                    >
                      <img src={PinSmall} alt="" />
                      <p>{item?.placeName}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <div className={`${cx.addLocationBtn} text-center`}>
            <NavLink
              to="#"
              style={{ paddingRight: "40px" }}
              onClick={() => {
                handleClose();
                handlelocationShow();
              }}
            >
              {" "}
              Add Another Address
            </NavLink>
            <NavLink
              to="#"
              onClick={() => {
                props.placeName(saveLocation?.placeName);
                dispatch(localLatLng(saveLocation));
                dispatch(increaseLocalLocation());
                dispatch(increaseMapState());
                handleClose();
                requestLocation();
              }}
            >
              {" "}
              Choose your current location
            </NavLink>
          </div>
        </Modal.Footer>
      </Modal>

      <PickupAddressM
        locationshow={locationshow}
        handlelocationClose={handlelocationClose}
        placeName={props.placeName}
      />
    </>
  );
};

export default ChooseAddress;
