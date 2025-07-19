import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch3, fetch4 } from "../../Apis/commonApis";
import { reactAppBaseurl } from "../../config";

const initialState = {
  contactState: 0,
  contactListState: 0,
};
export let allContactList: any[] = [];
export let isContact = false;

export const contactFunc: any = createAsyncThunk(
  "contactFunc",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/create_inquiry`, body);
    return result;
  }
);

export const allContactData: any = createAsyncThunk(
  "allContactData",
  async () => {
    const result = await fetch3(`${reactAppBaseurl}/get_inquiry`, "get");
    allContactList = result.allInquiry;
    isContact = true;
    return result;
  }
);

const ContactSlice: any = createSlice({
  name: "ContactSlice",
  initialState,
  reducers: {
    changeContactState(state = initialState) {
      state.contactState = 0;
    },
  },
  extraReducers: {
    [contactFunc.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.contactState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allContactData.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.contactListState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const { changeContactState } = ContactSlice.actions;
export default ContactSlice.reducer;
