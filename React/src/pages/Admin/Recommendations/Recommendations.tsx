import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import {
  allContactData,
  allContactList,
  changeContactState,
} from "../../../redux_toolkit/globalReducer/contactUsReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Recommendations() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const contactState = useSelector((state: any) => state.contactUsReducer);
  const [contactData, setContactData] = useState<any[]>([]);
  useEffect(() => {
    dispatch(allContactData());
    setLoader(false);
  }, [dispatch]);

  useEffect(() => {
    if (contactState.contactListState > 0) {
      let allData: any[] = [];
      allContactList?.map((item: any, index: number) => {
        allData.push({
          id: index + 1,
          ...item,
        });
        return allData;
      });
      setContactData(allData);
      dispatch(changeContactState());
    }
  }, [dispatch, contactState.contactListState]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Business Recommendations</h5>
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
