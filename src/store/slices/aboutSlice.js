import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchMembers = createAsyncThunk(
  "about/fetchMembers",
  async (_, { rejectWithValue }) => {
    const response = await Get("members");
    if (response.success) {
      return response.data;
    }
    return rejectWithValue(response.error);
  }
);

const slice = createSlice({
  name: "about",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMembers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default slice.reducer;
