import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import themeReducer from "./themeSlice/themeSlice";

export default configureStore({
   reducer: {
      user: userReducer,
      theme: themeReducer,
   },
   
});
