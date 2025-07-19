import React, { useEffect, useState } from "react";
import cx from "./CafeDescription.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  allCafe,
  cafeResolution,
  changeCafeStatus,
  singleCafeData,
  updateCafe2,
} from "../../../redux_toolkit/reducer/cafeReducer";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";

import {
  singleBusinessClaim,
  singleBusinessRecommend,
  singleClaimData,
  singleRecommendData,
  updateClaimResult,
  updateRecommendResult,
} from "../../../redux_toolkit/globalReducer/cafeClaimReducer";
import {
  About,
  BusinessInformation,
  Images,
  PersonalDetails,
  Restrictions,
  SocialLinks,
  TimeLimit,
  Timings,
  UploadDocuments,
} from "./Components";
import Amenities from "./Components/Amenities";
import RejectRequest from "../../../components/Admin/Modals/RejectRequest";
import Reviews from "./Components/Reviews";
import ConfirmationPopup from "../../../components/Admin/Modals/ConfirmationPopup";

const EditBusiness = () => {
  const [edit, setEdit] = useState(true);
  const [cafeData, setCafeData] = useState<any>();
  const [rejectPopup, setRejectPopUp] = useState(false);
  const param: any = useParams();
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const claimState = useSelector((state: any) => state.cafeClaimReducer);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (state?.page === "businessClaim") {
      dispatch(singleBusinessClaim(param?.id));
    } else if (state?.page === "businessRecommend") {
      dispatch(singleBusinessRecommend(param?.id));
    } else {
      dispatch(allCafe(param?.id));
    }
  }, [
    param?.id,
    dispatch,
    cafeState.updateCafeState,
    cafeState.cafeResolutionState,
    state.page,
  ]);
  useEffect(() => {
    if (claimState.businessClaimState > 0 && state.page === "businessClaim") {
      if (singleClaimData) {
        if (singleClaimData?.cafeId) {
          let { cafeId, ...restItems } = singleClaimData;
          let newItem: any = {};
          if (singleClaimData?.cafeId) {
            let { _id, ...rest } = singleClaimData?.cafeId;
            newItem = {
              ...restItems,
              ...rest,
              idOfCafe: _id,
            };
          }
          setCafeData(newItem);
        } else {
          setCafeData(singleClaimData);
        }
      }
    } else if (state.page === "businessRecommend") {
      setCafeData(singleRecommendData);
    }
    if (cafeState.allCafeState > 0 && state.page === "businessRequest") {
      setCafeData(singleCafeData);
    }
  }, [
    cafeState.allCafeState,
    state.page,
    claimState.businessClaimState,
    cafeData?.openHours,
  ]);

  const handleChange = ({ e, type }: any) => {
    setCafeData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const requestAction = async ({ success }: any) => {
    let res: any = {};
    if (success) {
      if (state.page === "businessRequest")
        res = await dispatch(
          cafeResolution({
            id: cafeData?._id,
            resolution: "Approved",
            message: `Congrats! Your request to claim your listing has been approved. 
            Click the link below to access your business dashboard:\n
            https://syncremote.co
            \n\n
            We are so excited to have you as part of our community. For any questions or feedback, 
            please reach out to us at hello@syncremote.co. `,
          })
        );
      else if (state.page === "businessClaim") {
        res = await dispatch(
          updateClaimResult({
            id: cafeData?._id,
            resolution: "Approved",
            message: `Congrats! Your request to claim your listing has been approved. 
            Click the link below to access your business dashboard:\n
            https://syncremote.co
            \n\n
            We are so excited to have you as part of our community. For any questions or feedback, 
            please reach out to us at hello@syncremote.co. `,
          })
        );
      } else if (state.page === "businessRecommend") {
        res = await dispatch(
          updateRecommendResult({
            id: cafeData?._id,
            resolution: "Approved",
            message: `Congrats! Your recommendation has been approved. 
            Click the link below to access your recommended cafe:\n
            https://syncremote.co/cafe-details/${cafeData?._id}
            \n\n
            For any questions or feedback, please reach out to us at hello@syncremote.co. `,
          })
        );
      }
      if (res?.payload?.success) {
        navigate("/admin");
      }
    } else {
      setRejectPopUp(true);
    }
  };
  const postChanges = async ({ success }: any) => {
    setEdit(true);
    if (success) {
      dispatch(updateCafe2({ body: cafeData, id: cafeData?._id }));
    } else {
      dispatch(allCafe(cafeData?._id));
    }
  };
  const statusManage = () => {
    dispatch(changeCafeStatus(cafeData?._id));
    setShow(false);
  };
  const hideContent =
    cafeData?.isApproved === "pending" || cafeData?.isAccepted === "pending";

  return (
    <div className={`${st.pageWrapper}  `}>
      {rejectPopup && (
        <RejectRequest
          show={rejectPopup}
          handleClose={() => setRejectPopUp(false)}
          id={cafeData._id}
          page={state.page}
        />
      )}

      {hideContent ? (
        <div className={cx.buttonContainer}>
          <button
            className={cx.primary}
            onClick={() => requestAction({ success: false })}
          >
            Reject
          </button>
          <button
            className={cx.secondary}
            onClick={() => requestAction({ success: true })}
          >
            Approve
          </button>
        </div>
      ) : !edit ? (
        <div className={cx.buttonContainer}>
          <button
            className={cx.primary}
            onClick={() => postChanges({ success: false })}
          >
            Cancel
          </button>
          <button
            className={cx.secondary}
            onClick={() => postChanges({ success: true })}
          >
            Save
          </button>
        </div>
      ) : (
        <div className={cx.buttonContainer}>
          <button
            className={cafeData?.status ? cx.primary : cx.secondary}
            onClick={() => setShow(true)}
          >
            {cafeData?.status ? "Deactivate" : "Activate"}
          </button>
          <ConfirmationPopup
            show={show}
            handleClose={() => setShow(false)}
            manageStatus={statusManage}
            value={cafeData?.status}
            content={cafeData?.name}
          />
        </div>
      )}
      <BusinessInformation
        cafeData={cafeData}
        edit={edit}
        setEdit={setEdit}
        handleChange={handleChange}
      />
      {cafeData?.uploadDocuments?.length > 0 && (
        <UploadDocuments
          cafeData={cafeData}
          edit={edit}
          handleChange={handleChange}
          setCafeData={setCafeData}
        />
      )}

      <SocialLinks
        cafeData={cafeData}
        edit={edit}
        handleChange={handleChange}
      />
      {!hideContent && (
        <About cafeData={cafeData} edit={edit} handleChange={handleChange} />
      )}

      <Timings
        cafeData={cafeData}
        edit={edit}
        handleChange={handleChange}
        setCafeData={setCafeData}
      />

      {!hideContent && (
        <TimeLimit
          cafeData={cafeData}
          edit={edit}
          handleChange={handleChange}
        />
      )}
      {!hideContent && (
        <Restrictions
          cafeData={cafeData}
          edit={edit}
          handleChange={handleChange}
        />
      )}
      {((cafeData?.facilities &&
        cafeData?.standoutFacilities &&
        [...cafeData?.facilities, ...cafeData?.standoutFacilities]?.length >
          1) ||
        !edit) && (
        <Amenities cafeData={cafeData} edit={edit} setCafeData={setCafeData} />
      )}
      {((cafeData?.pictures?.length > 0 &&
        [...cafeData?.pictures]?.filter((item: any) => item.imageUrl).length >
          0) ||
        cafeData?.images?.length > 0 ||
        !edit) && (
        <Images
          cafeData={cafeData}
          edit={edit}
          handleChange={handleChange}
          setCafeData={setCafeData}
        />
      )}
      {/* {((cafeData?.pictures?.length > 0 &&
        [...cafeData?.pictures]?.filter((item: any) => item.imageUrl).length >
          0) ||
        !edit) && (
        <Images
          cafeData={cafeData}
          edit={edit}
          handleChange={handleChange}
          setCafeData={setCafeData}
        />
      )} */}

      <PersonalDetails
        cafeData={cafeData}
        edit={edit}
        handleChange={handleChange}
      />

      {
        cafeData?.recommendBy && cafeData?.recommendBy !== "unknown user" && <div className={cx.container}>
        <div className={cx.header}>
          <h4>Recommend Details</h4>
        </div>
        <div className={cx.infoitems}>
              <div className={cx.item} >
                <h6>Full Name</h6>
                  <input
                    type="text"
                    value={cafeData?.recommendBy?.name}
                    disabled
                  />
              </div>
              <div className={cx.item} >
                <h6>Email</h6>
                  <input
                    type="text"
                    value={cafeData?.recommendBy?.email}
                    disabled
                  />
              </div>
        </div>
      </div>
      }
      {((cafeData?.ratingReviews && cafeData?.ratingReviews?.length > 0) || !edit) && (
        <Reviews cafeData={cafeData} edit={edit} handleChange={handleChange} />
      )}
    </div>
  );
};

export default EditBusiness;
