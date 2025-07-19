import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../reducer/registrationReducer";
import profileReducer from "../reducer/profileReducer";
import userReducer from "../adminReducer/userReducer";
import blogReducer from "../globalReducer/blogReducer";
import imageReducer from "../globalReducer/imageReducer";
import contactUsReducer from "../globalReducer/contactUsReducer";
import cafeReducer from "../reducer/cafeReducer";
import mapReducer from "../globalReducer/mapReducer";
import cafeClaimReducer from "../globalReducer/cafeClaimReducer";
import recommendReducer from "../globalReducer/recommendReducer";
import connectionReducer from "../reducer/connectionReducer";

export const store = configureStore({
  reducer: {
    registrationReducer: registrationReducer,
    profileReducer: profileReducer,
    userReducer: userReducer,
    blogReducer: blogReducer,
    imageReducer: imageReducer,
    contactUsReducer: contactUsReducer,
    cafeReducer: cafeReducer,
    mapReducer: mapReducer,
    cafeClaimReducer: cafeClaimReducer,
    recommendReducer: recommendReducer,
    connectionReducer: connectionReducer
  },
});
