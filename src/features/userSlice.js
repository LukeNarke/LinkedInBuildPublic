import { createSlice } from "@reduxjs/toolkit";

// we call it userSlice, because we are storing the user's info in the redux data-"slice"
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  // reducer is a function which takes two arguments--the current state and an action--and returns a new state based on both arguments
  reducers: {
    login: (state, action) => {
      // the reducer will set the state to a user being logged in
      // the payload is basically an object that we pass along with it
      state.user = action.payload;
    },
    logout: (state) => {
      // this reducer sets the user to null after a logout
      state.user = null;
    },
  },
});

// export the login and logout reducers
export const { login, logout } = userSlice.actions;

// selectUser will allow us to pull from the data layer when we need to
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
