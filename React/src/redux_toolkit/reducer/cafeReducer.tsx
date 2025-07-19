import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch3, fetch4, fetch5 } from "../../Apis/commonApis";
import { reactAppBaseurl, reactAppCafeurl } from "../../config";

const initialState = {
  addCafeState: 0,
  verifyCafeState: 0,
  submitCafeState: 0,
  allCafeState: 0,
  cafeResolutionState: 0,
  updateCafeState: 0,
  updateEditState: 0,
  changePasswordState: 0,
  updateReviewState: 0,
  allEmailsState: 0,
  addCafeByOwnerState: 0
};

export let cafeAdd = {
  cafeUniqueId: "",
  success: false,
  message: "",
};

export let cafeVerification = {
  cafe: {},
  success: false,
  message: "",
};

export let cafeSubmission = {
  success: false,
  message: "",
};

export let allSingleCafeState = 0

export let allEmails:any[] = []
export let cafeList: any[] = [];
export let singleCafeData: any;

export let resolutionMsg: any = {
  success: false,
  message: "",
};

export let cafeRes: any = {
  success: false,
  message: "",
};

export let resetPassword: any = {
  success: false,
  message: "",
};

export const addCafe: any = createAsyncThunk("addCafe", async (body) => {
  const result = await fetch4(`${reactAppCafeurl}/caferegistration`, body);
  if (result.success === true) {
    cafeAdd.cafeUniqueId = result.cafe;
    cafeAdd.success = true;
    cafeAdd.message = result.message;
  } else {
    cafeAdd.success = false;
    cafeAdd.message = result.message;
  }
  return result;
});

export const verifyCafe: any = createAsyncThunk("verifyCafe", async (body) => {
  const result = await fetch4(`${reactAppCafeurl}/verifycafe`, body);
  cafeVerification = {
    cafe: result?.user,
    success: result?.success,
    message: result?.message,
  };
  return result;
});

export const allEmail: any = createAsyncThunk("allEmail", async () => {
  const result = await fetch3(`${reactAppCafeurl}/getallemail`, 'get');
  allEmails = result.cafes
  return result;
});

export const submitCafe: any = createAsyncThunk("submitCafe", async (body) => {
  const result = await fetch4(`${reactAppCafeurl}/submitcafe`, body);
  cafeSubmission = {
    success: result?.success,
    message: result?.message,
  };
  return result;
});

export const addcafebyowner: any = createAsyncThunk("addcafebyowner", async (body) => {
  const result = await fetch4(`${reactAppCafeurl}/addcafebyowner`, body);
  cafeSubmission = {
    success: result?.success,
    message: result?.message,
  };
  return result;
});

export const allCafe: any = createAsyncThunk("allCafe", async (id: any) => {
  const result = await fetch3(
    id ? `${reactAppCafeurl}/allcafe/${id}` : `${reactAppCafeurl}/allcafe`,
    "get"
  );
  if (Array.isArray(result?.allCafe)) {
    cafeList = result?.allCafe?.filter((e:any)=> e?.establishmentName);
  } else {
    singleCafeData = result?.allCafe;
    allSingleCafeState = allSingleCafeState + 1
  }
  return result;
});

export const cafeResolution: any = createAsyncThunk(
  "cafeResolution",
  async (body) => {
    const result = await fetch4(`${reactAppCafeurl}/resolution`, body);
    if (result?.success === true) {
      resolutionMsg = {
        success: true,
        message: result?.message,
      };
    }
    return result;
  }
);

export const changeCafeStatus: any = createAsyncThunk(
  "changeCafeStatus",
  async (id) => {
    const result = await fetch3(
      `${reactAppCafeurl}/updateCafeStatus/${id}`,
      "PATCH"
    );
    if (result.success === true) {
      cafeRes.success = true;
      cafeRes.message = result.message;
    } else {
      cafeRes.success = false;
      cafeRes.message = result.message;
    }
    return result;
  }
);

export const changeFirstUpdation: any = createAsyncThunk(
  "changeFirstUpdation",
  async (id) => {
    const result = await fetch3(
      `${reactAppCafeurl}/updateFirst/${id}`,
      "PATCH"
    );
    if (result.success === true) {
      cafeRes.success = true;
      cafeRes.message = result.message;
    } else {
      cafeRes.success = false;
      cafeRes.message = result.message;
    }
    return result;
  }
);
export const updateCafe: any = createAsyncThunk(
  "updateCafe",
  async (body: any) => {
    const result = await fetch5(
      `${reactAppCafeurl}/updateCafeDetails/${body._id}`,
      body
    );
    return result;
  }
);
export const updateCafe2: any = createAsyncThunk(
  "updateCafe",
  async ({ body, id }: any) => {
    const result = await fetch5(
      `${reactAppCafeurl}/updateCafeDetails/${id}`,
      body
    );
    return result;
  }
);

export const changePassword: any = createAsyncThunk(
  "changePassword",
  async (body: any) => {
    const result = await fetch5(`${reactAppBaseurl}/password/update`, body);
    resetPassword = {
      success: result?.success,
      message: result?.message,
    };
    return result;
  }
);

export const updateReview: any = createAsyncThunk(
  "updateReview",
  async (body: any) => {
    const result = await fetch5(`${reactAppCafeurl}/updateReview`, body);
    return result;
  }
);

export const bulkuploadcafe: any = createAsyncThunk(
  "bulkuploadcafe",
  async (body) => {
    const result = await fetch4(`${reactAppCafeurl}/bulkuploadcafe`, body);
    return result;
  }
);

const cafeSlice: any = createSlice({
  name: "cafeSlice",
  initialState,
  reducers: {
    changeAddCafeState(state = initialState) {
      state.addCafeState = 0;
    },
    changeVerifyCafeState(state = initialState) {
      state.verifyCafeState = 0;
    },
    changeSubmitCafeState(state = initialState) {
      state.submitCafeState = 0;
    },
    changeAllCafeState(state = initialState) {
      state.allCafeState = 0;
    },
    changeCafeResolutionState(state = initialState) {
      state.cafeResolutionState = 0;
    },
    changeUpdateCafeState(state = initialState) {
      state.updateCafeState = 0;
    },
    changePassState(state = initialState) {
      state.changePasswordState = 0;
    },
    changeSingleCafeState(state = initialState){
      allSingleCafeState = 0
    },
    blankCafeList(state=initialState){
      cafeList = []
    },
    changeaddCafeByOwnerState(state = initialState) {
      state.addCafeByOwnerState = 0
    }
  },
  extraReducers: {
    [allEmail.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.allEmailsState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.addCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [verifyCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.verifyCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [submitCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.submitCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addcafebyowner.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.addCafeByOwnerState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [allCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.allCafeState = state.allCafeState + 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [cafeResolution.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.cafeResolutionState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [changeCafeStatus.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [changeFirstUpdation.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.updateCafeState += 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateCafe.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.updateEditState += 1;

      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [changePassword.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.changePasswordState = 1;

      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [updateReview.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.updateReviewState += 1;

      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {
  changeAddCafeState,
  changeVerifyCafeState,
  changeSubmitCafeState,
  changeAllCafeState,
  changeCafeResolutionState,
  changeUpdateCafeState,
  changePassState,
  changeSingleCafeState,
  blankCafeList,
  changeaddCafeByOwnerState
} = cafeSlice.actions;
export default cafeSlice.reducer;
