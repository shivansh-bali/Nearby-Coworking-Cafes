import React from "react";
import cx from "./Blog.module.scss";
import { NavLink } from "react-router-dom";
import { Filled } from "../../../assets/images";

const Blog = ({ item }: any) => {
  const publishDate: any = new Date(item?.publishDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <div className={`${cx.blog}`}>
        <div className={`${cx.blogImg}`}>
          <NavLink to={item?.description?.includes("https") ? item?.description : `//${item?.description}`} target="blank">
            <img src={item?.authorImage} className={`${cx.image}`} alt="blogImage" /></NavLink>
          <div className={`${cx.overlay}`}>
            <img src={Filled} className={`${cx.shapeBg}`} alt="Overlay" />
            <NavLink to={item?.description?.includes("https") ? item?.description : `//${item?.description}`} className={`${cx.viewBtn}`} target="blank">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.49227 17.7434L13.9394 7.2962L13.9394 16.3687C13.9394 17.4685 14.7642 18.2932 15.8639 18.2932C16.9636 18.2932 17.7884 17.4685 17.7884 16.3687L17.7884 2.62246C17.7884 1.52276 16.9636 0.697982 15.8639 0.697982L2.11764 0.697983C1.01794 0.697982 0.193161 1.52276 0.193162 2.62246C0.193162 3.72217 1.01794 4.54694 2.11764 4.54694L11.1902 4.54694L0.743011 14.9941C-0.081767 15.8189 -0.0817671 16.9186 0.74301 17.7434C1.43032 18.4307 2.66749 18.5682 3.49227 17.7434Z"
                  fill="#1c1c1c"
                />
              </svg>
            </NavLink>
          </div>

          <NavLink to={item?.description?.includes("https") ? item?.description : `//${item?.description}`} className={`${cx.category}`} target="blank">
            Blog
          </NavLink>
        </div>
        <div className={`${cx.blogBody}`}>
          <h3>
            <NavLink to={item?.description?.includes("https") ? item?.description : `//${item?.description}`} target="blank">
              {item?.title}
            </NavLink>
          </h3>
          <p>{publishDate}</p>
        </div>
      </div >
    </>
  );
};

export default Blog;
