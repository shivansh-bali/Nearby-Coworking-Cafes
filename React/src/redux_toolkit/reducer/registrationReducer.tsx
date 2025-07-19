import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch4, fetch5 } from "../../Apis/commonApis";
import { profile } from "./profileReducer";
import { reactAppBaseurl } from "../../config";

const initialState = {
  registrationState: 0,
  socialState: 0,
  verifyState: 0,
  loginState: 0,
  forgotPasswordState: 0,
  resetPasswordState: 0,
  logoutState: 0,
  adminUpdateState: 0,
  adminPasswordState: 0,
  localLocationState: 0,
  userDeleteState: 0,
  addFCMState: 0
};

export let registrationMessage = "";
export let tokendevice = ""
export let verifyMessage = {
  success: true,
  message: "",
};
export let forgotPasswordMessage = {
  success: true,
  message: "",
};
export let resetPasswordMessage = {
  success: true,
  message: "",
};
export let adminPasswordMessage = {
  success: false,
  message: "",
};
export let loginMessage: any = {
  isAuthenticated: false,
  success: true,
  message: "",
};
export let logoutMessage = "";
export let localLocation = {
  lat: 42.360253,
  lng: -71.058291,
  placeName: "Boston",
};
export let saveLocation = {
  lat: 42.360253,
  lng: -71.058291,
  placeName: "Boston",
};
export const userRegistration: any = createAsyncThunk(
  "userRegistration",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/register`, body);
    registrationMessage = result.message;
    return result;
  }
);

export const userSocialRegistration: any = createAsyncThunk(
  "userSocialRegistration",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/socialLogin`, body);
    if (result.success === true) {
      profile.data = result.user;
      loginMessage.isAuthenticated = true;
      loginMessage.success = true;
      loginMessage.message = "Login Successfully";
      registrationMessage = ""
    } else {
      loginMessage.success = false;
      loginMessage.message = result.message;
      registrationMessage = result.message
    }
    return result;
  }
);

export const userSocialLogin: any = createAsyncThunk(
  "userSocialLogin",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/social`, body);
    if (result.success === true) {
      profile.data = result.user;
      loginMessage.isAuthenticated = true;
      loginMessage.success = true;
      loginMessage.message = "Login Successfully";
    } else {
      loginMessage.success = false;
      loginMessage.message = result.message;
    }
    return result;
  }
);

export const verifyRegistration: any = createAsyncThunk(
  "verifyRegistration",
  async (body:any) => { 
    console.log(body, "asdasdasdasdasdd")
    const result = await fetch4(`${reactAppBaseurl}/verify/${body?.param}`, {fcmToken: body?.fcmToken});
    if (result.success === true) {
      profile.data = result.user;
      loginMessage.isAuthenticated = true;
      loginMessage.success = true;
      loginMessage.message = "Login Successfully";
    } else {
      loginMessage.success = false;
      loginMessage.message = result.message;
    }
    return result;
  }
);

export const userLogin: any = createAsyncThunk("userLogin", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/login`, body);
  if (result.success === true) {
    profile.data = result.user;
    loginMessage.isAuthenticated = true;
    loginMessage.success = true;
    loginMessage.message = "Login Successfully";
  } else {
    loginMessage.success = false;
    loginMessage.message = result.message;
  }
  return result;
});

export const userForgotPassword: any = createAsyncThunk(
  "userForgotPassword",
  async (body) => {
    const result = await fetch4(`${reactAppBaseurl}/password/forgot`, body);
    if (result.success === true) {
      forgotPasswordMessage.success = true;
      forgotPasswordMessage.message = result.message;
    } else {
      forgotPasswordMessage.success = false;
      forgotPasswordMessage.message = result.message;
    }
    return result;
  }
);

export const userResetPassword: any = createAsyncThunk(
  "userResetPassword",
  async (body: any) => {
    const result = await fetch5(
      `${reactAppBaseurl}/password/reset/${body?.token}`,
      body?.password
    );
    if (result.success === true) {
      resetPasswordMessage.success = true;
      resetPasswordMessage.message = "Password changed successfully";
    } else {
      resetPasswordMessage.success = false;
      resetPasswordMessage.message = result.message;
    }
    return result;
  }
);

export const userLogout: any = createAsyncThunk("userLogout", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/logout`, {id: body, fcmToken: tokendevice});
  profile.data = {};
  logoutMessage = result.message;
  return result;
});

export const adminUpdate: any = createAsyncThunk(
  "adminUpdate",
  async (body: any) => {
    const result = await fetch5(
      `${reactAppBaseurl}/admin/user/${body?.id}`,
      body?.body
    );
    return result;
  }
);

export const adminUpdatePassword: any = createAsyncThunk(
  "adminUpdate",
  async (body: any) => {
    const result = await fetch5(
      `${reactAppBaseurl}/admin/changepassword`,
      body
    );
    if (result.success === true) {
      adminPasswordMessage = {
        success: true,
        message: result.message,
      };
    } else {
      adminPasswordMessage = {
        success: false,
        message: result.message,
      };
    }
    return result;
  }
);

export const userDelete: any = createAsyncThunk("userDelete", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/deleteaccount`, body);
  return result;
});

export const addFCM: any = createAsyncThunk("addFCM", async (body) => {
  const result = await fetch4(`${reactAppBaseurl}/addfcm`, body);
  return result;
});

const registrationSlice: any = createSlice({
  name: "registrationSlice",
  initialState,
  reducers: {
    changeRegistrationState(state = initialState) {
      state.registrationState = 0;
    },
    changeSocialState(state = initialState) {
      state.socialState = 0;
    },
    changeVerifyState(state = initialState) {
      state.loginState = 0;
    },
    changeLoginState(state = initialState) {
      state.loginState = 0;
    },
    blankRegistrationMessage(state=initialState) {
      registrationMessage = ""
    },
    changeForgotPasswordState(state = initialState) {
      state.forgotPasswordState = 0;
    },
    changeResetPasswordState(state = initialState) {
      state.resetPasswordState = 0;
    },
    changeLogoutState(state = initialState) {
      state.logoutState = 0;
      loginMessage.isAuthenticated = false;
    },
    changeAdminState(state = initialState) {
      state.adminUpdateState = 0;
    },
    changeAdminPasswordState(state = initialState) {
      state.adminPasswordState = 0;
    },
    localLatLng(state = initialState, action) {
      localLocation.lat = action.payload.lat;
      localLocation.lng = action.payload.lng;
      localLocation.placeName = action.payload.placeName;
    },
    increaseLocalLocation(state = initialState) {
      state.localLocationState += 1;
    },
    saveLatLng(state = initialState, action) {
      saveLocation.lat = action.payload.lat;
      saveLocation.lng = action.payload.lng;
      saveLocation.placeName = action.payload.placeName;
    },
    getFcmToken(state = initialState, action) {
      tokendevice = action.payload
      console.log(action.payload, "asdsdasddsa")
    }
  },
  extraReducers: {
    [userRegistration.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.registrationState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userSocialRegistration.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.socialState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userSocialLogin.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.socialState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [verifyRegistration.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.verifyState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userLogin.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.loginState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userForgotPassword.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.forgotPasswordState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userResetPassword.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.resetPasswordState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userLogout.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.logoutState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [adminUpdate.fulfilled]: (state: any, { payload: { error, message } }) => {
      state.adminUpdateState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [adminUpdatePassword.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.adminPasswordState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [userDelete.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.userDeleteState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
    [addFCM.fulfilled]: (
      state: any,
      { payload: { error, message } }
    ) => {
      state.addFCMState = 1;
      if (error) {
        state.error = error;
      } else {
        state.error = message;
      }
    },
  },
});

export const {
  changeRegistrationState,
  changeSocialState,
  changeVerifyState,
  changeLoginState,
  changeForgotPasswordState,
  changeLogoutState,
  changeResetPasswordState,
  changeAdminState,
  changeAdminPasswordState,
  localLatLng,
  saveLatLng,
  increaseLocalLocation,
  blankRegistrationMessage,
  getFcmToken
} = registrationSlice.actions;
export default registrationSlice.reducer;
