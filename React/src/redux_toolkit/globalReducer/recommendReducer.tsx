import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch4 } from "../../Apis/commonApis";
import { reactAppCafeurl } from "../../config";

const initialState = {
    recommendState: 0,
};

export const recommend: any = createAsyncThunk("recommend", async (body) => {
    const result = await fetch4(`${reactAppCafeurl}/recommendcafe`, body);
    return result;
  });

  const recommendCafeSlice: any = createSlice({
    name: "recommendCafeSlice",
    initialState,
    reducers: {
        recommendChangeState(state=initialState){
            state.recommendState = 0
        }
    },
    extraReducers: {
      [recommend.fulfilled]: (state: any, { payload: { error, message } }) => {
        state.recommendState = 1;
        if (error) {
          state.error = error;
        } else {
          state.error = message;
        }
      },
    },
  });
  
  export const { recommendChangeState } = recommendCafeSlice.actions
  export default recommendCafeSlice.reducer;