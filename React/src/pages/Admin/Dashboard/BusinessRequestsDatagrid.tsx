import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import cx from "./Dashboard.module.scss";
import { profile_icon } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import IconGenerator from "../../../components/Shared/IconGenerator";

export default function BusinessRequestsDatagrid({
  data,
  page,
  changeButton,
}: any) {
  const ProfileImage = (props: any) => {
    const navigate = useNavigate();
    const handleClick = (id: "string") => {
      navigate(`/admin/cafe-details/${id}`, {
        state: {
          page: page,
        },
      });
    };
    return (
      <div
        className={`d-flex  ${cx.cafeDetail}`}
        onClick={() => handleClick(props?.params?._id)}
      >
        {props?.params?.profileImage ? (
          <img
            src={profile_icon}
            height="50px"
            style={{
              borderRadius: "25px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            alt="profilePicture"
          />
        ) : (
          <IconGenerator name={props?.params?.name} />
        )}
        <p style={{ margin: "0", paddingTop: "10px" }}>
          {props?.params?.name?.split(" ")[0]}
        </p>
      </div>
    );
  };
  const EstablishmentDetails = (props: any) => {
    return (
      <div>
        <p style={{ margin: "0px", fontWeight: "600" }}>
          {props?.params?.establishmentName}
        </p>

        <p style={{ margin: "0px" }}>{props?.params?.city}</p>
      </div>
    );
  };
  const DatePicker = (props: any) => {
    const date: any = new Date(props?.params?.createdAt).toLocaleString(
      "en-us",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    return date;
  };
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
    { field: "phone", headerName: "Phone ", flex: 1, minWidth: 140 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },

    { field: "role", headerName: "Role", flex: 1, minWidth: 80 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 180,
      renderCell: (params: any) => <DatePicker params={params.row} />,
    },
  ];

  const [cafeData, setCafeData] = useState(data);
  useEffect(() => {
    if (changeButton === "b") {
      const filteredList = data.filter(
        (item: any) => item.isClaimed === true && item?.isAccepted === "Approved"
      );
      setCafeData(filteredList);
    } else if (changeButton === "c") {
      const filteredList = data.filter(
        (item: any) => item.isAccepted === "Rejected"
      );
      setCafeData(filteredList);
    } else if (changeButton === "a") {
      const filteredList = data.filter(
        (item: any) => item.isAccepted === "pending"
      );
      setCafeData(filteredList);
    }
  }, [changeButton, data]);
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
