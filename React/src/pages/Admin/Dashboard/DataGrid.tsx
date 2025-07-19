import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import RejectRequest from "../../../components/Admin/Modals/RejectRequest";
import cx from "./Dashboard.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateClaimResult } from "../../../redux_toolkit/globalReducer/cafeClaimReducer";
import { BiDetail } from "react-icons/bi";
import IconGenerator from "../../../components/Shared/IconGenerator";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";

const ActionButton = (props: any) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <>
      {props.params?.isAccepted === "pending" ? (
        <div className={cx.dualButtons}>
          <button
            onClick={() => {
              handleShow();
            }}
          >
            Reject
          </button>
          <button
            onClick={() => {
              dispatch(
                updateClaimResult({
                  id: props?.params?._id,
                  resolution: "Approved",
                  message: `Congrats! Your request to claim your listing has been approved. 
            Click the link below to access your business dashboard:\n
            https://syncremote.co/businessdashboard
            \n\n
            We are so excited to have you as part of our community. For any questions or feedback, 
            please reach out to us at hello@syncremote.co. `,
                })
              );
              dispatch(allCafe())
              navigate("/admin/cafes")
            }}
          >
            Approve
          </button>
        </div>
      ) : (
        <button
          style={{
            border: "1px solid #1abf73",
            background: "transparent",
            color: "#1abf73",
            borderRadius: "5px",
          }}
          onClick={() =>
            navigate(`/admin/cafe-details/${props?.params?._id}`, {
              state: { page: "businessClaim" },
            })
          }
        >
          <BiDetail />
        </button>
      )}

      <RejectRequest
        show={show}
        handleClose={handleClose}
        id={props?.params?._id}
        page="businessClaim"
      />
    </>
  );
};
const ProfileImage = (props: any) => {
  const navigate = useNavigate();
  return (
    <div
      className={`d-flex  ${cx.cafeDetail}`}
      onClick={() =>
        navigate(`/admin/cafe-details/${props?.params?._id}`, {
          state: { page: "businessClaim" },
        })
      }
    >
      {props?.params?.profileImage ? (
        <img
          src={props?.params?.profileImage}
          height="50px"
          style={{
            borderRadius: "25px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          alt="profilePicture"
        />
      ) : (
        <IconGenerator
          name={props?.params?.name ? props?.params?.name : "not avalibale"}
        />
      )}
      <p style={{ margin: "0", paddingTop: "10px" }}>
        {props?.params?.name?.split(" ")[0]}
      </p>
    </div>
  );
};
const EstablishmentDetails = (props: any) => {
  console.log(props, "kahskjfhskahfhajksfaklf")
  return (
    <div>
      <p style={{ margin: "0px", fontWeight: "600" }}>
        {props?.params?.establishmentName || props?.params?.cafeId?.establishmentName}
      </p>

      <p style={{ margin: "0px" }}>{props?.params?.city || props?.params?.cafeId?.city}</p>
    </div>
  );
};

export default function DashboardDataGrid({ data, changeButton }: any) {
  const [cafeData, setCafeData] = useState(data);
  useEffect(() => {
    if (changeButton === "b") {
      const filteredList = data.filter(
        (item: any) => item?.isClaimed === true && item?.isAccepted === "Approved"
      );
      const filterCafeList = cafeList.filter(
        (item: any) => item?.isClaimed === true && item?.isAccepted === "Approved"
      );
      console.log([...filteredList, ...filterCafeList], "ashjhafklsdklfjlshfkl")
      setCafeData([...filteredList, ...filterCafeList]);
    } else if (changeButton === "c") {
      const filteredList = data.filter(
        (item: any) => item?.isAccepted === "Rejected" 
      );
      setCafeData(filteredList);
    } else if (changeButton === "a") {
      const filteredList = data.filter(
        (item: any) => item?.isAccepted === "pending"
      );
      setCafeData(filteredList);
    }
  }, [changeButton, data]);

  const columns = [
    {
      field: "image",
      headerName: "User",
      flex: 1,
      minWidth: 150,
      renderCell: (params: any) => <ProfileImage params={params.row} />,
    },
    {
      field: "establishmentName",
      headerName: "Establishment ",
      flex: 1,
      minWidth: 250,
      renderCell: (params: any) => <EstablishmentDetails params={params.row} />,
    },
    { field: "mobileNumber", headerName: "Phone ", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },

    { field: "role", headerName: "Role", flex: 1, minWidth: 80 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 220,
      renderCell: (params: any) => <ActionButton params={params.row} />,
    },
  ];

  return (
    <div style={{ width: "100%" }} className={tb.dataTable}>
      <DataGrid
        columns={columns}
        rows={cafeData}
        autoHeight
        rowHeight={48}
        headerHeight={48}
        getRowId={(row: any) => row._id}
      />
    </div>
  );
}
