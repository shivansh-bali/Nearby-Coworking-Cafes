import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeSubscribersState, getSubscribers, subscribers } from "../../../redux_toolkit/reducer/profileReducer";

export default function Subscribers() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const profileState = useSelector((state: any) => state.profileReducer);
  const [contactData, setContactData] = useState<any[]>([]);
  useEffect(() => {
    dispatch(getSubscribers());
    setLoader(false);
  }, [dispatch]);

  useEffect(() => {
    if (profileState.getSubscribersState > 0) {
      let allData: any[] = [];
      subscribers?.forEach((item: any, index: number) => {
        allData.push({
          id: index + 1,
          ...item,
        });
      });
      setContactData(allData);
      dispatch(changeSubscribersState());
    }
  }, [dispatch, profileState.getSubscribersState]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>People Subscribers</h5>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid contactData={contactData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
