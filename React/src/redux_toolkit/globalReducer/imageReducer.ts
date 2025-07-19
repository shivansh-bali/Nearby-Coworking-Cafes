import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2 } from "../../Apis/commonApis";
import { reactAppBaseurl } from "../../config";

const initialState = {
  imageState: 0,
};

export let imageUrl: any;

export const addImage: any = createAsyncThunk("addImage", async (body) => {
  const result = await fetch2(`${reactAppBaseurl}/image`, body);
  imageUrl = result?.image?.image;
  return result;
});

const ImageSlice: any = createSlice({
  name: "ImageSlice",
  initialState,
  reducers: {
    changeImageState(state = initialState) {
      state.imageState = 0;
    },
  },
  extraReducers: {
    [addImage.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.imageState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { changeImageState } = ImageSlice.actions;
export default ImageSlice.reducer;