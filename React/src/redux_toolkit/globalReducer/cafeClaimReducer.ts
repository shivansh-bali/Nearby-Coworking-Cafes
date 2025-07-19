import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  fetch3, fetch4 } from "../../Apis/commonApis";
import { reactAppBaseurl, reactAppCafeurl } from "../../config";

const initialState = {
  businessClaimState: 0,
  claimState: 0,
  verifyClaimState: 0,
  recommendState: 0,
  updateClaimResultState: 0,
};
export let singleRecommendData: any;
export let singleClaimData: any;
export let cafeForClaim: any;
export let claimBusinessList: any;
export let recommendList: any;
export let claimResult = {
  status: false,
  message: "",
};
export let saveRecommend:any

export const claimList: any = createAsyncThunk("claimList", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/claimcafe`, body);
  claimResult = {
    status: result.success,
    message: result.message,
  };
  return result;
});
export const businessClaimList: any = createAsyncThunk(
  "businessClaimList",
  async () => {
    const result = await fetch3(`${reactAppBaseurl}/getAllClaimRequest`, "get");
    claimBusinessList = result.users;
    return result;
  }
);
export const singleBusinessClaim: any = createAsyncThunk(
  "businessClaimList",
  async (body) => {
    const result = await fetch3(
      `${reactAppBaseurl}/getAllClaimRequest/${body}`,
      "get"
    );
    singleClaimData = result.users;
    return result;
  }
);

export const getRecommendList: any = createAsyncThunk(
  "getRecommendList",
  async () => {
    const result = await fetch3(`${reactAppCafeurl}/getrecommend`, "get");
    recommendList = result.users;
    return result;
  }
);

export const singleBusinessRecommend: any = createAsyncThunk(
  "singleBusinessRecommend",
  async (body) => {
    const result = await fetch3(
      `${reactAppCafeurl}/getrecommend/${body}`,
      "get"
    );
    singleRecommendData = result.users;
    return result;
  }
);

export const verifyClaim: any = createAsyncThunk(
  "verifyClaim",
  async (body) => {
    const result = await fetch3(
      `${reactAppBaseurl}/verifyclaim/${body}`,
      "get"
    );
    return result;
  }
);

export const updateClaimResult: any = createAsyncThunk(
  "updateClaimResult",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/claimResult`, body);
    return result;
  }
);
export const updateRecommendResult: any = createAsyncThunk(
  "updateRecommendResult",
  async (body) => {
    const result = await fetch4(`${reactAppCafeurl}/recommendresult`, body);
    return result;
  }
);

const cafeClaimSlice: any = createSlice({
  name: "cafeClaimSlice",
  initialState,
  reducers: {
    claimCafeFunc(state = initialState, action) {
      cafeForClaim = action.payload;
    },
    claimStateFunc(state = initialState) {
      state.claimState = 0;
    },
    saveRecommendData(state=initialState, action){
      saveRecommend = action.payload
    },
    changeVerifyClaim(state=initialState){
      state.verifyClaimState = 0
    }
  },
  extraReducers: {
    [businessClaimList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.businessClaimState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [singleBusinessClaim.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.businessClaimState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },

    [singleBusinessRecommend.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.businessClaimState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [claimList.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.claimState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [verifyClaim.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.verifyClaimState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateClaimResult.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateClaimResultState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [getRecommendList.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.recommendState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { claimCafeFunc, claimStateFunc, saveRecommendData, changeVerifyClaim } = cafeClaimSlice.actions;
export default cafeClaimSlice.reducer;

