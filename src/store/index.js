import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// Put reducers here
const reducers = {};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

export default store;
