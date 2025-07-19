import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch4, fetch3, fetch5 } from "../../Apis/commonApis";
import { reactAppBaseurl } from "../../config";

export const environment = `${reactAppBaseurl}` === "https://api.syncremote.co/api/v1" ? "https://syncremote.co" : "https://dev.syncremote.co"

const initialState = {
  blogState: 0,
  allBlogState: 0,
  changeStatusState: 0,
  singleBlogState: 0,
};

export let blogRes: any = {
  success: false,
  message: "",
};
export let allBlogList: any[] = [];
export let singleBlogData: any;
export let isBlog = false;

export const addBlog: any = createAsyncThunk("addBlog", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/admin/create_blog`, body);
  if (result.success === true) {
    blogRes.success = true;
    blogRes.message = result.message;
  } else {
    blogRes.success = false;
    blogRes.message = result.message;
  }
  return result;
});

interface Blog {
  _id: string;
  title: string;
  description: string;
  authorImage: string;
  publishDate: string;
  status: boolean;
  createdAt: string;
  __v: number;
}
export const allBlogs: any = createAsyncThunk("allBlogs", async () => {
  const result = await fetch3(`${reactAppBaseurl}/blogs`, "get");

  // Modify the description value for each blog item
  allBlogList = result.allBlogs.map((blog: Blog) => ({
    ...blog,
    description: environment + blog.description
  }));
  isBlog = true;
  return result;
});

export const changeBlogStatus: any = createAsyncThunk(
  "changeBlogStatus",
  async (id) => {
    const result = await fetch3(`${reactAppBaseurl}/blog/${id}`, "PATCH");
    if (result.success === true) {
      blogRes.success = true;
      blogRes.message = result.message;
    } else {
      blogRes.success = false;
      blogRes.message = result.message;
    }
    return result;
  }
);

export const deleteBlog: any = createAsyncThunk("deleteBlog", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/blog/${id}`, "delete");
  if (result.success === true) {
    blogRes.success = true;
    blogRes.message = result.message;
  } else {
    blogRes.success = false;
    blogRes.message = result.message;
  }
  return result;
});

export const singleBlog: any = createAsyncThunk("singleBlog", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/blog/${id}`, "get");
  singleBlogData = result?.blog;
  return result;
});

export const editBlog: any = createAsyncThunk("editBlog", async (body: any) => {
  const result = await fetch5(
    `${reactAppBaseurl}/blog/${body?.id}`,
    body?.data
  );
  if (result.success === true) {
    blogRes.success = true;
    blogRes.message = result.message;
  } else {
    blogRes.success = false;
    blogRes.message = result.message;
  }
  return result;
});
const blogSlice: any = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    changeBlogState(state = initialState) {
      state.blogState = 0;
      blogRes.success = false;
    },
    changeBlogStatusState(state = initialState) {
      state.changeStatusState = 0;
      blogRes.success = false;
    },
    changeSingleBlogState(state = initialState) {
      state.singleBlogState = 0;
    },
  },
  extraReducers: {
    [addBlog.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.blogState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allBlogs.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.allBlogState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [changeBlogStatus.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.changeStatusState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [deleteBlog.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.changeStatusState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [singleBlog.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.singleBlogState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [editBlog.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.blogState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { changeBlogState, changeBlogStatusState, changeSingleBlogState } =
  blogSlice.actions;
export default blogSlice.reducer;
