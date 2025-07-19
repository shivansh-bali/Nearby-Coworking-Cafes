import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { NavLink } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { Status } from "../../../components/Admin/Forms";
import { DeletePopup } from "../../../components/Admin/Modals";

const StatusButton = (props: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <ul className={`${tb.actionTable}`}>
          <li>
            <NavLink className={`btn ${tb.edit}`} title="Edit" to="#">
              <MdEdit />
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className={`btn ${tb.delete}`}
              title="Delete"
              onClick={handleShow}
            >
              <AiFillDelete />
            </button>
          </li>
          <li>
            <Status />
          </li>
        </ul>
      </div>

      <DeletePopup show={show} handleClose={handleClose} />
    </>
  );
};
const columns = [
  { field: "id", headerName: "Sr No", flex: 1, minWidth: 60 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 60 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
  { field: "branchname", headerName: "Branch Name", flex: 1, minWidth: 120 },
  { field: "designation", headerName: "Designation", flex: 1, minWidth: 150 },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => <StatusButton params={params} />,
  },
];

const row = [
  {
    id: 1,
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    branchname: "Jaipuriya Branch",
    designation: "Manager",
    action: "action",
  },
];

export default function UserDataGrid() {
  //const navigate = useNavigate();
  // const handleRowClick = (params:any) => {
  //   navigate(`/courses/class/class-details`);
  // };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={row}
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
