import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// nosotros reducer
import aboutReducer from "./slices/aboutSlice";
// Put reducers here
const reducers = { aboutData: aboutReducer };

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

export default store;
