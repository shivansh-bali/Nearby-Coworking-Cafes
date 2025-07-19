import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import { useNavigate } from "react-router-dom";
import tb from "../../../assets/stylesheet/datatable.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import RejectRequest from "../../../components/Admin/Modals/RejectRequest";
import { BiDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { cafeResolution } from "../../../redux_toolkit/reducer/cafeReducer";

const StatusButton = (props: any) => {
  let data: any = props?.params?.row;
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
              onClick={() => navigate(`/admin/cafe-details/${data?._id}`)}
            >
              <BiDetail />
            </button>
          </li>
          <li>
            <NavLink
              className={`btn ${tb.edit}`}
              title="Edit"
              to="#"
              onClick={() => {
                dispatch(
                  cafeResolution({
                    id: data?._id,
                    resolution: "Approved",
                    message: `Congrats! Your request to claim your listing has been approved. 
            Click the link below to access your business dashboard:\n
            https://syncremote.co
            \n\n
            We are so excited to have you as part of our community. For any questions or feedback, 
            please reach out to us at hello@syncremote.co. `,
                  })
                );
              }}
            >
              <AiOutlineCheck />
            </NavLink>
          </li>
          {data?.isAccepted !== "Rejected" && (
            <li>
              <button
                type="button"
                className={`btn ${tb.delete}`}
                title="Delete"
                onClick={handleShow}
              >
                <AiOutlineClose />
              </button>
            </li>
          )}
        </ul>
      </div>

      <RejectRequest show={show} handleClose={handleClose} id={data?._id} />
    </>
  );
};

const columns = [
  { field: "id", headerName: "Sr No", flex: 1, minWidth: 60 },
  { field: "name", headerName: "Coffeeshop Name", flex: 1, minWidth: 200 },
  { field: "streetAddress", headerName: "Address", flex: 1, minWidth: 120 },
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
        rows={props.cafeData}
        pagination
        rowsPerPageOptions={[5, 10, 15]}
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
