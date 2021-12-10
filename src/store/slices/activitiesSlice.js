import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async ( id , { rejectWithValue }) => {
    const response = await ( Get("activities", id) || Get("activities") );
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

const slice = createSlice({
  name: "activities",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActivities.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default slice.reducer;