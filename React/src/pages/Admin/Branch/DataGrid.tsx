import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiDetail } from "react-icons/bi";
import {
  cafeRes,
  changeCafeStatus,
} from "../../../redux_toolkit/reducer/cafeReducer";
import ConfirmationPopup from "../../../components/Admin/Modals/ConfirmationPopup";

const StatusButton = (props: any) => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <ul className={`${tb.actionTable}`}>
          <li>
            {props?.str ? (
              <p
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/admin/cafe-details/${props?.params?._id}`, {
                    state: { page: "businessRequest" },
                  })
                }
              >
                {props.params.establishmentName}
              </p>
            ) : (
              <div
                className={`btn ${tb.edit}`}
                title="Edit"
                onClick={() =>
                  navigate(`/admin/cafe-details/${props?.params?._id}`, {
                    state: { page: "businessRequest" },
                  })
                }
              >
                <BiDetail />
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};
export const CafeStatus = (props: any) => {
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const statusManage = () => {
    dispatch(changeCafeStatus(props?.params?._id));
  };
  useEffect(() => {
    if (cafeState.updateCafeState > 0 && cafeRes.success === true) {
      handleClose();
    }
  }, [cafeState.updateCafeState]);
  return (
    <div>
      <button
        onClick={() => handleShow()}
        style={{
          borderRadius: "5px",
          color: !props?.params?.status ? "#ff7272 " : " #00cc00",
          width: "100px",
          fontWeight: "500",
          fontSize: "14px",
          border: !props?.params?.status
            ? "1px solid #ff7272"
            : "1px solid  #00cc00",
          fontFamily: "Plus Jakarta Sans",
          backgroundColor: "white",
        }}
      >
        {props?.params?.status ? "Active" : "Deactive"}
      </button>
      <ConfirmationPopup
        show={show}
        handleClose={handleClose}
        manageStatus={statusManage}
        value={props?.params.status}
        content={props.name}
      />
    </div>
  );
};
const columns = [
  { field: "id", headerName: "Sr No", flex: 1, minWidth: 60 },
  {
    field: "establishmentName",
    headerName: "Business Name",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => (
      <StatusButton str={true} params={params.row} />
    ),
  },
  { field: "streetAddress", headerName: "Address", flex: 1, minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (row: any) => <CafeStatus params={row.row} />,
  },
  {
    field: "action",
    headerName: "Profile",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => <StatusButton params={params.row} />,
  },
];

export default function UserDataGrid(props: any) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={props.cafeData}
        autoHeight
        rowHeight={48}
        headerHeight={48}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
