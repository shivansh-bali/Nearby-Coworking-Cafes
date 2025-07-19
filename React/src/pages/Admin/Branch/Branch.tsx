import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { Card } from "react-bootstrap";

import DataGrid from "./DataGrid";
import { useDispatch, useSelector } from "react-redux";
import {
  allCafe,
  bulkuploadcafe,
  cafeList,
  changeAllCafeState,
  changeUpdateCafeState,
} from "../../../redux_toolkit/reducer/cafeReducer";
import { useLocation } from "react-router-dom";
import Papa from "papaparse";
import { reactAppCafeurl } from "../../../config";

export default function Branch() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const cafeState = useSelector((state: any) => state.cafeReducer);
  const [cafeData, setCafeData] = useState<any[]>([]);
  const [rejectedData, setRejectedData] = useState(true);
  const location = useLocation();
  useEffect(() => {
    dispatch(allCafe());
    setLoader(false);
  }, [dispatch]);
  useEffect(() => {
    let count: any = 0;
    let cafes: any[] = [];
    if (rejectedData) {
      cafeList.forEach((item: any, index: number) => {
        if (item?.isAccepted === "Approved" && item.status) {
          cafes.push({ id: count + 1, ...item });
          count = count + 1;
        }
      });
    } else if (!rejectedData) {
      cafeList.forEach((item: any, index: number) => {
        if (item?.isAccepted === "Approved" && !item.status) {
          cafes.push({ id: count + 1, ...item });
          count = count + 1;
        }
      });
    }
    setCafeData(cafes);
    dispatch(changeAllCafeState());
  }, [rejectedData, dispatch, cafeState.allCafeState, location.state]);

  useEffect(() => {
    if (cafeState.updateCafeState > 0) {
      dispatch(allCafe());
      dispatch(changeUpdateCafeState());
    }
  }, [cafeState.updateCafeState, dispatch]);

  function handleFileInput(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const contents = e.target?.result as string;

      if (file.type === "text/csv") {
        Papa.parse(contents, {
          header: true,
          dynamicTyping: true,
          complete: function (results: any) {
            const jsonData: any[] = [];

            results.data.forEach((row: any) => {
              const parsedRow: any = {};

              Object.entries(row).forEach(([header, value]) => {
                const keys = header.split(".");
                let currentObj = parsedRow;

                keys.forEach((key, index) => {
                  if (index === keys.length - 1) {
                    const parsedValue = parseJsonValue(value);
                    currentObj[key] = parsedValue;
                  } else {
                    if (!currentObj[key]) {
                      if (Number.isInteger(+keys[index + 1])) {
                        currentObj[key] = [];
                      } else {
                        currentObj[key] = {};
                      }
                    }
                    currentObj = currentObj[key];
                  }
                });
              });

              jsonData.push(parsedRow);
            });

            let i = 0;
            while (i < jsonData.length) {
              const jsonDataArray = jsonData.slice(i, i + 50);
              dispatch(bulkuploadcafe({ cafeLists: jsonDataArray }));
              i = i + 50;
            }
          },
        });
      } else if (file.type === "application/json") {
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const data = JSON.parse(e.target?.result as string);
          dispatch(bulkuploadcafe({ cafeLists: data }));
        };
        reader.readAsText(file, "UTF-8");
      } else {
        console.log("Unsupported file type. Please select a CSV or JSON file.");
      }
    };

    reader.readAsText(file, "UTF-8");
  }

  function parseJsonValue(value: any): any {
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      return value;
    }
  }

  const fetch2 = async (body: any) => {
    let data = new FormData();
    data.append("image", body);
    const res = await fetch(`${reactAppCafeurl}/bulkimageuploadcafe`, {
      method: "post",
      credentials: "include",
      body: data,
    });
    return await res.json();
  };

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Business List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button className={`btn ${st.themeBtn}`}>
                <input
                  type="file"
                  onChange={(e: any) => {
                    fetch2(e.target.files[0]);
                  }}
                  className={st.uploadBtn}
                  accept=".zip"
                />
                Upload Bulk Images
              </button>
              <button className={`btn ${st.themeBtn}`}>
                <input
                  type="file"
                  onChange={(e: any) => handleFileInput(e.target.files[0])}
                  className={st.uploadBtn}
                />
                Upload in Bulk
              </button>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  setRejectedData(!rejectedData);
                }}
              >
                {rejectedData
                  ? "View Deactive Accounts "
                  : " View Active Accounts"}
              </button>
            </div>
          </div>
        </div>
        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <DataGrid cafeData={cafeData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
