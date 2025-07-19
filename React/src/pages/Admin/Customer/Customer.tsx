import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { Card } from "react-bootstrap";
import DataGrid from "./DataGrid";
import { AddCustomer } from "../../../components/Admin/Modals";
import { AiOutlineUserAdd } from "react-icons/ai";
import {
  allUserData,
  allUserDataList,
  changeAddUserState,
  userRes,
} from "../../../redux_toolkit/adminReducer/userReducer";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export default function Customer() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.userReducer);
  const [userData, setUserData] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let allData: any[] = [];
    allUserDataList?.map((item: any, index: number) => {
      allData.push({
        id: index + 1,
        ...item,
      });
      return allData;
    });
    setUserData(allData);
  }, [userState.allUserState]);

  useEffect(() => {
    if (userState.addUserState > 0) {
      if (userRes.success === true) {
        toast.success(userRes.message);
        handleClose();
        dispatch(allUserData());
        dispatch(changeAddUserState());
      } else {
        toast.error(userRes.message);
        dispatch(changeAddUserState());
      }
    }
  }, [dispatch, userState.addUserState]);
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <ToastContainer autoClose={3000} limit={1} />
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>User List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn ${st.themeBtn}`} onClick={handleShow}>
                <AiOutlineUserAdd className={st.icon} />
                Add New User
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <DataGrid userData={userData} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <AddCustomer show={show} handleClose={handleClose} />
    </>
  );
}
