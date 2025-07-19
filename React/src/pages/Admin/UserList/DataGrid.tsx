import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { useNavigate } from "react-router-dom";
import { DeletePopup } from "../../../components/Admin/Modals";
import { BiDetail } from "react-icons/bi";
import {
  allUserDataList,
  isData,
} from "../../../redux_toolkit/adminReducer/userReducer";
import CircularProgress from "@mui/material/CircularProgress";

const StatusButton = (props: any) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      <div>
        <ul className={`${tb.actionTable}`}>
          <li
            onClick={() => navigate(`/admin/user/${props.id}`)}
            style={{ cursor: "pointer" }}
          >
            {props.str ? (
              props.str
            ) : (
              <button className={`btn ${tb.edit}`}>
                <BiDetail />
              </button>
            )}
          </li>
        </ul>
      </div>

      <DeletePopup show={show} handleClose={handleClose} />
    </>
  );
};
const columns = [
  {
    field: "id",
    headerName: "Sr No",
    flex: 1,
    maxWidth: 80,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 150,
    renderCell: (params: any) => (
      <StatusButton str={params.row.name} id={params.row._id} />
    ),
  },
  { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
  { field: "mobileNumber", headerName: "Phone Number", flex: 1, minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (row: any) => <>{row.row.status ? "Active" : "Deactive"}</>,
  },
  {
    field: "action",
    headerName: "Profile",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => (
      <StatusButton params={params} id={params.row._id} />
    ),
  },
];

export default function UserDataGrid(props: any) {
  function NoRowsOverlay() {
    return (
      <p
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isData === true && allUserDataList.length === 0 ? (
          "No data available"
        ) : (
          <CircularProgress />
        )}
      </p>
    );
  }
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={props.userData}
        autoHeight
        rowHeight={48}
        headerHeight={48}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar, NoRowsOverlay }}
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
