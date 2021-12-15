import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";



export const fetchCategories = createAsyncThunk("categories/fetchCategories", async (_, {rejectWithValue}) => {
    const response = await Get('categories')
    if (response.success) {
        return response.data
    }

    return rejectWithValue(response.error);        
    
})




const categorieSlice = createSlice({
    name: 'categories',
    initialState: {
        loading: false,
        error: false,
        data: [],
    },
    reducers: {},
    extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default categorieSlice.reducer




