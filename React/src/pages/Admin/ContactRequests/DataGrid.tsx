import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiFillMessage } from "react-icons/ai";
import ShowDescription from "../../../components/Admin/Modals/ShowDescription";
import {
  allContactList,
  isContact,
} from "../../../redux_toolkit/globalReducer/contactUsReducer";
import CircularProgress from "@mui/material/CircularProgress";

const StatusButton = (props: any) => {
  let { params } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <AiFillMessage onClick={() => handleShow()} />
      </div>
      <ShowDescription
        show={show}
        handleClose={handleClose}
        message={params?.message}
      />
    </>
  );
};

const ShowDate = (props: any) => {
  let date: any = new Date(props?.params?.createdAt).toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <>
      <div>{date}</div>
    </>
  );
};

const columns = [
  { field: "id", headerName: "Sr No", flex: 1, maxWidth: 80 },
  {
    field: "firstName",
    headerName: "User Name",
    flex: 1,
    minWidth: 250,
    renderCell: (params: any) => (
      <div>
        {params?.row?.firstName} {params?.row?.lastName}
      </div>
    ),
  },

  { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
  {
    field: "createdAt",
    headerName: "Date",
    flex: 1,
    minWidth: 150,
    renderCell: (row: any) => <ShowDate params={row?.row} />,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 100,
    renderCell: (row: any) => <StatusButton params={row?.row} />,
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
        {isContact === true && allContactList.length === 0 ? (
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
        rows={props.contactData}
        autoHeight
        hideFooterPagination={false}
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
        pagination
        pageSize={5}
      />
    </div>
  );
}
