import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authSlice from "./slices/authSlice";
// nosotros reducer
import { membersReducer } from "./reducers/membersReducers";
import aboutReducer from "./slices/aboutSlice";
import slidesReducer from "./slices/slidesSlice";
import activitiesReducer from "./slices/activitiesSlice";
// Put reducers here
const reducers = {
  aboutData: aboutReducer,
  members: membersReducer,
  authReducer: authSlice,
  slidesData: slidesReducer,
  activities: activitiesReducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
  devTools: true,
});

export default store;
