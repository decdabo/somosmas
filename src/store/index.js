import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// nosotros reducer
import { membersReducer } from "./reducers/membersReducers";
import aboutReducer from "./slices/aboutSlice";
// Put reducers here
const reducers = { 
  aboutData: aboutReducer,
  members: membersReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

export default store;
