import React, { useEffect, useState } from "react";
import st from "../../../assets/stylesheet/AdminStyle.module.scss";
import { Card } from "react-bootstrap";
import UserDataGrid from "./DataGrid";
import table from "../../../assets/stylesheet/datatable.module.scss";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allBlogList,
  allBlogs,
  blogRes,
  changeBlogStatusState,
} from "../../../redux_toolkit/globalReducer/blogReducer";
import { ToastContainer, toast } from "react-toastify";

export default function Blogs() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const blogState = useSelector((state: any) => state.blogReducer);
  const [blogData, setBlogData] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    let allData: any[] = [];
    allBlogList?.map((item: any, index: number) => {
      allData.push({
        id: index + 1,
        ...item,
      });
      return allData;
    });
    setBlogData(allData);
    setLoader(false);
  }, [blogState.allBlogState]);

  useEffect(() => {
    if (blogState.changeStatusState > 0) {
      if (blogRes.success === true) {
        toast.success(blogRes.message);
        dispatch(allBlogs());
        dispatch(changeBlogStatusState());
      } else {
        toast.error(blogRes.message);
        dispatch(changeBlogStatusState());
      }
    }
  }, [dispatch, blogState.changeStatusState]);

  useEffect(() => {
    dispatch(allBlogs());
  }, [dispatch]);

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <ToastContainer autoClose={3000} limit={1} />
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Blogs List</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  navigate("/admin/add-blog");
                }}
              >
                <AiOutlineFileAdd className={st.icon} />
                Add New Blog
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${table.dataTable}`}>
                <UserDataGrid blogData={blogData} loader={loader} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}
