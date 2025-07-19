import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { Card } from "react-bootstrap";
import DataGrid from "./DataGrid";
import { AddCustomer } from "../../../components/Admin/Modals";

import {
  allUserData,
  allUserDataList,
  changeAddUserState,
  userRes,
} from "../../../redux_toolkit/adminReducer/userReducer";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const userState = useSelector((state: any) => state.userReducer);
  const [userData, setUserData] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [rejectedData, setRejectedData] = useState(false);
  useEffect(() => {
    if (!rejectedData) {
      let count = 0;
      let allData: any[] = [];
      allUserDataList?.map((item: any, index: number) => {
        if (item.status) {
          allData.push({
            id: count + 1,
            ...item,
          });
          count = count + 1;
        }
        return allData;
      });
      setUserData(allData);
    } else {
      let count = 0;
      let allData: any[] = [];
      allUserDataList?.map((item: any, index: number) => {
        if (!item.status) {
          allData.push({
            id: count + 1,
            ...item,
          });
          count = count + 1;
        }
        return allData;
      });

      setUserData(allData);
    }
    setLoader(false);
  }, [userState.allUserState, rejectedData]);

  useEffect(() => {
    if (userState.addUserState > 0) {
      if (userRes.success === true) {
        handleClose();
        dispatch(allUserData());
        dispatch(changeAddUserState());
      } else {
        dispatch(changeAddUserState());
      }
    }
  }, [dispatch, userState.addUserState]);
  useEffect(() => {
    dispatch(allUserData());
  }, [dispatch]);
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>User List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  setRejectedData(!rejectedData);
                }}
              >
                {rejectedData ? "Activated Accounts " : " Deactivated Accounts"}
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <DataGrid userData={userData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <AddCustomer show={show} handleClose={handleClose} />
    </>
  );
}
