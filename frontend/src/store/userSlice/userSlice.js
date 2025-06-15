import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: "user",
   initialState: {
      loggedIn: false,
      user: null,
   },
   reducers: {
      login: (state, payload) => {
         state.loggedIn = true;
         state.user = payload.payload;
      },
      logout: (state) => {
         state.loggedIn = false;
         state.user = null;
      },
   },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
