import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import themeReducer from "./themeSlice/themeSlice";
import nodesReducer from "./nodesSlice/nodesSlice";

export default configureStore({
   reducer: {
      user: userReducer,
      theme: themeReducer,
      flow: nodesReducer,
   },
});
