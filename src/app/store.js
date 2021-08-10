import { configureStore } from "@reduxjs/toolkit";
// need the ../ because it is two levels deep, app folder then the store.js file
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
