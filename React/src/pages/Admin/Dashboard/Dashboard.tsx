import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Dashboard.module.scss";
import { Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginState } from "../../../redux_toolkit/reducer/registrationReducer";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  allUserData,
  allUserDataList,
} from "../../../redux_toolkit/adminReducer/userReducer";
import { allCafe, cafeList } from "../../../redux_toolkit/reducer/cafeReducer";
import DashboardDataGrid from "./DataGrid";
import BusinessRequestsDatagrid from "./BusinessRequestsDatagrid";
import {
  businessClaimList,
  claimBusinessList,
  getRecommendList,
  recommendList,
} from "../../../redux_toolkit/globalReducer/cafeClaimReducer";

const DashBoardList = () => {
  const dispatch = useDispatch();
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [activebutton, setActiveButton] = useState(0);
  const [changeButton, setChangeButton] = useState("a");
  const [businessClaimData, setBusinessClaimData] = useState<any>();
  const [recommendListData, setRecommendListData] = useState<any>();
  const [filteredDataList, setfilteredDataList] = useState<any>();
  const businessClaimState = useSelector(
    (state: any) => state.cafeClaimReducer
  );
  useEffect(() => {
    dispatch(businessClaimList());
    dispatch(getRecommendList());
  }, [dispatch]);

  useEffect(() => {
    if (cafeState?.allCafeState > 0) {
      setfilteredDataList(cafeList);
    }
    if (businessClaimState?.businessClaimState > 0) {
      setBusinessClaimData(claimBusinessList);
    }
    if (businessClaimState?.recommendState > 0) {
      setRecommendListData(recommendList);
    }
  }, [
    cafeState.allCafeState,
    cafeState.cafeResolutionState,
    businessClaimState.businessClaimState,
    businessClaimState.recommendState,
  ]);

  return (
    <Col md={12} className={cx.listContainer}>
      <div
        className={`${cx.titleContainer} px-4 d-md-flex justify-content-between`}
      >
        <div>
          <button
            className={activebutton === 0 ? cx.active : ""}
            onClick={() => {
              setChangeButton("a");
              setActiveButton(0);
            }}
          >
            Business Requests
            <div></div>
          </button>
          <button
            className={activebutton === 1 ? cx.active : ""}
            onClick={() => {
              setChangeButton("a");
              setActiveButton(1);
            }}
          >
            Recommendations
            <div></div>
          </button>
          <button
            className={activebutton === 2 ? cx.active : ""}
            onClick={() => {
              setChangeButton("a");
              setActiveButton(2);
            }}
          >
            Business Claiming
            <div></div>
          </button>
        </div>

        <div className={`d-lg-block d-none`}>
          <button
            onClick={() => {
              setChangeButton("a");
            }}
            className={changeButton === "a" ? cx.active : ""}
          >
            Pending
          </button>
          <button
            onClick={() => {
              setChangeButton("b");
              // navigate("/admin/cafes");
            }}
            className={changeButton === "b" ? cx.active : ""}
          >
            Approved
          </button>
          <button
            onClick={() => {
              setChangeButton("c");
            }}
            className={changeButton === "c" ? cx.active : ""}
          >
            Rejected
          </button>
        </div>
      </div>

      {filteredDataList && activebutton === 0 && (
        <BusinessRequestsDatagrid
          data={filteredDataList}
          page="businessRequest"
          changeButton={changeButton}
        />
      )}  
      {recommendListData && activebutton === 1 && (
        <BusinessRequestsDatagrid
          data={recommendListData}
          page="businessRecommend"
          changeButton={changeButton}
        />
      )} 
         {businessClaimData && activebutton === 2 && (
        <DashboardDataGrid
          data={businessClaimData}
          page="businessClaim"
          changeButton={changeButton}
        />
      )}
    </Col>
  );
};

export default function Dashboard() {
  const registrationState = useSelector(
    (state: any) => state.registrationReducer
  );
  const cafeState = useSelector((state: any) => state.cafeReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationState.loginState === 1) {
      dispatch(changeLoginState());
    }
  }, [dispatch, registrationState.loginState, cafeState.cafeResolutionState]);

  useEffect(() => {
    dispatch(allCafe());
    dispatch(allUserData());
  }, [dispatch]);

  window.addEventListener(
    "popstate",
    () => {
      if (!window.location.pathname.includes("admin")) {
        navigate("/admin/");
      }
    },
    false
  );

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={4} md={6}>
                  <div className={`${cx.contentBox} ${cx.countCardBox1}`}>
                    <p>
                      <HiOutlineUserGroup
                        style={{
                          fontSize: "20px",
                          color: "#496089",
                          margin: "0 5px 5px ",
                        }}
                      />
                      Total Users
                    </p>
                    <h2>
                      {
                        allUserDataList?.filter((item: any) => item.status)
                          .length
                      }
                    </h2>
                  </div>
                </Col>
                <Col lg={4} md={6}>
                  <div className={`${cx.contentBox} ${cx.countCardBox2}`}>
                    <p>
                      <AiOutlineShop
                        style={{
                          fontSize: "20px",
                          margin: "0 5px 5px ",
                          color: "#738801",
                        }}
                      />
                      Total Businesses
                    </p>
                    <h2> {cafeList?.length}</h2>
                  </div>
                </Col>
              </Row>
              <DashBoardList />
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
