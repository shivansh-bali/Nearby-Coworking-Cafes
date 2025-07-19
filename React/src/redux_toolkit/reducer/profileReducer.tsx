import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch3, fetch4, fetch5 } from "../../Apis/commonApis";
import { accesstoken, reactAppBaseurl, socketUrl } from "../../config";

const initialState = {
  profileState: 0,
  updateState: 0,
  searchState: 0,
  saveCafeState: 0,
  reviewCafeState: 0,
  pinCafeState: 0,
  reviewsFilterState: 0,
  mapFuncState: 0,
  mapKeyState: 0,
  subscribeState: 0,
  getSubscribersState: 0,
  schoolDataState: 0,
  pinnedCafeState: 0,
  sameInterestState: 0,
  updateOnceState:0,
  updateNotificationState: 0
};

export const ENDPOINT = `${socketUrl}`;
export let profile: any = {
  data: {},
  success: true,
  message: "",
  cafeData: [],
};
export let logoutMessage = "";
export let accessToken = accesstoken;
export let subscribers: any[];
export let sameSchoolData: any[] = []
export let samePinnedData: any[] = []
export let sameInterestUsers: any[] = []

export const myData: any = createAsyncThunk("myData", async () => {
  const result = await fetch3(`${reactAppBaseurl}/me`, "get");
  if (result.success === true) {
    if (Array.isArray(result.user)) {
      profile.data = result.user[0];
      profile.cafeData = result.user;
    } else {
      profile.data = result.user;
    }
    profile.success = true;
  } else {
    profile.success = false;
    profile.message = result.message;
  }
  console.log('profile:', profile)
  return result;
});

export const updateDetails: any = createAsyncThunk(
  "updateDetails",
  async (body) => {
    const result = await fetch5(`${reactAppBaseurl}/updateDetails`, body);
    if (result.success === true) {
      profile.data = result.user;
      profile.success = true;
    } else {
      profile.success = false;
      profile.message = result.message;
    }
    return result;
  }
);

export const updateonce: any = createAsyncThunk(
  "updateonce",
  async (body) => {
    const result = await fetch5(`${reactAppBaseurl}/updateonce`, body);
    if (result.success === true) {
      profile.data = result.user;
      profile.success = true;
    } else {
      profile.success = false;
      profile.message = result.message;
    }
    return result;
  }
);

export const searchLocate: any = createAsyncThunk(
  "searchLocate",
  async (body) => {
    const result = await fetch5(`${reactAppBaseurl}/searchLocation`, body);
    return result;
  }
);

export const saveCafe: any = createAsyncThunk("saveCafe", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/saveCafe/${id}`, "PATCH");
  return result;
});

export const reviewCafe: any = createAsyncThunk(
  "reviewCafe",
  async (body: any) => {
    const result = await fetch5(`${reactAppBaseurl}/reviews/${body?.id}`, {
      ratingReviews: body?.ratingReviews,
    });
    return result;
  }
);

export const reviewsFilterCafe: any = createAsyncThunk(
  "reviewsFilterCafe",
  async (body: any) => {
    const result = await fetch5(
      `${reactAppBaseurl}/reviewsfilter/${body?.id}`,
      { ratingFilters: body?.ratingFilters }
    );
    return result;
  }
);

export const subscribeToConnect: any = createAsyncThunk(
  "subscribeToConnect",
  async (body: any) => {
    const result = await fetch5(`${reactAppBaseurl}/subscribetoconnect`, body);
    return result;
  }
);

export const getSubscribers: any = createAsyncThunk(
  "getSubscribers",
  async (body: any) => {
    const result = await fetch3(`${reactAppBaseurl}/getsubscribers`, body);
    subscribers = result.subscribers;
    return result;
  }
);

export const pinCafe: any = createAsyncThunk("pinCafe", async (id) => {
  const result = await fetch3(`${reactAppBaseurl}/cafepin/${id}`, "PATCH");
  return result;
});

export const isSearchLocation: any = createAsyncThunk(
  "isSearchLocation",
  async (body) => {
    const result = await fetch5(`${reactAppBaseurl}/issearchlocation`, body);
    return result;
  }
);

export const mapKeyFunc: any = createAsyncThunk("mapKeyFunc", async () => {
  const result = await fetch3(`${reactAppBaseurl}/map`, "get");
  accessToken = result.fetchKey;
  return result;
});

export const schoolData: any = createAsyncThunk("schoolData", async (schoolName) => {
  const result = await fetch3(`${reactAppBaseurl}/getSameSchoolData/${schoolName}`, "get");
  sameSchoolData = result.sameSchoolData
  return result;
});

export const pinnedCafe: any = createAsyncThunk("pinnedCafe", async (body:any) => {
  const result = await fetch4(`${reactAppBaseurl}/getsamepinnedcafe`, body);
  samePinnedData = result.samePinnedData
  return result;
});

export const sameInterest: any = createAsyncThunk("sameInterest", async (body:any) => {
  const result = await fetch4(`${reactAppBaseurl}/getsameinterest`, body);
  sameInterestUsers = result.sameInterestUsers
  return result;
});

export const updateNotification: any = createAsyncThunk(
  "updateNotification",
  async () => {
    const result = await fetch5(`${reactAppBaseurl}/updatenotification`, "");
    return result;
  }
);

export const updateNotificationLength: any = createAsyncThunk(
  "updateNotificationLength",
  async (body) => {
    const result = await fetch5(`${reactAppBaseurl}/notificationlength`, body);
    return result;
  }
);

const profileSlice: any = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    changeProfileData(state = initialState) {
      profile.data = {};
      state.profileState = 0;
    },
    changeUpdateData(state = initialState) {
      state.updateState = 0;
    },
    changeUpdateOnceData(state = initialState) {
      state.updateOnceState = 0;
    },
    changeSearchState(state = initialState) {
      state.searchState = 0;
    },
    changeReviewState(state = initialState) {
      state.reviewCafeState = 0;
    },
    changePinState(state = initialState) {
      state.pinCafeState = 0;
    },
    cafeDataFunc(state = initialState, action) {
      profile.data = action.payload;
      state.profileState += 1;
    },
    changeSubscribersState(state = initialState) {
      state.getSubscribersState = 0;
    },
    changeSchoolData(state = initialState) {
      state.schoolDataState = 0
    },
    changePinnedCafe(state = initialState) {
      state.pinnedCafeState = 0
    },
    changeSameInterest(state = initialState) {
      state.sameInterestState = 0
    },
    changeUpdateNotification(state = initialState) {
      state.updateNotificationState = 0
    }
  },
  extraReducers: {
    [myData.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.profileState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateDetails.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateonce.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateOnceState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [searchLocate.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.searchState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [saveCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.saveCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [reviewCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.reviewCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [reviewsFilterCafe.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.reviewsFilterState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [pinCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.pinCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [mapKeyFunc.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.mapFuncState += 1;
      state.mapKeyState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [schoolData.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.schoolDataState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [pinnedCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.pinnedCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [sameInterest.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.sameInterestState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [subscribeToConnect.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.subscribeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [getSubscribers.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.getSubscribersState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateNotification.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateNotificationState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {
  changeProfileData,
  changeUpdateData,
  changeSearchState,
  changeReviewState,
  changePinState,
  cafeDataFunc,
  changeSubscribersState,
  changeSchoolData,
  changePinnedCafe,
  changeSameInterest,
  changeUpdateOnceData
} = profileSlice.actions;
export default profileSlice.reducer;
