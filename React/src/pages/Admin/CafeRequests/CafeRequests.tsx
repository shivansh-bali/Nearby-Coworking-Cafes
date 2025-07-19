import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  allCafe,
  cafeList,
  changeAllCafeState,
  changeCafeResolutionState,
} from "../../../redux_toolkit/reducer/cafeReducer";

export default function CafeRequests() {
  const [activeButton, setActiveButton] = useState(0);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafeData, setCafeData] = useState<any[]>([]);
  useEffect(() => {
    dispatch(allCafe());
    setLoader(false);
  }, [dispatch]);
  useEffect(() => {
    if (cafeState.cafeResolutionState > 0) {
      dispatch(allCafe());
      dispatch(changeCafeResolutionState());
    }
  }, [dispatch, cafeState.cafeResolutionState]);
  useEffect(() => {
    if (cafeState.allCafeState > 0) {
      let count: any = 0;
      let cafes: any[] = [];
      cafeList?.forEach((item: any) => {
        if (
          activeButton === 0 &&
          item?.type === "cafeRequest" &&
          item?.isAccepted === "pending"
        ) {
          cafes.push({ id: count + 1, ...item });
          count = count + 1;
        }
        if (
          activeButton === 1 &&
          item?.type === "cafeRequest" &&
          item?.isAccepted === "Rejected"
        ) {
          cafes.push({ id: count + 1, ...item });
          count = count + 1;
        }
        if (
          item?.type === "cafeRequest" &&
          activeButton === 2 &&
          item?.isAccepted !== "Approved"
        ) {
          cafes.push({ id: count + 1, ...item });
          count = count + 1;
        }
      });
      setCafeData(cafes);
      dispatch(changeAllCafeState());
    }
  }, [dispatch, activeButton, cafeState.allCafeState]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Business Requests</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={
                  activeButton === 0
                    ? `btn ${st.themeBtn} ${st.active}`
                    : `btn ${st.themeBtn}`
                }
                onClick={() => {
                  setActiveButton(0);
                  dispatch(allCafe());
                }}
              >
                <AiOutlineUserAdd className={st.icon} />
                New Requests
              </button>
              <button
                className={
                  activeButton === 1
                    ? `btn ${st.themeBtn} ${st.active}`
                    : `btn ${st.themeBtn}`
                }
                onClick={() => {
                  setActiveButton(1);
                  dispatch(allCafe());
                }}
              >
                <AiOutlineUserAdd className={st.icon} />
                Rejected Requests
              </button>
              <button
                className={
                  activeButton === 2
                    ? `btn ${st.themeBtn} ${st.active}`
                    : `btn ${st.themeBtn}`
                }
                onClick={() => {
                  setActiveButton(2);
                  dispatch(allCafe());
                }}
              >
                <AiOutlineUserAdd className={st.icon} />
                All Requests
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid cafeData={cafeData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
