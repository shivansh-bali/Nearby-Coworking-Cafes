import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { DeletePopup } from "../../../components/Admin/Modals";
import { Switch } from "@mui/material";
import { BiDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { changeUserStatus } from "../../../redux_toolkit/adminReducer/userReducer";

const StatusButton = (props: any) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <ul className={`${tb.actionTable}`}>
          <li>
            <button
              className={`btn ${tb.edit}`}
              onClick={() => navigate("/admin/user")}
            >
              <BiDetail />
            </button>
          </li>
          <li>
            <button className={`btn ${tb.edit}`} onClick={handleShow}>
              <MdEdit />
            </button>
          </li>
        </ul>
      </div>

      <DeletePopup show={show} handleClose={handleClose} />
    </>
  );
};
const UserStatus = (props: any) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Switch
        defaultChecked={props?.status?.status === true ? true : false}
        onClick={() => dispatch(changeUserStatus(props?.status?._id))}
      />
    </div>
  );
};
const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 100 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
  { field: "mobileNumber", headerName: "Phone Number", flex: 1, minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 120,
    renderCell: (row: any) => <UserStatus status={row?.row} />,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => <StatusButton params={params} />,
  },
];

export default function UserDataGrid(props: any) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={props.userData}
        autoHeight
        hideFooterPagination={true}
        rowHeight={48}
        headerHeight={48}
        checkboxSelection
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
