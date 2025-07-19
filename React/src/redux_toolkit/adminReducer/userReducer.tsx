import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch4, fetch3 } from "../../Apis/commonApis";
import { reactAppBaseurl } from "../../config";

const initialState = {
  addUserState: 0,
  allUserState: 0,
  getSingleUserState: 0,
};

export let userRes: any = {
  success: false,
  message: "",
};
export let isData = false;
export let allUserDataList: any[] = [];
export let userData: any = {};

export const addUser: any = createAsyncThunk("addUser", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/admin/addusers`, body);
  if (result.success === true) {
    userRes.success = true;
    userRes.message = result.message;
  } else {
    userRes.success = false;
    userRes.message = result.message;
  }
  return result;
});

export const allUserData: any = createAsyncThunk("allUserData", async () => {
  const result = await fetch3(`${reactAppBaseurl}/admin/users`, "get");
  allUserDataList = result.users;
  isData = true;
  return result;
});

export const changeUserStatus: any = createAsyncThunk(
  "changeUserStatus",
  async (id) => {
    const result = await fetch3(`${reactAppBaseurl}/admin/user/${id}`, "PATCH");
    if (result.success === true) {
      userRes.success = true;
      userRes.message = result.message;
    } else {
      userRes.success = false;
      userRes.message = result.message;
    }
    return result;
  }
);
export const getUser: any = createAsyncThunk("getUser", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/admin/user/${id}`, "get");
  userData = result.user;
  return result;
});

export const adminLogin: any = createAsyncThunk("adminLogin", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/adminlogin`, body);
  return result;
});

const adminUserSlice: any = createSlice({
  name: "adminUserSlice",
  initialState,
  reducers: {
    changeAddUserState(state = initialState) {
      state.addUserState = 0;
      userRes.success = false;
      userRes.message = "";
    },
    changeAllUserState(state = initialState) {
      state.allUserState = 0;
    },
  },
  extraReducers: {
    [addUser.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.addUserState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allUserData.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.allUserState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [changeUserStatus.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.addUserState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [getUser.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.getSingleUserState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { changeAddUserState, changeAllUserState } =
  adminUserSlice.actions;
export default adminUserSlice.reducer;
