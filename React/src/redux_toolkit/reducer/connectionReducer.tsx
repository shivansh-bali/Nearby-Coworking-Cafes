import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch3 } from "../../Apis/commonApis";
import { reactAppBaseurl } from "../../config";

const initialState = {
    sendRequestState: 0,
    getRequestState: 0,
    singleUserState: 0
};

export let userRequest:any[] = []
export let singleUser:any

export const sendRequest: any = createAsyncThunk("sendRequest", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/sendrequest/${id}`, "PATCH");
  return result;
});

export const getRequest: any = createAsyncThunk("getRequest", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/getrequest`, "get");
  userRequest = result.user
  return result;
});

export const getSingleUser: any = createAsyncThunk("getSingleUser", async (id) => {
  singleUser={}
  const result = await fetch3(`${reactAppBaseurl}/getsingleuser/${id}`, "get");
  singleUser = result.user
  return result;
});

const connectionSlice: any = createSlice({
  name: "connectionSlice",
  initialState,
  reducers: {
    changeSendRequest(state = initialState) {
      state.sendRequestState = 0
    },
    changeGetRequest(state = initialState) {
      state.getRequestState = 0
    }
  },
  extraReducers: {
    [sendRequest.fulfilled]: (
        state: any,
        { payload: { error, message } }
      ) => {
        state.sendRequestState += 1;
        if (error) {
          state.error = error;
        } else {
          state.error = message;
        }
      },
      [getRequest.fulfilled]: (
        state: any,
        { payload: { error, message } }
      ) => {
        state.getRequestState += 1;
        if (error) {
          state.error = error;
        } else {
          state.error = message;
        }
      },
      [getSingleUser.fulfilled]: (
        state: any,
        { payload: { error, message } }
      ) => {
        state.singleUserState += 1;
        if (error) {
          state.error = error;
        } else {
          state.error = message;
        }
      },
  },
});


export const { changeSendRequest, changeGetRequest } = connectionSlice.actions;
export default connectionSlice.reducer;
